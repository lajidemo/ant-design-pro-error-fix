import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { Avatar, Descriptions, Tag } from 'antd';
import React from 'react';

interface UserInfoProps {
  data: {
    userId: string;
    userName: string;
    nickName: string;
    email: string;
    phone: string;
    avatar: string;
    registrationTime: string;
    vipLevel: string;
    totalOrders: number;
    totalAmount: number;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ data }) => {
  const getVipLevelColor = (level: string) => {
    const levelMap = {
      普通会员: 'default',
      银卡会员: 'silver',
      金卡会员: 'gold',
      白金会员: 'processing',
      钻石会员: 'purple',
    };
    return levelMap[level as keyof typeof levelMap] || 'default';
  };

  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.avatar" defaultMessage="用户头像" />
        }
      >
        <Avatar size={64} src={data.avatar} icon={<UserOutlined />} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.user.vipLevel"
            defaultMessage="会员等级"
          />
        }
      >
        <Tag color={getVipLevelColor(data.vipLevel)}>{data.vipLevel}</Tag>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.userId" defaultMessage="用户ID" />
        }
      >
        {data.userId}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.userName" defaultMessage="用户名" />
        }
      >
        {data.userName}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.nickName" defaultMessage="昵称" />
        }
      >
        {data.nickName}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.email" defaultMessage="邮箱" />
        }
      >
        {data.email}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="refund.user.phone" defaultMessage="手机号" />
        }
      >
        {data.phone}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.user.registrationTime"
            defaultMessage="注册时间"
          />
        }
      >
        {data.registrationTime}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.user.totalOrders"
            defaultMessage="历史订单"
          />
        }
      >
        {data.totalOrders} 笔
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage
            id="refund.user.totalAmount"
            defaultMessage="累计消费"
          />
        }
      >
        ¥{data.totalAmount.toFixed(2)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserInfo;
