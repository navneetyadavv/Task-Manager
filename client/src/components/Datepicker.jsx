import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Datepicker.module.css';


const Datepicker = ({ selectedDate, onDateChange, onDoneClick, onCancelClick }) => {
  
  // State to manage the currently selected date
  const [startDate, setStartDate] = useState(selectedDate || new Date());
  // State to manage the last viewed month
  const [lastViewedMonth, setLastViewedMonth] = useState(new Date());

  // Reference to the DatePicker component
  const datePickerRef = useRef(null);

  // Effect to update the last viewed month when the start date changes
  useEffect(() => {
    setLastViewedMonth(startDate);
  }, [startDate]);

  // Handle date change from the DatePicker
  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  // Handle button click to set a specific date
  const handleButtonClick = (date) => {
    setStartDate(date);
    setLastViewedMonth(date);
    onDateChange(date);

    // Focus and open the DatePicker
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
      datePickerRef.current.setOpen(true);
    }
  };

  // Handle navigation back to the last viewed month
  const handleBackToLastViewedMonth = () => {
    setStartDate(lastViewedMonth);
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
      datePickerRef.current.setOpen(true);
    }
  };

  // Handle month change in the DatePicker
  const handleMonthChange = (date) => {
    setLastViewedMonth(date);
  };

  // Configuration for quick date selection buttons
  const buttonConfigs = [
    { label: 'No Date', date: null },
    { label: 'Today', date: new Date() },
    { label: 'Tomorrow', date: new Date(Date.now() + 86400000) },
    { label: '3 Days Later', date: new Date(Date.now() + 3 * 86400000) },
    { label: 'This Sunday', date: new Date(Date.now() + (7 - new Date().getDay()) * 86400000) },
  ];

  return (
    <div>
      {/* DatePicker component with custom styles and event handlers */}
      <DatePicker
        ref={datePickerRef}
        selected={startDate}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        inline
        calendarClassName={styles.customCalendar}
      />
      {/* Buttons for quick date selection */}
      <div className={styles.options}>
        {buttonConfigs.map((config, index) => (
          <button key={index} type="button" onClick={() => handleButtonClick(config.date)}>
            {config.label}
          </button>
        ))}
      </div>
      {/* Action buttons for cancel and done */}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancelClick}>
          Cancel
        </button>
        <button type="button" className={styles.doneBtn} onClick={onDoneClick}>Done</button>
      </div>
    </div>
  );
};

export default Datepicker;
