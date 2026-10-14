import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { ChargingStationResource, ChargingStationResponse } from './charging-station-response';

export class ChargingStationAssembler implements BaseAssembler<
  ChargingStation,
  ChargingStationResource,
  ChargingStationResponse
> {
  toEntitiesFromResponse = (response: ChargingStationResponse): ChargingStation[] =>
    response.stations.map((resource) => this.toEntityFromResource(resource as ChargingStationResource));

  toEntityFromResource = (resource: ChargingStationResource): ChargingStation =>
    new ChargingStation({
      id: resource.id,
      stationName: resource.stationName,
      vehicleType: resource.vehicleType,
      maxGridKwCapacity: resource.maxGridKwCapacity,
      stallsAvailable: resource.stallsAvailable,
      isActive: resource.isActive,
      locationCoordinates: {
        latitude: resource.locationCoordinates.latitude,
        longitude: resource.locationCoordinates.longitude,
      }
    });

  toResourceFromEntity = (entity: ChargingStation): ChargingStationResource =>
    ({
      id: entity.id,
      stationName: entity.stationName,
      vehicleType: entity.vehicleType,
      maxGridKwCapacity: entity.maxGridKwCapacity,
      stallsAvailable: entity.stallsAvailable,
      isActive: entity.isActive,
      locationCoordinates: {
        latitude: entity.locationCoordinates.latitude,
        longitude: entity.locationCoordinates.longitude,
      }
    }) as ChargingStationResource;
}
