import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useLocationComponents } from '../index';
import { useComponents } from '../../../../components';
import { useScreenSize } from '../../../../hooks/useScreenSize/useScreenSize';
import { useGeolocation } from '../../../../hooks/useGeolocation';
import { useLocationPermission } from '../../../../hooks/General';
import useActions from '../../../../redux/actions';

import { View, ArrowBack } from '../../../../utils/GetLocalIcons';

import './style.css';

const MapView = ({ contentFontColor, titleFontColor, buttonColor }) => {
	const { Head, Search, ComponentSpinner } = useComponents();
	const { LocationContainer, Map } = useLocationComponents();
	const [actualUserAddress, setActualUserAddress] = useState('');
	const [geoPos, setGeoPos] = useState({});
	const navigate = useNavigate();
	const { width } = useScreenSize();
	const { geoPosition } = useSelector((store) => store.userLocationReducer);
	const { options, loading } = useSelector((store) => store.googleMapsOptionsReducer);
	const { googleDefaultLat, googleDefaultLng, googleApiKey } = options;
	const [showAlert, setShowAlert] = useLocationPermission(false);

	const googleMapsApi = useRef(null);

	const { locationActions, dispatch } = useActions();
	const { setUserLocationAction } = locationActions();

	const { getPermissionForGps } = useGeolocation();

	// Google maps handler events
	const handleDragEnd = (map) => {
		if (googleMapsApi?.current) {
			const { geocoder } = googleMapsApi?.current;
			const coords = {
				lat: map.center.lat(),
				lng: map.center.lng(),
			};
			handleSetAddressByGeocode(geocoder, { ...coords });
		}
	};

	const handleApiLoaded = (map, maps) => {
		if (map) {
			googleMapsApi.current = { map };
		}
		if (maps) {
			googleMapsApi.current.maps = maps;
			googleMapsApi.current.geocoder = new maps.Geocoder();
			const geocoder = googleMapsApi.current.geocoder;

			if (geoPosition.lat) {
				handleSetAddressByGeocode(geocoder, geoPosition);
			} else {
				handleSetAddressByGeocode(geocoder, {
					lat: parseFloat(googleDefaultLat),
					lng: parseFloat(googleDefaultLng),
				});
			}
		}
	};

	const handleSetAddressByGeocode = (geocoder, { lat, lng }) => {
		geocoder.geocode({ location: { lat, lng } }, (results, status) => {
			if (status === 'OK') {
				const firstResult = results[0];
				const data = {
					address: firstResult.formatted_address,
					lat: lat,
					lng: lng,
				};
				setActualUserAddress(data.address);
				dispatch(
					setUserLocationAction({
						geoPosition: { lat, lng },
						address: data.address,
					})
				);
			} else {
				setActualUserAddress('');
				dispatch(
					setUserLocationAction({
						geoPosition: {
							lat: parseFloat(googleDefaultLat),
							lng: parseFloat(googleDefaultLng),
						},
						address: '',
					})
				);
				console.error(`Geocode was not successful for the following reason: ${status}`);
			}
		});
	};

	const handleSetUserLocation = () => {
		if (googleMapsApi?.current) {
			const { geocoder } = googleMapsApi?.current;

			getPermissionForGps(
				({ coords }) => {
					const passCoords = {
						lat: coords.latitude,
						lng: coords.longitude,
					};
					handleSetAddressByGeocode(geocoder, { ...passCoords });
				},
				(error) => {
					setShowAlert(true);
				}
			);
		}
	};

	useEffect(() => {
		if (
			Object.keys(geoPosition).length &&
			Object.keys(geoPosition).every((pos) => ['lat', 'lng'].includes(pos))
		) {
			setGeoPos(geoPosition);
		} else if (googleDefaultLat && googleDefaultLng) {
			setGeoPos({
				lat: parseFloat(googleDefaultLat),
				lng: parseFloat(googleDefaultLng),
			});
		}
	}, [googleDefaultLat, googleDefaultLng, geoPosition]);

	return (
		<div className="map__view">
			<LocationContainer>
				{width > 768 && (
					<Link to={'/location'}>
						<img src={ArrowBack} alt="icon back" className="map__view__img" />
					</Link>
				)}
				<div className="map__view__head">
					<Head
						title="¿DÓNDE ESTAS?"
						subtitle="Buscarémos las ubicaciones más cercanas según tu ubicación."
						contentFontColor={contentFontColor}
						titleFontColor={titleFontColor}
						paddingLeft="0"
						paddingRight="0"
						paddingTop="10px"
						fontWeight={400}
					/>
					<Search
						buttonColor={buttonColor}
						icon={View}
						paddingLeft="0"
						paddingRight="0"
						placeholder={actualUserAddress}
						handleOnclick={handleSetUserLocation}
						handleClickInput={(e) => {
							e.preventDefault();
							navigate('/location', { state: { autoFocus: true } });
						}}
					/>
				</div>
			</LocationContainer>
			{!loading ? (
				<Map
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					handleDragEnd={handleDragEnd}
					handleApiLoaded={handleApiLoaded}
					geoPosition={geoPos}
					googleApiKey={googleApiKey}
					defaultPosition={{
						lat: parseFloat(googleDefaultLat),
						lng: parseFloat(googleDefaultLng),
					}}
				/>
			) : (
				<ComponentSpinner />
			)}
		</div>
	);
};

export default MapView;
