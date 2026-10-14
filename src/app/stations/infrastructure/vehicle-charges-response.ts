import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface VehicleChargesResource extends BaseResource {
  id: number;
  stationId: string;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;
}

export interface VehicleChargesResponse extends BaseResponse {
  charges: VehicleChargesResource[];
}

export type VehicleChargeRequest = Omit<VehicleChargesResource, 'id'>;
