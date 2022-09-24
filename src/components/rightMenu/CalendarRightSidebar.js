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

  if(startDate){
    document.getElementsByClassName('dateInput').item(0).innerHTML = startDate.toLocaleDateString();
  }
  

  // console.log(startDate.toLocaleDateString())

  return (
    <div>
    <div className='dropdown pb-5'>
      <h6>Add Date</h6>
      <Form.Label>Select Date</Form.Label>
      <DropdownButton variant="" id="" title="Select format" className='shadow bg-white rounded '>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>

      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>

    <hr />

    <div className='dropdown pt-2'>
            <p><h6>User permissions</h6></p>
            <DropdownButton variant="" id="" title="Nothing Selected" className='shadow bg-white rounded '>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>

          
          <div className='mt-5 text-center'>
            <Button variant="primary"  >Remove Signature</Button>
          </div>
{/* <p>{startDate && startDate.toLocaleDateString()}</p> */}
</div>

  )
}


export default CalendarRightSidebar