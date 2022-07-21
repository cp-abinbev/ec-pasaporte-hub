import { lazy } from 'react';

const Promos = lazy(() => import('./Promos/index'));
const Agegate = lazy(() => import('./Agegate/index'));
const Location = lazy(() => import('./Location/index'));

export const useScreens = () => {
  return {
    Promos,
    Agegate,
    Location,
  };
};
