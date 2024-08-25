import { Layout } from 'antd';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const { Sider, Content, Header } = Layout;

type Props = {};

const Field: FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <div>Field</div>;
};

export default Field;
