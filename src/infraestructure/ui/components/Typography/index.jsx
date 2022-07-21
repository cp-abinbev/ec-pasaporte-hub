import './style.css';

const Typography = ({ text, color, fontWeight }) => {
  return (
    <p className="typography" style={{ color, fontWeight }}>
      {text}
    </p>
  );
};

export default Typography;
