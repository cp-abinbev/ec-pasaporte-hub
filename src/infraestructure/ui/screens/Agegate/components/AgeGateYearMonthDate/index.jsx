import { useState } from 'react';
import { compareAsc, subYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAgeGateComponents } from '../index';
import useActions from '../../../../redux/actions/index';

import useDataLayers from '../../../../hooks/useDatalayers/index';

import { getCurrentGeoLocation } from '../../../../utils/General';

import './style.css';

const AgeGateYearMonthDate = ({ buttonColor, titleFontColor, contentFontColor }) => {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [date, setDate] = useState('');
	const { CheckInfo, AgeVerify } = useAgeGateComponents();
	const navigate = useNavigate();
	const { isChecked } = useSelector((store) => store.checkBoxAgeGateReducer);

	const { globalActions, dispatch } = useActions();
	const { isOlderAction, isntOlderAction, isCheckedAction } = globalActions();

	const { gtmAgeGateYear } = useDataLayers();

	const flag =
		year.length === 4 &&
		month > 0 &&
		month <= 12 &&
		month.length === 2 &&
		date > 0 &&
		date <= 31 &&
		date.length === 2;

	const handleOpacity = () => (flag ? true : false);

	const handleOnClick = () => {
		if (flag) {
			const birth = new Date(`${month}/${date}/${year}`);
			const result = subYears(new Date(), 18);
			const difference = compareAsc(birth, result);

			if (difference === -1) {
				gtmAgeGateYear('Yes');
				getCurrentGeoLocation((geoPosition, geoAccepted) => {
					dispatch(isOlderAction());
					if (geoAccepted) {
						navigate('/promos', { state: { geoPosition } });
					} else {
						navigate('/location');
					}
				});
			} else {
				gtmAgeGateYear('No');
				dispatch(isntOlderAction());
				window.location.replace('https://www.tapintoyourbeer.com/');
			}
		}
	};
	return (
		<div className="formyearmonthdate">
			<div className="formyearmonthdate__container">
				<AgeVerify
					codeLength={4}
					onChange={setYear}
					placeholder="AAAA"
					containerStyle="contentInputsYear"
					inputStyle="input-year-month-date"
				/>
				<AgeVerify
					codeLength={2}
					onChange={setMonth}
					placeholder="MM"
					containerStyle="contentInputsMont"
					inputStyle="input-year-month-date"
				/>
				<AgeVerify
					codeLength={2}
					onChange={setDate}
					placeholder="DD"
					containerStyle="contentInputsDay"
					inputStyle="input-year-month-date"
				/>
			</div>
			<div
				className="formyearmonthdate__button"
				style={{
					opacity: handleOpacity() ? 1 : 0.4,
					backgroundColor: buttonColor ? buttonColor : '#FFEB23',
				}}
			>
				<button
					className="formyearmonthdate__button__button "
					style={{ color: titleFontColor ? titleFontColor : '#303969' }}
					onClick={handleOnClick}
				>
					CONTINUAR
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

export default AgeGateYearMonthDate;
