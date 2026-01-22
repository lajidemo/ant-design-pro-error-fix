import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

interface DataModuleProps {
  data: {
    totalSales: {
      total: number;
      weekOnWeek: number;
      dayOnDay: number;
      dailySales: number;
    };
    visits: {
      total: number;
      dailyVisits: number;
    };
    payments: {
      total: number;
      conversionRate: number;
    };
  };
}

const DataModule: React.FC<DataModuleProps> = ({ data }) => {
  const { totalSales, visits, payments } = data;

  const getTrendIcon = (value: number) => {
    if (value >= 0) {
      return <ArrowUpOutlined style={{ color: '#3f8600' }} />;
    }
    return <ArrowDownOutlined style={{ color: '#cf1322' }} />;
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card>
          <Statistic
            title="总销售额"
            value={totalSales.total}
            prefix={<ShoppingCartOutlined style={{ color: '#1890ff' }} />}
            suffix="¥"
          />
          <div style={{ marginTop: 16, fontSize: 14 }}>
            <span style={{ color: '#8c8c8c' }}>周同比 </span>
            {getTrendIcon(totalSales.weekOnWeek)}
            <span
              style={{
                color: totalSales.weekOnWeek >= 0 ? '#3f8600' : '#cf1322',
              }}
            >
              {totalSales.weekOnWeek}%
            </span>
            <span style={{ marginLeft: 16, color: '#8c8c8c' }}>日同比 </span>
            {getTrendIcon(totalSales.dayOnDay)}
            <span
              style={{
                color: totalSales.dayOnDay >= 0 ? '#3f8600' : '#cf1322',
              }}
            >
              {totalSales.dayOnDay}%
            </span>
          </div>
          <div style={{ marginTop: 16, color: '#8c8c8c' }}>
            日销售额: ¥{totalSales.dailySales}
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="访问量"
            value={visits.total}
            prefix={<EyeOutlined style={{ color: '#52c41a' }} />}
            suffix="次"
          />
          <div style={{ marginTop: 16, color: '#8c8c8c' }}>
            日访问量: {visits.dailyVisits}次
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="支付笔数"
            value={payments.total}
            prefix={<TransactionOutlined style={{ color: '#faad14' }} />}
            suffix="笔"
          />
          <div style={{ marginTop: 16, color: '#8c8c8c' }}>
            转化率: {payments.conversionRate}%
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DataModule;
