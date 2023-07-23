import React, { useState } from "react";
import TableGridTest from "../../components/TableTest";
import { Modal, Steps } from 'antd';
import { Button } from "antd";
import AntModal from "../../components/Modals/Ant";


const Step = () =>{


  const [current, setCurrent] = useState(0)
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Etape 1',
        },
        {
            title: 'In Progress',
        },
        {
            title: 'Waiting',
        },
    ]
  return (
    <>
      <Steps
                    size="small"
                    current={current}
                    items={steps}
                /> 
                 <div className={`flex max-w-screen-md w-full ${current === 0 ? 'justify-end' : 'justify-between'}`}>
                    {current > 0 && (
                        <Button  style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button className='bg-[#22d3ee]' type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" className='bg-[#22d3ee]'>
                            Done
                        </Button>
                    )}</div> 
    </>
  );
}









const Advertiser: React.FC = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);


  type MyData = {
    // id: number;
    name: string;
    age: number;
    address: string;
    // Add more properties as needed...
    number: number;
  };

  const customColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
      // Add other custom properties if needed...
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
      // Add other custom properties if needed...
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    {
      title: "number",
      dataIndex: "number",
      key: "number",
      className: "dark:bg-dark-bg-main dark:text-gray-300",
    },
    // Add other custom columns as needed...
  ];

  const data: MyData[] = [
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      number: 1,
    },
    {
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      number: 2,
    },
    {
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      number: 3,
    },
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      number: 4,
    },
    {
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      number: 4,
    },
    {
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      number: 4,
    },
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      number: 4,
    },
    {
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      number: 4,
    },
    {
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      number: 4,
    },
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      number: 4,
    },
    {
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      number: 5,
    },
  ];

  //   return <TableGridTest columns={customColumns} />;
  return (
    <>
      <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Step />
      </AntModal>
      <TableGridTest<MyData> columns={customColumns} data={data} />;
    </>
  );
};

export default Advertiser;
