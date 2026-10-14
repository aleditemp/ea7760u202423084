import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { ChargingStationAssembler } from './charging-station-assembler';
import { ChargingStationResource, ChargingStationResponse } from './charging-station-response';

@Injectable({ providedIn: 'root' })
export class ChargingStationsApiEndpoint extends BaseApiEndpoint<
  ChargingStation,
  ChargingStationResource,
  ChargingStationResponse,
  ChargingStationAssembler
> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderStationsEndpointPath}`,
      new ChargingStationAssembler(),
    );
  }
}
