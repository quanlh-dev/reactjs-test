import React, { useEffect, useMemo, useState } from 'react';
import { Col, Modal, Row, Tooltip, Button } from 'antd';
import 'components/Modal/ModalTask/ModalTask.scss';
import Scrollbars from 'react-custom-scrollbars';
import InputBlock from 'components/Input/InputBlock/InputBlock';
import fieldConfig from 'configs/fieldConfig';
import { useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import { updateTask } from 'services/task';
import { useDispatch } from 'react-redux';
import { getProjectDetail } from 'containers/app/screens/Workspace/action';
import { renameTask } from 'services/task';
import FieldSelect from 'components/Field/FieldSelect/FieldSelect';
import FieldSelectPhase from 'components/Field/FieldSelectPhase/FieldSelectPhase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { createTask } from 'services/task';
import { calculateTextSize } from 'utils';
import { setCurrentProject } from 'containers/app/screens/Workspace/action';
import { useTranslation } from 'react-i18next';
import { setVisibleModalActivity } from 'redux/actions/currentTask';
import { useParams } from 'react-router-dom';
import { getListFieldConfig } from 'services/project';

export const ModalTask = React.memo(function ({
  action = 'create' || 'update',
  phaseId = '',
  taskId = '',
  timeline = {},
  isKanbanView = false,
  newTaskName = 'New Item',
  value = {
    taskName: 'New Item',
    taskId: '',
    phaseName: '',
    phaseId: '',
    projectId: '',
    assignee: [],
    timeline: null,
    priority: 'option_1',
    percentage_done: 26,
    status: 'option_2',
    text_1: null,
    peoples_1: [1],
    select_1: 'option_1',
    date_1: '2002-08-20T17:00:00.000Z',
    range_date_1: {
      from: '2021-08-02T07:25:00.712+0000',
      to: '2021-08-03T07:25:00.712+0000',
    },
    number_1: 17,
    range_number_1: {
      from: 17,
      to: 99,
    },
    files_1: [
      {
        fileName: 'File test thu 1',
        fileId: 'id_file_test_1',
        fileMimeType: 'image/jpeg',
      },
      {
        fileName: 'File test thu 2',
        fileId: 'id_file_test_2',
        fileMimeType: 'image/jpeg',
      },
    ],
    tags_1: ['option_2', 'option_2'],
    checkbox_1: true,
    progress_1: 0,
  },
  fields = [
    {
      fieldType: 'Assignee',
      isFieldSystem: true,
      _id: '6134b3167366ea2cb4395eed',
      fieldKey: 'assignee',
      fieldName: 'Assignee',
    },
    {
      fieldType: 'Timeline',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395eee',
      fieldKey: 'timeline',
      fieldName: 'Timeline',
    },
    {
      fieldType: 'Priority',
      isFieldSystem: true,
      _id: '6134b3167366ea2cb4395eef',
      fieldKey: 'priority',
      fieldName: 'Priority',
      fieldConfigs: {
        options: [
          {
            text: 'High',
            value: 'option_1',
            color: '#ff249d',
          },
          {
            text: 'Medium',
            value: 'option_2',
            color: '#6e8b3d',
          },
          {
            text: 'Low',
            value: 'option_3',
            color: '#2acaea',
          },
        ],
        options_inc: 3,
        defaultValue: 'option_2',
      },
    },
    {
      fieldType: 'Percentage_Done',
      isFieldSystem: true,
      _id: '6134b3167366ea2cb4395ef0',
      fieldKey: 'percentage_done',
      fieldName: 'Percentage_Done',
      fieldConfigs: {
        defaultValue: 0,
      },
    },
    {
      fieldType: 'Status',
      isFieldSystem: true,
      _id: '6134b3167366ea2cb4395ef1',
      fieldKey: 'status',
      fieldName: 'Status',
      fieldConfigs: {
        options: [
          {
            text: 'Open',
            value: 'option_1',
            color: 'rgb(128,128,128)',
            isDone: false,
          },
          {
            text: 'To Do',
            value: 'option_2',
            color: 'rgb(253,171,61)',
            isDone: false,
          },
          {
            text: 'In Progress',
            value: 'option_3',
            color: 'rgb(162,93,220)',
            isDone: false,
          },
          {
            text: 'Done',
            value: 'option_4',
            color: 'rgb(0,134,192)',
            isDone: true,
          },
        ],
        options_inc: 4,
        defaultValue: 'option_1',
      },
    },
    {
      fieldType: 'Text',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef2',
      fieldKey: 'text_1',
      fieldName: 'T/đề T1',
    },
    {
      fieldType: 'Peoples',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef3',
      fieldKey: 'peoples_1',
      fieldName: 'Peoples 1',
      fieldConfigs: {
        defaultValue: [1],
      },
    },
    {
      fieldType: 'Select',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef4',
      fieldKey: 'select_1',
      fieldName: 'Khu vực',
      fieldConfigs: {
        options: [
          {
            text: 'Miền bắc',
            value: 'option_1',
            color: '#ff249d',
          },
          {
            text: 'Miền Trung',
            value: 'option_2',
            color: '#6e8b3d',
          },
          {
            text: 'Miền Nam',
            value: 'option_3',
            color: '#2acaea',
          },
        ],
        options_inc: 3,
        defaultValue: 'option_1',
      },
    },
    {
      fieldType: 'Date',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef5',
      fieldKey: 'date_1',
      fieldName: 'Date 1',
      fieldConfigs: {
        defaultValue: '2021-08-02T07:25:00.712+0000',
      },
    },
    {
      fieldType: 'Range_Date',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef6',
      fieldKey: 'range_date_1',
      fieldName: 'Range Date',
      fieldConfigs: {
        defaultValue: {
          from: '2021-08-02T07:25:00.712+0000',
          to: '2021-08-03T07:25:00.712+0000',
        },
      },
    },
    {
      fieldType: 'Number',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef7',
      fieldKey: 'number_1',
      fieldName: 'Number 1',
      fieldConfigs: {
        defaultValue: 17,
      },
    },
    {
      fieldType: 'Range_Number',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef8',
      fieldKey: 'range_number_1',
      fieldName: 'Range Number',
      fieldConfigs: {
        defaultValue: {
          from: 17,
          to: 99,
        },
      },
    },
    {
      fieldType: 'Files',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395ef9',
      fieldKey: 'files_1',
      fieldName: 'File 1',
      fieldConfigs: {
        defaultValue: [
          {
            fileName: 'File test thu 1',
            fileId: 'id_file_test_1',
            fileMimeType: 'image/jpeg',
          },
          {
            fileName: 'File test thu 2',
            fileId: 'id_file_test_2',
            fileMimeType: 'image/jpeg',
          },
        ],
      },
    },
    {
      fieldType: 'Tags',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395efa',
      fieldKey: 'tags_1',
      fieldName: 'Tasgs 1',
      fieldConfigs: {
        options: [
          {
            text: 'Tag 1',
            value: 'option_1',
          },
          {
            text: 'Tag 2',
            value: 'option_2',
          },
          {
            text: 'Tag 3',
            value: 'option_3',
          },
        ],
        options_inc: 3,
        defaultValue: ['option_2', 'option_2'],
      },
    },
    {
      fieldType: 'Checkbox',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395efb',
      fieldKey: 'checkbox_1',
      fieldName: 'Checkbox 1',
      fieldConfigs: {
        defaultValue: true,
      },
    },
    {
      fieldType: 'Progress',
      isFieldSystem: false,
      _id: '6134b3167366ea2cb4395efc',
      fieldKey: 'progress_1',
      fieldName: 'Progress 1',
      fieldConfigs: {
        defaultValue: 0,
      },
    },
  ],
  isSubTask = false,
}) {
  const dispatch = useDispatch();
  const [createdValue, setCreatedValue] = useState({});
  const { t } = useTranslation();
  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );
  const [listFieldConfig, setListFieldConfig] = useState({});

  const { boardViewTabId } = useParams();
  const currentProjectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id', undefined),
  );

  useEffect(() => {
    getDataFields();
  }, [currentProjectId]);

  const getDataFields = async () => {
    const d = await getListFieldConfig({
      projectId: currentProjectId,
      tabViewId: boardViewTabId,
    });
    setListFieldConfig(d?.data?.data || {});
  };

  const currentProject = useSelector((state) =>
    select(state, 'workspace.currentProject.data', {}),
  );

  const projectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id', ''),
  );

  useEffect(() => {
    if (projectId) dispatch(getProjectDetail({ projectId }));
    return () => {};
  }, []);

  useEffect(() => {
    setCreatedValue({ ...createdValue, name: newTaskName });
    return () => {};
  }, [newTaskName]);

  const task = useMemo(() => {
    if (action === 'update') {
      const phases = projectDetail?.phases ?? [];
      for (const phase of phases) {
        const task = phase?.tasks?.find((item) => item?._id === taskId);
        if (task) return task;
      }
    } else if (action === 'create') {
      let defaultValueField = {};
      for (const field of projectDetail?.fields ?? []) {
        defaultValueField[field?.fieldKey] =
          field?.fieldConfigs?.defaultValue ?? null;
      }
      const defaultOptionPhases = projectDetail?.phases?.map((item) => {
        return {
          id: item?._id,
          text: item?.name,
          color: item?.color,
        };
      }) ?? [null];
      const defaultValueTask = {
        name: 'New Item',
        projectId: projectDetail?._id,
        value: {
          ...defaultValueField,
          timeline,
        },
        phase: defaultOptionPhases[0],
        defaultOptionPhases,
      };

      setCreatedValue(defaultValueTask);

      return defaultValueTask;
    }
    return {};
  }, [projectDetail, taskId, timeline, action]);

  useEffect(() => {}, []);

  const onSubmit = async (value, fieldKey) => {
    if (action === 'update') {
      await updateTask({
        taskId: taskId,
        fieldKey,
        value,
      });
      dispatch(getProjectDetail({ projectId: projectDetail?._id }));
      if (isKanbanView) {
        dispatch(
          setCurrentProject({
            ...currentProject,
            isKanbanReset: !currentProject?.isKanbanReset,
          }),
        );
      }
    } else if (action === 'create') {
      setCreatedValue({
        ...createdValue,
        value: { ...createdValue?.value, [fieldKey]: value },
      });
    }
  };

  const onOk = async () => {
    // console.log(createdValue);
    await createTask({
      projectId: projectDetail?._id,
      phaseId: createdValue?.phase?.id,
      taskName: createdValue?.name,
      values: {
        ...createdValue?.value,
      },
    });
    dispatch(getProjectDetail({ projectId: projectDetail?._id }));
    dispatch(setVisibleModalActivity(false));
  };

  return (
    <div className="modal-task-container">
      <div style={{ height: '100%', position: 'relative' }}>
        <div className="modal-task__field_container">
          {action === 'create' && (
            <Row className="modal-task__field">
              <Col span={8}>
                <div className="modal-task__icon_name">
                  <span>
                    <FontAwesomeIcon color="gray" icon={faCircle} />
                  </span>
                  <span className="modal-task__name text-too-long">Phase</span>
                </div>
              </Col>
              <Col span={16}>
                <FieldSelectPhase
                  onSubmit={(phase) => {
                    setCreatedValue({ ...createdValue, phase });
                  }}
                  defaultOptions={createdValue?.defaultOptionPhases ?? []}
                  value={createdValue?.phase ?? null}
                  width="100%"
                />
              </Col>
            </Row>
          )}
          {(listFieldConfig?.enable || [])?.map((f) => {
            const {
              fieldType,
              isFieldSystem,
              _id,
              fieldKey,
              fieldConfigs,
              fieldName,
              isSubtask,
            } = f ?? {};
            const FieldComponent =
              fieldConfig?.[fieldType]?.['component'] ??
              fieldConfig?.['Other']?.['component'];
            return (
              <Row key={_id} className="modal-task__field">
                <Col span={8}>
                  <div className="modal-task__icon_name">
                    <span>{fieldConfig?.[fieldType]?.['icon']}</span>
                    <Tooltip
                      title={
                        calculateTextSize(fieldName).width > 111
                          ? fieldName
                          : ''
                      }
                    >
                      <span className="modal-task__name text-too-long">
                        {fieldName}
                      </span>
                    </Tooltip>
                  </div>
                </Col>
                <Col span={16}>
                  <FieldComponent
                    value={task?.value?.[fieldKey]}
                    onSubmit={(value) => onSubmit(value, fieldKey)}
                    fieldType={fieldType}
                    defaultField={f}
                    width="100%"
                    taskId={taskId}
                    parentType="ModalItem"
                  />
                </Col>
              </Row>
            );
          })}
        </div>
        {action === 'create' && (
          <div className="modal-task-btn-create-item">
            <Button type="primary" onClick={onOk}>
              {t('create')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default ModalTask;
