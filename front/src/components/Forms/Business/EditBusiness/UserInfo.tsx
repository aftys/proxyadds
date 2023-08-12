import React from 'react';
import { Form, Input, Button } from 'antd';
import  IBusiness from '../../../../interfaces/Business';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const passwordValidationRules = [
  {
    required: true,
    message: 'Please enter your password!',
  },
  {
    min: 8,
    message: 'Password must be at least 8 characters long!',
  },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one numeric character!',
  },
];

interface Props {
  onSubmit:(values:any)=>void;
  data:IBusiness
}

const UserInfo: React.FC<Props> = ({ onSubmit ,data}) => {
  const initialValues = {
    email: data.email,
    password: data.password,
    name: data.name,
    phone: data.phone,
    address: data.address,
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      initialValues={initialValues}
      className='pr-16 pt-10'
    >
      <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]} >
        <Input  />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={passwordValidationRules}>
        <Input.Password  />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute -right-4 top-0'>
          next
        </Button>
      </Form.Item>


    </Form>
  );
}

export default UserInfo;
