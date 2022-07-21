import { http } from '../../http/http';

export const locationsRepository = {
  googleMapsOptions: async () => await http.get('/api/getGoogleAPIKey'),
  getZones: async () => await http.get('/api/getZones'),
};
