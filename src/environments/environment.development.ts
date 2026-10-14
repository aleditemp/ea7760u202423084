export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderSportsCentersEndpointPath: '/charging-stations',
  platformProviderReservationsEndpointPath: '/vehicle-charges',

  vehicleProviderApiBaseUrl: 'https://vpic.nhtsa.dot.gov/api',
  vehicleProviderVehicleTypesEndpointPath:
    '/vehicles/GetMakesForVehicleType/{vehicleType}?format=json',
};
