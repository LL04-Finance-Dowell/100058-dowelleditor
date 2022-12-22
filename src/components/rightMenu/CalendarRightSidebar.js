import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useStateContext } from "../../contexts/contextProvider";

const CalendarRightSidebar = (props) => {
  const { startDate, setStartDate, fetchedData } = useStateContext();
  const [method, setMethod] = useState("first");

  const date = document.querySelector(".focussed");
  if (date.parentElement.classList.contains("focussedd")) {
    const dateContentArray = fetchedData.filter((elem) => {
      return elem?.type == "DATE_INPUT";
    });
    console.log(dateContentArray);
    // setStartDate(dateContentArray[0]?.data);

    if (method == "select") {
      date.innerHTML = startDate && startDate;
    } else if (method == "first") {
      date.innerHTML = startDate && startDate?.toLocaleDateString();
    } else if (method == "second") {
      date.innerHTML = startDate && startDate?.toDateString();
    }
    // else if(method == 'third'){
    //   date.innerHTML = startDate && startDate.toLocaleDateString();
    // }
    else if (method == "fourth") {
      date.innerHTML = startDate && startDate?.toISOString().split("T")[0];
    }
    // else if(method == 'fifth'){
    //   date.innerHTML = startDate && startDate.toDateString();
    // }
  }
  // document.getElementsByClassName('dateInput').item(1).innerHTML = startDate.toLocaleDateString();

  function removeDate() {
    document.querySelector(".focussedd").remove();
  }
  function handleDateMethod(e) {
    setMethod(e.target.value);
  }
  console.log(method);
  return (
    <div>
      <div className="dropdown pb-3">
        <h6>Add Date</h6>
        <Form.Label>Select Date</Form.Label>
        <select
          onChange={handleDateMethod}
          className="shadow bg-white rounded w-100 h-75"
        >
          <option value="select" selected="selected">
            Select Format
          </option>
          <option value="first">4/19/2022</option>
          <option value="second">Tuesday, April 19, 2022</option>
          {/* <option value="third">April 19, 2022</option> */}
          <option value="fourth">2022-04-2022</option>
          {/* <option value="fifth">19-April-2022</option> */}
        </select>

        <DatePicker
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-100 mt-2"
          id="date_picker"
        />
      </div>

      <hr />

      {/* <div className='dropdown pt-2'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}

      <div className="mt-5 text-center">
        <Button variant="primary" onClick={removeDate}>
          Remove Date
        </Button>
      </div>
      {/* <p>{startDate && startDate.toLocaleDateString()}</p> */}
    </div>
  );
};

export default CalendarRightSidebar;
