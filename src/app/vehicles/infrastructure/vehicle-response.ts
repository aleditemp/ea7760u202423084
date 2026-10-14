export interface VehicleResource {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleResource[];
}
