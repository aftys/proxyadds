import React from 'react';
import { Button, Modal, Steps } from 'antd';

interface AntModalPrpos {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    children?: React.ReactElement,
    name?: string
}

const AntModal: React.FC<AntModalPrpos> = ({ isModalOpen, setIsModalOpen, children, name }) => {


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [current, setCurrent] = React.useState(0)
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
            <Button type="primary" className='w-32 text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-bg-main' onClick={showModal}>
                {name}
            </Button>
            <Modal
                className='dark:bg-gray-100 h-[500px] flex flex-col gap-6 p-6 '
                okButtonProps={{ className: "hidden" }}
                cancelButtonProps={{ className: "hidden" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>

                {children}

                {/* <Steps
                    size="small"
                    current={current}
                    items={steps}
                /> */}
                {/* <div className={`flex max-w-screen-md w-full ${current === 0 ? 'justify-end' : 'justify-between'}`}>
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
                    )}</div> */}
            </Modal>
        </>
    );
};

export default AntModal;