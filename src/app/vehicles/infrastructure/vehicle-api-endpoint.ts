import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehicleResponse } from './vehicle-response';
import { VehicleAssembler } from './vehicle-assembler';
import { Vehicle } from '../domain/model/vehicle.entity';

@Injectable({ providedIn: 'root' })
export class VehicleApiEndpoint {
  private readonly http = inject(HttpClient);
  private readonly assembler = new VehicleAssembler();

  getByVehicleType(vehicleType: string): Observable<Vehicle[]> {
    const url =
      `${environment.platformProviderApiBaseUrl}/GetMakesForVehicleType/` + encodeURIComponent(vehicleType);

    return this.http
      .get<VehicleResponse>(url, {
        params: { format: 'json' },
      })
      .pipe(map((response) => this.assembler.toEntitiesFromResponse(response)));
  }
}
