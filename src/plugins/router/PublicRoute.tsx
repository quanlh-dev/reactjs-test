import { FC, ReactNode } from 'react';

type Props = { children: ReactNode };

const PublicRoute: FC<Props> = (props: Props) => {
  const { children } = props;
  return <>{children}</>;
};
export default PublicRoute;
