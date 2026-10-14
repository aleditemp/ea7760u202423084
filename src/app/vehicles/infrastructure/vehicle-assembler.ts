import { Vehicle } from '../domain/model/vehicle.entity';
import { VehicleResource, VehicleResponse } from './vehicle-response';


export class VehicleAssembler {
  toEntityFromResource(resource: VehicleResource): Vehicle {
    return new Vehicle(
      resource.MakeId,
      resource.MakeName,
      resource.VehicleTypeId,
      resource.VehicleTypeName,
    );
  }

  toResourceFromEntity(entity: Vehicle): VehicleResource {
    return {
      MakeId: entity.makeId,
      MakeName: entity.makeName,
      VehicleTypeId: entity.vehicleTypeId,
      VehicleTypeName: entity.vehicleTypeName,
    };
  }

  toEntitiesFromResponse(response: VehicleResponse): Vehicle[] {
    return response.Results.map((resource) => this.toEntityFromResource(resource));
  }
}
