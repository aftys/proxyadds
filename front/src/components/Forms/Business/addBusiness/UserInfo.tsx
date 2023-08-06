import React from 'react';
import { Form, Input, Button } from 'antd';
import IUser from '../../../../interfaces/User';

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
  userData:IUser
}

const UserInfo: React.FC<Props> = ({ onSubmit ,userData}) => {
  const initialValues = {
    email: userData.email,
    password: userData.password,
    name: userData.name,
    phone: userData.phone,
    address: userData.address,
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
        <Input defaultValue={userData.phone} />
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
