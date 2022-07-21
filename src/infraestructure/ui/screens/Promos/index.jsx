import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as _ from 'lodash';

import { usePromosComponents } from './components/index';
import { useComponents } from '../../components';

import useActions from '../../redux/actions/index';
import useDataLayers from '../../hooks/useDatalayers/index';

import { View, IconLocation } from '../../utils/GetLocalIcons/index';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useGoogleMapsApi } from '../../hooks/useGmapsApi';
import { useLocationPermission } from '../../hooks/General';

const Promos = () => {
	const [showAlert, setShowAlert] = useLocationPermission(false);
	const { NumberResults, CardPromo, ListCardPromo, NextPageBtn, EmplyPromosResponse } =
		usePromosComponents();

	const { Head, Search, Alert, ComponentSpinner, Metas } = useComponents();

	const { dispatch, promoActions, locationActions } = useActions();
	const { nextPageAction, getPromosAction, resetPromosAction } = promoActions();
	const { setUserLocationAction, getZoneAction, getZonesAction } = locationActions();

	const { uiConfiguration } = useSelector((store) => store.uiConfigReducer);
	const { address, geoPosition } = useSelector((store) => store.userLocationReducer);
	const { zone, zones } = useSelector((store) => store.zonesReducer);
	const { loading, total, promos, perPage } = useSelector((store) => store.promosReducer);
	const { page } = useSelector((store) => store.nextPagePromoReducer);
	const { options } = useSelector((store) => store.googleMapsOptionsReducer);

	const { buttonColor, contentFontColor, titleFontColor } = uiConfiguration;
	const { googleApiKey } = options;

	const { gtmPromoCard, gtmShowLocation } = useDataLayers();

	const navigate = useNavigate();

	const { getPossibleAddress } = useGeolocation();

	const { state, pathname } = useLocation();

	useGoogleMapsApi({
		library: 'places',
		onLoad: () => {
			getPossibleAddress(geoPosition.lat, geoPosition.lng).then((result) => {
				dispatch(setUserLocationAction({ address: result[0].formatted_address }));
			});
		},
	});

	useEffect(() => {
		dispatch(getZoneAction({ slug: pathname.split('/').at(-1), id: state?.zone_id }));

		if (!zones.length) {
			dispatch(getZonesAction());
		}
	}, [zone?.id, pathname]);

	useEffect(() => {
		if (state?.zone_id) {
			// When comes from zones
			dispatch(getPromosAction(page, state));
		} else {
			// Otherwise by geo position
			dispatch(getPromosAction(page, geoPosition));
		}
	}, [page, state, geoPosition]);

	// Handle events
	const handleToLocation = () => {
		gtmShowLocation();
		if (googleApiKey && googleApiKey.length) {
			navigate('/location', { state: { autoFocus: true } });
			dispatch(resetPromosAction());
		} else {
			navigate('/location', { state: { autoFocus: true } });
			dispatch(resetPromosAction());
		}
	};

	const acceptedMetas = [
		'title_seo',
		'meta_description',
		'og_title',
		'og_metadescription',
		'og_image',
		'og_url',
		'og_type',
		'twitter_card',
		'twitter_title',
		'twitter_description',
		'twitter_image',
	];

	return (
		<>
			{zone && !!Object.keys(zone).length && <Metas metas={_.pick(zone, acceptedMetas)} />}

			<Head
				contentFontColor={contentFontColor}
				titleFontColor={titleFontColor}
				title="CUPONES DISPONIBLES"
				subtitle="Selecciona la promoción que deseas redimir."
			/>
			<Search
				buttonColor={buttonColor}
				icon={View}
				justifyContent="flex-start"
				placeholder={zone?.name_approved || address || 'Ubicación actual'}
				handleClickInput={handleToLocation}
				handleOnclick={handleToLocation}
			/>
			<NumberResults result={total ? total : 'Sin'} contentFontColor={contentFontColor} />
			{!loading ? (
				<>
					<ListCardPromo>
						{promos.map((promo) => (
							<CardPromo
								key={promo.id}
								buttonColor={buttonColor}
								contentFontColor={contentFontColor}
								titleFontColor={titleFontColor}
								data={promo}
								handleClick={() => {
									gtmPromoCard(promo.destination_url);
								}}
							/>
						))}
					</ListCardPromo>
					{promos.length === 0 && <EmplyPromosResponse />}
				</>
			) : (
				<ComponentSpinner />
			)}

			<NextPageBtn
				handleClick={() => {
					dispatch(nextPageAction());
				}}
				contentFontColor={contentFontColor}
				flag={page * perPage <= promos.length}
			/>

			{showAlert && (
				<Alert
					fixed
					icon={IconLocation}
					text="En este dispositivo no tenemos permisos de GPS para validar tu ubicación. Actívalos desde configuración del navegador"
					onClosed={() => {
						setShowAlert(false);
						localStorage.setItem('showAlert', new Date());
					}}
				/>
			)}
		</>
	);
};

export default Promos;
