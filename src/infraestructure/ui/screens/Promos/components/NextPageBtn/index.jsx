import './style.css';

const NextPageBtn = ({ contentFontColor, flag, handleClick }) => {
  return (
    <>
      {flag ? (
        <div className="nextpagebtn" onClick={handleClick}>
          <p
            className="nextpagebtn__text"
            style={{ color: contentFontColor ? contentFontColor : '#000000' }}
          >
            Cargar más cupones
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NextPageBtn;
