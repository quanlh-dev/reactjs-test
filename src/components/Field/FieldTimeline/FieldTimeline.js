import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Tooltip } from 'antd';
import 'components/Field/FieldTimeline/FieldTimeline.scss';
import moment from 'moment';
import viLocale from 'antd/es/date-picker/locale/vi_VN';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import _ from 'lodash';
const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

const FieldTimeline = React.memo(
  ({
    value = {
      from: null,
      to: null,
    },
    defaultField = {
      fieldType: 'Timeline',
      isFieldSystem: false,
      _id: '612e5e6e5d737736062370ce',
      fieldKey: 'timeline',
      fieldName: 'Timeline',
    },
    onSubmit = function (value) {},
    width = '100%',
    className = '',
  }) => {
    const customFormat = (value) => `${value.format(dateFormat)}`;
    const [fromToMoment, setFromToMoment] = useState(
      _.isNil(value?.from) || _.isNil(value?.to)
        ? null
        : [moment(value.from), moment(value.to)],
    );

    useEffect(() => {
      setFromToMoment(
        _.isNil(value?.from) || _.isNil(value?.to)
          ? null
          : [moment(value.from), moment(value.to)],
      );
      return () => {};
    }, [value]);

    return (
      <div
        style={{ width: width, minWidth: '100px' }}
        className={`field-timeline-container flex-jcenter ${className}`}
      >
        <div className="icon-timeline"></div>
        <Tooltip
          title={
            fromToMoment == null
              ? ''
              : `${moment(fromToMoment[0]).format(dateFormat)} - ${moment(
                  fromToMoment[1],
                ).format(dateFormat)}`
          }
        >
          <RangePicker
            style={{ width: '100%' }}
            allowClear={false}
            inputReadOnly={true}
            className="field-timeline"
            locale={null}
            // panelRender={()=>{
            //     return <div>aa</div>
            // }}
            // style={{ maxWidth: '200px' }}
            size="middle"
            suffixIcon={''}
            bordered={false}
            placeholder={['', '']}
            // dateRender={(current) => {
            //   const style = {};
            //   if (current.date() === 1) {
            //     style.border = '1px solid #1890ff';
            //     style.borderRadius = '50%';
            //   }
            //   return (
            //     <div className="ant-picker-cell-inner" style={style}>
            //       {current.date()}
            //     </div>
            //   );
            // }}

            // disabledTime={disabledRangeTime}
            onChange={(value, value2) => {
              // value[0].utcOffset(0);
              value[0].set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              const from = value[0].toISOString();

              // value[1].utcOffset(0);
              // value[1].set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              const to = value[1].endOf('day').toISOString();
              onSubmit({ from, to });

              setFromToMoment(value);
              // onSubmit(value);
            }}
            // mode={['date', 'date']}
            separator={
              <span
                className={
                  fromToMoment == null ? 'hover-on-set-date' : 'date-initial'
                }
              ></span>
            }
            value={fromToMoment}
            defaultValue={fromToMoment}
            format={customFormat}
          />
        </Tooltip>

        <div className="icon-timeline flex-super-center">
          {fromToMoment == null ? (
            ''
          ) : (
            <CloseCircleOutlined
              onClick={() => {
                setFromToMoment(null);
                onSubmit({ from: null, to: null });
              }}
            />
          )}
        </div>
      </div>
    );
  },
);

export default FieldTimeline;
