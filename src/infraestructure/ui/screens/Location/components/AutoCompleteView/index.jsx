import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import useActions from '../../../../redux/actions';

import { useLocationComponents } from '../index';
import { useComponents } from '../../../../components';

import { useGoogleMapsApi } from '../../../../hooks/useGmapsApi';
import useDataLayers from '../../../../hooks/useDatalayers';

import { View, LocationWhite } from '../../../../utils/GetLocalIcons';

import './style.css';

const AutoCompleteView = ({ contentFontColor, titleFontColor, buttonColor }) => {
	const navigate = useNavigate();
	const { LocationContainer, IntructionInput } = useLocationComponents();
	const { Head, Search, Browse, Typography } = useComponents();
	const { options } = useSelector((store) => store.googleMapsOptionsReducer);
	const { locationActions, dispatch } = useActions();
	const { setUserLocationAction } = locationActions();
	const { state } = useLocation();

	const { gtmShowLocation } = useDataLayers();

	const { googleCountry } = options;

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
		init,
	} = usePlacesAutocomplete({
		debounce: 600,
		initOnMount: false,
		requestOptions: {
			componentRestrictions: {
				country: googleCountry || '',
			},
		},
	});

	const [loadedGmapsApi] = useGoogleMapsApi({
		library: 'places',
		onLoad: () => init(),
	});

	return (
		<LocationContainer>
			<Head
				title="¿DÓNDE ESTAS?"
				subtitle="Escribe tu dirección para ver las promos más cercanas a ti."
				contentFontColor={contentFontColor}
				titleFontColor={titleFontColor}
				paddingLeft="0"
				paddingRight="0"
				paddingTop="10px"
			/>
			<Search
				buttonColor={buttonColor}
				icon={View}
				paddingLeft="0"
				paddingRight="0"
				placeholder="Ingrese su ubicación"
				value={value}
				autoFocus={!!state?.autoFocus}
				disabled={!state?.autoFocus && (!ready || !loadedGmapsApi)}
				handleOnchange={(e) => {
					setValue(e.target.value);
				}}
				handleOnclick={() => {
					gtmShowLocation();
				}}
			/>
			{status === 'ZERO_RESULTS' && (
				<Typography text="Ubicación no encontrada, intenta de nuevo." color="red" />
			)}
			{value === '' && <IntructionInput paddingLeft="0" paddingRight="0" />}
			{status === 'OK' && (
				<>
					<Typography text="Resultados" />
					<Browse>
						{data.map((place) => (
							<li
								className="autocompleteview__li"
								key={place.place_id}
								onClick={() => {
									setValue(place.description, false);
									clearSuggestions();
									getGeocode({ address: place.description })
										.then((results) => getLatLng(results[0]))
										.then(({ lat, lng }) => {
											dispatch(
												setUserLocationAction({
													geoPosition: { lat, lng },
													address: place.description,
												})
											);
											navigate('/location/map');
										})
										.catch((error) => console.error('error: ', error));
								}}
							>
								<img src={LocationWhite} alt="location icon" className="browse-icon" />
								<p className="alt-text">{place.description}</p>
							</li>
						))}
						<li className="autocompleteview__li" onClick={() => navigate('/location/map')}>
							<img src={View} alt="location icon" className="browse-icon" />
							<p className="alt-text">¿No encontraste tu ubicación? Revísalo en el mapa.</p>
						</li>
					</Browse>
				</>
			)}
		</LocationContainer>
	);
};

export default AutoCompleteView;
