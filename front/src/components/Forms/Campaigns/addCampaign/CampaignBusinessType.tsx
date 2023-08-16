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



const CampaignBusinessType: React.FC<any>  = ({prev, onSubmit, businessActivity}) => {
    const [businessType, setBusinessType] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("businessActivity hahiya", businessActivity);
    
    try {
      const promises = businessActivity.map(async (item: any) => {
        const response = await axios.get('http://localhost:3000/business-types/getBusinessTypesByActivityIds/' + item);
        return response.data;
      });
  
      const results = await Promise.all(promises);
      const combinedData = results.flat(); // Combine data from all requests into a single array
      
      setBusinessType(combinedData);
    } catch (error) {
      console.error('Error fetching business-activities: ', error);
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
      <Form.Item label="BusinessType Id" name="businessType_ids" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a Business Type"
          optionFilterProp="children"
          mode="multiple"
          filterOption={false}
          options={businessType.map((item) => ({ value: item._id, label: item.name }))}
          value={businessType.length > 0 ? businessType[0]._id : undefined}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0' >
          submit
        </Button>
        <Button onClick={prev} className='bg-main-blue text-white absolute  w-20 -left-32 top-0'>
          previous
        </Button> 
      </Form.Item>
    </Form>
  );
};

export default CampaignBusinessType;