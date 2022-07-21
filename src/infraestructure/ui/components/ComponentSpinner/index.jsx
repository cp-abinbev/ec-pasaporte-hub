import { SpinnerI } from '../../utils/GetLocalIcons/index';

import './style.css';

const ComponentSpinner = () => {
  return (
    <div className="component-spinner">
      <img src={SpinnerI} alt="spinner" />
    </div>
  );
};

export default ComponentSpinner;
