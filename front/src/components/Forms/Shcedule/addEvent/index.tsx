
import React from 'react'
import type { Dayjs } from 'dayjs'
import { Form, Input, Button, TimePicker, Select } from 'antd';
import axios from 'axios';


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
    day: string;
    business_id: number;
    deleted: boolean;
}
interface EventProps {
    businessId: string;
    day: Dayjs
}

const AddEvent: React.FC<EventProps> = ({ businessId, day }) => {
    const [form] = Form.useForm();

    const onFinish = async (values: ISchedule) => {
        try {
            const response = await axios.post('http://localhost:3000/schedules',
                {
                    ...values,
                    business_id: businessId,
                    day: day.format('YYYY-MM-DD')
                }
            );
            console.log('Schedule added successfully:', response.data);
        } catch (error) {
            console.error('Error adding schedule:', error);
        }
    };

    return (
        <>
            <p>You selected date: {day?.format('YYYY-MM-DD')}</p>
            <Form
                {...layout}
                form={form}
                name="add-schedule-form"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="opening_hour"
                    label="Opening Hour"
                    rules={[{ required: true }]}
                >
                    <TimePicker format="HH:mm" />
                </Form.Item>
                <Form.Item
                    name="closing_hour"
                    label="Closing Hour"
                    rules={[{ required: true }]}
                >
                    <TimePicker format="HH:mm" />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" className='bg-main-blue absolute right-0 top-0'>
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default AddEvent;