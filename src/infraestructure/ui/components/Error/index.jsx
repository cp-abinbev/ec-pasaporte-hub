import { useSelector } from 'react-redux';

import useDataLayers from '../../hooks/useDatalayers/index';

import './style.css';

const ErrorPage = () => {
	const { uiConfiguration } = useSelector((store) => store.uiConfigReducer);
	const { url_logo_header, bgColor, titleFontColor, contentFontColor, buttonColor } =
		uiConfiguration;

	const { gtmError404 } = useDataLayers();

	return (
		<div className="error">
			<div className="error__left" style={{ backgroundColor: bgColor ? bgColor : '#FFEB23' }}>
				<img src={url_logo_header} alt="logo__error" className="error__left__logo" />
			</div>
			<div className="error__errorboundary">
				<h1
					className="error__errorboundary__error"
					style={{
						color: titleFontColor ? titleFontColor : '#303969',
					}}
				>
					Error 404
				</h1>
				<p
					className="error__errorboundary__message"
					style={{
						color: contentFontColor ? contentFontColor : '#000000',
					}}
				>
					Ups! Esta página no fue encontrada
				</p>
				<button
					style={{
						backgroundColor: buttonColor ? buttonColor : '#FFEB23',
						color: titleFontColor ? titleFontColor : '#303969',
					}}
					className="error__errorboundary__button"
					onClick={() => {
						gtmError404();
						window.location.replace('/location');
					}}
				>
					volver al home
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
