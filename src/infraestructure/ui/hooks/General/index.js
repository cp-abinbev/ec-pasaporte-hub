import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../useGeolocation';

/**
 * get state of location permission
 *
 * @param {any} initialState
 * @returns showAlert
 */
export const useLocationPermission = (initialState) => {
	const [notPermitted, setNotPermitted] = useState(initialState);

	const { getPermissionForGps } = useGeolocation();

	const handleLocalStorageAlert = () => {
		const date = localStorage.getItem('showAlert');

		if (date) {
			// one day in milliseconds => 60000;
			const oneDayInMilliseconds = 86400000;
			const currentDate = new Date().getTime();
			const different = currentDate - new Date(date).getTime();
			if (different > oneDayInMilliseconds) {
				setNotPermitted(true);
			}
		} else {
			setNotPermitted(true);
		}
	};

	useEffect(() => {
		getPermissionForGps(
			() => setNotPermitted(false),
			(error) => {
				handleLocalStorageAlert();
			}
		);
	}, [notPermitted, handleLocalStorageAlert]);

	return [notPermitted, setNotPermitted];
};

/**
 * create context with useReducer hook
 *
 * @param {React.Reducer} reducer
 * @param {any} initialState
 * @returns {Context, Provider} [ctx, Provider]
 */
export const createCtxReducer = (reducer, initialState) => {
	const defaultDispatch = () => initialState; // we never actually use this
	const ctx = React.createContext({
		state: initialState,
		dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optional
	});
	function Provider(props) {
		const [state, dispatch] = React.useReducer(reducer, initialState);
		return <ctx.Provider value={{ state, dispatch }} {...props} />;
	}
	return [ctx, Provider];
};

/**
 * create context with useState hook
 *
 * @param {any} defaultValue
 * @returns {Context, Provider} [ctx, Provider]
 */
export function createCtxState(defaultValue) {
	const defaultUpdate = () => defaultValue;
	const ctx = React.createContext({ state: defaultValue, update: defaultUpdate });

	function Provider(props) {
		const [state, update] = React.useState(defaultValue);
		return <ctx.Provider value={{ state, update }} {...props} />;
	}
	return [ctx, Provider];
}
