// Mock data for refund detail page
export interface RefundApplicationData {
  refundNo: string;
  status: string;
  refundAmount: number;
  refundReason: string;
  description: string;
  createTime: string;
  refundMethod: string;
}

export interface UserInfoData {
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
}

export interface ReturnGoodsData {
  id: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  reason: string;
  status: string;
}

export interface ReturnProgressData {
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
}

export interface RefundDetailData {
  refundApplication: RefundApplicationData;
  userInfo: UserInfoData;
  returnGoods: ReturnGoodsData[];
  returnProgress: ReturnProgressData;
}

export const mockRefundData: RefundDetailData = {
  // 退款申请信息
  refundApplication: {
    refundNo: 'R202412200001',
    status: 'pending',
    refundAmount: 299.00,
    refundReason: '商品质量问题',
    description: '收到的商品存在明显的质量缺陷，与描述不符，要求退货退款。商品包装破损，影响使用体验。希望能够尽快处理退款申请。',
    createTime: '2024-12-20 10:30:25',
    refundMethod: '原路退回',
  },

  // 用户信息
  userInfo: {
    userId: 'U123456789',
    userName: 'zhangsan123',
    nickName: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXu1y/kael.png',
    registrationTime: '2023-01-15 14:20:30',
    vipLevel: '金卡会员',
    totalOrders: 45,
    totalAmount: 12580.50,
  },

  // 退货商品
  returnGoods: [
    {
      id: 'RG001',
      productName: 'Apple iPhone 15 Pro Max 256GB 深空黑色',
      productImage: 'https://img.alicdn.com/imgextra/i4/6000000001916/O1CN01Q8jK3T1DmGxXxYzYz_!!6000000001916-0-ps.jpg',
      sku: 'IPHONE15PROMAX-256GB-BLK',
      quantity: 1,
      unitPrice: 9999.00,
      totalPrice: 9999.00,
      reason: '商品质量问题',
      status: 'pending',
    },
    {
      id: 'RG002',
      productName: 'Apple MagSafe 无线充电器',
      productImage: 'https://img.alicdn.com/imgextra/i3/6000000007886/O1CN01zX9j3H1DmGxYwZxYz_!!6000000007886-0-ps.jpg',
      sku: 'MAGSAFE-CHARGER-WHT',
      quantity: 2,
      unitPrice: 329.00,
      totalPrice: 658.00,
      reason: '商品质量问题',
      status: 'pending',
    },
  ],

  // 退货进度
  returnProgress: {
    currentStep: 1,
    steps: [
      {
        title: '提交申请',
        description: '用户已提交退货申请',
        status: 'finish',
        time: '2024-12-20 10:30:25',
      },
      {
        title: '商家审核',
        description: '商家正在审核退货申请',
        status: 'process',
      },
      {
        title: '退货寄回',
        description: '用户寄回退货商品',
        status: 'wait',
      },
      {
        title: '商家收货',
        description: '商家确认收货',
        status: 'wait',
      },
      {
        title: '退款处理',
        description: '处理退款到账',
        status: 'wait',
      },
    ],
    timeline: [
      {
        time: '2024-12-20 10:30:25',
        content: '用户提交退货申请，退款单号：R202412200001',
        type: 'info',
      },
      {
        time: '2024-12-20 10:35:18',
        content: '系统已自动分配客服处理',
        type: 'info',
      },
      {
        time: '2024-12-20 11:20:45',
        content: '客服正在审核退货申请，预计1-3个工作日完成',
        type: 'warning',
      },
    ],
    logistics: {
      company: '顺丰速运',
      trackingNumber: 'SF1234567890123',
      currentLocation: '【北京市】快件已到达北京转运中心',
      estimatedDelivery: '2024-12-21 18:00:00',
    },
  },
};

// 额外的模拟数据用于测试不同状态
export const mockRefundDataApproved: RefundDetailData = {
  ...mockRefundData,
  refundApplication: {
    ...mockRefundData.refundApplication,
    status: 'approved',
  },
  returnProgress: {
    ...mockRefundData.returnProgress,
    currentStep: 4,
    steps: mockRefundData.returnProgress.steps.map((step, index) => ({
      ...step,
      status: index < 4 ? 'finish' : index === 4 ? 'process' : 'wait' as const,
    })),
  },
};

export const mockRefundDataCompleted: RefundDetailData = {
  ...mockRefundData,
  refundApplication: {
    ...mockRefundData.refundApplication,
    status: 'completed',
  },
  returnProgress: {
    ...mockRefundData.returnProgress,
    currentStep: 5,
    steps: mockRefundData.returnProgress.steps.map((step, index) => ({
      ...step,
      status: 'finish' as const,
    })),
  },
};