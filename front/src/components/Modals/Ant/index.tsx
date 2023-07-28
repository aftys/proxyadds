import React from 'react';
import { Button, Modal } from 'antd';

interface AntModalPrpos {
    size?: string,
    children?: React.ReactElement,
    name?: string
}

const AntModal: React.FC<AntModalPrpos> = ({ children, name, size }) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

   
    return (
        <>
            <Button type="primary"  style={{width:size}} className={` text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900`} onClick={showModal}>
                {name}
            </Button>
            <Modal
                title={name}
                className='dark:bg-gray-100 h-[500px] flex flex-col gap-6 p-6 top-2'
                okButtonProps={{ className: "hidden" }}
                cancelButtonProps={{ className: "hidden" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                
                >

                {children}

            </Modal>
        </>
    );
};

export default AntModal;