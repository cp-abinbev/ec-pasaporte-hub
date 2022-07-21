import { lazy } from 'react';
import { useSelector } from 'react-redux';

const Footer = lazy(() => import('../Footer/index'));
const Header = lazy(() => import('../Header/index'));

const Layout = ({ children }) => {
  const { uiConfiguration } = useSelector((store) => store.uiConfigReducer);
  const { titleFontColor, bgColor, url_logo_header } = uiConfiguration;

  return (
    <>
      <Header bgColor={bgColor} img={url_logo_header} />
      <div className='main-container' style={{ flex: '1 1 auto' }}>{children}</div>
      <Footer bgColor={bgColor} titleFontColor={titleFontColor} />
    </>
  );
};

export default Layout;
