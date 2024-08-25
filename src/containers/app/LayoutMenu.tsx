import { Image, Layout, Menu, Tabs } from 'antd';
import i18n from 'i18next';
import { FC, ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppstoreOutlined,
  BellOutlined,
  DropboxOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { faLanguage, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@assets/scss/LayoutMenu.scss';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectors } from '@plugins/store/helpers/selectors';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

type Props = {};

const LayoutMenu: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="slide-left-bar" collapsed={true}>
        <div className="flex-col-between" style={{ height: '100%' }}>
          <Menu
            theme="dark"
            className="side-bar-top"
            mode="inline"
            triggerSubMenuAction="hover"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item
              key="0"
              className="flex-jcenter menu-hover"
              icon={
                <Image
                  className="icon-home-page"
                  width={50}
                  style={{ borderRadius: '100%' }}
                  //   src={process.env.PUBLIC_URL + '../logo192.png'}
                  preview={false}
                />
              }
              title="Home Page"
            >
              <Link to={'/'}></Link>
            </Menu.Item>

            <Menu.Item
              className="flex-jcenter menu-hover"
              key="checklist"
              style={{ marginTop: '30px' }}
              icon={<FontAwesomeIcon className="icon-menu" icon={faTasks} />}
            >
              <div>Dashboard</div>
            </Menu.Item>

            <Menu.Item
              key="1"
              className="flex-jcenter menu-hover"
              icon={<AppstoreOutlined className="icon-menu" />}
              // onClick={() => this.props.handleTemplateModal(true)}
            >
              <Link to={`/projects/1`}>
                <span style={{ color: '#fff' }}>{t('workspace')}</span>
              </Link>
            </Menu.Item>

            <Menu.Item
              className="flex-jcenter menu-hover"
              key="2222222"
              icon={<BellOutlined className="icon-menu" />}
              onClick={() => null}
            ></Menu.Item>
          </Menu>

          <Menu
            theme="dark"
            className="side-bar-bottom"
            mode="inline"
            triggerSubMenuAction="hover"
            // defaultSelectedKeys={[0]}
          >
            <Menu.Item
              key="multi-language"
              className="flex-jcenter menu-hover"
              icon={<FontAwesomeIcon className="icon-menu" icon={faLanguage} />}
              onClick={() => null}
            >
              <Link to={'#'}>
                <span style={{ color: '#fff' }}>{t('multiLanguage')}</span>
              </Link>
            </Menu.Item>

            <Menu.Item
              key="1111"
              className="flex-jcenter menu-hover"
              // icon={t('key')}
              // onClick={() => this.props.handleTemplateModal(true)}
            >
              <Link
                to={'#'}
                onClick={(e) => {
                  e.preventDefault();
                  const lng = t('key') === 'vi' ? 'en' : 'vi';
                  localStorage.setItem('language', lng);
                  i18n.changeLanguage(lng);
                }}
              >
                <span style={{ color: '#fff' }}>{t('key')}</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="11"
              className="flex-jcenter menu-hover"
              icon={<DropboxOutlined className="icon-menu" />}
              // onClick={() => this.props.handleTemplateModal(true)}
            >
              <Link to={'/test-socket'}>
                <span style={{ color: '#fff' }}>SocketIO</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="flex-jcenter menu-hover"
              key="3"
              style={{ marginBottom: '20px' }}
              icon={<SettingOutlined className="icon-menu" />}
            >
              <Link to={'/app/settings'}>
                <span style={{ color: '#fff' }}>{t('settings')}</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <div id="calculate-size-text"></div>
    </Layout>
  );
  //   return (
  //     <div>
  //       Home
  //       <FontAwesomeIcon className="icon-menu" icon={faTasks} />
  //     </div>
  //   );
};

LayoutMenu.defaultProps = {};

export default LayoutMenu;
