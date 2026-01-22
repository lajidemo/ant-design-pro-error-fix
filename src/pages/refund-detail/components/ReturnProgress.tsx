import { FormattedMessage } from '@umijs/max';
import { Card, Descriptions, Steps, Timeline } from 'antd';
import React from 'react';

interface ReturnProgressProps {
  data: {
    currentStep: number;
    steps: Array<{
      title: string;
      description: string;
      status: 'wait' | 'process' | 'finish' | 'error';
      time?: string;
    }>;
    timeline: Array<{
      time: string;
      content: string;
      type?: 'success' | 'error' | 'info' | 'warning' | 'danger';
    }>;
    logistics?: {
      company: string;
      trackingNumber: string;
      currentLocation: string;
      estimatedDelivery: string;
    };
  };
}

const ReturnProgress: React.FC<ReturnProgressProps> = ({ data }) => {
  const { currentStep, steps, timeline, logistics } = data;

  return (
    <div>
      {/* 进度步骤 */}
      <Card
        title={
          <FormattedMessage
            id="refund.progress.steps"
            defaultMessage="退货进度"
          />
        }
        style={{ marginBottom: 16 }}
      >
        <Steps
          current={currentStep}
          items={steps.map((step, index) => ({
            title: step.title,
            description: step.description,
            status: step.status,
          }))}
        />
      </Card>

      {/* 时间轴 */}
      <Card
        title={
          <FormattedMessage
            id="refund.progress.timeline"
            defaultMessage="操作记录"
          />
        }
        style={{ marginBottom: 16 }}
      >
        <Timeline
          items={timeline.map((item) => ({
            children: (
              <div>
                <div style={{ color: '#666', fontSize: 12 }}>{item.time}</div>
                <div>{item.content}</div>
              </div>
            ),
            color:
              item.type === 'error'
                ? 'red'
                : item.type === 'success'
                  ? 'green'
                  : 'blue',
          }))}
        />
      </Card>

      {/* 物流信息 */}
      {logistics && (
        <Card
          title={
            <FormattedMessage
              id="refund.progress.logistics"
              defaultMessage="物流信息"
            />
          }
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="refund.logistics.company"
                  defaultMessage="物流公司"
                />
              }
            >
              {logistics.company}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="refund.logistics.trackingNumber"
                  defaultMessage="运单号"
                />
              }
            >
              {logistics.trackingNumber}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="refund.logistics.currentLocation"
                  defaultMessage="当前位置"
                />
              }
              span={2}
            >
              {logistics.currentLocation}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="refund.logistics.estimatedDelivery"
                  defaultMessage="预计送达"
                />
              }
            >
              {logistics.estimatedDelivery}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default ReturnProgress;
