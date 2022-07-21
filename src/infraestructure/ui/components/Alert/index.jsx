import { useState } from 'react';

import './style.css';

import { IconCloseWhite } from '../../utils/GetLocalIcons';
import { useScreenSize } from '../../hooks/useScreenSize/useScreenSize';

const Alert = ({ icon = '', text = '', onClosed, setTopSpace = false, fixed = false }) => {
	const [hide, setHide] = useState(false);
	const { width } = useScreenSize();

	// event handlers
	const handleClose = (e) => {
		const alert = e.target.parentNode;
		alert.classList.add('hidden');

		setTimeout(() => {
			setHide(true);
			typeof onClosed === 'function' && onClosed();
		}, 200);
	};

	// contact custom props classes
	let classes = setTopSpace ? ' has-top-spacing' : '';
	classes += fixed && width < 768 ? ' fixed-position' : '';

	return (
		!hide && (
			<div className={`alert${classes}`}>
				{icon && <img className="alert-icon" src={icon} alt="alert icon" />}
				<p>{text}</p>
				<img className="alert-close" src={IconCloseWhite} alt="alert close" onClick={handleClose} />
			</div>
		)
	);
};

export default Alert;
