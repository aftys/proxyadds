import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',

};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);

  // Send the form data to the backend using Axios
  axios.post('http://localhost:3000/business-types', 
  {
    name: values.name,
    activity_id: values.activity_id
  
  },
  )
    .then(response => {
      console.log('Form data sent successfully:', response.data);
      // Optionally, you can handle the response here
    })
    .catch(error => {
      console.error('Error sending form data:', error);
      // Optionally, you can handle errors here
    });};

const AddBusinessType: React.FC = () => {
  const [businessActivities, setBusinessActivities] = React.useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData= async () => {
    axios.get('http://localhost:3000/business-activities')
      .then((response) => {
        setBusinessActivities(response.data);
        console.log("business activities", response.data);
      })
      .catch((error) => {
        console.error('Error fetching business activities: ', error);
      });
  }
  return(
    <>
      <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      className='pr-16 pt-10'
    >
    <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Activity" name="activity_id" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a business"
          optionFilterProp="children"
          filterOption={false}
          options={businessActivities.map((item) => ({ value: item._id, label: item.name }))}
          value={businessActivities.length > 0 ? businessActivities[0]._id : undefined}
        />
      </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0'>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default AddBusinessType;