import React, { useState, useEffect } from 'react';
import { Alert, Button, Calendar, Modal, TimePicker, } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import AddEvent from '../../components/Forms/Shcedule/addEvent';
import BusinessHoursForm from './test';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RangeValue } from 'rc-picker/lib/interface';

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
  const [events, setEvents] = useState<Event[]>([]);
  const [dayInfo, setDayInfo] = useState<Event[]>([]);
  const [isDayInfoVisible, setIsDayInfoVisible] = useState(false);
  const [modalAddVisble, setModalAddVisble] = useState(false);


  const { id } = useParams<{ id: string }>();

  const onSelect = async (newValue: Dayjs) => {
    try {
      setValue(newValue);
      setSelectedValue(newValue);
      setIsDayInfoVisible(true);
      const response = await axios.post<Event[]>(
        'http://localhost:3000/schedules/business/' + id + '/day',
        { day: newValue.format('YYYY-MM-DD') }
      );
      setDayInfo(response.data);
      console.log(response.data); // For debugging purposes
      
    } catch (err) {
      console.log(err);
    }
  };

 



  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const showModal = () => {

    setModalAddVisble(true);
  };

  const hideModal = () => {
    setModalAddVisble(false);
  };

  useEffect(() => {
    

    fetchData();
  // }, [events]);
  }, []);

  // Fetch all events from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get<Event[]>('http://localhost:3000/schedules/business/' + id);
      setEvents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <>
      <div className='flex gap-2 h-12 '>
        <Button className='h-full text-white bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900' onClick={showModal}>Add Event</Button>
        <Alert className='w-full' message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />

      </div>
      <Calendar
        className="dark:border-0 border-gray-200 border dark:bg-dark-bg-main rounded-md p-2"
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={(date: Dayjs) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const eventsForDate = events.filter((event) => event.day === formattedDate);
          return (
            <div className='w-full h-full flex flex-col gap-2 overflow-hidden'>
             
              {eventsForDate.map((event) => (
                <div className='bg-main-blue dark:bg-blue-950 hover:dark:bg-blue-900 w-full h-2 rounded-lg' key={event._id} />
              ))}
            </div>
          );
        }}
      />
      <Modal open={modalAddVisble} onCancel={hideModal} footer={null}>
        {/* <AddEvent businessId={id} /> */}
        < BusinessHoursForm />
      </Modal>
      <Modal open={isDayInfoVisible} onCancel={() => setIsDayInfoVisible(false)} footer={null}>
        <div className='w-full p-6  '>
          <p className='w-full text-center text-xl mb-6 '> {selectedValue.format('DD/MM/YYYY')}</p>
          <div className='flex flex-col gap-2'>
            {
              dayInfo?.map((info: any, idx: number) =>
              <>
                  <TimePicker.RangePicker
                  key={idx}
                    format="HH:mm"
                    value={[ dayjs(info.opening_hour), dayjs(info.closing_hour)]}
                  />
                </>
                )
            }
            
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Schedules;
