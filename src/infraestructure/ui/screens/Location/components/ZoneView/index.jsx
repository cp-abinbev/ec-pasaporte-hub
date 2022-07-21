import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { useLocationComponents } from '../index';
import { useComponents } from '../../../../components';

import { Lupa, LocationWhite } from '../../../../utils/GetLocalIcons';
import useDataLayers from '../../../../hooks/useDatalayers';

import useActions from '../../../../redux/actions';

const ZoneView = ({ contentFontColor, titleFontColor, buttonColor }) => {
	const { LocationContainer } = useLocationComponents();
	const { Head, Search, Browse, ComponentSpinner, Typography } = useComponents();

	const { locationActions, dispatch } = useActions();
	const { getZonesAction, setUserLocationAction } = locationActions();

	const { loading, zones } = useSelector((store) => store.zonesReducer);
	// const { address } = useSelector((store) => store.userLocationReducer);
	const [match, setMatch] = useState('');
	const { state } = useLocation();

	const { gtmSelectOptions, gtmSearchAddress } = useDataLayers();

	useEffect(() => {
		dispatch(getZonesAction());
	}, []);

	const handleSearch = (e) => {
		const target = e.target;
		setMatch(target.value);
	};

	const patt = new RegExp(match.trim(), 'gi');
	const resultsFiltered = zones.filter(({ name, name_approved }) => {
		return name.search(patt) !== -1 || name_approved.search(patt) !== -1;
	});

	const buildPath = (text) => `zone-${text.toLowerCase().trim().replaceAll(' ', '-')}`;

	return (
		<LocationContainer>
			<Head
				title="PROMOS EN TU ZONA"
				subtitle="Selecciona una de las siguientes zonas."
				contentFontColor={contentFontColor}
				titleFontColor={titleFontColor}
				paddingLeft="0"
				paddingRight="0"
				paddingTop="10px"
			/>
			<Search
				buttonColor={buttonColor}
				icon={Lupa}
				paddingLeft="0"
				paddingRight="0"
				placeholder="Buscar zona"
				handleOnchange={handleSearch}
				value={match}
				autoFocus={!!state?.autoFocus}
				handleOnclick={(e) => {
					gtmSearchAddress();
				}}
			/>
			{!resultsFiltered.length && match.trim().length > 3 && (
				<Typography text="No hemos encontrado tu zona, intenta de nuevo." color="#FF4600" />
			)}
			{!loading ? (
				<Browse>
					{resultsFiltered.map((zone) => (
						<li
							key={zone.id}
							onClick={() => {
								gtmSelectOptions();
								dispatch(setUserLocationAction({ address: `${zone.name_approved}` }));
							}}
						>
							<Link to={`/promos/${zone.slug || buildPath(zone.name)}`} state={{ ...zone, zone_id: zone.id }}>
								<img src={LocationWhite} alt="location icon" className="browse-icon" />
								<p>{zone.name_approved}</p>
							</Link>
						</li>
					))}
				</Browse>
			) : (
				<ComponentSpinner />
			)}
		</LocationContainer>
	);
};

export default ZoneView;
