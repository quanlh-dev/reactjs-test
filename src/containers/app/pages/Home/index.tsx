import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {};

const Home: FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <div>Home</div>;
};

export default Home;
