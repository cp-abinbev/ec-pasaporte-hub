import zones from '../../utils/Zones';

import './style.css';

const ZonesAnchors = () => {
	return (
		<>
			{zones.map((item) => (
				<a key={`${item.id} links-promos`} className="anchors" href={`/promos/${item.path}`}>
					{item.path}
				</a>
			))}
		</>
	);
};

export default ZonesAnchors;
