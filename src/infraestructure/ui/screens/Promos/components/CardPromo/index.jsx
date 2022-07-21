import ICONNext from '../../../../assets/icons/icon-next.svg';
import DefaultImage from '../../../../assets/images/default-image.png';

import './style.css';

const CardPromo = ({ buttonColor, handleClick, contentFontColor, titleFontColor, data }) => {
  const regexUrl =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  return (
    <>
      <a
        href={data.destination_url}
        onClick={handleClick}
        target="_blank"
        rel="noreferrer"
        className="card"
      >
        <img
          src={regexUrl.test(data.url_banner) ? data.url_banner : DefaultImage}
          alt={data.name}
          className="card__image"
        />
        <div className="card__info">
          <div className="promocontainer">
            <h2
              className="promocontainer__title"
              style={{ color: titleFontColor ? titleFontColor : '#303969' }}
            >
              {data.name}
            </h2>
            <p
              className="promocontainer__date"
              style={{ color: contentFontColor ? contentFontColor : '#000000' }}
            >
              Vigente hasta:{' '}
              <span className="promocontainer__date__strong">{data.validity_end}</span>
            </p>
          </div>
          <div
            className="promologo"
            style={{ backgroundColor: buttonColor ? buttonColor : '#FFEB23' }}
          >
            <img src={ICONNext} alt="icon" className="promologo__img" />
          </div>
        </div>
      </a>
    </>
  );
};

export default CardPromo;
