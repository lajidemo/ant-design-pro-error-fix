import { FormattedMessage } from '@umijs/max';
import { Image, Table, Tag } from 'antd';
import React from 'react';

interface ReturnGoodsProps {
  data: Array<{
    id: string;
    productName: string;
    productImage: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    reason: string;
    status: string;
  }>;
}

const ReturnGoods: React.FC<ReturnGoodsProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    const statusMap = {
      pending: 'orange',
      approved: 'green',
      rejected: 'red',
      received: 'blue',
      inspecting: 'cyan',
      completed: 'success',
    };
    return statusMap[status as keyof typeof statusMap] || 'default';
  };

  const getStatusText = (status: string) => {
    const statusTextMap = {
      pending: '待审核',
      approved: '已批准',
      rejected: '已拒绝',
      received: '已收货',
      inspecting: '检测中',
      completed: '已完成',
    };
    return statusTextMap[status as keyof typeof statusTextMap] || status;
  };

  const columns = [
    {
      title: (
        <FormattedMessage
          id="refund.goods.productImage"
          defaultMessage="商品图片"
        />
      ),
      dataIndex: 'productImage',
      key: 'productImage',
      render: (image: string) => (
        <Image
          width={80}
          height={80}
          src={image}
          alt="product"
          style={{ objectFit: 'cover' }}
        />
      ),
      width: 120,
    },
    {
      title: (
        <FormattedMessage
          id="refund.goods.productName"
          defaultMessage="商品名称"
        />
      ),
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <div style={{ maxWidth: 200 }}>{text}</div>,
    },
    {
      title: <FormattedMessage id="refund.goods.sku" defaultMessage="SKU" />,
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
    },
    {
      title: (
        <FormattedMessage
          id="refund.goods.quantity"
          defaultMessage="退货数量"
        />
      ),
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: (
        <FormattedMessage id="refund.goods.unitPrice" defaultMessage="单价" />
      ),
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
      width: 100,
    },
    {
      title: (
        <FormattedMessage id="refund.goods.totalPrice" defaultMessage="小计" />
      ),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
      width: 100,
    },
    {
      title: (
        <FormattedMessage id="refund.goods.reason" defaultMessage="退货原因" />
      ),
      dataIndex: 'reason',
      key: 'reason',
      render: (text: string) => <div style={{ maxWidth: 150 }}>{text}</div>,
    },
    {
      title: (
        <FormattedMessage id="refund.goods.status" defaultMessage="状态" />
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
      width: 100,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={false}
      scroll={{ x: 800 }}
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={5}>
            <strong>总计：</strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <strong>
              ¥{data.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
            </strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={2} />
        </Table.Summary.Row>
      )}
    />
  );
};

export default ReturnGoods;
