export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderStationsEndpointPath: '/charging-stations',
  platformProviderChargesEndpointPath: '/vehicle-charges',

  vehicleProviderApiBaseUrl: 'https://vpic.nhtsa.dot.gov/api',
  vehicleProviderVehicleTypesEndpointPath:
    '/vehicles/GetMakesForVehicleType/{vehicleType}?format=json',
};
