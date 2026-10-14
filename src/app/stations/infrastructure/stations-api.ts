import { Injectable, inject } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ChargingStationsApiEndpoint } from './charging-stations-api-endpoint';
import { VehicleChargesApiEndpoint } from './vehicles-charges-api-endpoint';

@Injectable({ providedIn: 'root' })
export class StationsApi extends BaseApi {
  readonly chargingStations = inject(ChargingStationsApiEndpoint);
  readonly vehicleCharges = inject(VehicleChargesApiEndpoint);
}
