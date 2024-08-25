import { Checkbox, Drawer, Spin, Tabs, Button, Tooltip } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import axiosClient from 'api/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { select } from 'utils/reselect';
import './ModalFieldSelect.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { getProjectDetail } from 'containers/app/screens/Workspace/action';
import { selectState } from 'utils/reselect';
import { setModalFieldSelect } from 'redux/actions/currentTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTimesCircle,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import { COLORS } from 'helpers/constant';
import { calculateTextSize } from 'utils';
import { CirclePicker } from 'react-color';
import fieldApi from 'api/fieldApi';
import _ from 'lodash';
const { TabPane } = Tabs;

export function FieldUpdate({
  option = {
    label: '',
    value: '',
    backgroundColor: '',
    isUsing: false,
  },
  fieldId = '',
  fieldKey = '',
  projectId = '',
  focusOption = '',
  setIsVisibleColorPicker = function () {},
  setFocusOption = function () {},
}) {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState(option.label);
  const [onFocus, setOnFocus] = useState(false);
  const [border, setBorder] = useState('none');
  const refInput = useRef();
  const styleInput = {
    fontSize: '14px',
    maxWidth: '200px',
  };
  return (
    <div className="modal-field-select-update__item">
      <div className="modal-field-select-update__item_left">
        <div
          onClick={() => {
            setIsVisibleColorPicker(true);
            setFocusOption(option.value);
          }}
          className="modal-field-select-update__item_color"
          style={{ backgroundColor: option.backgroundColor }}
        ></div>
        <div className="modal-field-select-update__item_name">
          <input
            ref={refInput}
            className="text-too-long"
            value={valueInput}
            style={{
              ...styleInput,
              border:
                focusOption === option.value ? '1px dashed #cecfd1' : 'none',
              // border: border,
              width: `${
                calculateTextSize(valueInput, styleInput).width + 10
              }px`,
            }}
            disabled={!(focusOption === option.value)}
            autoFocus={focusOption === option.value}
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
            onBlur={async (e) => {
              // setBorder('none');
              // setOnFocus(false);
              if (option.label !== valueInput) {
                await fieldApi.updateTextAndColorOption({
                  projectId,
                  fieldKey,
                  optionValue: option.value,
                  newOptionText: valueInput,
                  newOptionColor: option.backgroundColor,
                });
                dispatch(getProjectDetail({ projectId }));
              }
            }}
          />
        </div>

        <Tooltip
          title={option?.isUsing ? "You can't delete a label while in use" : ''}
        >
          <div
            className={`modal-field-select-update-icon-delete-container super-center ${
              option?.isUsing
                ? 'modal-field-select-is-using'
                : 'modal-field-select-is-notusing'
            }`}
          >
            <FontAwesomeIcon
              className={`modal-field-select-icon-update-delete`}
              icon={faTimesCircle}
              onClick={async () => {
                if (!option?.isUsing) {
                  await fieldApi.deleteOption({
                    projectId,
                    fieldKey,
                    optionValue: option?.value,
                  });
                  dispatch(getProjectDetail({ projectId }));
                }
              }}
            />
          </div>
        </Tooltip>

        <div
          className="modal-field-select-update__item_icon_edit"
          onClick={() => {
            // setOnFocus(true);
            // refInput.current.focus();
            setFocusOption(option.value);
            // setBorder('1px dashed #cecfd1');
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
      <div className="modal-field-select-update__item_right">
        <Checkbox
          onChange={async (e) => {
            await fieldApi.setDoneStatusOption({
              projectId,
              fieldKey,
              value: option?.value,
            });
            dispatch(getProjectDetail({ projectId }));
          }}
        />
      </div>
    </div>
  );
}
const ModalFieldSelect = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [isVisibleColorPicker, setIsVisibleColorPicker] = useState(false);
  const [focusOption, setFocusOption] = useState(null);
  const [newColor, setNewColor] = useState('');
  const [newInput, setNewInput] = useState('');

  const projectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id'),
  );
  const modalFieldSelect = useSelector((state) =>
    select(state, 'currentTask.modalFieldSelect', {}),
  );

  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );

  const fields = useSelector((state) =>
    select(state, 'workspace.currentProject.detail.fields', []),
  );
  const _defaultField_ = useMemo(() => {
    return fields.find(
      (item) => item?.fieldKey === modalFieldSelect?.defaultField?.fieldKey,
    );
  }, [fields, modalFieldSelect?.defaultField?.fieldKey]);

  const setVisible = (v = false) => {
    dispatch(setModalFieldSelect({ visible: v }));
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
    console.log(options);
    setOptions(options);
    const usedColors = options.map((item) => item?.backgroundColor);
    const _availableColors = COLORS.filter(
      (item) => !usedColors.includes(item),
    );
    setNewColor(_availableColors[0]);
    setAvailableColors(_availableColors);
    // const currentValue = selectedField?.value ?? value;
    // setSelectedField(options.find((item) => item?.value === currentValue));
    // const v = options.find((item) => item.value === value);
    // setSelectedField(v);
  }, [_defaultField_]);

  useEffect(() => {}, []);

  return (
    <Drawer
      className="modal-field-select-update"
      placement="right"
      closable={false}
      onClose={() => {
        setVisible(false);
      }}
      visible={modalFieldSelect?.visible}
      title={t('statusSetting')}
    >
      {modalFieldSelect?.visible && (
        <div
          className="modal-field-select-update__close-icon"
          onClick={() => {
            setVisible(false);
          }}
        >
          <CloseOutlined />
        </div>
      )}

      <div style={{ padding: '0 20px', overflow: 'auto', height: '100vh' }}>
        <div>
          <div className="modal-field-select-update__item_wrapper">
            {options?.length > 0 && (
              <div className="modal-field-select-update__action_title">
                <div></div>
                <div className="modal-field-select-update__action_title_right">
                  {t('done')}
                </div>
              </div>
            )}

            {options.map((o, index) => (
              <FieldUpdate
                focusOption={focusOption}
                fieldKey={modalFieldSelect?.defaultField?.fieldKey}
                projectId={projectId}
                key={index}
                option={o}
                setFocusOption={setFocusOption}
                setIsVisibleColorPicker={setIsVisibleColorPicker}
              />
            ))}
          </div>
          <div className="modal-field-select-update_add_item">
            <div
              style={{
                backgroundColor: newColor,
              }}
              className="modal-field-select-update_add_item_icon"
              onClick={() => {
                setFocusOption('');
                setIsVisibleColorPicker(true);
              }}
            >
              <FontAwesomeIcon icon={faTint} />
            </div>
            <div>
              <input
                value={newInput}
                onChange={(e) => {
                  setNewInput(e.target.value);
                }}
                placeholder={`+ ${t('addStatus')}`}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    if (newInput !== '' && !_.isNil(newInput)) {
                      await fieldApi.addOption({
                        projectId: projectId,
                        fieldKey: modalFieldSelect?.defaultField?.fieldKey,
                        newOptionText: newInput,
                        newOptionColor: availableColors[0],
                      });
                      dispatch(getProjectDetail({ projectId }));
                    }
                  }
                }}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  if (newInput !== '' && !_.isNil(newInput)) {
                    await fieldApi.addOption({
                      projectId: projectId,
                      fieldKey: modalFieldSelect?.defaultField?.fieldKey,
                      newOptionText: newInput,
                      newOptionColor: availableColors[0],
                    });
                    dispatch(getProjectDetail({ projectId }));
                  }
                }}
              >
                {t('ok')}
              </button>
            </div>
          </div>
          {isVisibleColorPicker && (
            <div className="modal-field-select-color-picker super-center">
              <CirclePicker
                circleSize={20}
                circleSpacing={10}
                onChange={async (color, event) => {
                  if (focusOption === '') {
                    setNewColor(color.hex);
                  } else {
                    const oldOption = options.find(
                      (item) => item?.value === focusOption,
                    );
                    await fieldApi.updateTextAndColorOption({
                      projectId,
                      fieldKey: modalFieldSelect?.defaultField?.fieldKey,
                      optionValue: oldOption?.value,
                      newOptionText: oldOption?.label,
                      newOptionColor: color.hex,
                    });
                    dispatch(getProjectDetail({ projectId }));
                  }
                }}
                colors={availableColors}
              />
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ModalFieldSelect;
