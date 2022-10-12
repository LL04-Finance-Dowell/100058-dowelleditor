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

  if (startDate) {
    document.getElementsByClassName('dateInput').item(0).innerHTML = startDate.toLocaleDateString();
  }

  function removeDate() {
    const div = document.getElementById("holderId")
    const tab = document.getElementsByClassName("dateInput")

    if (tab[0].parentElement.classList.contains("holderDIV")) {

      tab[0].innerHTML = 'Date';

    }
  }


  return (
    <div>
      <div className='dropdown pb-3'>
        <h6>Add Date</h6>
        <Form.Label>Select Date</Form.Label>
        <select  className ='shadow bg-white rounded w-100 h-75'>
              <option value="Nothing Selected" selected="selected">Select Format</option>
              <option value="Action">4/19/2022</option>
              <option value="Another action">Tuesday, April 19, 2022</option>
              <option value="Something else">April 19, 2022</option>
              <option value="Something else">2022-04-2022</option>
              <option value="Something else">19-April-2022</option>
            </select>

        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-100 mt-2"
        />
      </div>

      <hr />

      <div className='dropdown pt-2'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div>


      <div className='mt-5 text-center'>
        <Button variant="primary" onClick={removeDate} >Remove Date</Button>
      </div>
      {/* <p>{startDate && startDate.toLocaleDateString()}</p> */}
    </div>

  )
}


export default CalendarRightSidebar