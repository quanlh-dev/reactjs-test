import React from 'react';
import { Result, Button } from 'antd';

function NotFound(params) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <a href="/">Back to Home</a>
        </Button>
      }
    />
  );
}

export default NotFound;
