import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Campaign = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [advertisers, setAdvertisers] = useState<any[]>([])


  useEffect(() => {
    axios.get('http://localhost:3000/advertisers')
      .then((response) => {
        setAdvertisers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching advertisers:', error);
      });
  }
  );

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('budget_max', values.budget_max);
      formData.append('begin_date', values.begin_date.format('YYYY-MM-DD'));
      formData.append('end_date', values.end_date.format('YYYY-MM-DD'));
      formData.append('display_hours', values.display_hours);
      formData.append('status', values.status);
      formData.append('url', values.url);
      formData.append('advertiser_id', values.advertiser_id);
      formData.append('file', file!);

      // Send the POST request using Axios
      const response = await axios.post('http://localhost:3000/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Campaign created:', response.data);
      message.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      message.error('Error uploading file.');
    }
  };

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <Form form={form} onFinish={handleSubmit}>
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
            <Option value="active">Active</Option>
            <Option value="finished">finished</Option>
            <Option value="paused">Paused</Option>
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
            options={advertisers.map((item) => { return { value: item._id, label: item.name } })}
          />
        </Form.Item>
        <Form.Item label="File" name="file">
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
