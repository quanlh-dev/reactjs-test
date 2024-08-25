import { Checkbox, Dropdown, Table } from 'antd';
import { select } from 'utils/reselect';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, DropdownItem } from './styled';
import axiosClient from 'api/axiosClient';
import userIcon from 'assets/userIcon.svg';
import groupIcon from 'assets/groupIcon.svg';
import arrowDown from 'assets/arrowDown.svg';

const { Column } = Table;

const Authorization = ({
  onChangeVisibleAddMember,
  onChangeVisibleAddGroup,
}) => {
  const [listMember, setListMember] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [tableData, setTableData] = useState([]);

  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );
  useEffect(() => {
    getData();
  }, [projectDetail]);

  const getData = () => {
    if (projectDetail?._id) {
      axiosClient
        .get(`/api/project_members/members?projectId=${projectDetail._id}`)
        .then((res) => setListMember(res.data.items));

      axiosClient
        .get(`/api/auth/roles?projectId=${projectDetail._id}`)
        .then((res) => setListRole(res.data));
    }
  };

  useEffect(() => {
    const temp = listMember.map((item, index) => ({
      key: item._id,
      name: item.group
        ? {
            ...item.group,
            type: 'group',
          }
        : {
            ...item.user,
            type: 'user',
            name: `${item.user?.name} ${item.user?.surname}`,
          },
      informations: {
        rowId: item._id,
        type: item.group ? 'group' : 'user',
        roles: item.roles,
      },
    }));

    setTableData(temp);
  }, [listMember]);

  const onChangeRole = (rowId, roleId, isAdd, rowType) => {
    // console.log(isAdd);
    if (isAdd) {
      axiosClient
        .post(`/api/project_role/${rowType}`, {
          projectId: projectDetail._id,
          [`${rowType}Id`]: rowId,
          roleId,
        })
        .then(getData);
    } else {
      axiosClient
        .delete(`/api/project_role/${rowType}`, {
          projectId: projectDetail._id,
          [`${rowType}Id`]: rowId,
          roleId,
        })
        .then(getData);
    }
  };
  const DropdownContent = () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <DropdownItem
        key="0"
        onClick={() => {
          onChangeVisibleAddMember(true);
        }}
      >
        Add member
      </DropdownItem>
      <DropdownItem onClick={() => onChangeVisibleAddGroup(true)}>
        Add group
      </DropdownItem>
    </div>
  );

  return (
    <Container>
      <Dropdown
        overlayStyle={{
          boxShadow:
            '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
        }}
        placement="bottomLeft"
        trigger="click"
        overlay={<DropdownContent />}
      >
        <Button>
          <span style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>
            +Add member
          </span>
          <img src={arrowDown} alt="" />
        </Button>
      </Dropdown>
      <Table
        scroll={{ x: 1500, y: 500 }}
        dataSource={tableData}
        pagination={false}
        style={{
          border: '1px solid #3187af',
          paddingLeft: '4px',
          paddingRight: '4px',
          paddingTop: '4px',
        }}
      >
        <Column
          title="Name"
          width={200}
          dataIndex="name"
          key="name"
          fixed="left"
          render={(name) =>
            name ? (
              <div>
                <img
                  src={name.type === 'group' ? groupIcon : userIcon}
                  alt=""
                  style={{ marginRight: '12px' }}
                />
                <span
                  style={{
                    color: '#414042',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {name.name}
                </span>
              </div>
            ) : null
          }
        />
        {listRole.map((item) => (
          <Column
            title={item.name}
            dataIndex="informations"
            align="center"
            key={item.id}
            render={(information) => {
              return (
                <Checkbox
                  color="blue"
                  onChange={(e) =>
                    onChangeRole(
                      information.rowId,
                      item.id,
                      e.target.checked,
                      information.type,
                    )
                  }
                  checked={
                    information.roles.filter((role) => role.id === item.id)
                      .length
                  }
                />
              );
            }}
          />
        ))}
      </Table>
    </Container>
  );
};

export default Authorization;
