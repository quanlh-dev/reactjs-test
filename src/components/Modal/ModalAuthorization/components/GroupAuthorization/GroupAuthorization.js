import React, { useEffect, useMemo, useState } from 'react';
import {
  Col,
  Modal,
  Row,
  Tooltip,
  Table,
  Space,
  Tag,
  Drawer,
  Input,
  Checkbox,
  Divider,
  Popconfirm,
} from 'antd';
import 'components/Modal/ModalAuthorization/components/GroupAuthorization/GroupAuthorization.scss';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import { getGroupInProject } from 'redux/actions/authorization';
import {
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { searchGroupToAdd } from 'redux/actions/authorization';
import { getRolesInProject } from 'redux/actions/authorization';
import authorizationApi from 'api/authorizationApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const GroupAuthorization = ({ visibleAddGroup, onChangeVisibleAddGroup }) => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [inputGroupName, setInputGroupName] = useState({});

  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    pageSizeOptions: [1, 5, 10, 20, 30],
    // showSizeChanger: true,
    total: 10,
  });
  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );

  const projectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id', undefined),
  );

  const groupInProject = useSelector((state) =>
    select(state, 'authorization.group', []),
  );
  const groupsToAdd = useSelector((state) =>
    select(state, 'authorization.groupsToAdd', []),
  );
  const rolesInProject = useSelector((state) =>
    select(state, 'authorization.rolesInProject', []),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(
        getGroupInProject({
          projectId,
          page: 1,
          perPage: pagination.pageSize,
        }),
      );
      dispatch(
        searchGroupToAdd({
          projectId,
          page: 1,
          perPage: pagination.pageSize,
          name: '',
        }),
      );
      dispatch(
        getRolesInProject({
          projectId,
        }),
      );
    }

    return () => {};
  }, [projectId]);

  useEffect(() => {
    const _inputGroupName = { newGroup: '' };
    for (const group of groupsToAdd) {
      _inputGroupName[group?._id] = group?.name;
    }

    setInputGroupName(_inputGroupName);
    return () => {};
  }, [groupsToAdd]);

  useEffect(() => {
    const _groups =
      groupInProject?.items?.map((item) => {
        const { group, roles, _id } = item;
        return {
          groupName: group?.name,
          countUsers: group?.membersCount,
          groupId: group?._id,
        };
      }) ?? [];
    setPagination({
      ...pagination,
      total: groupInProject?.pages * pagination.pageSize,
    });

    setGroups(_groups);
    return () => {};
  }, [groupInProject]);

  useEffect(() => {
    dispatch(
      searchGroupToAdd({
        projectId,
        page: 1,
        perPage: pagination.pageSize,
        name: searchText,
      }),
    );

    return () => {};
  }, [searchText]);

  const columns = [
    {
      title: t('groupName'),
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text) => (
        <div>
          {text}
          <span
            style={{ marginLeft: '10px', fontSize: '12px', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPen} />
          </span>
        </div>
      ),
    },

    {
      title: t('user'),
      key: 'countUsers',
      dataIndex: 'countUsers',
    },
    {
      title: t('delete'),
      key: 'delete',
      render: (text, record) => {
        return (
          <Popconfirm
            placement="bottom"
            title={t('deleteConfirmGroup')}
            onConfirm={async () => {
              await authorizationApi.deleteGroupFromProject({
                projectId,
                groupId: record?.groupId,
              });
              dispatch(
                getGroupInProject({
                  projectId,
                  page: 1,
                  perPage: pagination.pageSize,
                }),
              );
              dispatch(
                searchGroupToAdd({
                  projectId,
                  page: 1,
                  perPage: pagination.pageSize,
                  name: searchText,
                }),
              );
            }}
            okText={t('yes')}
            cancelText={t('cancel')}
          >
            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTrashAlt} />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="group-authorization-container">
      <div className="group-authorization-toolbar">
        <div className="group-authorization-title">{t('group')}</div>
        <div
          className="group-authorization-add-member"
          onClick={() => {
            onChangeVisibleAddGroup(true);
          }}
        >
          + {t('newGroup')}
        </div>
      </div>
      <div className="group-authorization-table">
        <Table
          columns={columns}
          dataSource={groups}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            setPagination(pagination);
          }}
        />
      </div>
      <Drawer
        style={{ zIndex: 1051 }}
        className="activity-modal modal-common-container modal-authorize-common"
        placement="right"
        closable={false}
        onClose={() => {
          onChangeVisibleAddGroup(false);
        }}
        visible={visibleAddGroup}
        title={t('addGroup')}
      >
        {visibleAddGroup && (
          <div
            className="modal-common-close-icon"
            onClick={() => {
              onChangeVisibleAddGroup(false);
            }}
          >
            <CloseOutlined />
          </div>
        )}

        <div className="modal-common-wrapper">
          <div>
            <div className="modal-add-group-wrapper">
              {/* <h4>New group</h4> */}
              <div>
                <div className="modal-add-group-header">
                  <div>
                    <Input
                      className="btn-radius"
                      prefix={<SearchOutlined />}
                      placeholder={t('searchGroup')}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <Checkbox
                      onChange={(e) => {
                        const groupIdsToAdd = groupsToAdd.map(
                          (item) => item?._id,
                        );
                        setCheckedGroups(e.target.checked ? groupIdsToAdd : []);
                      }}
                      checked={groupsToAdd?.length === checkedGroups?.length}
                    >
                      Check all/Uncheck all
                    </Checkbox>
                  </div>
                </div>
                <Scrollbars
                  style={{
                    height: '290px',
                    marginTop: '20px',
                    overflowX: 'hidden',
                  }}
                >
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={(checkedGroups) => {
                      setCheckedGroups(checkedGroups);
                    }}
                    value={checkedGroups}
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12} key={'newGroup'}>
                        <div className="group-item-to-add-wrapper">
                          <div className="group-item-to-add-block"></div>
                          <input
                            placeholder="Add"
                            value={inputGroupName?.newGroup}
                            onChange={(e) => {
                              setInputGroupName({
                                ...inputGroupName,
                                newGroup: e.target.value,
                              });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              }
                            }}
                            onBlur={async (e) => {
                              if (inputGroupName['newGroup'] !== '') {
                                await authorizationApi.addLocalGroup({
                                  projectId,
                                  name: inputGroupName['newGroup'],
                                });
                                dispatch(
                                  searchGroupToAdd({
                                    projectId,
                                    page: 1,
                                    perPage: pagination.pageSize,
                                    name: searchText,
                                  }),
                                );
                              }
                            }}
                            className="group-item-to-add-name text-too-long"
                          />
                          <div className="group-item-to-add-checkbox">
                            {/* <Checkbox value={'a'}></Checkbox> */}
                          </div>
                        </div>
                      </Col>
                      {groupsToAdd.map((item) => {
                        return (
                          <Col span={12} key={item?._id}>
                            <div className="group-item-to-add-wrapper">
                              <div className="group-item-to-add-block"></div>
                              <input
                                disabled
                                placeholder="input group name"
                                value={inputGroupName[item?._id]}
                                onChange={(e) => {
                                  const clone = { ...inputGroupName };
                                  clone[item?._id] = e.target.value;
                                  setInputGroupName(clone);
                                }}
                                className="group-item-to-add-name text-too-long group-item-to-add-name-disable"
                              />
                              <div className="group-item-to-add-checkbox">
                                <Checkbox value={item?._id}></Checkbox>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Scrollbars>
              </div>

              <Divider />
              <div>
                <div className="modal-add-group-header">
                  <h5>{t('role')}</h5>

                  <div>
                    <Checkbox
                      onChange={(e) => {
                        const roleIdsInProject = rolesInProject.map(
                          (item) => item?._id,
                        );
                        setCheckedRoles(
                          e.target.checked ? roleIdsInProject : [],
                        );
                      }}
                      checked={rolesInProject?.length === checkedRoles?.length}
                    >
                      Check all/Uncheck all
                    </Checkbox>
                  </div>
                </div>
                <Scrollbars
                  style={{
                    height: '290px',
                    marginTop: '20px',
                  }}
                >
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={(checkedRoles) => {
                      setCheckedRoles(checkedRoles);
                    }}
                    value={checkedRoles}
                  >
                    <Row>
                      {rolesInProject?.length === 0 ? (
                        <Col span={24}>{t('noData')}</Col>
                      ) : (
                        rolesInProject.map((item) => {
                          return (
                            <Col span={8} key={item?._id}>
                              <Checkbox value={item?._id}>
                                {item?.name}
                              </Checkbox>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  </Checkbox.Group>
                </Scrollbars>
              </div>
              <Divider />
              <div className="user-authorization-btn-add-group">
                <div
                  className="group-authorization-add-member"
                  onClick={async () => {
                    await authorizationApi.addGroupToProject({
                      projectId,
                      groupIds: checkedGroups,
                      roles: checkedRoles,
                    });
                    dispatch(
                      getGroupInProject({
                        projectId,
                        page: pagination.current,
                        perPage: pagination.pageSize,
                      }),
                    );
                    dispatch(
                      searchGroupToAdd({
                        projectId,
                        page: 1,
                        perPage: pagination.pageSize,
                        name: searchText,
                      }),
                    );
                  }}
                >
                  {t('addGroup')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default GroupAuthorization;
