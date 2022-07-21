import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useScreens } from '../../screens';

const AgeGateRouter = () => {
	const { Promos } = useScreens();
	const { isOlder } = useSelector((store) => store.verifyAgeGateReducer);

	return <>{isOlder ? <Promos /> : <Navigate to="/" />}</>;
};

export default AgeGateRouter;
