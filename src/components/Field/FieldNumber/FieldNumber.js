import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import 'components/Field/FieldNumber/FieldNumber.sass';
import { useDispatch } from 'react-redux';

const fieldKey = 'number_1';
function FieldNumber(props) {
  const { value = '', onSubmit = (value) => {}, className = '' } = props;

  // to handle first time show => no focus
  const [hasFocus, setHasFocus] = useState(false);
  const [isShowInput, setIsShowInput] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  const [hideOverlay, setHideOverlay] = useState(false);
  const inputRef = useRef(null);

  // Control state of overlay
  const showOverlay = () => {
    if (isShowInput !== 2 && isShowInput !== 3) {
      setIsShowInput(1);
    }
  };
  const hideOverLay = () => {
    if (isShowInput !== 2 && isShowInput !== 3) {
      setIsShowInput(0);
    }
  };
  const showInput = () => {
    setIsShowInput(2);
    setHasFocus(true);
  };
  const resetInputState = () => {
    if (isShowInput !== 3 && isShowInput !== 2) {
      setIsShowInput(0);
    }
    if (inputValue === '') {
      setIsShowInput(0);
      setHideOverlay(false);
    } else {
      setHideOverlay(true);
    }
    onSubmit(Number(inputValue));
  };

  // Handle value of input
  const handleInputValue = (e) => {
    const newInput = e.target.value;
    if (newInput.match(/^\d+$/) !== null || e.target.value === '') {
      setInputValue(e.target.value);
    }
    if (e.target.value !== '') {
      setIsShowInput(3);
    }
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (inputValue !== '' || inputValue == 0) {
      setIsShowInput(3);
      setHideOverlay(inputValue !== '' || inputValue == 0);
    }
    if (inputValue == 0) {
      setInputValue('');
    }
  }, []);

  useLayoutEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={`field-number ${className}`}
      onMouseOver={showOverlay}
      onMouseLeave={hideOverLay}
      onClick={showInput}
    >
      {isShowInput !== 0 && (
        <div className="field-number__overlay">
          <div className="field-number__overlay-background" />
          {isShowInput !== 2 && (
            <div className="field-number__overlay-content">
              <div className="field-number__overlay-add">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
              <div className="field-number__overlay-number">
                <span className="field-number__overlay-first">1</span>
                <span className="field-number__overlay-second">2</span>
                <span className="field-number__overlay-third">3</span>
              </div>
            </div>
          )}
          {(isShowInput === 2 || isShowInput === 3) && (
            <input
              ref={inputRef}
              autoFocus={hasFocus}
              onFocus={() => setHideOverlay(false)}
              className="field-number__overlay-content --input"
              type="text"
              onBlur={resetInputState}
              style={
                hideOverlay
                  ? { border: 'none', backgroundColor: ' #e4e4e4' }
                  : {}
              }
              value={inputValue}
              onChange={handleInputValue}
              onKeyDown={handleEnterKeyDown}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FieldNumber;
