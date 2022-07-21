import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import useActions from '../../redux/actions';

const Metas = ({ metas, children, ...props }) => {
	const { dispatch, locationActions } = useActions();
	const { clearZoneAction } = locationActions();

	useEffect(() => {
		return () => dispatch(clearZoneAction())
	},[])

	return (
		<Helmet defaultTitle="Promo Hub" titleTemplate="%s | Promo B" {...props}>
			{metas.title_seo && <title>{metas.title_seo.replace(/\s+\|?\s*Promo\s+B$/i, '')}</title>}

			{metas.meta_description && <meta name="description" content={metas.meta_description} />}

			{/* OpenGraph */}
			{metas.og_title && <meta property="og:title" content={metas.og_title} />}
			{metas.og_metadescription && <meta property="og:description" content={metas.og_metadescription} />}
			{metas['og_image'] && <meta property="og:image" content={metas['og_image']} />}
			<meta property="og:url" data-react-helmet="true" content={metas.og_url || window.location.href} />
			{metas.og_type && <meta property="og:type" content={metas.og_type} />}

			{/* Twitter */}
			{metas['twitter_card'] && <meta name="twitter:card" content={metas['twitter_card']} />}
			{metas['twitter_title'] && <meta name="twitter:title" content={metas['twitter_title']} />}
			{metas['twitter_description'] && <meta name="twitter:description" content={metas['twitter_description']} />}
			{metas['twitter_image'] && <meta name="twitter:image" content={metas['twitter_image']} />}
			{metas.twitter_site && <meta name="twitter:site" content={metas.twitter_site}></meta>}

			{/* Canonical */}
			<link rel="canonical" href={window.location.href} />

			{children}
		</Helmet>
	);
}

Metas.defaultProps = {
	twitter_site: '@promohub',
};

Metas.propTypes = {
	metas: PropTypes.exact({
		title_seo: PropTypes.string,
		og_title: PropTypes.string,
		og_metadescription: PropTypes.string,
		og_image: PropTypes.string,
		twitter_card: PropTypes.string,
		twitter_title: PropTypes.string,
		twitter_description: PropTypes.string,
		twitter_image: PropTypes.string,
		meta_description: PropTypes.string,
		og_url: PropTypes.string,
		og_type: PropTypes.string,
		twitter_site: PropTypes.string,
	}),
};

export default Metas;
