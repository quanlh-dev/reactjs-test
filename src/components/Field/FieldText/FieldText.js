import React, { useEffect, useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiText } from 'react-icons/bi';

import './FieldText.scss';
import { Tooltip } from 'antd';
import { calculateTextSize } from 'utils';

const FieldText = React.memo(
  ({
    value = '',
    defaultField = {
      fieldType: 'Text',
      isFieldSystem: false,
      _id: '612e5e6e5d737736062370d2',
      fieldKey: 'text_1',
      fieldName: 'T/đề T1',
    },
    onSubmit = function (value) {},
    width = '100%',
    className = '',
  }) => {
    const [valueText, setValueText] = useState(value);

    useEffect(() => {
      setValueText(value ?? '');
      return () => {};
    }, [value]);
    return (
      <div
        className={`__field-text-container ${className}`}
        style={{ width: width }}
      >
        <Tooltip title={''}>
          <div className="__field-text-wrapper">
            <input
              className="text-too-long"
              value={valueText}
              onChange={(e) => {
                setValueText(e.target.value);
              }}
              onBlur={() => {
                if (
                  valueText !== '' &&
                  valueText !== null &&
                  valueText !== value
                )
                  onSubmit(valueText);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                  if (
                    valueText !== '' &&
                    valueText !== null &&
                    valueText !== value
                  )
                    onSubmit(valueText);
                }
              }}
            />
            {(valueText === '' ||
              valueText === null ||
              valueText === undefined) && (
              <div className="__field-text-icon">
                <span>
                  <FontAwesomeIcon icon={faPlusCircle} color />
                </span>

                <BiText />
              </div>
            )}
          </div>
        </Tooltip>
      </div>
    );
  },
);

export default FieldText;
