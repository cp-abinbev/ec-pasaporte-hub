import _ from 'lodash';
import { getGeocode } from 'use-places-autocomplete';

export const useGeolocation = () => {
	const getPermissionForGps = (
		handleSuccess,
		handlePermissionDenied,
		handlePositionUnavailable,
		handleTimeOut,
		handleUknownError
	) => {
		const getUserLocation = _.debounce(handleSuccess, 200);

		navigator.geolocation.getCurrentPosition(getUserLocation, (error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					typeof handlePermissionDenied === 'function' && handlePermissionDenied(error);
					break;
				case error.POSITION_UNAVAILABLE:
					typeof handlePositionUnavailable === 'function' && handlePositionUnavailable(error);
					break;
				case error.TIMEOUT:
					typeof handleTimeOut === 'function' && handleTimeOut(error);
					break;
				default:
					typeof handleUknownError === 'function' && handleUknownError(error);
					return;
			}
		});
	};

	const getPossibleAddress = (lat, lng) => {
		const latitude = parseFloat(lat);
		const longitude = parseFloat(lng);

		return getGeocode({ location: { lat: latitude, lng: longitude } });
	};
	return {
		getPossibleAddress,
		getPermissionForGps,
	};
};
