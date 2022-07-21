import { useSelector } from 'react-redux';
import { Outlet, useLocation, Routes, Route } from 'react-router-dom';

import { useComponents } from '../../components';
import { useLocationComponents } from './components';

const LocationScreen = () => {
	const { LayoutContainer } = useComponents();
	const { ZoneView, AutoCompleteView, MapView } = useLocationComponents();
	const { uiConfiguration } = useSelector((store) => store.uiConfigReducer);
	const { options } = useSelector((store) => store.googleMapsOptionsReducer);
	const { contentFontColor, titleFontColor, bgColor, url_logo_header, buttonColor } =
		uiConfiguration;
	const { googleApiKey } = options;

	const { pathname } = useLocation();

	return (
		<LayoutContainer paddingTop img={url_logo_header} bgColor={bgColor}>
			{!(googleApiKey && googleApiKey.length) ? (
				<ZoneView
					contentFontColor={contentFontColor}
					titleFontColor={titleFontColor}
					buttonColor={buttonColor}
				/>
			) : (
				<>
					{pathname === '/location/' ||
						(pathname === '/location' && (
							<AutoCompleteView
								contentFontColor={contentFontColor}
								titleFontColor={titleFontColor}
								buttonColor={buttonColor}
							/>
						))}
					{pathname === '/location/map' && (
						<>
							<Routes>
								<Route
									path="map"
									element={
										<MapView
											contentFontColor={contentFontColor}
											titleFontColor={titleFontColor}
											buttonColor={buttonColor}
										/>
									}
								/>
							</Routes>
							<Outlet />
						</>
					)}
				</>
			)}
		</LayoutContainer>
	);
};

export default LocationScreen;
