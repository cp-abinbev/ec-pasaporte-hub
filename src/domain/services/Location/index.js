import { repository } from '../../../infraestructure/repositories/index';

export const locationService = {
  googleMapsOptions: () => repository.locationsRepository.googleMapsOptions(),
  getZones: () => repository.locationsRepository.getZones(),
};
