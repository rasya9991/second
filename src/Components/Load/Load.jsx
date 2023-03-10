import React from 'react';
import { Alert, Space, Spin } from 'antd';
import './Load.css';

const Load = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Spin tip="Waiting..." size={'large'}>
      <Alert message="Waiting for connection" description="Check your internet connection" type="info" />
    </Spin>
  </Space>
);

export default Load;
