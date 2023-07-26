import React from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import axios from 'axios';
import AntModal from '../../Modals/Ant';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',

};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any, id:string) => {
    console.log(values);


  // Send the form data to the backend using Axios
  axios.put('http://localhost:3000/business-activities/' + id,
    {
        name: values.name,
    },
  )
    .then(response => {
      console.log('Form data sent successfully:', response.data);
      // Optionally, you can handle the response here
    })
    .catch(error => {
      console.error('Error sending form data:', error);
      // Optionally, you can handle errors here
    });
};

type MyData = {
  _id: string;
  name: string;
};


interface Props {
  record: MyData;
}

const EditBusinessActivities: React.FC<Props> = ({ record }) => {
    
  const [form] = Form.useForm(); // Use Form hooks to access the form instance




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
          <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
            <Input  />
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

export default EditBusinessActivities;