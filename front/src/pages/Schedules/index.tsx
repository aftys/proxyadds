import React, { useState, useEffect } from 'react';
import { Alert, Calendar, Modal } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import AddEvent from '../../components/Forms/Shcedule/addEvent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Event {
  _id: string;
  opening_hour: string;
  closing_hour: string;
  day: string;
  business_id: number;
  deleted: boolean;
}

function Schedules() {
  const [value, setValue] = useState<Dayjs>(dayjs());
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    // Fetch all events from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:3000/schedules/business/'+id);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar
        className="dark:border-0 border-gray-200 border dark:bg-dark-bg-main rounded-md p-2"
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={(date: Dayjs) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const eventsForDate = events.filter((event) => event.day === formattedDate);
          return (
            <div>
              {eventsForDate.map((event) => (
                <div key={event._id}>{event.opening_hour} - {event.closing_hour}</div>
              ))}
            </div>
          );
        }}
      />
      <Modal open={modalVisible} onCancel={hideModal} footer={null}>
        <AddEvent day={selectedValue} businessId={id || 'test'} />
      </Modal>
    </>
  );
}

export default Schedules;
