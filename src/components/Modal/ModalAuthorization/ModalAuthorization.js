import React, { useEffect, useMemo, useState } from 'react';
import { Col, Modal, Row, Tooltip } from 'antd';
import 'components/Modal/ModalAuthorization/ModalAuthorization.scss';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { select } from 'utils/reselect';
import { TabContent, TabPane } from 'reactstrap';
import UserAuthorization from './components/UserAuthorization/UserAuthorization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import RoleAndPermission from './components/RoleAndPermissions';
import Authorization from './components/Authorization';
import { useTranslation } from 'react-i18next';
import GroupAuthorization from './components/GroupAuthorization/GroupAuthorization';

const ModalAuthorization = ({
  visibleModalAuthorization = false,
  setVisibleModalAuthorization = function () {},
}) => {
  const projectDetail = useSelector((state) =>
    select(state, 'workspace.currentProject.detail', {}),
  );

  const [visibleAddMember, setVisibleAddMember] = useState(false);
  const [visibleAddGroup, setVisibleAddGroup] = useState(false);

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div id="modal-authorization-container">
      <Modal
        className="modal-authorization"
        title=""
        visible={visibleModalAuthorization}
        // visible={true}
        onCancel={() => {
          setVisibleModalAuthorization(false);
        }}
        width={'80vw'}
        footer={null}
        style={{ padding: 0 }}
      >
        <div>
          <h5 className="ant-drawer-header p-4">{projectDetail?.name}</h5>
          <div className="nav-tab-authorization px-4">
            <div
              className={`nav-item-tab-authorization ${
                activeTab == '1' ? 'nav-item-tab-authorization-active' : ''
              }`}
              onClick={() => {
                setActiveTab('1');
              }}
            >
              <FontAwesomeIcon icon={faUserCog} />
              <span>{t('user')}</span>
            </div>

            <div
              className={`nav-item-tab-authorization ${
                activeTab == '2' ? 'nav-item-tab-authorization-active' : ''
              }`}
              onClick={() => {
                setActiveTab('2');
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>{t('group')}</span>
            </div>

            <div
              className={`nav-item-tab-authorization ${
                activeTab == '3' ? 'nav-item-tab-authorization-active' : ''
              }`}
              onClick={() => {
                setActiveTab('3');
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>{t('roleAndPermission')}</span>
            </div>
            <div
              className={`nav-item-tab-authorization ${
                activeTab == '4' ? 'nav-item-tab-authorization-active' : ''
              }`}
              onClick={() => {
                setActiveTab('4');
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>Phân quyền</span>
            </div>
          </div>
          <TabContent activeTab={activeTab} className="px-4">
            <TabPane tabId="1">
              <div className="tab-authorization-wrapper">
                <UserAuthorization
                  visibleAddMember={visibleAddMember}
                  onChangeVisibleAddMember={setVisibleAddMember}
                />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="tab-authorization-wrapper">
                <GroupAuthorization
                  visibleAddGroup={visibleAddGroup}
                  onChangeVisibleAddGroup={setVisibleAddGroup}
                />
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="tab-authorization-wrapper">
                <div>
                  <RoleAndPermission />
                </div>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="tab-authorization-wrapper">
                <div>
                  <Authorization
                    onChangeVisibleAddMember={setVisibleAddMember}
                    onChangeVisibleAddGroup={setVisibleAddGroup}
                  />
                  />
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAuthorization;
