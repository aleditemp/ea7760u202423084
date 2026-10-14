import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ChargingStationResource extends BaseResource {
  id: string;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ChargingStationResponse extends BaseResponse {
  stations: ChargingStationResource[];
}
