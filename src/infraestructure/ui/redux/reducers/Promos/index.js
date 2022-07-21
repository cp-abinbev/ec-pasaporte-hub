import { types } from '../../types';

export const promosReducer = (
	state = {
		promos: [],
		total: 0,
		page: 1,
		perPage: 5,
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case types.PROMOS.GET_PROMOS:
			const promosUnfiltered = state.promos.concat(action.payload.data);
			const ids = promosUnfiltered.map((promo) => promo.id);
			const promosFiltered = promosUnfiltered.filter(
				({ id }, index) => !ids.includes(id, index + 1)
			);
			return {
				...state,
				total: action.payload.total,
				promos: promosFiltered,
				perPage: action.payload.per_page,
				page: action.payload.current_page,
				loading: false,
				error: null,
			};
		case types.PROMOS.LOADING:
			return { ...state, loading: true, error: null };
		case types.PROMOS.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case types.PROMOS.RESET_PROMOS:
			return {
				promos: [],
				total: 0,
				page: 1,
				perPage: 5,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export const nextPagePromoReducer = (
	state = {
		page: 1,
	},
	action
) => {
	switch (action.type) {
		case types.PAGE.NEXT_PAGE_PROMO:
			return {
				...state,
				page: state.page + 1,
			};
		default:
			return state;
	}
};
