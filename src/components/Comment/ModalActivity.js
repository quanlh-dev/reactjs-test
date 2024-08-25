import { Drawer, Spin, Tabs } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ItemPost from './ItemPost';
import InputBlock from 'components/Input/InputBlock/InputBlock';
import NewPost from './NewPost';
import SingleActivityLog from '../../containers/app/screens/Board/components/Activity/SingleActivityLog';
import axiosClient from 'api/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from 'services/comment';
import { useTranslation } from 'react-i18next';
import ModalTask from 'components/Modal/ModalTask/ModalTask';
import { select } from 'utils/reselect';
import './ModalActivity.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { getProjectDetail } from 'containers/app/screens/Workspace/action';
import { selectState } from 'utils/reselect';
const { TabPane } = Tabs;

const ModalActivity = ({
  currentTask,
  visible,
  onClose,
  renameTaskElement,
  isSubTask = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);
  const [newTaskName, setNewTaskName] = useState('New Item');

  const currentProject = useSelector(
    (state) => state.workspace?.currentProject?.data,
  );

  const projectDetail = useSelector((state) =>
    selectState(state, 'workspace.currentProject.detail', {}),
  );

  const { name = 'Title', id } = currentTask;
  const [comments, setComments] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    setComments(currentTask?.comments || []);
  }, [currentTask]);

  const task = useMemo(() => {
    const phases = projectDetail?.phases ?? [];
    for (const phase of phases) {
      const task = phase?.tasks?.find((item) => item?._id === id);
      if (task) return task;
    }
  }, [projectDetail, currentTask]);

  const modalTask = useSelector((state) =>
    select(state, 'currentTask.modalTask', {}),
  );
  const getActivityLogs = async () => {
    setLoading(true);
    const resp = await axiosClient.get('/api/auditLog', {
      params: {
        level: 'TASK',
        entityId: id,
      },
    });
    if (resp.code === 200) {
      setActivityLogs(resp.data);
    } else {
      setActivityLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (visible) {
      getActivityLogs();
    }
  }, [visible]);

  const onSubmit = async (content) => {
    setLoading(true);
    const data = await postComment({
      taskId: id,
      content,
    });

    if (data?.data?.code === 200) {
      const newComments = [...comments];
      newComments.unshift(data?.data?.data || []);
      setComments(newComments);
    }

    setLoading(false);
  };

  return (
    <Drawer
      className="activity-modal-task"
      placement="right"
      onClose={onClose}
      closable={false}
      visible={visible}
    >
      {visible && (
        <div
          className="activity-modal-task__close-icon"
          onClick={() => {
            onClose();
          }}
        >
          <CloseOutlined />
        </div>
      )}

      <div style={{ padding: '0 20px', overflow: 'auto', height: '100vh' }}>
        <div>
          <div className="activity-modal-task__title">
            <span className="activity-modal-task__title-start">
              <InputBlock
                type="title"
                value={
                  modalTask?.action === 'update'
                    ? isSubTask
                      ? name
                      : task?.name
                    : 'New Item'
                }
                autoFocus={modalTask?.action === 'update' ? false : true}
                onSubmit={async (value) => {
                  if (modalTask?.action === 'update') {
                    await renameTaskElement({
                      taskId: id,
                      taskName: value,
                    });
                    dispatch(
                      getProjectDetail({ projectId: currentProject?._id }),
                    );
                  } else if (modalTask?.action === 'create') {
                    setNewTaskName(value);
                  }
                }}
              />
            </span>
          </div>
          <div>
            <Tabs defaultActiveKey="1" className="activity-modal-task__tab">
              <TabPane tab={t('modalTask')} key="1">
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    <ModalTask
                      newTaskName={newTaskName}
                      action={modalTask?.action}
                      // phaseId={modalTask?.phaseId}
                      taskId={modalTask?.taskId}
                      timeline={modalTask?.timeline}
                      isSubTask={isSubTask}
                    />
                  </>
                )}
              </TabPane>

              <TabPane tab={t('update')} key="2">
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    <NewPost onSubmit={onSubmit} />
                    {comments.map((comment) => (
                      <ItemPost data={comment} key={comment._id} />
                    ))}
                  </>
                )}
              </TabPane>
              <TabPane tab={t('activityLog')} key="3">
                {loading ? (
                  <Spin />
                ) : activityLogs?.length ? (
                  activityLogs.map((item) => (
                    <SingleActivityLog key={item._id} activityData={item} />
                  ))
                ) : (
                  t('noData')
                )}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ModalActivity;
