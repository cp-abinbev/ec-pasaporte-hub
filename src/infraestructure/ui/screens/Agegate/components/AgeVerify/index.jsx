import { useState } from 'react';
import OtpInput from 'react-otp-input';

import './style.css';

export const useAgeVerify = ({ onChange, containerStyle }) => {
  const [value, setValue] = useState();

  const handleChange = (newValue) => {
    typeof onChange === 'function' && onChange(newValue);
    typeof setValue === 'function' && setValue(newValue);

    const inputs = document.querySelectorAll(`.${containerStyle} > *`);

    inputs.forEach((input, index) => {
      if (index < newValue.length) {
        input.classList.add('active');
      } else {
        input.classList.remove('active');
      }
    });
  };

  return {
    handleChange,
    value,
  };
};

const AgeVerify = ({
  codeLength,
  placeholder,
  onChange,
  className,
  containerStyle,
  inputStyle,
}) => {
  const { handleChange, value } = useAgeVerify({ onChange, codeLength, containerStyle });
  return (
    <OtpInput
      value={value}
      numInputs={codeLength}
      inputStyle={inputStyle}
      placeholder={placeholder}
      onChange={handleChange}
      containerStyle={containerStyle}
      isInputNum
      className={className}
    />
  );
};

export default AgeVerify;
