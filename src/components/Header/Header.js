import React from 'react';
import './Header.scss';
import { Layout, Image, Avatar, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faComment,
  faQuestionCircle,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import history from 'utils/history';
import { LOCAL_STORAGE } from 'utils/localStorage';

const { Header } = Layout;

const CustomHeader = (props) => {
  const { t } = useTranslation();

  return (
    <Header className="header-container">
      <div className="header-wrapper">
        <div className="header__title-icon">
          <Image
            preview={false}
            src="https://www.giamdoc.net/uploads/6/2/0/3/62039985/published/quan-ly-doanh-nghiep_1.png"
          />
        </div>
        <div className="header__action">
          <FontAwesomeIcon className="header__action-item" icon={faSearch} />
          <FontAwesomeIcon className="header__action-item" icon={faUser} />
          <FontAwesomeIcon
            className="header__action-item"
            icon={faQuestionCircle}
          />
          <FontAwesomeIcon className="header__action-item" icon={faComment} />
          <FontAwesomeIcon className="header__action-item" icon={faBell} />

          <Dropdown
            overlay={
              <div>
                <Menu>
                  <Menu.Item
                    key="logout"
                    onClick={() => {
                      localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
                      history.push({
                        pathname: '/login',
                      });
                    }}
                  >
                    {t('logout')}
                  </Menu.Item>
                </Menu>
              </div>
            }
          >
            <Avatar
              style={{ marginLeft: '15px' }}
              src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
