import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Form, Input, Button, TimePicker, Select, DatePicker, Tabs } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

interface ISchedule {
  opening_hour: string;
  closing_hour: string;
  day: Dayjs;
  recurrence: 'none' | 'daily' | 'weekly';
  recurrenceCount?: number;
  business_id: number;
  deleted: boolean;
}

interface EventProps {
  businessId: string | undefined;
}

const AddEvent: React.FC<EventProps> = ({ businessId }) => {
  const [form] = Form.useForm();
  const [eventCount, setEventCount] = useState(1); // Keep track of the number of eventsForDat
  const [recurrenceValue, setRecurrenceValue] = useState("none")

  const onFinish = async (values: ISchedule[]) => {
    try {
      const response = await axios.post('http://localhost:3000/schedules', { ...values, business_id: businessId });
      console.log('Schedule added successfully:', response.data);
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const addEventField = () => {
    setEventCount((prevCount) => prevCount + 1);
  };

  const removeEventField = (key: string) => {
    setEventCount((prevCount) => prevCount - 1);

    const fieldsToRemove = [
      `events[${key}].opening_hour`,
      `events[${key}].closing_hour`,
      `events[${key}].day`,
      `events[${key}].recurrence`,
      `events[${key}].recurrenceCount`,
    ];

    // Manually reset the fields for the tab that needs to be removed
    fieldsToRemove.forEach((field) => {
      form.setFieldsValue({ [field]: undefined });
    });
  };

  return (
    <Form {...layout} form={form} name="add-schedule-form" onFinish={onFinish} validateMessages={validateMessages}>
      <Tabs tabPosition="top" type="card">
        {/* Render event input fields based on eventCount */}
        {Array.from({ length: eventCount }).map((_, index) => {
          const key = String(index); // Generate a unique key for each TabPane
          return (
            <TabPane tab={`Event ${index + 1}`} key={key}>
              <Form.Item name={['events', index, 'opening_hour']} label="Opening Hour" rules={[{ required: true }]}>
                <TimePicker format="HH:mm" />
              </Form.Item>
              <Form.Item name={['events', index, 'closing_hour']} label="Closing Hour" rules={[{ required: true }]}>
                <TimePicker format="HH:mm" />
              </Form.Item>
              <Form.Item
                label="End Date"
                name={['events', index, 'day']}
                rules={[{ required: true, message: 'Please select an end date' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name={['events', index, 'recurrence']} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Select onChange={(value) => { console.log(value); setRecurrenceValue(value) }} style={{ width: 150 }}>
                  <Select.Option value="none">None</Select.Option>
                  <Select.Option value="daily">Daily</Select.Option>
                  <Select.Option value="weekly">Weekly</Select.Option>
                </Select>
              </Form.Item>

              {

                (recurrenceValue === 'daily' || recurrenceValue === 'weekly') 
                  &&
                (
                  <Form.Item name={['events', index, 'recurrenceCount']} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Input type="number" placeholder="Recurrence Count" />
                  </Form.Item>
                )

              }
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="dashed" onClick={() => removeEventField(key)}>
                  Delete Event
                </Button>
              </Form.Item>
            </TabPane>
          );
        })}
      </Tabs>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className="bg-main-blue absolute right-0 top-0">
          Add Event
        </Button>
        <Button type="dashed" onClick={addEventField} style={{ marginTop: 8 }}>
          Add Another Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEvent;
