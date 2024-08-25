import React, { useEffect, useMemo, useState } from 'react';
import 'components/Input/InputBlock/InputBlock.scss';
import { Tooltip } from 'antd';
import { calculateTextSize } from 'utils';

const InputBlock = React.memo(
  ({
    value = 'New Item',
    type = 'title',
    autoFocus = true,
    onSubmit = function (value) {},
    isTooltip = false,
    placeholder,
  }) => {
    const [valueInput, setValueInput] = useState(value);
    useEffect(() => {
      setValueInput(value);
      return () => {};
    }, [value]);

    const styleInput = useMemo(() => {
      switch (type) {
        case 'title':
          return {
            fontSize: '25px',
            fontWeight: 'bold',
            width: '100%',
          };
        case 'title-header':
          return {
            fontSize: '24px',
            fontWeight: 'bold',
            maxWidth: '500px',
          };
        default:
          return {
            width: '100%',
          };
      }
    }, []);

    return (
      <div className="input-block-container">
        <Tooltip title={isTooltip ? valueInput : ''}>
          <input
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
            autoFocus={autoFocus}
            className="input-block text-too-long"
            style={{
              ...styleInput,
              width:
                type === 'title-header'
                  ? `${calculateTextSize(valueInput, styleInput).width + 10}px`
                  : '100%',
            }}
            value={valueInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            onBlur={(e) => {
              if (value !== valueInput) {
                onSubmit(valueInput);
              }
            }}
            placeholder={placeholder}
          />
        </Tooltip>
      </div>
    );
  },
);

export default InputBlock;
