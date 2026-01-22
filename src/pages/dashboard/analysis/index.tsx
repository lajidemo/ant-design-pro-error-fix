import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Row, Spin } from 'antd';
import React from 'react';
import DataModule from './components/DataModule';
import SalesModule from './components/SalesModule';
import { useDashboardData } from './services';

const DashboardAnalysis: React.FC = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="数据加载失败"
        description="抱歉，当前无法获取数据，请稍后重试。"
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  if (!data) {
    return (
      <Alert
        message="暂无数据"
        description="暂无可用的数据分析信息。"
        type="info"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <DataModule data={data.dataModule} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card>
            <SalesModule data={data.salesModule} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAnalysis;
