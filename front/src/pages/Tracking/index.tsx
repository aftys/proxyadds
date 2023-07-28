import React, { useState } from 'react';
import { Alert, Calendar, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

function Tracking() {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const [modalVisible, setModalVisible] = useState(false);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    showModal(); // Show the modal when a date is selected
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      <Modal
        open={modalVisible}
        onCancel={hideModal}
        footer={null}
      >
        <p>You selected date: {selectedValue?.format('YYYY-MM-DD')}</p>
      </Modal>
    </>
  );
}

export default Tracking;
