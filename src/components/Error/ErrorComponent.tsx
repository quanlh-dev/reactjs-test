import React, { ErrorInfo, FC } from 'react';

type Props = {
  error: Error;
  errorInfo?: ErrorInfo;
  onReset(): void;
};

const ErrorComponent: FC<Props> = (props: Props) => {
  return <div>ErrorComponent</div>;
};

export default ErrorComponent;
