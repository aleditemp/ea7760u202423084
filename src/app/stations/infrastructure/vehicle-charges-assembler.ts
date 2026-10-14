import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { VehicleCharges } from '../domain/model/vehicle-charges.entity';
import { VehicleChargesResource, VehicleChargesResponse } from './vehicle-charges-response';

export class VehicleChargesAssembler implements BaseAssembler<
  VehicleCharges,
  VehicleChargesResource,
  VehicleChargesResponse
> {
  toEntitiesFromResponse = (response: VehicleChargesResponse): VehicleCharges[] =>
    response.charges.map((resource) =>
      this.toEntityFromResource(resource as VehicleChargesResource),
    );

  toEntityFromResource = (resource: VehicleChargesResource): VehicleCharges =>
    new VehicleCharges({
      id: resource.id,
      stationId: resource.stationId,
      vehicleType: resource.vehicleType,
      makeId: resource.makeId,
      makeName: resource.makeName,
      kwDemand: resource.kwDemand,
      chargingPortType: resource.chargingPortType,
      isFastCharge: resource.isFastCharge,
      registeredAt: resource.registeredAt,
    });

  toResourceFromEntity = (entity: VehicleCharges): VehicleChargesResource =>
    ({
      id: entity.id,
      stationId: entity.id,
      vehicleType: entity.vehicleType,
      makeId: entity.makeId,
      makeName: entity.makeName,
      kwDemand: entity.kwDemand,
      chargingPortType: entity.chargingPortType,
      isFastCharge: entity.isFastCharge,
      registeredAt: entity.registeredAt,
    }) as unknown as VehicleChargesResource;
}
