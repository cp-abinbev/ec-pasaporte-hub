import { types } from '../../types';

export const googleMapsOptionsReducer = (
	state = {
		options: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.GOOGLE_MAPS_API.GET_GOOGLE_MAPS_API_KEY:
			return {
				...state,
				options: action.payload,
				loading: false,
				error: null,
			};
		case types.GOOGLE_MAPS_API.LOADING:
			return { ...state, loading: true, error: null };
		case types.GOOGLE_MAPS_API.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const zonesReducer = (
	state = {
		zones: [],
		zone: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.ZONES.GET_ZONAS:
			return {
				...state,
				zones: action.payload,
				loading: false,
				error: null,
			};
		case types.ZONES.LOADING:
			return { ...state, loading: true, error: null };
		case types.ZONES.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case types.ZONES.GET_ZONE:
			return {
				...state,
				zone:
					state.zones.find(
						(zone) => zone.id === action.payload.id || zone.slug === action.payload.slug
					) || {},
				loading: false,
				error: null,
			};
		case types.ZONES.CLEAR_ZONE:
			return {
				...state,
				zone: {},
			};
		default:
			return state;
	}
};

export const userLocationReducer = (
	state = {
		geoPosition: {},
		address: '',
	},
	action
) => {
	const { payload } = action;

	switch (action.type) {
		case types.USER_LOCATION.SET_LOCATION:
			return {
				...state,
				geoPosition: payload.geoPosition ? payload.geoPosition : state.geoPosition,
				address: payload.address,
			};
		case types.USER_LOCATION.RESET_LOCATION:
			return state;
		default:
			return state;
	}
};
