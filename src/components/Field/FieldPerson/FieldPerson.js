import React, { useEffect, useState } from 'react';
import 'components/Field/FieldPerson/FieldPerson.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faPlusCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import userIcon from 'assets/images/user-outline.svg';
import userIconDefault from 'assets/images/dapulse_default_photo.png';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Scrollbars from 'react-custom-scrollbars';
import { Tooltip } from 'antd';
import UserApi from './UserApi.js';
import { GET } from 'containers/app/screens/Kanban/data-source/fetch';

function FieldPerson(props) {
  let { value = [], onSubmit = (value) => {}, className = '' } = props;
  if (!Array.isArray(value) || !value) {
    value = [];
  }
  const checkAssignPeople = (peopleId) => {
    const result = peopleValue.find((people) => {
      return people === peopleId;
    });
    return result ? true : false;
  };
  const listPersons = useSelector((state) => state.user.listPersons);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [peopleInput, setPeopleInput] = useState('');
  const [peopleValue, setPeopleValue] = useState(value);
  const [listPersonSelect, setListPersonSelect] = useState(listPersons);
  const [timeState, setTimeState] = useState(prettyDate2(new Date()));

  const handleVisibleChange = (flag) => {
    setVisible(flag);
    if (!flag) {
      setPeopleInput('');
    }
  };
  // let timeDelayInput = null;
  const handlePeopleInput = async (e) => {
    let value = e.target.value;
    setPeopleInput(value);
    const listPersonResult = await UserApi.listPersons({
      page: 1,
      perPage: 500,
      name: value,
    });
    listPersonResult.data = listPersonResult.data.filter(
      (person) => !checkAssignPeople(person._id),
    );
    setListPersonSelect(listPersonResult.data);
  };

  const handleScroll = function () {
    setVisible(false);
  };

  const handleAssignPerson = (person) => {
    setVisible(false);
    const peopleValueTmp = [...peopleValue, person._id];
    setPeopleValue(peopleValueTmp);
    onSubmit(peopleValueTmp);
  };

  const handleDeleteAssign = (person) => {
    let peopleValueTmp = peopleValue.filter((people) => person._id !== people);
    setPeopleValue(peopleValueTmp);
    onSubmit(peopleValueTmp);
  };

  const getDetailPerson = (personId) => {
    return listPersons.find((person) => personId === person._id);
  };

  function prettyDate2(date) {
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  useEffect(() => {
    const timeReset = setInterval(() => {
      setTimeState(prettyDate2(new Date()));
    }, 1000);
    if (document.getElementById('main-table-content')) {
      document
        .getElementById('main-table-content')
        .addEventListener('scroll', handleScroll);
    }
    return () => {
      clearInterval(timeReset);
      if (document.getElementById('main-table-content')) {
        document
          .getElementById('main-table-content')
          .removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  useEffect(() => {
    if (value.length !== 0) {
      setPeopleValue(value);
    }
  }, [value]);

  return (
    <Dropdown
      overlay={
        <Menu
          style={{
            paddingTop: '0px',
            width: '250px',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {peopleValue.length !== 0 && (
            <div
              key="1"
              style={{
                padding: '10px 10px 0px 10px',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {peopleValue.map((personId, index) => {
                let person = listPersons.find(
                  (personState) => personState._id === personId,
                );
                return person ? (
                  <div key={personId} className="field-person__assign-item">
                    <img
                      className="field-person__assign-avatar"
                      src={userIconDefault || person.profilePictureId}
                      alt=""
                    />
                    <div key={personId} className="field-person__assign">
                      <div className="field-person__assign-name">
                        <Tooltip title={person.name + ' ' + person.surname}>
                          <span>{person.name + ' ' + person.surname}</span>
                        </Tooltip>
                        <div
                          className="field-person__assign-close"
                          onClick={() => handleDeleteAssign(person)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                );
              })}
            </div>
          )}
          <Menu.Item key="2" style={{ padding: '0px' }}>
            <input
              className="field-person__input"
              placeholder={t('field.person.entername')}
              bordered={false}
              value={peopleInput}
              onChange={handlePeopleInput}
            />
          </Menu.Item>
          <div className="field-person__divider-people">
            {t('field.person.people')}
          </div>
          {/* {peopleValue.length === listPersons.length && (
            <div style={{ textAlign: 'center', padding: '6px 0px' }}>
              {t('field.person.allpeoplewasassigned')}
            </div>
          )} */}
          {listPersonSelect.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4px 0px' }}>
              {t('field.person.nopersonfound')}
            </div>
          )}
          <Scrollbars autoHeight autoHeightMax={200}>
            {listPersonSelect.map((person, index) => {
              if (!checkAssignPeople(person._id)) {
                return (
                  <div
                    className="field-person__item"
                    key={person._id}
                    onClick={() => handleAssignPerson(person)}
                    key={person._id}
                  >
                    <div className="field-person__user">
                      <div className="field-person__user-avatar">
                        <img src={person.profilePictureId || userIcon} alt="" />
                      </div>
                      <div className="field-person__user-name">
                        {person.name + ' ' + person.surname}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </Scrollbars>
        </Menu>
      }
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
      placement="bottomLeft"
      // getPopupContainer={() => document.getElementById("abcxyz")}
    >
      <div className={`field-person ${className}`}>
        <FontAwesomeIcon className="field-person__icon" icon={faPlusCircle} />
        <div className="field-person__img">
          <div className="field-person__img-list">
            {peopleValue.length === 0 && (
              <img className="field-person__img-item" src={userIcon} alt="" />
            )}
            {peopleValue.map((personId, index) => {
              const detailPerson = getDetailPerson(personId);
              if (index === 2) {
                return (
                  <div className="field-person__more">
                    +{peopleValue.length - 2}
                  </div>
                );
              }
              if (index > 2) {
                return <div></div>;
              }
              return (
                detailPerson &&
                index < 2 && (
                  <Dropdown
                    key={detailPerson._id}
                    placement={'topCenter'}
                    overlay={
                      <div className="field-person__detail">
                        <div className="field-person__detail-img-box">
                          <img
                            className="field-person__detail-img"
                            src={
                              userIconDefault || detailPerson?.profilePictureId
                            }
                            alt=""
                          />
                        </div>
                        <div className="field-person__detail-col">
                          <div className="field-person__detail-name">
                            {detailPerson.name + ' ' + detailPerson.surname}
                          </div>
                          <div className="field-person__detail-time">
                            <FontAwesomeIcon
                              className="field-person__detail-setting-icon"
                              icon={faCog}
                            />
                            <div className="field-person__detail-time-utc">
                              {timeState}
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <img
                      className="field-person__img-item"
                      src={userIconDefault || detailPerson?.profilePictureId}
                      alt=""
                    />
                  </Dropdown>
                )
              );
            })}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export default FieldPerson;
