import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { VehicleCharges } from '../domain/model/vehicle-charges.entity';
import { VehicleChargesResource, VehicleChargesResponse } from './vehicle-charges-response';
import { VehicleChargesAssembler } from './vehicle-charges-assembler';

@Injectable({ providedIn: 'root' })
export class VehicleChargesApiEndpoint extends BaseApiEndpoint<
  VehicleCharges,
  VehicleChargesResource,
  VehicleChargesResponse,
  VehicleChargesAssembler
> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.platformProviderStationsEndpointPath}${environment.platformProviderChargesEndpointPath}`,
      new VehicleChargesAssembler(),
    );
  }
}
