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
import 'components/Modal/ModalAuthorization/components/UserAuthorization/UserAuthorization.scss';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import { getUserInProject } from 'redux/actions/authorization';
import {
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { searchUserToAdd } from 'redux/actions/authorization';
import { getRolesInProject } from 'redux/actions/authorization';
import authorizationApi from 'api/authorizationApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
const UserAuthorization = ({ visibleAddMember, onChangeVisibleAddMember }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  // const [visible, onChangeVisibleAddMember] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    pageSizeOptions: [1, 5, 10, 20, 30],
    // showSizeChanger: true,
    total: 20,
  });

  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );

  const projectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id', undefined),
  );

  const userInProject = useSelector((state) =>
    select(state, 'authorization.user', []),
  );
  const usersToAdd = useSelector((state) =>
    select(state, 'authorization.usersToAdd', []),
  );
  const rolesInProject = useSelector((state) =>
    select(state, 'authorization.rolesInProject', []),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(
        getUserInProject({
          projectId,
          page: 1,
          perPage: pagination.pageSize,
        }),
      );
      dispatch(
        searchUserToAdd({
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
    const _users =
      userInProject?.items?.map((item) => {
        const { user, roles, _id } = item;
        return {
          userName: user?.userName,
          firstName: user?.name,
          lastName: user?.surname,
          email: user?.emailAddress,
          administator: user?.isAdmin,
          roles,
          userId: user?._id,
          id: _id,
        };
      }) ?? [];

    setPagination({
      ...pagination,
      total: userInProject?.pages * pagination.pageSize,
    });

    setUsers(_users);
    return () => {};
  }, [userInProject]);

  useEffect(() => {
    dispatch(
      searchUserToAdd({
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
      title: t('userName'),
      dataIndex: 'userName',
      key: 'userName',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: t('firstName'),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: t('lastName'),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Administator',
      key: 'administator',
      dataIndex: 'administator',
      render: (isAdmin, record) =>
        isAdmin ? <CheckCircleOutlined style={{ color: 'green' }} /> : '',
    },
    {
      title: t('role'),
      key: 'roles',
      dataIndex: 'roles',
      render: (roles, record) => (
        <>
          {roles.map((role) => {
            return (
              <div className="tag-role-wrapper" key={role?._id}>
                <div className="tag-role">
                  <span>{role?.name}</span>
                  &nbsp;
                  <CloseOutlined
                    onClick={async () => {
                      await authorizationApi.deleteRoleUser({
                        projectId,
                        userId: record?.userId,
                        roleId: role?._id,
                      });
                      dispatch(
                        getUserInProject({
                          projectId,
                          page: pagination.current,
                          perPage: pagination.pageSize,
                        }),
                      );
                    }}
                    className="tag-role-close-icon"
                  />
                </div>
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: t('delete'),
      key: 'delete',
      render: (text, record) => {
        return (
          <Popconfirm
            placement="bottom"
            title={t('deleteConfirmUser')}
            onConfirm={async () => {
              await authorizationApi.deleteUserFromProject({
                projectId,
                userId: record?.userId,
              });
              dispatch(
                getUserInProject({
                  projectId,
                  page: 1,
                  perPage: pagination.pageSize,
                }),
              );
              dispatch(
                searchUserToAdd({
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
    <div className="user-authorization-container">
      <div className="user-authorization-toolbar">
        <div className="user-authorization-title">Users</div>
        <div
          className="user-authorization-add-member"
          onClick={() => {
            onChangeVisibleAddMember(true);
          }}
        >
          + {t('addMember')}
        </div>
      </div>
      <div className="user-authorization-table">
        <Table
          columns={columns}
          dataSource={users}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            setPagination(pagination);
            dispatch(
              getUserInProject({
                projectId,
                page: pagination.current,
                perPage: pagination.pageSize,
              }),
            );
          }}
        />
      </div>
      <Drawer
        className="modal-field-select-update modal-common-container modal-authorize-common"
        placement="right"
        closable={false}
        style={{ zIndex: 1051 }}
        onClose={() => {
          onChangeVisibleAddMember(false);
        }}
        visible={visibleAddMember}
        title={t('addMember')}
      >
        {visibleAddMember && (
          <div
            className="modal-common-close-icon"
            onClick={() => {
              onChangeVisibleAddMember(false);
            }}
          >
            <CloseOutlined />
          </div>
        )}

        <div className="modal-common-wrapper">
          <div>
            <div className="modal-add-user-wrapper">
              {/* <h4>New member</h4> */}
              <div>
                <div className="modal-add-user-header">
                  <div>
                    <Input
                      className="btn-radius"
                      prefix={<SearchOutlined />}
                      placeholder={t('searchMember')}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <Checkbox
                      onChange={(e) => {
                        const userIdsToAdd = usersToAdd.map(
                          (item) => item?._id,
                        );
                        setCheckedUsers(e.target.checked ? userIdsToAdd : []);
                      }}
                      checked={usersToAdd?.length === checkedUsers?.length}
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
                    onChange={(checkedUsers) => {
                      setCheckedUsers(checkedUsers);
                    }}
                    value={checkedUsers}
                  >
                    <Row>
                      {usersToAdd?.length === 0 ? (
                        <Col span={24}>{t('noData')}</Col>
                      ) : (
                        usersToAdd.map((item) => {
                          return (
                            <Col span={8} key={item?._id}>
                              <Checkbox value={item?._id}>
                                {item?.name + ' ' + item?.surname}
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
              <div>
                <div className="modal-add-user-header">
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
                        <Col span={24}>No roles to add</Col>
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
              <div className="user-authorization-btn-add-member">
                <div
                  className="user-authorization-add-member"
                  onClick={async () => {
                    await authorizationApi.addUserToProject({
                      projectId,
                      userIds: checkedUsers,
                      roles: checkedRoles,
                    });
                    dispatch(
                      getUserInProject({
                        projectId,
                        page: 1,
                        perPage: pagination.pageSize,
                      }),
                    );
                    dispatch(
                      searchUserToAdd({
                        projectId,
                        page: 1,
                        perPage: pagination.pageSize,
                        name: searchText,
                      }),
                    );
                  }}
                >
                  {t('addMember')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default UserAuthorization;
