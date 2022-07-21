import './style.css';

const IntructionInput = ({ paddingLeft, paddingRight }) => {
  return (
    <div className="intruction" style={{ paddingLeft, paddingRight }}>
      <p className="intruction__title">Instrucciones</p>
      <p className="intruction__subtitle">Ingresa una palabra que describa tu ubicación.</p>
    </div>
  );
};

export default IntructionInput;
