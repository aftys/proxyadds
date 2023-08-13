import React, { useState } from 'react';
import { Button, TimePicker } from 'antd';
// import 'antd/dist/antd.css';

const BusinessHoursForm = () => {
  const daysOfWeek = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  const [selectedDay, setSelectedDay] = useState('mo');
  const [businessHours, setBusinessHours] = useState({});
  const [values, setValues] = useState({}); // Store submitted values here

  const handleAddHours = () => {
    setBusinessHours(prevHours => ({
      ...prevHours,
      [selectedDay]: [...(prevHours[selectedDay] || []), { startTime: null, endTime: null }],
    }));
  };

  const handleTimeChange = (day, index, field, time) => {
    setBusinessHours(prevHours => ({
      ...prevHours,
      [day]: prevHours[day].map((hours, i) =>
        i === index ? { ...hours, [field]: time } : hours
      ),
    }));
  };

  const handleSubmit = () => {
    setValues(businessHours); // Store the business hours in the 'values' state
    // You can perform additional actions here, like sending the data to a server
    console.log('business hours', businessHours);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {daysOfWeek.map(day => (
          <Button
            key={day}
            type={selectedDay === day ? 'primary' : 'default'}
            onClick={() => setSelectedDay(day)}
            style={{ marginRight: '10px' }}
          >
            {day}
          </Button>
        ))}
        
      </div>
      {selectedDay && (
        <div>
          {businessHours[selectedDay]?.map((hours, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <TimePicker
                onChange={time => handleTimeChange(selectedDay, index, 'startTime', time)}
                value={hours.startTime}
                format="HH:mm"
                placeholder="Start Time"
              />
              <span style={{ margin: '0 10px' }}>to</span>
              <TimePicker
                onChange={time => handleTimeChange(selectedDay, index, 'endTime', time)}
                value={hours.endTime}
                format="HH:mm"
                placeholder="End Time"
              />
            </div>
          ))}
          <Button type="primary" onClick={handleAddHours} style={{ marginTop: '10px' }}>
            Add Hours
          </Button>
          <Button
          key="su-submit"
          type="primary"
          onClick={handleSubmit}
          style={{ marginRight: '10px' }}
        >
          Submit
        </Button>
        </div>
      )}
    </div>
  );
};

export default BusinessHoursForm;
