import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Cascader} from 'antd';
import mongodb from 'mongodb';
import axios from 'axios';

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



const CampaignBusinessActivity: React.FC<any>  = ({prev, onSubmit}) => {
    const [businessActivity, setBusinessActivity] = useState<any[]>([]);
    const [businessTypes, setBusinessTypes] = useState<any[]>([]);
    const [businessActivities, setBusinessActivities] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [cascaderOptions, setCascaderOptions] = useState<any[]>([]);
    const [selectedBusinessActivity, setSelectedBusinessActivity] = useState<string | null>(null);
    const [availableBusinessTypes, setAvailableBusinessTypes] = useState<any[]>([]);
    const [businessActivitiesWithTypes, setBusinessActivitiesWithTypes] = useState<any[]>([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData= async () => {
  //   axios.get('http://localhost:3000/business-activities')
  //     .then((response) => {
  //       setBusinessActivity(response.data);
  //       console.log("business-activities", response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching business-activities: ', error);
  //     });
  // }
  
  // useEffect(() => {
  //   axios.get('http://localhost:3000/business-activities')
  //     .then((response) => {
  //       setBusinessActivities(response.data);
  //       console.log("business activities", response.data);

  //     })
  //     .catch((error) => {
  //       console.error('Error fetching business activities:', error);
  //     });
  //   }, []);


  useEffect(() => {
    if (selectedBusinessActivity) {
      console.log("selected business activity", selectedBusinessActivity);
      setAvailableBusinessTypes([]);
      axios.get('http://localhost:3000/business-types/getBusinessTypesByActivityIds/'+ selectedBusinessActivity)
        .then((response) => {
          setAvailableBusinessTypes(response.data);
          console.log("available business types", response.data);
        })
        .catch((error) => {
          console.error('Error fetching available business types:', error);
        });
    }
  }, [selectedBusinessActivity]);

  useEffect(() => {
    axios.get('http://localhost:3000/business-activities')
      .then((response) => {
        setBusinessActivitiesWithTypes(
          response.data.map((activity:any) => ({
            value: activity._id,
            label: activity.name,
            children: availableBusinessTypes.map((type:any) => ({
              value: type._id,
              label: type.name,
            })),
          }))
        );
      })
      .catch((error) => {
        console.error('Error fetching business activities:', error);
      });
    }, [availableBusinessTypes]);
    const onChange = (value: string[]) => {
      setSelectedBusinessActivity(value[0]); // Assuming value is an array with a single selected value
      console.log("this is the value",value);

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
      {/* <Form.Item label="BusinessActivity Id" name="businessActivity_id" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select a Business Activity"
          optionFilterProp="children"
          mode="multiple"
          filterOption={false}
          options={businessActivity.map((item) => ({ value: item._id, label: item.name }))}
          value={businessActivity.length > 0 ? businessActivity[0]._id : undefined}
        />
      </Form.Item> */}
      <Form.Item label="Business Activity" name="business_activity_id" rules={[{ required: true }]}>
        <Cascader
          options={businessActivitiesWithTypes}
          placeholder="Select a business activity and type"
          onChange={(value) => {setSelectedBusinessActivity(value)}}
          multiple
          maxTagCount="responsive"
           
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



