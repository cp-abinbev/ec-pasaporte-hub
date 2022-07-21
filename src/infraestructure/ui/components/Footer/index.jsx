import { useSelector } from 'react-redux';

import {
	FacebookLogo,
	InstagramLogo,
	YouTubeLogo,
	WarningI,
	WarningII,
	WarningIII,
} from '../../utils/GetLocalIcons/index';

import { useComponents } from '../index';

import './style.css';

const Footer = ({ bgColor, titleFontColor }) => {
	const { footerOptionsReducer } = useSelector((store) => store);
	const { footerOptions } = footerOptionsReducer;

	const { ZonesAnchors } = useComponents();

	return (
		<footer className="footer" style={{ backgroundColor: bgColor ? bgColor : '#FFEB23' }}>
			<nav className="footer__nav">
				<div className="footer__nav__wrapper">
					{footerOptions.length > 0 && (
						<>
							<ul className="footer__nav__list">
								{footerOptions
									.filter((link) => link.type === 'footer-link')
									.map((link) => (
										<li className="item" key={link.id}>
											<a href={link?.pdf} target="_blank" rel="noreferrer">
												<span
													className="item__option"
													style={{ color: titleFontColor ? titleFontColor : '#303969' }}
												>
													{link.title}
												</span>
											</a>
										</li>
									))}
							</ul>

							<section className="footer__nav__network">
								<p className="title" style={{ color: titleFontColor ? titleFontColor : '#303969' }}>
									Síguenos en
								</p>
								<ul className="list">
									{footerOptions
										.filter((link) => link.type === 'footer-social')
										.map((link) => (
											<li className="list__item" key={link.id}>
												{link.key === 'url-facebook' && (
													<a href={link.data} target="_blank" rel="noreferrer">
														<img src={FacebookLogo} alt="facebook" className="list__item__img" />
													</a>
												)}
												{link.key === 'url-youtube' && (
													<a href={link.data} target="_blank" rel="noreferrer">
														<img src={YouTubeLogo} alt="youtube" className="list__item__img" />
													</a>
												)}
												{link.key === 'url-instagram' && (
													<a href={link.data} target="_blank" rel="noreferrer">
														<img src={InstagramLogo} alt="instagram" className="list__item__img" />
													</a>
												)}
											</li>
										))}
								</ul>
							</section>
						</>
					)}
				</div>

				<section className="footer__nav__warning">
					<div className="wrapper">
						<p
							className="wrapper__subtitle"
							style={{ color: titleFontColor ? titleFontColor : '#303969' }}
						>
							No compartas este contenido con menores de edad.
						</p>
						<p
							className="wrapper__subtitle"
							style={{ color: titleFontColor ? titleFontColor : '#303969' }}
						>
							{' '}
							Tomar bebidas alcohólicas en exceso es dañino.
						</p>
					</div>
					<ul className="list">
						<li className="list__item">
							<img src={WarningII} alt="" className="list__item__img" />
						</li>
						<li className="list__item">
							<img src={WarningIII} alt="" className="list__item__img" />
						</li>
						<li className="list__item">
							<img src={WarningI} alt="" className="list__item__img" />
						</li>
					</ul>
				</section>
			</nav>
			<section
				className="footer__nav__bottom"
				style={{ backgroundColor: titleFontColor ? titleFontColor : '#303969' }}
			>
				<a href="https://www.ab-inbev.com/" target="_blank" rel="noreferrer">
					{' '}
					ANHEUSER-BUSCH INBEV ©2022
				</a>
				<ZonesAnchors />
			</section>
		</footer>
	);
};

export default Footer;
