import { lazy } from 'react';
import Metas from './Metas';

const Footer = lazy(() => import('./Footer/index'));
const Header = lazy(() => import('./Header/index'));
const Layout = lazy(() => import('./Layout/index'));
const DefaultLoading = lazy(() => import('./DefaultLoading/index'));
const ErrorPage = lazy(() => import('./Error/index'));
const Head = lazy(() => import('./Head/index'));
const LayoutContainer = lazy(() => import('./LayoutContainer/index'));
const Search = lazy(() => import('./Search/index'));
const Browse = lazy(() => import('./Browse'));
const Typography = lazy(() => import('./Typography/index'));
const Alert = lazy(() => import('./Alert'));
const PrimaryBtn = lazy(() => import('./PrimaryBtn/index'));
const ComponentSpinner = lazy(() => import('./ComponentSpinner/index'));
const ZonesAnchors = lazy(() => import('./ZonesAnchors/index'));

export const useComponents = () => {
	return {
		Footer,
		Header,
		Layout,
		DefaultLoading,
		ErrorPage,
		Head,
		LayoutContainer,
		Search,
		Browse,
		Typography,
		Alert,
		PrimaryBtn,
		ComponentSpinner,
		ZonesAnchors,
		Metas,
	};
};
