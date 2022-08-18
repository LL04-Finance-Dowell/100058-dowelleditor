import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import "react-datepicker/dist/react-datepicker.css";



import DatePicker from 'react-datepicker';
import { useStateContext } from '../../contexts/contextProvider';

const CalendarRightSidebar = (props) => {

  const { startDate, setStartDate } = useStateContext();


  return (
    <div>
      <h3>Add Date</h3>
      <Form.Label>Select Date</Form.Label>
      <DropdownButton variant="secondary" id="" title="Select format">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>

      <DatePicker
        dateFormat="MM/yyyy/dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />


    </div>
  )
}


export default CalendarRightSidebar