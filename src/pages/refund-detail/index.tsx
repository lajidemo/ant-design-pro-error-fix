import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Descriptions, Space, Steps, Table, Tag, Timeline } from 'antd';
import React from 'react';
import RefundApplication from './components/RefundApplication';
import ReturnGoods from './components/ReturnGoods';
import ReturnProgress from './components/ReturnProgress';
import UserInfo from './components/UserInfo';
import { mockRefundData } from './mock/data';

const RefundDetail: React.FC = () => {
  const intl = useIntl();
  const { refundApplication, userInfo, returnGoods, returnProgress } =
    mockRefundData;

  return (
    <PageContainer
      title={intl.formatMessage({
        id: 'menu.refund-detail',
        defaultMessage: '退款详情',
      })}
      extra={
        <Space>
          <Button type="primary">
            {intl.formatMessage({
              id: 'refund.action.approve',
              defaultMessage: '批准退款',
            })}
          </Button>
          <Button>
            {intl.formatMessage({
              id: 'refund.action.reject',
              defaultMessage: '拒绝退款',
            })}
          </Button>
          <Button>
            {intl.formatMessage({
              id: 'refund.action.contact',
              defaultMessage: '联系客户',
            })}
          </Button>
        </Space>
      }
    >
      <ProCard direction="column" gutter={[16, 16]}>
        {/* 退款申请信息 */}
        <ProCard
          title={intl.formatMessage({
            id: 'refund.application.title',
            defaultMessage: '退款申请',
          })}
        >
          <RefundApplication data={refundApplication} />
        </ProCard>

        {/* 用户信息 */}
        <ProCard
          title={intl.formatMessage({
            id: 'refund.user.title',
            defaultMessage: '用户信息',
          })}
        >
          <UserInfo data={userInfo} />
        </ProCard>

        {/* 退货商品 */}
        <ProCard
          title={intl.formatMessage({
            id: 'refund.goods.title',
            defaultMessage: '退货商品',
          })}
        >
          <ReturnGoods data={returnGoods} />
        </ProCard>

        {/* 退货进度 */}
        <ProCard
          title={intl.formatMessage({
            id: 'refund.progress.title',
            defaultMessage: '退货进度',
          })}
        >
          <ReturnProgress data={returnProgress} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default RefundDetail;
