import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useScreens } from '../../screens';

const LocationRouter = () => {
	const { Location } = useScreens();
	const { isOlder } = useSelector((store) => store.verifyAgeGateReducer);
	const { options } = useSelector((store) => store.googleMapsOptionsReducer);
	const { googleApiKey } = options;

	const { pathname } = useLocation();

	if (pathname === '/location/map/promos') {
		return <Navigate to="/promos" />;
	}

	if (pathname === '/location/map' && !googleApiKey) {
		return <Navigate to="/location" />;
	}

	return isOlder ? <Location /> : <Navigate to="/" />;
};

export default LocationRouter;
