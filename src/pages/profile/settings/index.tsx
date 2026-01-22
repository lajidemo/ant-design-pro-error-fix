import { Input as AntInput, Button, Card, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import {
  getCityOptions,
  getDistrictOptions,
  profileSettingsFormConfig,
} from '@/components/FormConfig/profileSettings';

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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateTrigger="onBlur"
      >
        {formFields.length > 0 ? (
          formFields.map((field) => {
            // 确保组件存在
            if (!field.component) {
              return null;
            }

            // 为省市区添加联动逻辑
            if (field.name === 'province') {
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                >
                  <field.component
                    {...field.componentProps}
                    onChange={handleProvinceChange}
                  />
                </Form.Item>
              );
            }
            if (field.name === 'city') {
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                >
                  <field.component
                    {...field.componentProps}
                    onChange={handleCityChange}
                  />
                </Form.Item>
              );
            }
            return (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                <field.component {...field.componentProps} />
              </Form.Item>
            );
          })
        ) : (
          <div>加载中...</div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'profile.settings.submit' })}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileSettings;
