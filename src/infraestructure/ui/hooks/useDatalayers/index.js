import TagManager from 'react-gtm-module';

import { getGtmArgs } from './GtmArgs';

const useDataLayers = () => {
	const gtmAgeGateNot = () =>
		TagManager.dataLayer(getGtmArgs('GAEvent', 'Age Gate', 'interaction', 'No'));

	const gtmAgeGateYes = () =>
		TagManager.dataLayer(getGtmArgs('GAEvent', 'Age Gate', 'interaction', 'Yes'));

	const gtmAgeGateYear = (response) =>
		TagManager.dataLayer(getGtmArgs('GAEvent', 'Age Gate', 'interaction', response));

	const gtmPromoCard = (url) =>
		TagManager.dataLayer(
			getGtmArgs('GAEvent', 'Pick a Promo', 'interaction', 'Select a Coupon', {
				URLPROMO: url,
			})
		);

	const gtmError404 = () =>
		TagManager.dataLayer(getGtmArgs('GAEvent', 'Error Screen', 'interaction', 'Go back Home'));

	const gtmSearchAddress = () => {
		TagManager.dataLayer(
			getGtmArgs('GAEvent', 'Location Finder', 'interaction', 'Look up your location')
		);
	};

	const gtmSelectOptions = () => {
		TagManager.dataLayer(
			getGtmArgs('GAEvent', 'Location Finder', 'interaction', 'Pick your location')
		);
	};

	const gtmShowLocation = () => {
		TagManager.dataLayer(
			getGtmArgs('GAEvent', 'Location Finder', 'interaction', 'Find my location')
		);
	};

	const gtmUseMyLocation = () => {
		TagManager.dataLayer(
			getGtmArgs('GAEvent', 'Location Finder', 'interaction', 'Use my Location')
		);
	};

	return {
		gtmAgeGateNot,
		gtmAgeGateYes,
		gtmAgeGateYear,
		gtmPromoCard,
		gtmError404,
		gtmSearchAddress,
		gtmSelectOptions,
		gtmShowLocation,
		gtmUseMyLocation,
	};
};

export default useDataLayers;
