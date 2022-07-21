import { repository } from '../../../infraestructure/repositories/index';

export const promosService = {
	promos: (page, { zone_id, lat, lng }) =>
		repository.promosRepository.promos(page, { zone_id, lat, lng }),
};
