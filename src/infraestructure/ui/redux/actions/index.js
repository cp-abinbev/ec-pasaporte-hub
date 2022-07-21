import { useDispatch } from 'react-redux';

import globalActions from './Global/index';
import promoActions from './Promos/index';
import locationActions from './Location/index';

const useActions = () => {
  const dispatch = useDispatch();

  return {
    dispatch,
    globalActions,
    promoActions,
    locationActions,
  };
};

export default useActions;
