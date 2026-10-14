import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { VehiclesApi } from '../infrastructure/vehicles-api';
import { Vehicle } from '../domain/model/vehicle.entity';


@Injectable({ providedIn: 'root' })
export class VehiclesStore {
  private readonly api = inject(VehiclesApi);

  private readonly _vehicles = signal<Vehicle[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _loadedVehicleType = signal<string | null>(null);

  private requestVersion = 0;

  readonly makes = this._vehicles.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly loadedVehicleType = this._loadedVehicleType.asReadonly();

  async loadMakes(vehicleType: string): Promise<void> {
    const version = ++this.requestVersion;

    this._vehicles.set([]);
    this._loadedVehicleType.set(null);
    this._error.set(null);
    this._loading.set(true);

    try {
      const makes = await firstValueFrom(this.api.vehicle.getByVehicleType(vehicleType));
      if (version !== this.requestVersion) return;
      const uniqueMakes = new Map<number, Vehicle>();

      for (const make of makes) {
        uniqueMakes.set(make.makeId, make);
      }

      const sortedMakes = [...uniqueMakes.values()].sort((first, second) =>
        first.makeName.localeCompare(second.makeName),
      );

      this._vehicles.set(sortedMakes);
      this._loadedVehicleType.set(vehicleType);
    } catch {
      if (version !== this.requestVersion) return;

      this._error.set('errors.loadMakes');
    } finally {
      if (version === this.requestVersion) {
        this._loading.set(false);
      }
    }
  }

  getVehicleById(vehicleType: string, makeId: number): Vehicle | undefined {
    if (this._loading() || this._loadedVehicleType() !== vehicleType) {
      return undefined;
    }
    return this._vehicles().find((make) => make.makeId === makeId);
  }

  reset(): void {
    this.requestVersion++;
    this._vehicles.set([]);
    this._loadedVehicleType.set(null);
    this._loading.set(false);
    this._error.set(null);
  }
}
