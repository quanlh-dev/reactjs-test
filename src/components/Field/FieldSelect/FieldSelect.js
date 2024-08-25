import React, { useEffect, useMemo, useState } from 'react';
import 'components/Field/FieldSelect/FieldSelect.scss';
import { Dropdown, Popover, Tooltip } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faTint } from '@fortawesome/free-solid-svg-icons';
import { CirclePicker } from 'react-color';
import { select } from 'utils/reselect';
import { computeState } from 'utils/reselect';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetail } from 'containers/app/screens/Workspace/action';
import { selectState } from 'utils/reselect';
import fieldApi from 'api/fieldApi';
import _ from 'lodash';
import { COLORS } from 'helpers/constant';
import { useTranslation } from 'react-i18next';
import { setModalFieldSelect } from 'redux/actions/currentTask';
import { setVisibleModalActivity } from 'redux/actions/currentTask';

export function Field({
  value = '',
  fieldId = '',
  label = '',
  isUsing = false,
  backgroundColor = '',
  widthOfField = 112,
  onSelectField = async function () {},
}) {
  return (
    <Tooltip title={label?.length >= 20 ? label : ''}>
      <div
        className="__field-select-container"
        onClick={async () =>
          await onSelectField({
            fieldId,
            label,
            backgroundColor,
            value,
            isUsing,
          })
        }
      >
        <div
          className="__field-select flex-jcenter"
          style={{
            backgroundColor: backgroundColor,
            width: `${widthOfField}px`,
          }}
        >
          <span className="text-too-long __label-select">{label}</span>
        </div>
      </div>
    </Tooltip>
  );
}

export function ContentSelect({
  defaultOptions = [
    { label: 'Working on it', backgroundColor: '#FDBC64', isUsing: false },
    { label: 'Stuck', backgroundColor: '#E37688', isUsing: false },
    { label: 'Done', backgroundColor: '#00C875', isUsing: false },
  ],
  widthOfField = 112,
  onSelectField,
  setTypeContentSelect,
  setVisible,
  fieldKey = '',
  defaultField,
}) {
  const dispatch = useDispatch();
  // const _defaultField_ = useSelector((state) =>
  //   computeState(
  //     state,
  //     [
  //       {
  //         fieldPath: 'workspace.currentProject.detail.fields',
  //         defaultValue: [],
  //       },
  //     ],
  //     function (fields) {
  //       return fields.find((item) => item?.fieldKey === fieldKey);
  //     },
  //   ),
  // );

  // const defaultOptions = useMemo(() => {
  //   return (
  //     _defaultField_?.fieldConfigs?.options?.map((item) => {
  //       return {
  //         label: item?.text,
  //         value: item?.value,
  //         backgroundColor: item?.color,
  //         isUsing: item?.isUsing ?? false,
  //       };
  //     }) ?? []
  //   );
  // }, [_defaultField_]);
  const { t } = useTranslation();

  const renderedFields = useMemo(() => {
    return _.isArray(defaultOptions) && defaultOptions.length === 0 ? (
      <div
        className="field-select-no-label"
        style={{
          width: `${widthOfField}px`,
        }}
      >
        No Label
      </div>
    ) : (
      defaultOptions.map((item, index) => {
        return (
          <Field
            key={index}
            fieldId={index}
            value={item?.value}
            widthOfField={widthOfField}
            isUsing={item?.isUsing}
            {...item}
            onSelectField={onSelectField}
          />
        );
      })
    );
  }, [defaultOptions]);

  const classNameByOptions = function () {
    switch (defaultOptions?.length) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return `__content-select __content-select-height-${defaultOptions.length}`;
      default:
        return '__content-select __content-select-height-default';
    }
  };

  return (
    <div className="field-select-content-container">
      <div
        style={{
          width: `${
            Math.ceil(defaultOptions.length / 6) * (widthOfField + 6) + 10
          }px`,
        }}
        className={classNameByOptions()}
      >
        {renderedFields}
      </div>
      <Tooltip title="">
        <div
          className="__btn-edit-label flex-super-center"
          onClick={() => {
            // setTypeContentSelect('Update');
            // setVisible(true);
            setVisible(false);
            dispatch(setVisibleModalActivity(false));
            dispatch(setModalFieldSelect({ visible: true, defaultField }));
          }}
        >
          <EditTwoTone style={{ marginRight: '5px' }} />
          {t('addEditLabels')}
        </div>
      </Tooltip>
    </div>
  );
}

