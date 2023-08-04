import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import mongodb from 'mongodb';
import axios from 'axios';

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



const AddPlacement: React.FC<any>  = ({prev}) => {
  const [business, setBusiness] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData= async () => {
    axios.get('http://localhost:3000/businesses')
      .then((response) => {
        setBusiness(response.data);
        console.log("business", response.data);
      })
      .catch((error) => {
        console.error('Error fetching businesses: ', error);
      });
  }
  const onSubmit = async (values: any) => {
  
    
try{
      await axios.post('http://localhost:3000/placements', {
        name: values.name,
        business_id: values.business_id
      });
      // fetchData();
  
      console.log('Placement created successfully!');
    } catch (error) {
      console.error('Error creating Placement: ', error);
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
      
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Business Id" name="business_id" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a business"
          optionFilterProp="children"
          filterOption={false}
          options={business.map((item) => ({ value: item._id, label: item.user_id.name }))}
          value={business.length > 0 ? business[0]._id : undefined}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0' >
          submit
        </Button>
        {prev ? 
        <Button onClick={prev} className='bg-main-blue text-white absolute  w-20 -left-32 top-0'>
          previous
        </Button> :<></>
}
      </Form.Item>
    </Form>
  );
};

export default AddPlacement;
