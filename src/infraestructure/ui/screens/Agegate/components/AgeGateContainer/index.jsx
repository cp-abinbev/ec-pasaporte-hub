import './style.css';

const AgeGateContainer = ({ children, img, titleFontColor, contentFontColor }) => {
  return (
    <div className="agegatecontainer">
      <img src={img} alt="logo" className="logo" />
      <h2 className="question" style={{ color: titleFontColor ? titleFontColor : '#303969' }}>
        ¿Eres mayor <br /> de edad?
      </h2>
      <span className="text" style={{ color: contentFontColor ? contentFontColor : '#000000' }}>
        Para acceder a nuestros beneficios <br /> debes ser mayor de edad
      </span>
      {children}
    </div>
  );
};

export default AgeGateContainer;
