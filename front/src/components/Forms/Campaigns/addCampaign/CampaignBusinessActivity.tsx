import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import mongodb from 'mongodb';
import axios from 'axios';
import ICampaign from '../../../../interfaces/Campaign';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};




interface Props {
  onSubmit: (values: any) => void;
  prev: () => void;
  data: ICampaign
}


const CampaignBusinessActivity: React.FC<Props>  = ({prev, onSubmit,data}) => {
  const [businessActivities, setBusinessActivities] = useState<any[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData= async () => {
    axios.get('http://localhost:3000/business-activities')
      .then((response) => {
        setBusinessActivities(response.data);

      })
      .catch((error) => {
        console.error('Error fetching business activities:', error);
      });
  }

  const initialValues={
    business_activity_ids:data.business_activity_ids
  }
  return (
    <Form
      {...layout}
      initialValues={initialValues}
      name="nest-messages"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      className='pr-16 pt-10'
    >
      <Form.Item label="BusinessActivity Id" name="business_activity_ids" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a Business Activity"
          optionFilterProp="children"
          mode="multiple"
          filterOption={false}
          options={businessActivities.map((item) => ({ value: item._id, label: item.name }))}
          value={businessActivities.length > 0 ? businessActivities[0]._id : undefined}
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

export default CampaignBusinessActivity;



