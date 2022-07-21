import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import session from 'redux-persist/lib/storage/session';

import {
	footerOptionsReducer,
	uiConfigReducer,
	ageGateReducer,
	verifyAgeGateReducer,
	gtmContainersReducer,
	checkBoxAgeGateReducer,
	getMetaTagsReducer,
} from './Global/index';
import { promosReducer, nextPagePromoReducer } from './Promos/index';
import { googleMapsOptionsReducer, zonesReducer, userLocationReducer } from './Location/index';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [
		'nextPagePromoReducer',
		'promosReducer',
		'gtmContainersReducer',
		'checkBoxAgeGateReducer',
		// 'googleMapsOptionsReducer',
	],
};

const sessionConfig = {
	key: 'ageGate',
	storage: session,
	blacklist: [
		'footerOptionsReducer',
		'uiConfigReducer',
		'ageGateReducer',
		'gtmContainersReducer',
		'verifyAgeGateReducer',
		'promosReducer',
		'nextPagePromoReducer',
		'googleMapsOptionsReducer',
		'zonesReducer',
		'userLocationReducer',
	],
};

const rootReducer = combineReducers({
	footerOptionsReducer,
	uiConfigReducer,
	ageGateReducer,
	gtmContainersReducer,
	verifyAgeGateReducer,
	promosReducer,
	nextPagePromoReducer,
	googleMapsOptionsReducer,
	zonesReducer,
	userLocationReducer,
	getMetaTagsReducer,
	checkBoxAgeGateReducer: persistReducer(sessionConfig, checkBoxAgeGateReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
