import { DatePicker, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';

export default function FieldDate(props) {
  const {
    value = '',
    onSubmit = (newValue) => console.log('onSubmit', newValue),
    className = '',
  } = props;
  const [showTime, setShowTime] = useState(false);
  const [valueDate, setValueDate] = useState(value ? moment(value) : '');

  useEffect(() => {
    if (value) {
      setValueDate(value ? moment(value) : '');
    }
  }, [value]);

  return (
    <div className={`field-date-picker ${className}`}>
      <DatePicker
        placeholder=""
        inputReadOnly
        defaultValue={valueDate}
        suffixIcon=""
        bordered={false}
        showTime={showTime}
        renderExtraFooter={() => (
          <div>
            Add time
            <Switch
              style={{ marginLeft: '10px' }}
              onChange={(checked) => {
                setShowTime(checked);
              }}
            />
          </div>
        )}
        onChange={(format, newValue) => {
          setValueDate(newValue);
          onSubmit(new Date(newValue).toISOString());
        }}
        onOk={(newValue) => {
          setValueDate(newValue);
        }}
      />
    </div>
  );
}
