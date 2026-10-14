import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { VehicleCharges } from '../domain/model/vehicle-charges.entity';
import { StationsApi } from '../infrastructure/stations-api';
import { VehiclesStore } from '../../vehicles/application/vehicle.store';
import { VehicleChargeRequest } from '../infrastructure/vehicle-charges-response';

export interface ChargingStationSummary {
  station: ChargingStation;
  charges: VehicleCharges[];
  totalGridLoad: number;
  availableGridMargin: number;
  activeStalls: number;
}

export interface NewVehicleChargeInput {
  vehicleType: string;
  makeId: number;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
}

/**
 * Manage stations
 * @author Kevin Geronimo
 */

@Injectable({ providedIn: 'root' })
export class StationsStore {
  private readonly api = inject(StationsApi);
  private readonly vehiclesStore = inject(VehiclesStore);

  private readonly _stations = signal<ChargingStation[]>([]);
  private readonly _charges = signal<VehicleCharges[]>([]);
  private readonly _loading = signal(false);
  private readonly _saving = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly stations = this._stations.asReadonly();
  readonly charges = this._charges.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly saving = this._saving.asReadonly();
  readonly error = this._error.asReadonly();

  readonly summaries = computed<ChargingStationSummary[]>(() =>
    this._stations().map((station) => {
      const charges = this._charges().filter((charge) => charge.stationId === station.id);

      const totalGridLoad = charges.reduce((total, charge) => total + charge.kwDemand, 0);

      return {
        station,
        charges,
        totalGridLoad,
        availableGridMargin: station.maxGridKwCapacity - totalGridLoad,
        activeStalls: charges.length,
      };
    }),
  );

  constructor() {
    void this.loadData();
  }

  async loadData(): Promise<void> {
    if (this._loading() || this._saving()) return;

    this._loading.set(true);
    this._error.set(null);

    try {
      const data = await firstValueFrom(
        forkJoin({
          stations: this.api.chargingStations.getAll(),
          charges: this.api.vehicleCharges.getAll(),
        }),
      );

      this._stations.set(data.stations);
      this._charges.set(data.charges);
    } catch {
      this._error.set('errors.loadStations');
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Find Station
   * @param vehicleType
   */

  getStationByVehicleType(vehicleType: string): ChargingStation | undefined {
    return this._stations().find((station) => station.vehicleType === vehicleType);
  }

  getSummaryByStationId(stationId: string): ChargingStationSummary | undefined {
    return this.summaries().find((summary) => summary.station.id === stationId);
  }

  clearError(): void {
    this._error.set(null);
  }

  async createVehicleCharge(input: NewVehicleChargeInput): Promise<boolean> {
    if (this._saving() || this._loading()) return false;

    this._error.set(null);

    if (!Number.isFinite(input.kwDemand) || input.kwDemand <= 0) {
      return this.fail('errors.invalidDemand');
    }

    if (input.chargingPortType !== 'NACS' && input.chargingPortType !== 'CCS') {
      return this.fail('errors.invalidPort');
    }

    if (!this.vehiclesStore.getVehicleById(input.vehicleType, input.makeId)) {
      return this.fail('errors.invalidMake');
    }

    this._saving.set(true);

    try {
      /**
       * Refresh station status and registered charges before validation.
       */

      const data = await firstValueFrom(
        forkJoin({
          stations: this.api.chargingStations.getAll(),
          charges: this.api.vehicleCharges.getAll(),
        }),
      );

      this._stations.set(data.stations);
      this._charges.set(data.charges);

      const station = this.getStationByVehicleType(input.vehicleType);

      if (!station) {
        return this.fail('errors.stationNotFound');
      }

      if (!station.isActive) {
        return this.fail('errors.stationInactive');
      }

      const stationCharges = data.charges.filter((charge) => charge.stationId === station.id);

      if (stationCharges.length >= station.stallsAvailable) {
        return this.fail('errors.noStalls');
      }

      const totalGridLoad = stationCharges.reduce((total, charge) => total + charge.kwDemand, 0);

      const availableGridMargin = station.maxGridKwCapacity - totalGridLoad;

      if (input.kwDemand > availableGridMargin) {
        return this.fail('errors.insufficientPower');
      }

      const make = this.vehiclesStore.getVehicleById(input.vehicleType, input.makeId);

      if (!make) {
        return this.fail('errors.invalidMake');
      }

      const request: VehicleChargeRequest = {
        stationId: station.id,
        vehicleType: input.vehicleType,
        makeId: make.makeId,
        makeName: make.makeName,
        kwDemand: input.kwDemand,
        chargingPortType: input.chargingPortType,
        isFastCharge: input.isFastCharge,
        registeredAt: new Date().toISOString(),
      };

      const createdCharge = await firstValueFrom(this.api.vehicleCharges.create(<VehicleCharges>request));
      this._charges.update((charges) => [...charges, createdCharge]);

      return true;
    } catch {
      return this.fail('errors.createCharge');
    } finally {
      this._saving.set(false);
    }
  }

  private fail(errorKey: string): false {
    this._error.set(errorKey);
    return false;
  }
}
