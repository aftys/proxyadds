import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import mongodb from 'mongodb';
import axios from 'axios';

import { useStateContext } from "../../../../contexts";

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

const AddAdvertiser: React.FC = () => {
  const [businessActivities, setBusinessActivities] = useState<any[]>([]);
  const { userData } = useStateContext();


  useEffect(() => {
    axios.get('http://localhost:3000/business-activities',
    {
      headers: {
        'x-auth-token': userData.token, 
      },
    }
    )
      .then((response) => {
        setBusinessActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching business activities:', error);
      });
  }, []);

  const onSubmit = async (values: any) => {
    try {
      const userResponse = await axios.post('http://localhost:3000/users', {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address,
        status: 0,
        role:'advertiser'
      }, {
        headers: {
          'x-auth-token': userData.token, 
        },
      }
      );

      await axios.post('http://localhost:3000/advertisers', {
        act_id: values.act_id,
        user_id: userResponse.data._id,
      });
  
      console.log('Advertiser and User created successfully!');
    } catch (error) {
      console.error('Error creating advertiser and user:', error);
    }
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      className='pr-16 pt-10'
    >
      <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={passwordValidationRules}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Business Activity" name="act_id" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a business activity"
          optionFilterProp="children"
          filterOption={false}
          options={businessActivities.map((item) => ({ value: item._id, label: item.name }))}
          value={businessActivities.length > 0 ? businessActivities[0]._id : undefined}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0' >
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAdvertiser;
