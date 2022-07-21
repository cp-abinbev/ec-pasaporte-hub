import { useLocation, Link } from 'react-router-dom';

import { ArrowBack } from '../../utils/GetLocalIcons/index';

import { useScreenSize } from '../../hooks/useScreenSize/useScreenSize';

import './style.css';

const Header = ({ img, bgColor }) => {
  const { pathname } = useLocation();
  const { width } = useScreenSize();

  return (
    <>
      {pathname === '/' ? (
        <div></div>
      ) : (
        <>
          {pathname === '/location/map' ? (
            <>
              {width < 768 && (
                <header
                  className="header"
                  style={{ backgroundColor: bgColor ? bgColor : '#FFEB23' }}
                >
                  <Link to={'/location'}>
                    <img src={ArrowBack} alt="Icon Back" className="header__back" />
                  </Link>
                </header>
              )}
            </>
          ) : (
            <header className="header" style={{ backgroundColor: bgColor ? bgColor : '#FFEB23' }}>
              <img src={img} alt="Logo Promo B" className="header__logo" />
            </header>
          )}
        </>
      )}
    </>
  );
};

export default Header;
