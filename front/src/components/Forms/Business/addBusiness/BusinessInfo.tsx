import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Cascader } from 'antd';
import axios from 'axios';
import IBusiness from '../../../../interfaces/Business';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

interface Props {
  onSubmit: (values: any) => void;
  prev: () => void;
  data: IBusiness
}

const BusinessInfo: React.FC<Props> = ({ onSubmit, prev, data }) => {

  const [businessActivities, setBusinessActivities] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [cascaderOptions, setCascaderOptions] = useState<any[]>([]);
  const [selectedBusinessActivity, setSelectedBusinessActivity] = useState<string | null>(null);
  const [availableBusinessTypes, setAvailableBusinessTypes] = useState<any[]>([]);


  useEffect(() => {
    axios.get('http://localhost:3000/business-activities')
      .then((response) => {
        setBusinessActivities(response.data);
        console.log("business activities", response.data);

      })
      .catch((error) => {
        console.error('Error fetching business activities:', error);
      });


      axios.get('http://localhost:3000/locations') // Replace '/api/locations' with your actual API endpoint
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

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
    const citiesMap: { [key: string]: any[] } = {};
    locations.forEach((location) => {
      if (!citiesMap[location.region]) {
        citiesMap[location.region] = [];
      }
      citiesMap[location.region].push(location);
    });

    const cascaderOptions: any[] = [];
    for (const region in citiesMap) {
      if (citiesMap.hasOwnProperty(region)) {
        cascaderOptions.push({
          value: region,
          label: region,
          children: citiesMap[region].map((cityLocation) => ({
            value: cityLocation._id,
            label: cityLocation.city,
            children: [{ value: cityLocation._id, label: cityLocation.secteur }],
          })),
        });
      }
    }

    setCascaderOptions(cascaderOptions);
  }, [locations]);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      initialValues={{
        location_id: data.location_id ,
        longitude: data.longitude ,
        altitude: data.altitude ,
        business_type_id: data.business_type_id ,
        business_activity_id: data.business_activity_id 
      }}
      className='p-10 '
    >

      <Form.Item label="Longitude" name="longitude" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Altitude" name="altitude" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Location" name="location_id" rules={[{ required: true }]}>
        <Cascader
          options={cascaderOptions}
          placeholder="Select a location"
        />
      </Form.Item>
    
      <Form.Item label="Business Activity" name="business_activity_id" rules={[{ required: true }]}>
        <Select
          // ... (other select attributes)
          showSearch
          placeholder="Select a business activity"
          optionFilterProp="children"
          filterOption={false}
          options={businessActivities.map((item) => { return { value: item._id, label: item.name } })}
          onChange={(value) => {setSelectedBusinessActivity(value); console.log("this is the value", value)}}
        />
      </Form.Item>
      <Form.Item label="Business Typ" name="business_type_id" rules={[{ required: true }]}>
        <Cascader
          options={availableBusinessTypes?.map((item) => ({ value: item._id, label: item.name }))}
          placeholder="Select a business type"
          disabled={!selectedBusinessActivity}
        />
      </Form.Item>
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue w-20  absolute -right-4 top-0'>
          next
        </Button>
        {prev ?
          <Button onClick={prev} className='bg-main-blue text-white absolute  w-20 -left-32 top-0'>
            previous
          </Button> : <></>
        }
      </Form.Item>
    </Form>
  );
};

export default BusinessInfo;