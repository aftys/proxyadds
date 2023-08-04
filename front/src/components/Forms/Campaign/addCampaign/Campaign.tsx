import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Upload, TimePicker, InputNumber } from 'antd';
import axios from 'axios';
// import CampaignStatus from '../../../../../../Server/src/enums/campaignStatus.enum';

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

const { Option } = Select;

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const Campaign : React.FC = () => {
  const [advertiser, setAdvertiser] = useState<any[]>([]);
  const [file, setFile] = useState<any | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();


  useEffect(() => {
    axios.get('http://localhost:3000/advertisers')
      .then((response) => {
        setAdvertiser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Advertisers:', error);
      });
  }, []);



  const onSubmit = async (values: any) => {
    // console.log('Form values:', values);
    // console.log('File list:', fileList);

    

    try {
     
      console.log("this is the values", values);

      await axios.post('http://localhost:3000/campaigns', {
        name: values.name,
        budget_max: values.budget_max,
        begin_date: values.begin_date,
        end_date: values.end_date,
        file: fileInputRef.current.files[0],
        display_hours: values.display_hours,
        status: values.status,
        url: values.url,
        advertiser_id: values.advertiser_id,  
      });
      console.log('Advertiser and User created successfully!');
    } catch (error) {
      console.error('Error creating campaign', error);
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
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Max Budget" name="budget_max" rules={[{ type:"number", required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Begin Date" name="begin_date" rules={[{ type:"date", required: true }]}>
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item label="End Date" name="end_date" rules={[{ type:"date", required: true }]}>
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
     
      {/* <Form.Item
      name="file"
      label="File"
      valuePropName="fileList"
      // getValueFromEvent={normFile}
      getValueFromEvent={(event) => { 
        console.log("event", event.file);
        setFileList(event.file);
        // return event?.file
      }}

    >
      <Upload  
      // customRequest={(info)=>{setFileList([info.file])}}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item> */}

      
        <input
          type="file"
          name="file"
          id="fileInput"
          ref={fileInputRef}
          className="mr-2"
          // onChange={(event) => {
          //   setFile(event.target.files[0]);
          // }}
        />
        
      

    <Form.Item label="Display hours" name="display_hours" {...config}>
      <TimePicker />
    </Form.Item>
    <Form.Item
      label="Status"
      name="status"
      rules={[{ required: true, message: 'Please select a status!' }]}
    >
      <Select placeholder="Please select a status">
        <Option value="actif">actif</Option>
        <Option value="pending">pending</Option>
      </Select>
    </Form.Item>

      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>


      <Form.Item label="Advertiser" name="advertiser_id" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select an Advertiser"
          optionFilterProp="children"
          filterOption={false}
          options={advertiser.map((item) => ({ value: item._id, label: item.name }))}
          value={advertiser.length > 0 ? advertiser[0]._id : undefined}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0' >
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Campaign;
