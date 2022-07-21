import { types } from '../../types';
import { services } from '../../../../../domain/services/index';

const promoActions = () => {
	const getPromosAction =
		(page, { zone_id, lat, lng }) =>
		async (dispatch) => {
			dispatch({
				type: types.PROMOS.LOADING,
			});
			try {
				const response = await services.promosService.promos(page, { zone_id, lat, lng });
				dispatch({
					type: types.PROMOS.GET_PROMOS,
					payload: response.data,
				});
			} catch (error) {
				dispatch({
					type: types.PROMOS.ERROR,
					payload: error.response,
				});
			}
		};

	const resetPromosAction = () => (dispatch) => {
		dispatch({
			type: types.PROMOS.RESET_PROMOS,
		});
	};

	const nextPageAction = () => (dispatch) => {
		dispatch({
			type: types.PAGE.NEXT_PAGE_PROMO,
		});
	};

	return {
		getPromosAction,
		nextPageAction,
		resetPromosAction,
	};
};

export default promoActions;
