import { useNavigate } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
// import { useSelector } from 'react-redux';

import { useComponents } from '../../../../components';
import useDataLayers from '../../../../hooks/useDatalayers';
import { useGoogleMapsApi } from '../../../../hooks/useGmapsApi';

import { mapStyle } from '../../../../utils/GoogleMapStyle/index';
import { IconLocation, Picker } from '../../../../utils/GetLocalIcons/index';

import './style.css';

const Map = ({
	handleDragEnd,
	handleApiLoaded,
	geoPosition,
	googleApiKey,
	defaultPosition,
	showAlert = false,
	setShowAlert = () => {},
}) => {
	const { PrimaryBtn, Alert } = useComponents();
	const navigate = useNavigate();
	// const { styles_map } = useSelector(({ uiConfigReducer }) => uiConfigReducer.uiConfiguration);

	const { gtmUseMyLocation } = useDataLayers();

	const [loadedGmapsApi] = useGoogleMapsApi({
		library: 'places',
	});

	return (
		<div className="map">
			<div className="map__picker">
				<img src={Picker} alt="picker" />
			</div>
			<div className="map__container">
				{Object.keys(geoPosition).length && googleApiKey?.length && loadedGmapsApi && (
					<GoogleMapReact
						style={{ opacity: '0.6' }}
						draggable
						bootstrapURLKeys={{
							key: googleApiKey,
							libraries: ['places'],
							version: 'weekly',
						}}
						defaultCenter={defaultPosition}
						defaultZoom={15}
						center={{ lat: geoPosition.lat, lng: geoPosition.lng }}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, maps }) => {
							handleApiLoaded(map, maps);
						}}
						onDragEnd={handleDragEnd}
						debounced
						options={() => {
							return {
								gestureHandling: 'greedy',
								styles: mapStyle,
								zoomControl: false,
								fullscreenControl: false,
							};
						}}
					/>
				)}
				<div className="map__button">
					{showAlert && (
						<Alert
							text="En este dispositivo no tenemos permisos de GPS para validar tu ubicación. Actívalos desde configuración del navegador"
							icon={IconLocation}
							onClosed={() => {
								setShowAlert(false);
								localStorage.setItem('showAlert', new Date());
							}}
						/>
					)}
					<PrimaryBtn
						text="Usar mi ubicación"
						condition
						handleClick={() => {
							navigate('promos');
							gtmUseMyLocation();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Map;
