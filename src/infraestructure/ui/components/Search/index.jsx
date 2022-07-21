import { useRef } from 'react';
import './style.css';

const Search = ({
	buttonColor,
	icon,
	paddingLeft,
	paddingRight,
	justifyContent,
	placeholder,
	value,
	handleOnchange,
	disabled,
	handleOnclick,
	handleClickInput,
	inputRef,
	...restProps
}) => {
	const _inputRef = useRef(null);
	inputRef = _inputRef.current;

	const handleClick = (e) => {
		if (typeof handleOnclick === 'function') {
			handleOnclick(e);
		}
	};

	return (
		<div className="search" style={{ paddingLeft, paddingRight, justifyContent }}>
			<div className="search__input">
				<input
					className="search__input__input"
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleOnchange}
					disabled={disabled}
					ref={_inputRef}
					onClick={handleClickInput}
					{...restProps}
				/>
				<div
					onClick={handleClick}
					className="search__input__logo"
					style={{ backgroundColor: buttonColor ? buttonColor : '#FFEB23' }}
				>
					<img src={icon} alt="icon" className="logo" />
				</div>
			</div>
		</div>
	);
};

export default Search;
