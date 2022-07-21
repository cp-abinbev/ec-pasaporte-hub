import { repository } from '../../../infraestructure/repositories/index';

export const globalService = {
	footerOptions: () => repository.globalRepository.footerOptions(),
	agegate: () => repository.globalRepository.agegate(),
	uiConfiguration: () => repository.globalRepository.uiConfiguration(),
	getGtmList: () => repository.globalRepository.getGtmList(),
	getZoneMetaTads: () => repository.globalRepository.getZoneMetaTads(),
};