export function FieldUpdate({
  value = '',
  fieldId = '',
  label = '',
  backgroundColor = '',
  widthOfField = 112,
  isUsing = false,
  fieldKey = '',
  projectId = '',
  setIsVisibleColorPicker = function () {},
  focusValue = '',
  setFocusValue = function () {},
  onSelectField = function () {},
}) {
  const [labelValue, setLabelValue] = useState(label);
  const dispatch = useDispatch();

  return (
    <Tooltip title={label?.length >= 20 ? label : ''}>
      <div
        className="__field-select-update-container"
        onClick={
          () => {}
          // onSelectField({ fieldId, label, backgroundColor, value })
        }
      >
        <div
          className={`__field-select-update flex-jcenter`}
          style={{
            width: `${widthOfField}px`,
          }}
        >
          <div style={{ width: '12px' }}></div>
          <div
            className={`flex-jcenter ${
              focusValue === value ? '__field-select-update-focus' : ''
            }`}
          >
            <div
              className="field-select-update-color super-center"
              style={{
                color: '#fff',
                backgroundColor: backgroundColor,
              }}
              onClick={() => {
                setFocusValue(focusValue === value ? null : value);
                setIsVisibleColorPicker(!(focusValue === value));
              }}
            >
              <FontAwesomeIcon
                className="field-select-icon-update-color"
                icon={faTint}
              />
            </div>

            <input
              style={{ width: `${widthOfField - 16 - 10 - 2 - 12}px` }}
              className="text-too-long __label-select-update"
              value={labelValue}
              onChange={(e) => {
                setLabelValue(e.target.value);
              }}
              onFocus={(e) => {
                // setFocus(true);
                setFocusValue(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              onBlur={async (e) => {
                // setFocus(false);
                setFocusValue(null);
                if (label !== labelValue) {
                  await fieldApi.updateTextAndColorOption({
                    projectId,
                    fieldKey,
                    optionValue: value,
                    newOptionText: labelValue,
                    newOptionColor: backgroundColor,
                  });
                  dispatch(getProjectDetail({ projectId }));
                }
              }}
            />
          </div>
          <Tooltip
            title={isUsing ? "You can't delete a label while in use" : ''}
          >
            <div
              className={`field-select-update-icon-delete-container super-center ${
                isUsing ? 'field-select-is-using' : ''
              }`}
            >
              <FontAwesomeIcon
                className={`field-select-icon-update-delete`}
                icon={faTimesCircle}
                onClick={async () => {
                  if (!isUsing) {
                    await fieldApi.deleteOption({
                      projectId,
                      fieldKey,
                      optionValue: value,
                    });
                    dispatch(getProjectDetail({ projectId }));
                  }
                }}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </Tooltip>
  );
}

function ContentSelectUpdate({
  defaultOptions = [
    { label: 'Working on it', backgroundColor: '#FDBC64', isUsing: false },
    { label: 'Stuck', backgroundColor: '#E37688', isUsing: false },
    { label: 'Done', backgroundColor: '#00C875', isUsing: false },
  ],
  widthOfField = 120,
  fieldKey = '',
  onSelectField,
  projectId,
  setTypeContentSelect,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const _defaultField_ = useSelector((state) =>
  //   computeState(
  //     state,
  //     [
  //       {
  //         fieldPath: 'workspace.currentProject.detail.fields',
  //         defaultValue: [],
  //       },
  //     ],
  //     function (fields) {
  //       return fields.find((item) => item?.fieldKey === fieldKey);
  //     },
  //   ),
  // );

  // const defaultOptions = useMemo(() => {
  //   return (
  //     _defaultField_?.fieldConfigs?.options?.map((item) => {
  //       return {
  //         label: item?.text,
  //         value: item?.value,
  //         backgroundColor: item?.color,
  //         isUsing: item?.isUsing ?? false,
  //       };
  //     }) ?? []
  //   );
  // }, [_defaultField_]);
  const [isVisibleColorPicker, setIsVisibleColorPicker] = useState(false);
  const [focusValue, setFocusValue] = useState(null);

  // const renderedFields = useMemo(() => {
  //   return defaultOptions.map((item, index) => {
  //     return (
  //       <FieldUpdate
  //         key={index}
  //         fieldId={index}
  //         value={item?.value}
  //         widthOfField={widthOfField}
  //         isUsing={item?.isUsing}
  //         fieldKey={fieldKey}
  //         projectId={projectId}
  //         {...item}
  //         onSelectField={onSelectField}
  //         focusValue={focusValue}
  //         setFocusValue={setFocusValue}
  //         setIsVisibleColorPicker={setIsVisibleColorPicker}
  //         isVisibleColorPicker={isVisibleColorPicker}
  //       />
  //     );
  //   });
  // }, [defaultOptions]);

  const usedColors = defaultOptions.map((item) => item?.backgroundColor);

  const availableColors = COLORS.filter((item) => !usedColors.includes(item));

  const classNameByOptions = function () {
    switch (defaultOptions?.length) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return `__content-select-add-edit __content-select-add-edit-height-${defaultOptions.length}`;
      default:
        return '__content-select-add-edit __content-select-add-edit-height-default';
    }
  };

  return (
    <div className="field-select-content-container">
      <div
        style={{
          width: `${
            defaultOptions.length === 0
              ? widthOfField + 10
              : Math.ceil((defaultOptions.length + 1) / 6) *
                  (widthOfField + 0 * 2) +
                10
          }px`,
        }}
        className={
          '__content-select-add-edit __content-select-add-edit-height-default'
        }
      >
        {defaultOptions.map((item, index) => {
          return (
            <FieldUpdate
              key={index}
              fieldId={index}
              value={item?.value}
              widthOfField={widthOfField}
              isUsing={item?.isUsing}
              fieldKey={fieldKey}
              projectId={projectId}
              {...item}
              onSelectField={onSelectField}
              focusValue={focusValue}
              setFocusValue={setFocusValue}
              setIsVisibleColorPicker={setIsVisibleColorPicker}
              isVisibleColorPicker={isVisibleColorPicker}
            />
          );
        })}
        <div
          className="flex-jcenter select-add-edit-new-item-wrapper"
          style={{ width: `${widthOfField}px` }}
        >
          <div
            className="select-add-edit-new-item"
            style={{ width: `${widthOfField - 12 * 2}px` }}
            onClick={async () => {
              await fieldApi.addOption({
                projectId: projectId,
                fieldKey,
                newOptionText: t('newLabel'),
                newOptionColor: availableColors[0],
              });
              dispatch(getProjectDetail({ projectId }));
            }}
          >
            {t('newLabel')}
          </div>
        </div>
      </div>

      {isVisibleColorPicker && (
        <div className="field-select-color-picker super-center">
          <CirclePicker
            width={`${
              Math.ceil(defaultOptions.length / 6) * (widthOfField + 6)
            }px`}
            circleSize={20}
            circleSpacing={10}
            onChange={async (color, event) => {
              const oldOption = defaultOptions.find(
                (item) => item?.value === focusValue,
              );
              await fieldApi.updateTextAndColorOption({
                projectId,
                fieldKey,
                optionValue: oldOption?.value,
                newOptionText: oldOption?.label,
                newOptionColor: color.hex,
              });
              dispatch(getProjectDetail({ projectId }));
            }}
            colors={availableColors}
          />
        </div>
      )}

      <Tooltip title="">
        <div
          className="__btn-apply-label flex-super-center"
          onClick={() => {
            setTypeContentSelect('Select');
          }}
        >
          {t('apply')}
        </div>
      </Tooltip>
    </div>
  );
}

const FieldSelect = React.memo(
  ({
    value = 'option_1',
    onSubmit = async function () {},
    taskId,
    defaultField = {
      fieldType: 'Status',
      isFieldSystem: true,
      _id: '612e5e6e5d737736062370d1',
      fieldKey: 'status',
      fieldName: 'Status',
      fieldConfigs: {
        options: [
          {
            text: 'Open',
            value: 'option_1',
            color: 'rgb(128,128,128)',
          },
          {
            text: 'To Do',
            value: 'option_2',
            color: 'rgb(253,171,61)',
          },
          {
            text: 'In Progress',
            value: 'option_3',
            color: 'rgb(162,93,220)',
          },
          {
            text: 'Done',
            value: 'option_4',
            color: 'rgb(0,134,192)',
            isDone: true,
          },
          // {
          //   text: 'In Progress',
          //   value: 'option_3',
          //   color: 'rgb(162,93,220)',
          // },
          // {
          //   text: 'Done',
          //   value: 'option_4',
          //   color: 'rgb(0,134,192)',
          //   isDone: true,
          // },
          // {
          //   text: 'In Progress',
          //   value: 'option_3',
          //   color: 'rgb(162,93,220)',
          // },
          // {
          //   text: 'Done',
          //   value: 'option_4',
          //   color: 'rgb(0,134,192)',
          //   isDone: true,
          // },
        ],
        options_inc: 4,
        defaultValue: 'option_1',
      },
    },
    widthOfField = 115,
    widthOfFieldUpdate = 120,
    currentBackgroundColor = '#CECFD1',
    placement = 'bottomCenter',
    width = '100%',
    className = '',
    isSetNewValue = true,
  }) => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [selectedField, setSelectedField] = useState({});
    const [options, setOptions] = useState([]);
    const [typeContentSelect, setTypeContentSelect] = useState('Select');
    // const [defaultField, setDefaultField] = useState({});
    const projectId = useSelector((state) =>
      select(state, 'workspace.currentProject.data._id', ''),
    );

    const onSelectField = async (field) => {
      setVisible(false);
      // Prevent validation from API
      if (isSetNewValue) {
        setSelectedField(field);
      }
      await onSubmit(field?.value, field, setSelectedField);
      // dispatch(getProjectDetail({ projectId }));
    };

    const fields = useSelector((state) =>
      select(state, 'workspace.currentProject.detail.fields', []),
    );
    const _defaultField_ = useMemo(() => {
      return fields.find((item) => item?.fieldKey === defaultField?.fieldKey);
    }, [fields]);

    // const _defaultField_ = useSelector((state) =>
    //   computeState(
    //     state,
    //     [
    //       {
    //         fieldPath: 'workspace.currentProject.detail.fields',
    //         defaultValue: [],
    //       },
    //     ],
    //     function (fields) {
    //       return fields.find((item) => item?.fieldKey === defaultField?.fieldKey);
    //     },
    //   ),
    // );

    const handleVisibleChange = (flag) => {
      if (flag) {
        setTypeContentSelect('Select');
      }
      setVisible(flag);
    };

    useEffect(() => {
      const options =
        _defaultField_?.fieldConfigs?.options?.map((item) => {
          return {
            label: item?.text,
            value: item?.value,
            backgroundColor: item?.color,
            isUsing: item?.isUsing ?? false,
          };
        }) ?? [];
      setOptions(options);
      const currentValue = selectedField?.value ?? value;
      setSelectedField(options.find((item) => item?.value === currentValue));
    }, [_defaultField_]);

    useEffect(() => {
      if (taskId) {
        const selected = options.find((item) => item?.value === value);
        if (selected) {
          setSelectedField(selected);
        }
      }
    }, [taskId]);

    useEffect(() => {
      if (value) {
        const selected = options.find((item) => item?.value === value);
        if (selected) {
          setSelectedField(selected);
        }
      }
    }, [value]);

    // useEffect(() => {
    //   const f =
    //     defaultField?.fieldConfigs?.options?.find(
    //       (item) => item.value === value,
    //     ) ?? {};
    //   setSelectedField({
    //     label: f?.text,
    //     value: f?.value,
    //     backgroundColor: f?.color,
    //     isUsing: f?.isUsing ?? false,
    //   });
    //   return () => {};
    // }, [defaultField]);

    return (
      <div
        className={`__select-container-custom ${className}`}
        style={{ width: width, minWidth: '100px' }}
      >
        <Dropdown
          overlay={
            typeContentSelect === 'Select' ? (
              <ContentSelect
                defaultOptions={options}
                widthOfField={widthOfField}
                onSelectField={onSelectField}
                setTypeContentSelect={setTypeContentSelect}
                setVisible={setVisible}
                fieldKey={defaultField?.fieldKey}
                defaultField={defaultField}
                projectId={projectId}
              />
            ) : (
              <ContentSelectUpdate
                defaultOptions={options}
                widthOfField={widthOfFieldUpdate}
                onSelectField={onSelectField}
                setTypeContentSelect={setTypeContentSelect}
                setVisible={setVisible}
                fieldKey={defaultField?.fieldKey}
                projectId={projectId}
              />
            )
          }
          placement={placement}
          overlayClassName="field-select-dropdown"
          overlayStyle={{ minWidth: 'fit-content' }}
          visible={visible}
          trigger={['click']}
          onVisibleChange={handleVisibleChange}
        >
          <Tooltip title={selectedField?.label ?? ''}>
            <div style={{ height: '34px' }}>
              <div
                className="__field-select __field-select-show flex-jcenter"
                style={{
                  backgroundColor:
                    selectedField?.backgroundColor ?? currentBackgroundColor,
                  width: `100%`,
                }}
              >
                <span className="text-too-long __label-select">
                  {selectedField?.label ?? ''}
                </span>
              </div>
            </div>
          </Tooltip>
        </Dropdown>
      </div>
    );
  },
);

export default FieldSelect;
