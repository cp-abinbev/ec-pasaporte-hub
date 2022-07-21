import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAgeGateComponents } from '../index';
import useActions from '../../../../redux/actions/index';

import useDataLayers from '../../../../hooks/useDatalayers/index';

import { getCurrentGeoLocation } from '../../../../utils/General';

import './style.css';

const AgeGateYesNot = ({ buttonColor, titleFontColor, contentFontColor }) => {
	const { CheckInfo } = useAgeGateComponents();
	const navigate = useNavigate();

	const { isChecked } = useSelector((store) => store.checkBoxAgeGateReducer);

	const { globalActions, locationActions, dispatch } = useActions();
	const { isOlderAction, isCheckedAction } = globalActions();
	const { setUserLocationAction } = locationActions();
	const { gtmAgeGateNot, gtmAgeGateYes } = useDataLayers();

	const handleClick = () => {
		gtmAgeGateYes();
		getCurrentGeoLocation((geoPosition, geoAccepted) => {
			dispatch(isOlderAction());
			if (geoAccepted) {
				navigate('/promos');
				dispatch(setUserLocationAction({ geoPosition }));
			} else {
				navigate('/location');
			}
		});
	};

	return (
		<div className="formyesnot">
			<div className="formyesnot__buttons">
				<button
					className="formyesnot__buttons__button"
					onClick={handleClick}
					style={{
						backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						color: titleFontColor ? titleFontColor : '#303969',
					}}
				>
					SI
				</button>
				<button
					className="formyesnot__buttons__button"
					onClick={() => {
						window.location.replace('https://www.tapintoyourbeer.com/');
						gtmAgeGateNot();
					}}
					style={{
						backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						color: titleFontColor ? titleFontColor : '#303969',
					}}
				>
					NO
				</button>
			</div>
			<CheckInfo
				contentFontColor={contentFontColor}
				check={isChecked}
				handleClickTyC={() => dispatch(isCheckedAction())}
			/>
		</div>
	);
};

export default AgeGateYesNot;
