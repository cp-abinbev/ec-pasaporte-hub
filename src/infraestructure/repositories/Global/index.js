import { http } from '../../http/http';

export const globalRepository = {
	footerOptions: async () => await http.get('/api/footer'),
	agegate: async () => await http.get('/api/ageGate'),
	uiConfiguration: async () => await http.get('/api/uiConfiguration'),
	getGtmList: async () => await http.get('/api/getDataLayers'),
	getZoneMetaTads: async () => await http.get('/api/getZoneMetaTags'),
};
