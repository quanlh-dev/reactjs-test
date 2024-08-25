import { useAuth } from '@utils/hooks';
import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = { children: ReactElement };

const PrivateRoute: FC<Props> = (props: Props) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
