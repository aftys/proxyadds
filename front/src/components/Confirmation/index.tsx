import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
};

const success = () => {
  Modal.success({
    content: 'some messages...some messages...',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};


interface Props {
    handleDelete:()=>void
}

const Confirmation: React.FC<Props> = ({handleDelete}) => {
    const [open, setOpen] = useState(false);

    
    return (
        <>
        <Button type="primary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal
        title="Delete Confirmation"
        centered
        open={open}
        onOk={() => {
            handleDelete()
            setOpen(false)}}
        onCancel={() => setOpen(false)}
        width={300}
      >
        <p>vous êtes sûr de supprimer cette ligne!</p>
      </Modal>
      </>
);
}

export default Confirmation;