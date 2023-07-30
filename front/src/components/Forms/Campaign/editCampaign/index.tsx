import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import AntModal from '../../../Modals/Ant';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const onFinish = (values: any, id:string) => {
    console.log(values);

  axios.put('http://localhost:3000/locations/' + id,
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
    })
    .catch(error => {
      console.error('Error sending form data:', error);
    });
};

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

const EditLocation: React.FC<Props> = ({ record }) => {
  const [form] = Form.useForm();
  return (
    <>
      < AntModal name={'Edit'} >

        <Form
          {...layout}
          name="nest-messages"
          onFinish={(values)=>onFinish(values, record._id)}
          form={form}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          className='pr-16 pt-10'
          initialValues={record}
          >
          <Form.Item name={['region']} label="Region" rules={[{ required: true }]}>
            <Input  />
          </Form.Item>
          <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
            <Input  />
          </Form.Item>
          <Form.Item name={['secteur']} label="Secteur" rules={[{ required: true }]}>
            <Input  />
          </Form.Item>
          <Form.Item name={['longitude']} label="Longitude" rules={[{ type: "number", min: 0, max: 99, required: true }]}>
            <InputNumber  />
          </Form.Item>
          <Form.Item name={['latitude']} label="Latitude" rules={[{ type: "number", min: 0, max: 99, required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </AntModal>
    </>
  );
}

export default EditLocation;