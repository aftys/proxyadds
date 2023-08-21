import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ICampaign from '../../../../interfaces/Campaign';

const { Option } = Select;

interface Props {
  onSubmit: (values:any,file:File|null) => void;
  data: ICampaign;
}

const Campaign: React.FC<Props> = ({ onSubmit, data }) => {
  const [file, setFile] = useState<any>(null);
  const [advertisers, setAdvertisers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/advertisers')
      .then((response) => {
        setAdvertisers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching advertisers:', error);
      });
  }, []);

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const initialValues = { ...data };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <Form initialValues={initialValues} onFinish={(values)=>onSubmit(values,file)}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Max Budget" name="budget_max" rules={[{ required: true, message: 'Please enter a max budget' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Start Date" name="begin_date" rules={[{ required: true, message: 'Please select a start date' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="End Date" name="end_date" rules={[{ required: true, message: 'Please select an end date' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="Display Hours" name="display_hours">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status' }]}>
          <Select>
            <Option value="actif">Actif</Option>
            <Option value="inactif">Inactif</Option>
            <Option value="pending">Pending</Option>
            <Option value="finished">Finished</Option>
          </Select>
        </Form.Item>
        <Form.Item label="URL" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Advertiser ID" name="advertiser_id">
          <Select
            showSearch
            placeholder="Select a business activity"
            optionFilterProp="children"
            filterOption={false}
            options={
              advertisers.map((item) => ({ value: item._id, label: item.user_id.name }))
            }
          />
        </Form.Item>
        <Form.Item
          label="File"
          name="file"
          rules={[
            {
              required: true,
              message: 'Please select a file',
              validator: (_, value) => {
                if (file !== null) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please select a file'));
              },
            },
          ]}
        >
          <Upload onChange={handleFileChange} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Campaign;
