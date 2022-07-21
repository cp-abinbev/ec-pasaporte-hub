import './style.css';

const Head = ({
	contentFontColor,
	titleFontColor,
	title,
	subtitle,
	paddingLeft,
	paddingRight,
	paddingTop,
	fontWeight,
}) => {
	return (
		<div className="head" style={{ paddingLeft, paddingRight, paddingTop }}>
			<h1 className="head__title" style={{ color: titleFontColor ? titleFontColor : '#303969' }}>
				{title}
			</h1>
			<p
				className="head__description"
				style={{ [contentFontColor && 'color']: contentFontColor, fontWeight: `${fontWeight}` }}
			>
				{subtitle}
			</p>
		</div>
	);
};

export default Head;
