import './style.css';

const NumberResults = ({ result, contentFontColor }) => {
  return (
    <div className="result">
      <p
        className="result__title"
        style={{ color: contentFontColor ? contentFontColor : '#000000' }}
      >
        {result} Resultados
      </p>
    </div>
  );
};

export default NumberResults;
