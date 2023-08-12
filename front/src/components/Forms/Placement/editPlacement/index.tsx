import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import AntModal from '../../../Modals/Ant';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

type businesses = {
    _id: string;
    user_id: {
        _id:string;
        email: string;
        name: string;
        phone: string;
        address: string;
        password:string;
      };
  };

type Placement = {
  _id: string;
  name: string;
  business_id: string;
};


interface Props {
    record: Placement;
  }

  const onFinish = (values: any, id:string) => {
    console.log(values);


  // Send the form data to the backend using Axios
  axios.put('http://localhost:3000/placements/' + id,
    {
        name: values.name,
        business_id: values.business_id
    },
  )
    .then(response => {
      console.log('placement data modified successfully:', response.data);
      // Optionally, you can handle the response here
    })
    .catch(error => {
      console.error('Error sending placement-form data:', error);
      // Optionally, you can handle errors here
    });
};

const EditPlacement: React.FC<Props> = ({ record }) => {
  const [form] = Form.useForm();
  const [business, setBusiness] = React.useState<businesses[]>([]);

  useEffect(() => {
    axios.get<businesses[]>('http://localhost:3000/businesses')
      .then((response) => {
        setBusiness(response.data);
      })
      .catch((error) => {
        console.error('Error fetching business :', error);
      });

  }, [record, form]);


//     form.setFieldsValue({
//       name: record.name,
//       business_id: record.business_id
      
//     });
//   }, [record, form]);



  return (
    <>
      <AntModal name={'Edit'}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={(values)=>onFinish(values, record._id)}
          form={form}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          initialValues={record}
          className='pr-16 pt-10'
        >
          <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name={['business_id']} label="Business Id" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Select a business"
              optionFilterProp="children"
              filterOption={false}
              options={business.map((item) => ({ value: item._id, label: item.user_id.name }))}
              value={business.length > 0 ? business[0]._id : undefined}
              />
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </AntModal>
    </>
  );
};

export default EditPlacement;
