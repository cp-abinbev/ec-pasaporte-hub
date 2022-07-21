import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAgeGateComponents } from '../index';
import useActions from '../../../../redux/actions/index';

import useDataLayers from '../../../../hooks/useDatalayers/index';
import { getCurrentGeoLocation } from '../../../../utils/General';

import './style.css';

const AgeGateYear = ({ buttonColor, titleFontColor, contentFontColor }) => {
	const navigate = useNavigate();
	const [year, setYear] = useState('');
	const [showYear, setShoYear] = useState(true);
	const [month, setMonth] = useState('');
	const [showMonth, setShowMonth] = useState(false);
	const [date, setDate] = useState('');
	const [showDate, setShowDate] = useState(false);

	const { isChecked } = useSelector((store) => store.checkBoxAgeGateReducer);

	const { CheckInfo, AgeVerify } = useAgeGateComponents();

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	const currentDate = new Date().getDate();

	const { globalActions, dispatch } = useActions();
	const { isOlderAction, isCheckedAction } = globalActions();

	const { gtmAgeGateYear } = useDataLayers();

	const handleYearClick = () => {
		if (currentYear - 18 === parseInt(year) && year.length === 4) {
			setShoYear(false);
			setShowMonth(true);
		}
		if (currentYear - 18 < parseInt(year) && year.length === 4) {
			gtmAgeGateYear('No');
			window.location.replace('https://www.tapintoyourbeer.com/');
		}
		if (currentYear - 18 > parseInt(year) && year.length === 4) {
			gtmAgeGateYear('Yes');
			dispatch(isOlderAction());
			getCurrentGeoLocation((geoPosition, geoAccepted) => {
				if (geoAccepted) {
					navigate('/promos', { state: { geoPosition } });
				} else {
					navigate('/location');
				}
			});
		}
	};

	const handleMonthClick = () => {
		if (currentMonth === parseInt(month) && month.length === 2) {
			setShowMonth(false);
			setShowDate(true);
		}
		if (currentMonth < parseInt(month) && month.length === 2) {
			gtmAgeGateYear('No');
			window.location.replace('https://www.tapintoyourbeer.com/');
		}
		if (currentMonth > parseInt(month) && month.length === 2) {
			gtmAgeGateYear('Yes');
			dispatch(isOlderAction());
			getCurrentGeoLocation((geoPosition, geoAccepted) => {
				if (geoAccepted) {
					navigate('/promos', { state: { geoPosition } });
				} else {
					navigate('/location');
				}
			});
		}
	};

	const handleDateClick = () => {
		if (currentDate === parseInt(date) && date.length === 2) {
			dispatch(isOlderAction());
			gtmAgeGateYear('Yes');
			getCurrentGeoLocation((geoPosition, geoAccepted) => {
				if (geoAccepted) {
					navigate('/promos', { state: { geoPosition } });
				} else {
					navigate('/location');
				}
			});
		}
		if (currentDate < parseInt(date) && date.length === 2) {
			gtmAgeGateYear('No');
			window.location.replace('https://www.tapintoyourbeer.com/');
		}
		if (currentDate > parseInt(date) && date.length === 2) {
			dispatch(isOlderAction());
			gtmAgeGateYear('Yes');
			getCurrentGeoLocation((geoPosition, geoAccepted) => {
				if (geoAccepted) {
					navigate('/promos', { state: { geoPosition } });
				} else {
					navigate('/location');
				}
			});
		}
	};

	return (
		<div className="formyear">
			{showYear && (
				<>
					<div className="formyear__year">
						<AgeVerify
							codeLength={4}
							onChange={setYear}
							placeholder="AAAA"
							containerStyle="contentInputsYear"
							inputStyle="input-age"
						/>
					</div>
					<div
						className="formyear__button"
						style={{
							opacity: year.length === 4 ? 1 : 0.4,
							backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						}}
						onClick={handleYearClick}
					>
						<button
							className="formyear__button__button"
							style={{ color: titleFontColor ? titleFontColor : '#303969' }}
						>
							CONTINUAR
						</button>
					</div>
				</>
			)}
			{showMonth && (
				<>
					<div className="formyear__year">
						<AgeVerify
							codeLength={2}
							onChange={setMonth}
							placeholder="MM"
							containerStyle="contentInputsMont"
							inputStyle="input-age"
						/>
					</div>
					<div
						className="formyear__button"
						style={{
							opacity: month > 0 && month <= 12 && month.length === 2 ? 1 : 0.4,
							backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						}}
						onClick={handleMonthClick}
					>
						<button
							className="formyear__button__button "
							style={{ color: titleFontColor ? titleFontColor : '#303969' }}
						>
							CONTINUAR
						</button>
					</div>
				</>
			)}
			{showDate && (
				<>
					<div className="formyear__year">
						<AgeVerify
							codeLength={2}
							onChange={setDate}
							placeholder="DD"
							containerStyle="contentInputsDay"
							inputStyle="input-age"
						/>
					</div>
					<div
						className="formyear__button"
						style={{
							opacity: date > 0 && date <= 31 && date.length === 2 ? 1 : 0.4,
							backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						}}
						onClick={handleDateClick}
					>
						<button
							className="formyear__button__button "
							style={{ color: titleFontColor ? titleFontColor : '#303969' }}
						>
							CONTINUAR
						</button>
					</div>
				</>
			)}
			<CheckInfo
				contentFontColor={contentFontColor}
				check={isChecked}
				handleClickTyC={() => dispatch(isCheckedAction())}
			/>
		</div>
	);
};

export default AgeGateYear;
