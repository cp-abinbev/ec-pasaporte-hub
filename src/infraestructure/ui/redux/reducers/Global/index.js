import { types } from '../../types';

export const footerOptionsReducer = (
	state = {
		footerOptions: [],
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.FOOTER.GET_FOOTER_OPTIONS:
			return {
				...state,
				footerOptions: action.payload,
				loading: false,
				error: null,
			};
		case types.FOOTER.LOADING:
			return { ...state, loading: true, error: null };
		case types.FOOTER.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const ageGateReducer = (
	state = {
		ageGate: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.AGEGATE.GET_AGEGATE_OPTION:
			return {
				...state,
				ageGate: action.payload,
				loading: false,
				error: null,
			};
		case types.AGEGATE.LOADING:
			return { ...state, loading: true, error: null };
		case types.AGEGATE.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const uiConfigReducer = (
	state = {
		uiConfiguration: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.UICONFIG.GET_UICONFIG_OPTIONS:
			return {
				...state,
				uiConfiguration: action.payload,
				loading: false,
				error: null,
			};
		case types.UICONFIG.LOADING:
			return { ...state, loading: true, error: null };
		case types.UICONFIG.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const verifyAgeGateReducer = (
	state = {
		isOlder: false,
	},
	action
) => {
	switch (action.type) {
		case types.VERIFYAGE.IS_OLD:
			return {
				...state,
				isOlder: true,
			};
		case types.VERIFYAGE.ISNT_OLD:
			return {
				...state,
				isOlder: false,
			};
		default:
			return state;
	}
};

export const checkBoxAgeGateReducer = (
	state = {
		isChecked: false,
	},
	action
) => {
	switch (action.type) {
		case types.CHECK_BOX_AGE_GATE.IS_CHECKED:
			return {
				...state,
				isChecked: !state.isChecked,
			};
		default:
			return state;
	}
};

export const gtmContainersReducer = (
	state = {
		gtmContainers: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.GTM_CONTAINERS.GET_GTM_CONTAINERS:
			return {
				...state,
				gtmContainers: action.payload,
				loading: false,
				error: null,
			};
		case types.GTM_CONTAINERS.LOADING:
			return { ...state, loading: true, error: null };
		case types.GTM_CONTAINERS.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getMetaTagsReducer = (
	state = {
		metaTags: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.META_TAGS.GET_META_TAGS:
			return {
				...state,
				metaTags: action.payload,
				loading: false,
				error: null,
			};
		case types.META_TAGS.LOADING:
			return { ...state, loading: true, error: null };
		case types.META_TAGS.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
