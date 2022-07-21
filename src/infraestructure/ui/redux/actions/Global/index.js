import { types } from '../../types';
import { services } from '../../../../../domain/services/index';

const globalActions = () => {
	const footerOptionsAction = () => async (dispatch) => {
		dispatch({
			type: types.FOOTER.LOADING,
		});
		try {
			const response = await services.globalService.footerOptions();
			dispatch({
				type: types.FOOTER.GET_FOOTER_OPTIONS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.FOOTER.ERROR,
				payload: error.response,
			});
		}
	};
	const uiConfigAction = () => async (dispatch) => {
		dispatch({
			type: types.UICONFIG.LOADING,
		});
		try {
			const response = await services.globalService.uiConfiguration();
			dispatch({
				type: types.UICONFIG.GET_UICONFIG_OPTIONS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.UICONFIG.ERROR,
				payload: error.response,
			});
		}
	};
	const agegateAction = () => async (dispatch) => {
		dispatch({
			type: types.AGEGATE.LOADING,
		});
		try {
			const response = await services.globalService.agegate();
			dispatch({
				type: types.AGEGATE.GET_AGEGATE_OPTION,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.AGEGATE.ERROR,
				payload: error.response,
			});
		}
	};

	const gtmContainersActions = () => async (dispatch) => {
		dispatch({
			type: types.GTM_CONTAINERS.LOADING,
		});
		try {
			const response = await services.globalService.getGtmList();
			dispatch({
				type: types.GTM_CONTAINERS.GET_GTM_CONTAINERS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.GTM_CONTAINERS.ERROR,
				payload: error.response,
			});
		}
	};

	const getMetaTagsActions = () => async (dispatch) => {
		dispatch({
			type: types.META_TAGS.LOADING,
		});
		try {
			const response = await services.globalService.getZoneMetaTads();
			dispatch({
				type: types.META_TAGS.GET_META_TAGS,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: types.META_TAGS.ERROR,
				payload: error.response,
			});
		}
	};

	const isOlderAction = () => (dispatch) => {
		dispatch({
			type: types.VERIFYAGE.IS_OLD,
		});
	};

	const isntOlderAction = () => (dispatch) => {
		dispatch({
			type: types.VERIFYAGE.ISNT_OLD,
		});
	};

	const isCheckedAction = () => (dispatch) => {
		dispatch({
			type: types.CHECK_BOX_AGE_GATE.IS_CHECKED,
		});
	};

	return {
		footerOptionsAction,
		uiConfigAction,
		agegateAction,
		isOlderAction,
		isntOlderAction,
		gtmContainersActions,
		isCheckedAction,
		getMetaTagsActions,
	};
};

export default globalActions;
