import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Cascader } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
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

const Business: React.FC<Props> = ({ onSubmit, prev, data }) => {
  const [businessActivities, setBusinessActivities] = useState<any[]>([]);
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
  }, []);

  useEffect(() => {
    if (selectedBusinessActivity) {
      axios.get(`http://localhost:3000/business-types?activity_ids=${selectedBusinessActivity}`)
        .then((response) => {
          setAvailableBusinessTypes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching available business types:', error);
        });
    }
  }, [selectedBusinessActivity]);

  

  return (
    <Form
      // ... (other form attributes)
    >
      <Form.Item label="Business Activity" name="business_activity_id" rules={[{ required: true }]}>
        <Select
          // ... (other select attributes)
          onChange={(value) => setSelectedBusinessActivity(value)}
        />
      </Form.Item>
      <Form.Item label="Business Type" name="business_type_id" rules={[{ required: true }]}>
        <Cascader
          options={availableBusinessTypes.map((item) => ({ value: item._id, label: item.name }))}
          placeholder="Select a business type"
          disabled={!selectedBusinessActivity}
        />
      </Form.Item>
      {/* ... (other form items) */}
    </Form>
  );
};

export default Business;
