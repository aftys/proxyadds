import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
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



const PlacementInfo: React.FC<Props> = ({ prev, onSubmit, data }) => {

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      className='p-10 '
      initialValues={{
        placement: data.placement
      }}
    >
      <Form.Item label="Name" name="placement" className='flex justify-center ' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className='bg-main-blue w-20  absolute -right-4 top-0'>
          done
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

export default PlacementInfo;
