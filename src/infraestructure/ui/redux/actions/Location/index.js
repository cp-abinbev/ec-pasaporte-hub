import { types } from '../../types';
import { services } from '../../../../../domain/services/index';

const locationActions = () => {
	const getGoogleOptionAction = () => async (dispatch) => {
		dispatch({
			type: types.GOOGLE_MAPS_API.LOADING,
		});
		try {
			const response = await services.locationService.googleMapsOptions();
			dispatch({
				type: types.GOOGLE_MAPS_API.GET_GOOGLE_MAPS_API_KEY,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.GOOGLE_MAPS_API.ERROR,
				payload: error.response,
			});
		}
	};

	const getZonesAction = () => async (dispatch) => {
		dispatch({
			type: types.ZONES.LOADING,
		});
		try {
			const response = await services.locationService.getZones();
			dispatch({
				type: types.ZONES.GET_ZONAS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.ZONES.ERROR,
				payload: error.response,
			});
		}
	};

	const getZoneAction = (params) => (dispatch) => {
		dispatch({
			type: types.ZONES.GET_ZONE,
			payload: params,
		});
	};

	const clearZoneAction = (params) => (dispatch) => {
		dispatch({
			type: types.ZONES.CLEAR_ZONE,
		});
	};

	const setUserLocationAction = (payload) => (dispatch) => {
		dispatch({
			type: types.USER_LOCATION.SET_LOCATION,
			payload,
		});
	};

	return {
		getGoogleOptionAction,
		getZonesAction,
		setUserLocationAction,
		getZoneAction,
		clearZoneAction,
	};
};

export default locationActions;
