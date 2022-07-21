import { SpinnerI } from '../../utils/GetLocalIcons/index';

import './style.css';

const DefaultLoading = () => {
  return (
    <div className="loading">
      <div className="loading__containertitle">
        <p className="loading__containertitle__title">PROMO B</p>
      </div>
      <p className="loading__subtitle">
        No te despegues. Estamos <br />
        cargando tus promos
      </p>
      <img src={SpinnerI} alt="spinner" className="loading__spinner" />
    </div>
  );
};

export default DefaultLoading;
