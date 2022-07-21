import { Routes, Route } from 'react-router-dom';

import AgeGateRouter from './AgeGateRouter';
import PromosRouter from './PromosRouter';
import LocationRouter from './LocationRouter';
import { useComponents } from '../components';

const RouterComponent = () => {
	const { ErrorPage } = useComponents();

	return (
		<Routes>
			<Route path="/" element={<AgeGateRouter />} />
			<Route path="promos">
				<Route index element={<PromosRouter />} />
				<Route path=":zone" element={<PromosRouter />} />
			</Route>
			<Route path="/location/*" element={<LocationRouter />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

export default RouterComponent;
