import { Check, NotCheck } from '../../../../utils/GetLocalIcons/index';

import './style.css';

const CheckInfo = ({ contentFontColor, check, handleClickTyC }) => {
	return (
		<div className="check">
			{check ? (
				<img src={Check} onClick={handleClickTyC} alt="no-check" className="check__checkbox" />
			) : (
				<img src={NotCheck} onClick={handleClickTyC} alt="no-check" className="check__checkbox" />
			)}
			<label
				className="check__label"
				style={{ color: contentFontColor ? contentFontColor : '#000000' }}
				onClick={handleClickTyC}
			>
				Recordar mis datos. No actives esta opción si compartes tu dispositivo.
			</label>
		</div>
	);
};

export default CheckInfo;
