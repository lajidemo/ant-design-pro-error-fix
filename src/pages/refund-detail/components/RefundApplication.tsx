import { FormattedMessage } from '@umijs/max';
import { Descriptions, Tag } from 'antd';
import React from 'react';

interface RefundApplicationProps {
  data: {
    refundNo: string;
    status: string;
    refundAmount: number;
    refundReason: string;
    description: string;
    createTime: string;
    refundMethod: string;
  };
}

const RefundApplication: React.FC<RefundApplicationProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    const statusMap = {
      pending: 'orange',
      approved: 'green',
      rejected: 'red',
      processing: 'blue',
      completed: 'cyan',
    };
    return statusMap[status as keyof typeof statusMap] || 'default';
  };

  const getStatusText = (status: string) => {
    const statusTextMap = {
      pending: '待审核',
      approved: '已批准',
      rejected: '已拒绝',
      processing: '处理中',
      completed: '已完成',
    };
    return statusTextMap[status as keyof typeof statusTextMap] || status;
  };

  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.no"
            defaultMessage="退款单号"
          />
        }
      >
        {data.refundNo}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.status"
            defaultMessage="退款状态"
          />
        }
      >
        <Tag color={getStatusColor(data.status)}>
          {getStatusText(data.status)}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.amount"
            defaultMessage="退款金额"
          />
        }
      >
        ¥{data.refundAmount.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.method"
            defaultMessage="退款方式"
          />
        }
      >
        {data.refundMethod}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.reason"
            defaultMessage="退款原因"
          />
        }
        span={2}
      >
        {data.refundReason}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.description"
            defaultMessage="问题描述"
          />
        }
        span={2}
      >
        {data.description}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.application.createTime"
            defaultMessage="申请时间"
          />
        }
      >
        {data.createTime}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default RefundApplication;
