import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Space,
  Drawer,
  Row,
  Divider,
  Col,
  Checkbox,
  Button,
  Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-regular-svg-icons';
import { CloseOutlined } from '@ant-design/icons';
import InputBlock from 'components/Input/InputBlock/InputBlock';
import {
  getRoles,
  createRoles,
  deleteRole,
  duplicateRole,
  renameRole,
  createPermissionForRole,
  deletePermissionForRole,
  getRolesById,
} from 'services/role';
import { useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { notifSuccess } from 'utils/notificatiton';
import './index.scss';
import { setUseProxies } from 'immer';

const { confirm } = Modal;

const RoleAndPermission = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  const currentProjectId = useSelector((state) =>
    select(state, 'workspace.currentProject.data._id', undefined),
  );

  useEffect(() => {
    getData();
  }, [currentProjectId]);

  const getData = useCallback(async () => {
    const [roles] = await Promise.all([
      getRoles({ projectId: currentProjectId }),
    ]);
    if (roles?.data?.code === 200) {
      setData(roles?.data?.data || []);
    }
  }, []);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleOnClickDelete = (data) => {
    showDeleteConfirm(data.id);
  };

  const handleOnClickCopy = async (data) => {
    await duplicateRole({
      roleId: data?.id,
      name: (data?.name || '') + ' copy',
    });
    getData();
  };

  const onClickNewRole = async () => {
    const newRole = await createRoles({
      projectId: currentProjectId,
      name: 'New role ' + (Math.floor(Math.random() * 10000) + 1),
    });
    setSelectedRole(newRole?.data?.data || {});
    showDrawer(true);
    getData();
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: t('confirmDeleteRole'),
      icon: <ExclamationCircleOutlined />,
      okText: t('yes'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        handleDeleteRole(id);
      },
      onCancel() {},
    });
  };

  const handleDeleteRole = async (id) => {
    await deleteRole(id);
    getData();
    notifSuccess(t('success'), t('successDeleteRole'));
  };

  const onEditRole = async (record) => {
    const data = await getRolesById(record.id);
    setSelectedRole(data?.data?.data || record);
    showDrawer(true);
  };

  const PERMISSION = [
    {
      childs: [
        {
          childs: [],
          _id: '614ad4243c7d57441b43a98e',
          permissionKey: 'PHASE_CREATE',
          name: t('create'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a98f',
          permissionKey: 'PHASE_EDIT',
          name: t('edit'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a990',
          permissionKey: 'PHASE_DELETE',
          name: t('delete'),
          isChecked: false,
        },
      ],
      _id: '614ad4243c7d57441b43a985',
      permissionKey: 'PHASE',
      name: t('phase'),
      isCheckedAll: false,
      __v: 1,
    },
    {
      childs: [
        {
          childs: [],
          _id: '614ad4243c7d57441b43a991',
          permissionKey: 'PROJECT_EDIT',
          name: t('edit'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a992',
          permissionKey: 'PROJECT_CLOSE_REOPEN',
          name: t('closeReopen'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a993',
          permissionKey: 'PROJECT_MANAGER_MEMBER',
          name: t('manager'),
          isChecked: false,
        },
      ],
      _id: '614ad4243c7d57441b43a984',
      permissionKey: 'PROJECT',
      name: t('project'),
      isCheckedAll: false,
      __v: 1,
    },
    {
      childs: [
        {
          childs: [],
          _id: '614ad4243c7d57441b43a99a',
          permissionKey: 'TASK_CREATE',
          name: t('create'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a99b',
          permissionKey: 'TASK_EDIT',
          name: t('edit'),
          isChecked: false,
        },
        {
          childs: [],
          _id: '614ad4243c7d57441b43a99c',
          permissionKey: 'TASK_DELETE',
          name: t('delete'),
          isChecked: false,
        },
      ],
      _id: '614ad4243c7d57441b43a986',
      permissionKey: 'TASK',
      name: t('task'),
      isCheckedAll: false,
      __v: 1,
    },
    // {
    //   "childs": [
    //     {
    //       "childs": [],
    //       "_id": "614ad4243c7d57441b43a99d",
    //       "permissionKey": "CHECKLIST_CREATE"
    //     },
    //     {
    //       "childs": [],
    //       "_id": "614ad4243c7d57441b43a99e",
    //       "permissionKey": "CHECKLIST_EDIT"
    //     },
    //     {
    //       "childs": [],
    //       "_id": "614ad4243c7d57441b43a99f",
    //       "permissionKey": "CHECKLIST_DELETE"
    //     }
    //   ],
    //   "_id": "614ad4243c7d57441b43a987",
    //   "permissionKey": "CHECKLIST",
    //   "__v": 1
    // }
  ];

  const [permissions, setPermission] = useState(PERMISSION);

  useEffect(() => {
    const newPermission = [...PERMISSION];
    console.log(`selectedRole`, selectedRole.permissionsKeys);
    newPermission.map((p) => {
      p.childs.map((c) => {
        if ((selectedRole?.permissionsKeys || []).includes(c.permissionKey)) {
          c.isChecked = true;
        }
      });

      if (p.childs.filter((x) => !x.isChecked).length === 0)
        p.isCheckedAll = true;
      else p.isCheckedAll = false;
    });
    setPermission(newPermission);
  }, [selectedRole]);

  const columns = [
    {
      title: t('role'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => <a>{text}</a>,
    },
    {
      title: t('edit'),
      key: 'action',
      render: (text, record) => (
        <Space
          size="middle"
          onClick={() => {
            onEditRole(record);
          }}
          className="pointer"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Space>
      ),
      align: 'center',
      width: '6rem',
    },
    {
      title: t('copy'),
      key: 'action',
      render: (text, record) => (
        <Space
          size="middle"
          className="pointer"
          onClick={() => handleOnClickCopy(record)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </Space>
      ),
      align: 'center',
      width: '6rem',
    },
    {
      title: t('delete'),
      key: 'action',
      render: (text, record) => (
        <Space
          size="middle"
          className="pointer"
          onClick={() => handleOnClickDelete(record)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Space>
      ),
      align: 'center',
      width: '6rem',
    },
  ];

  const onSubmitChangePermission = () => {
    onClose();
  };

  const onChangeCheckboxChild = (e, pId, cId) => {
    const newPermission = [...permissions];
    const p = newPermission.find((x) => x._id === pId);
    const c = p.childs.find((x) => x._id === cId);
    c.isChecked = !c.isChecked;
    if (p.childs.filter((x) => !x.isChecked).length === 0)
      p.isCheckedAll = true;
    else p.isCheckedAll = false;
    setPermission(newPermission);
    if (c.isChecked)
      createPermissionForRole({
        permissionKey: c.permissionKey,
        roleId: selectedRole?.id,
      });
    else
      deletePermissionForRole({
        permissionKey: c.permissionKey,
        roleId: selectedRole?.id,
      });
  };

  const onChangeCheckboxAll = (e, pId) => {
    const newPermission = [...permissions];
    const p = newPermission.find((x) => x._id === pId);
    p.isCheckedAll = !p.isCheckedAll;
    p.childs = p.childs.map((c) => {
      c.isChecked = p.isCheckedAll;
      return c;
    });
    setPermission(newPermission);
    if (p.isCheckedAll) {
      createPermissionForRole({
        permissionKey: p.permissionKey,
        roleId: selectedRole?.id,
      });
      p.childs.map((c) =>
        createPermissionForRole({
          permissionKey: c.permissionKey,
          roleId: selectedRole?.id,
        }),
      );
    } else {
      deletePermissionForRole({
        permissionKey: p.permissionKey,
        roleId: selectedRole?.id,
      });
      const deleteRole = p.childs.map((c) =>
        deletePermissionForRole({
          permissionKey: c.permissionKey,
          roleId: selectedRole?.id,
        }),
      );
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div className="role-and-permission__title">
          {t('roleAndPermission')}
        </div>
        <Button type="primary" onClick={onClickNewRole}>
          {' '}
          + {t('newRole')}
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        className="activity-modal modal-common-container modal-authorize-common"
        placement="right"
        onClose={onClose}
        visible={visible}
        closable={false}
        title={t('role')}
      >
        {visible && (
          <div
            className="modal-common-close-icon"
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseOutlined />
          </div>
        )}

        <div className="modal-common-wrapper">
          <div>
            <div
              className="activity-modal__title"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {/* <span className="activity-modal__title-start">
            {t('role')} {'>>'}{' '}
          </span> */}
              <InputBlock
                type="title"
                value={selectedRole?.name || ''}
                autoFocus={false}
                onSubmit={async (value) => {
                  await renameRole(selectedRole?.id, { name: value });
                  getData();
                }}
                placeholder={t('role') + '...'}
                className="role-and-permission__checkbox"
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              {permissions.map((permission) => (
                <>
                  <Row className="role-and-permission__title">
                    <Checkbox
                      checked={permission.isCheckedAll}
                      onChange={(e) => onChangeCheckboxAll(e, permission._id)}
                    />{' '}
                    <span className="role-and-permission__checkbox">
                      {' '}
                      {permission.name}{' '}
                    </span>
                  </Row>
                  <Row>
                    {permission.childs.map((c) => (
                      <Col sm={12} key={c._id}>
                        <Checkbox
                          checked={c?.isChecked}
                          onChange={(e) =>
                            onChangeCheckboxChild(e, permission._id, c._id)
                          }
                        />
                        <span className="role-and-permission__checkbox">
                          {c.name}
                        </span>
                      </Col>
                    ))}
                  </Row>
                  <Divider />
                </>
              ))}
              {/* <Row className="role-and-permission__title">
            <Checkbox />{' '}
            <span className="role-and-permission__checkbox">
              {' '}
              {t('project')}{' '}
            </span>
          </Row>
          <Row>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('create')}
              </span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">{t('edit')}</span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('closeReopen')}
              </span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('manager')}
              </span>
            </Col>
          </Row>
          <Divider />
          <Row className="role-and-permission__title">
            <Checkbox />
            <span className="role-and-permission__checkbox">{t('phase')}</span>
          </Row>
          <Row>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('create')}
              </span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">{t('edit')}</span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('delete')}
              </span>
            </Col>
          </Row>
          <Divider />
          <Row className="role-and-permission__title">
            <Checkbox />
            <span className="role-and-permission__checkbox">{t('task')}</span>
          </Row>
          <Row>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('create')}
              </span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">{t('edit')}</span>
            </Col>
            <Col sm={12}>
              <Checkbox />
              <span className="role-and-permission__checkbox">
                {t('delete')}
              </span>
            </Col>
          </Row> */}
              <Row style={{ justifyContent: 'center' }} className="mt-2">
                <Button type="primary" onClick={onSubmitChangePermission}>
                  {t('save')}
                </Button>
              </Row>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RoleAndPermission;
