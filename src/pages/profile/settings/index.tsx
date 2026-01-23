import {
  Input as AntInput,
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import GenericForm from '@/components/FormConfig';
import {
  getCityOptions,
  getDistrictOptions,
  profileSettingsFormConfig,
} from '@/pages/profile/settings/profileSettings';
import {
  getProfileSettings,
  saveProfileSettings,
} from '@/services/ant-design-pro/profile';

const { TextArea } = AntInput;

const ProfileSettings: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  // 获取用户数据
  const fetchUserData = async () => {
    try {
      const response = await getProfileSettings();
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.errorMessage || '获取数据失败');
      }
    } catch (error) {
      console.error('获取用户数据失败:', error);
      message.error('获取数据失败，请重试');
      return {};
    }
  };

  // 保存用户数据
  const saveUserData = async (data: any) => {
    try {
      const response = await saveProfileSettings(data);
      if (response.success) {
        message.success(response.message || '保存成功');
        return response.data;
      } else {
        throw new Error(response.errorMessage || '保存失败');
      }
    } catch (error) {
      console.error('保存用户数据失败:', error);
      message.error('保存失败，请重试');
      throw error;
    }
  };

  useEffect(() => {
    // 初始化表单配置
    const fields = profileSettingsFormConfig(intl);
    setFormFields(fields);
  }, [intl]);

  useEffect(() => {
    // 获取用户数据并设置初始值
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData();
        setInitialValues(userData);
        form.setFieldsValue(userData);

        // 根据获取的数据更新城市和区县选项
        if (userData.province) {
          const updatedFieldsWithProvince = formFields.map((field) => {
            if (field.name === 'province') {
              return {
                ...field,
                componentProps: {
                  ...field.componentProps,
                  onChange: (value: string) => handleProvinceChange(value),
                },
              };
            }
            if (field.name === 'city') {
              return {
                ...field,
                componentProps: {
                  ...field.componentProps,
                  options: getCityOptions(userData.province),
                  onChange: (value: string) => handleCityChange(value),
                },
              };
            }
            if (field.name === 'district') {
              return {
                ...field,
                componentProps: {
                  ...field.componentProps,
                  options: userData.city
                    ? getDistrictOptions(userData.city)
                    : [],
                },
              };
            }
            return field;
          });
          setFormFields(updatedFieldsWithProvince);
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [form, formFields, intl]);

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
            onChange: (value: string) => handleCityChange(value),
          },
        };
      }
      if (field.name === 'district') {
        return {
          ...field,
          componentProps: {
            ...field.componentProps,
            options: [],
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

  const onFinish = async (values: any) => {
    try {
      await saveUserData(values);
      console.log('保存成功:', values);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('验证失败:', errorInfo);
  };

  return (
    <Card title={intl.formatMessage({ id: 'profile.settings.title' })}>
      <GenericForm
        form={form}
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      />
    </Card>
  );
};

export default ProfileSettings;
