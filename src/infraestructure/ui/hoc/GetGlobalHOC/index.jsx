import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useActions from '../../redux/actions/index';

import { startGtmContainers } from '../../utils/GtmInstance/index';

import './style.css';

const GetGlobalHOC = ({ children }) => {
	const { dispatch, globalActions, locationActions } = useActions();
	const {
		footerOptionsAction,
		agegateAction,
		uiConfigAction,
		gtmContainersActions,
		getMetaTagsActions,
	} = globalActions();

	const { getGoogleOptionAction } = locationActions();

	const { gtmContainers } = useSelector((store) => store.gtmContainersReducer);

	useEffect(() => {
		dispatch(footerOptionsAction());
		dispatch(agegateAction());
		dispatch(uiConfigAction());
		dispatch(gtmContainersActions());
		dispatch(getGoogleOptionAction());
		dispatch(getMetaTagsActions());
	}, []);

	useEffect(() => {
		startGtmContainers(gtmContainers);
	}, [gtmContainers]);

	return <div className="ahead-content">{children}</div>;
};

export default GetGlobalHOC;
