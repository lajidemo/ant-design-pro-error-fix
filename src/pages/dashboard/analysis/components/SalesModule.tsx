import { Card, Col, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import BarChart from './BarChart';

interface SalesModuleProps {
  data: {
    filter: {
      year: number;
      month: number;
      day: number;
    };
    chartData: {
      name: string;
      value: number;
    }[];
    storeRanking: {
      rank: number;
      storeName: string;
      sales: number;
    }[];
  };
}

const SalesModule: React.FC<SalesModuleProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(data.filter.year);
  const [selectedMonth, setSelectedMonth] = useState(data.filter.month);
  const [selectedDay, setSelectedDay] = useState(data.filter.day);

  const years = [2021, 2022, 2023, 2024, 2025];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => (
        <span style={{ color: rank <= 3 ? '#faad14' : undefined }}>{rank}</span>
      ),
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => `¥${sales.toLocaleString()}`,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            style={{ width: '100%' }}
            placeholder="选择年份"
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}年
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={selectedMonth}
            onChange={setSelectedMonth}
            style={{ width: '100%' }}
            placeholder="选择月份"
          >
            {months.map((month) => (
              <Select.Option key={month} value={month}>
                {month}月
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={selectedDay}
            onChange={setSelectedDay}
            style={{ width: '100%' }}
            placeholder="选择日期"
          >
            {days.map((day) => (
              <Select.Option key={day} value={day}>
                {day}日
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="销售趋势">
            <BarChart data={data.chartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="门店销售排名">
            <Table
              dataSource={data.storeRanking}
              columns={columns}
              rowKey="rank"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesModule;
