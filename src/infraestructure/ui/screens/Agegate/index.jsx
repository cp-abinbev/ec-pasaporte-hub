import { useSelector } from 'react-redux';
import * as _ from 'lodash';

import { useAgeGateComponents } from './components';
import { useComponents } from '../../components';

const AgeGate = () => {
	const { ageGate } = useSelector((store) => store.ageGateReducer);
	const { key } = ageGate;
	const { uiConfiguration } = useSelector((store) => store.uiConfigReducer);
	const { metaTags } = useSelector((store) => store.getMetaTagsReducer);
	const { buttonColor, contentFontColor, titleFontColor, url_logo_header, bgColor } =
		uiConfiguration;

	const { AgeGateYesNot, AgeGateYear, AgeGateYearMonthDate, AgeGateContainer } =
		useAgeGateComponents();

	const { LayoutContainer, Metas } = useComponents();

	const selectAgeGate = (flag) => {
		if (flag === 'yesno') {
			return (
				<AgeGateYesNot
					buttonColor={buttonColor}
					titleFontColor={titleFontColor}
					contentFontColor={contentFontColor}
				/>
			);
		}
		if (flag === 'year') {
			return (
				<AgeGateYear
					buttonColor={buttonColor}
					titleFontColor={titleFontColor}
					contentFontColor={contentFontColor}
				/>
			);
		}
		if (flag === 'dateofbirth') {
			return (
				<AgeGateYearMonthDate
					buttonColor={buttonColor}
					titleFontColor={titleFontColor}
					contentFontColor={contentFontColor}
				/>
			);
		}
		return (
			<AgeGateYesNot
				buttonColor={buttonColor}
				titleFontColor={titleFontColor}
				contentFontColor={contentFontColor}
			/>
		);
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
		<LayoutContainer img={url_logo_header} bgColor={bgColor}>
			{!!Object.keys(metaTags).length && <Metas metas={_.pick(metaTags, acceptedMetas)} />}

			<AgeGateContainer
				img={url_logo_header}
				titleFontColor={titleFontColor}
				contentFontColor={contentFontColor}
			>
				{key !== undefined && selectAgeGate(key)}
			</AgeGateContainer>
		</LayoutContainer>
	);
};

export default AgeGate;
