import './style.css';

const PrimaryBtn = ({ handleClick, titleFontColor, buttonColor, condition, text }) => {
  return (
    <div
      className="primarybtn"
      style={{
        opacity: condition ? 1 : 0.4,
        backgroundColor: buttonColor ? buttonColor : '#FFEB23',
      }}
      onClick={handleClick}
    >
      <button
        className="primarybtn__button "
        style={{ color: titleFontColor ? titleFontColor : '#303969' }}
      >
        {text}
      </button>
    </div>
  );
};

export default PrimaryBtn;
