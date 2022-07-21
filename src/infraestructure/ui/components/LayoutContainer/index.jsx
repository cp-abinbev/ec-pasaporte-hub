import './style.css';

const LayoutContainer = ({ img, bgColor, children, paddingTop }) => {
  return (
    <section className={`layoutcontainer ${paddingTop ? 'layoutcontainer__phone' : ''}`}>
      <div
        className="layoutcontainer__desk"
        style={{ backgroundColor: bgColor ? bgColor : '#FFEB23' }}
      >
        <img src={img} alt="logo" className="logo" />
      </div>
      <div className="layoutcontainer__mobile">{children}</div>
    </section>
  );
};

export default LayoutContainer;
