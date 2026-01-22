import { type FormItemProps, Input, Select } from 'antd';
import React from 'react';

const { TextArea } = Input;

const { Option } = Select;

// 表单字段配置类型
export interface FormFieldConfig {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  componentProps?: any;
  rules?: FormItemProps['rules'];
  required?: boolean;
}

// 省市区数据
const provinces = ['北京市', '上海市', '广东省'];
const cities = {
  北京市: ['北京市'],
  上海市: ['上海市'],
  广东省: ['广州市', '深圳市'],
};
const districts = {
  北京市: ['朝阳区', '海淀区'],
  上海市: ['浦东新区', '静安区'],
  广州市: ['天河区', '越秀区'],
  深圳市: ['南山区', '福田区'],
};

// 个人设置表单配置
export const profileSettingsFormConfig = (intl: any): FormFieldConfig[] => {
  if (!intl || !intl.formatMessage) {
    return [];
  }

  return [
    {
      name: 'nickname',
      label: intl.formatMessage({ id: 'profile.settings.nickname' }),
      component: Input,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.nickname.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.nickname.required',
          }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'bio',
      label: intl.formatMessage({ id: 'profile.settings.bio' }),
      component: TextArea,
      componentProps: {
        rows: 4,
        placeholder: intl.formatMessage({
          id: 'profile.settings.bio.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'profile.settings.bio.required' }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'province',
      label: intl.formatMessage({ id: 'profile.settings.province' }),
      component: Select,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.province.placeholder',
        }),
        options: provinces.map((province) => ({
          value: province,
          label: province,
        })),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.province.required',
          }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'city',
      label: intl.formatMessage({ id: 'profile.settings.city' }),
      component: Select,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.city.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'profile.settings.city.required' }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'district',
      label: intl.formatMessage({ id: 'profile.settings.district' }),
      component: Select,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.district.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.district.required',
          }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'detailAddress',
      label: intl.formatMessage({ id: 'profile.settings.detailAddress' }),
      component: Input,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.detailAddress.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.detailAddress.required',
          }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'phone',
      label: intl.formatMessage({ id: 'profile.settings.phone' }),
      component: Input,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.phone.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.phone.required',
          }),
          trigger: 'onBlur',
        },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: intl.formatMessage({ id: 'profile.settings.phone.format' }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
    {
      name: 'email',
      label: intl.formatMessage({ id: 'profile.settings.email' }),
      component: Input,
      componentProps: {
        placeholder: intl.formatMessage({
          id: 'profile.settings.email.placeholder',
        }),
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'profile.settings.email.required',
          }),
          trigger: 'onBlur',
        },
        {
          type: 'email',
          message: intl.formatMessage({ id: 'profile.settings.email.format' }),
          trigger: 'onBlur',
        },
      ],
      required: true,
    },
  ];
};

// 获取城市选项
export const getCityOptions = (province: string) => {
  return cities[province]?.map((city) => ({ value: city, label: city })) || [];
};

// 获取区县选项
export const getDistrictOptions = (city: string) => {
  return (
    districts[city]?.map((district) => ({
      value: district,
      label: district,
    })) || []
  );
};
