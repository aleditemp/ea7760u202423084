import { Injectable, inject } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { VehicleApiEndpoint } from './vehicle-api-endpoint';

@Injectable({ providedIn: 'root' })
export class VehiclesApi extends BaseApi {
  readonly vehicle = inject(VehicleApiEndpoint);
}
