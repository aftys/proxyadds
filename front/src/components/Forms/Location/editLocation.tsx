import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
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
  axios.put('http://localhost:3000/locations/'+values._id, 
  {
    region: values.region,
    city: values.city,
    secteur: values.secteur,
    longitude: values.longitude,
    latitude: values.latitude,
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

    type MyData = {
        _id: string;
        region: string;
        city: string;
        secteur: string;
        longitude: number;
        latitude: number;
      };
      

    interface Props {
        record: MyData;
    }

const LocationFormEdit: React.FC<Props> = ({record}) => (
      <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
    <Form.Item name={['region']} label="Region" rules={[{ required: true }]}>
      <Input defaultValue={record.region}/>
    </Form.Item>
    <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
      <Input defaultValue={record.city}/>
    </Form.Item>
    <Form.Item name={['secteur']} label="Secteur" rules={[{ required: true }]}>
      <Input defaultValue={record.secteur}/>
    </Form.Item>
    <Form.Item name={['longitude']} label="Longitude" rules={[{ type:"number", min: 0, max: 99, required: true }]}>
      <InputNumber defaultValue={record.longitude}/>
    </Form.Item>
    <Form.Item name={['latitude']} label="Latitude" rules={[{ type:"number", min: 0, max: 99, required: true }]}>
      <InputNumber defaultValue={record.latitude}/>
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
);

export default LocationFormEdit;