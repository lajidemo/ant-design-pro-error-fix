import { Button, Form, type FormInstance } from 'antd';
import React from 'react';
import type { FormFieldConfig } from '../../pages/profile/settings/profileSettings';

interface GenericFormProps {
  form: FormInstance;
  fields: FormFieldConfig[];
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  initialValues?: any;
}

const GenericForm: React.FC<GenericFormProps> = ({
  form,
  fields,
  onFinish,
  onFinishFailed,
  initialValues,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
        >
          <field.component {...field.componentProps} />
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          保存
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GenericForm;
