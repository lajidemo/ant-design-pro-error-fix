import { useEffect, useState } from 'react';

const mockData = {
  dataModule: {
    totalSales: {
      total: 1234567.89,
      weekOnWeek: 12.5,
      dayOnDay: 8.3,
      dailySales: 156789.45,
    },
    visits: {
      total: 987654,
      dailyVisits: 12345,
    },
    payments: {
      total: 54321,
      conversionRate: 12.5,
    },
  },
  salesModule: {
    filter: {
      year: 2023,
      month: 6,
      day: 15,
    },
    chartData: [
      { name: '周一', value: 12345.67 },
      { name: '周二', value: 23456.78 },
      { name: '周三', value: 34567.89 },
      { name: '周四', value: 45678.9 },
      { name: '周五', value: 56789.01 },
      { name: '周六', value: 67890.12 },
      { name: '周日', value: 78901.23 },
    ],
    storeRanking: [
      { rank: 1, storeName: '北京朝阳店', sales: 123456.78 },
      { rank: 2, storeName: '上海浦东店', sales: 234567.89 },
      { rank: 3, storeName: '广州天河店', sales: 345678.9 },
      { rank: 4, storeName: '深圳南山店', sales: 456789.01 },
      { rank: 5, storeName: '杭州西湖店', sales: 567890.12 },
    ],
  },
};

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
