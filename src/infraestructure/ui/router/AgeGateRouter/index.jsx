import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useScreens } from '../../screens';
import useActions from '../../redux/actions';

const AgeGateRouter = () => {
  const { Agegate } = useScreens();
	const { isChecked } = useSelector((store) => store.checkBoxAgeGateReducer);
	const { isOlder } = useSelector((store) => store.verifyAgeGateReducer);
	const { dispatch, globalActions } = useActions();
	const { isntOlderAction } = globalActions();

	useEffect(() => {
		if(!isChecked) {
			dispatch(isntOlderAction())
		}
	}, [])

	if(isChecked && isOlder) {
		return <Navigate to="/location" />
	}

	return <Agegate />;
};

export default AgeGateRouter;
