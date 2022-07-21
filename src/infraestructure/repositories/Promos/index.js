import { http } from '../../http/http';

export const promosRepository = {
	promos: async (page, { zone_id, lat, lng }) =>
		await http.create(`/api/getPromos?page=${page}`, { zone_id, lat, lng }),
};
