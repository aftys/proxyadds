import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

interface Props {
    handleDelete:()=>void
}

const Confirmation: React.FC<Props> = ({handleDelete}) => {
    const [open, setOpen] = useState(false);

    
    return (
        <>
        <Button type="primary" className='text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900' onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal
        title="Delete Confirmation"
        centered
        open={open}
        onOk={() => {
            handleDelete()
            setOpen(false)

          }
          }
        onCancel={() => setOpen(false)}
        width={300}
        okButtonProps={{ className: "text-white bg-main-blue shadow" }}
        >
        <p>vous êtes sûr de supprimer cette ligne!</p>
      </Modal>
      </>
);
}

export default Confirmation;