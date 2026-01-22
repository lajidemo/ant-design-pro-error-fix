import { Input as AntInput, Button, Card, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import GenericForm from '@/components/FormConfig';
import {
  getCityOptions,
  getDistrictOptions,
  profileSettingsFormConfig,
} from '@/pages/profile/settings/profileSettings';

const { TextArea } = AntInput;

const ProfileSettings: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState<any[]>([]);

  useEffect(() => {
    // 初始化表单配置
    const fields = profileSettingsFormConfig(intl);
    setFormFields(fields);
  }, [intl]);

  // 监听省份变化，更新城市选项
  const handleProvinceChange = (province: string) => {
    form.setFieldsValue({ city: undefined, district: undefined });

    // 更新城市选择器的选项
    const updatedFields = formFields.map((field) => {
      if (field.name === 'city') {
        return {
          ...field,
          componentProps: {
            ...field.componentProps,
            options: getCityOptions(province),
          },
        };
      }
      return field;
    });
    setFormFields(updatedFields);
  };

  // 监听城市变化，更新区县选项
  const handleCityChange = (city: string) => {
    form.setFieldsValue({ district: undefined });

    // 更新区县选择器的选项
    const updatedFields = formFields.map((field) => {
      if (field.name === 'district') {
        return {
          ...field,
          componentProps: {
            ...field.componentProps,
            options: getDistrictOptions(city),
          },
        };
      }
      return field;
    });
    setFormFields(updatedFields);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title={intl.formatMessage({ id: 'profile.settings.title' })}>
      <GenericForm
        form={form}
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Card>
  );
};

export default ProfileSettings;
