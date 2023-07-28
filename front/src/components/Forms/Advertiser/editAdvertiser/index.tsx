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


type BusinessActivity = {
  _id: string;
  name: string;
};

type Advertiser = {
  _id: string;
  act_id: string;
  user_id: {
    _id:string;
    email: string;
    name: string;
    phone: string;
    address: string;
    password:string;
  };
};

interface EditAdvertiserProps {
  record: Advertiser;
}

const EditAdvertiser: React.FC<EditAdvertiserProps> = ({ record }) => {
  const [form] = Form.useForm();
  const [businessActivities, setBusinessActivities] = React.useState<BusinessActivity[]>([]);

  useEffect(() => {
    axios.get<BusinessActivity[]>('http://localhost:3000/business-activities')
      .then((response) => {
        setBusinessActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching business activities:', error);
      });

    form.setFieldsValue({
      email: record.user_id.email,
      name: record.user_id.name,
      phone: record.user_id.phone,
      address: record.user_id.address,
      act_id: record.act_id,
    });
  }, [record, form]);

  const onFinish = async (values: any) => {
    try {
      await axios.put(`http://localhost:3000/users/${record.user_id._id}`, {
        email: values.email,
        name: values.name,
        phone: values.phone,
        address: values.address,
        password:record.user_id.password,
      });
      await axios.put(`http://localhost:3000/advertisers/${record._id}`, {
            act_id:values.act_id,
            user_id:record.user_id
      });

      console.log('Advertiser updated successfully!');
    } catch (error) {
      console.error('Error updating advertiser:', error);
    }
  };

  return (
    <>
      <AntModal name={'Edit'}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          form={form}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          className='pr-16 pt-10'
        >
          <Form.Item name={['email']} label="Email" rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['phone']} label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['address']} label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['act_id']} label="Business Activity" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Select a business activity"
              optionFilterProp="children"
              filterOption={false}
              options={businessActivities.map((item) => ({ value: item._id, label: item.name }))}
            />
          </Form.Item>
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

export default EditAdvertiser;
