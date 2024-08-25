import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './style.scss';

export default function FieldCheckbox(props) {
  const {
    value = false,
    onSubmit = (newValue) => console.log(newValue),
    className = '',
  } = props;
  const [isChecked, setIsChecked] = useState(value || false);

  useEffect(() => {
    if (value && (value === false || value === true)) {
      setIsChecked(value || false);
    }
  }, [value]);

  const handleClick = () => {
    onSubmit(!isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div
      className={`field-checkbox ${className}`}
      onClick={() => handleClick()}
      role="button"
      tabIndex={0}
    >
      {isChecked && (
        <FontAwesomeIcon icon={faCheck} className="field-checkbox__icon" />
      )}
    </div>
  );
}
