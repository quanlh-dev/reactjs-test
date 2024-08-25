import React, { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
// import { loginAction, registerAction } from '../../redux/actions/authAction';
import { Spin } from 'antd';

const Auth = (props) => {
  const dispatch = useDispatch();
  // const { isAuthRequesting } = useSelector((state) => state.user);
  // useEffect(() => {
  //   // debugger
  //   dispatch(auth());
  //   console.log('authenticating...');
  // }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Auth;
