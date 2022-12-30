import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useStateContext } from "../../contexts/contextProvider";

const CalendarRightSidebar = (props) => {
  const {
    startDate,
    setStartDate,
    fetchedData,
    rightSideDatemenu,
    setRightSideDateMenu,
    method,
    setMethod,
  } = useStateContext();

  const date = document.querySelector(".focussed");

  if (date?.parentElement?.classList?.contains("focussedd")) {
    if (rightSideDatemenu) {
      if (method == "select") {
        console.log("select", startDate);
        date.innerHTML = startDate;
      } else if (method == "first") {
        console.log("first", new Date(startDate).getTimezoneOffset());
        console.log(
          "first full date",
          startDate,
          "seperate",
          startDate && new Date(startDate).toLocaleString().split(",")[0]
        );
        // const d = new Date();
        // const dateArray = startDate.split("/");
        // date.innerHTML =
        //   startDate &&
        //   startDate
        //     .split("/")
        //     .d.setFullYear(dateArray[2], dateArray[1] - 1, dateArray[0])
        //     ?.toLocaleString()
        //     .split(",")[0];
        date.innerHTML =
          startDate && new Date(startDate).toLocaleString().split(",")[0];
      } else if (method == "second") {
        console.log("second", new Date(startDate).getTimezoneOffset());
        console.log(
          "second full date",
          startDate,
          "seperate",
          startDate && new Date(startDate)?.toDateString()
        );
        date.innerHTML = startDate && new Date(startDate)?.toDateString();
      }
      // else if(method == 'third'){
      //   date.innerHTML = startDate && startDate.toLocaleDateString();
      // }
      else if (method == "fourth") {
        // console.log("fourth", new Date(startDate).getTimezoneOffset());
        // console.log(
        //   "fourth startDate",
        //   startDate,
        //   "seperate",
        //   startDate && new Date(startDate)?.toISOString().split("T")[0]
        // );
        // const startDateLocalString =
        //   startDate && new Date(startDate)?.toISOString().split("T")[0];
        // const desireDate = new Date(Date.parse(`${startDateLocalString} GMT`));
        // console.log(desireDate, "startDateLocalString", startDateLocalString);
        // console.log(
        //   "startDateLocalString",
        //   startDateLocalString,
        //   "Full Date",
        //   new Date(startDate)
        // );
        console.log(startDate?.toISOString());
        date.innerHTML = startDate && startDate?.toISOString().split("T")[0];
      }
      // else if(method == 'fifth'){
      //   date.innerHTML = startDate && startDate.toDateString();
      // }
    }
  }

  // document.getElementsByClassName('dateInput').item(1).innerHTML = startDate.toLocaleDateString();

  // console.log(
  //   "document.querySelectorfocussedd",
  //   document.querySelector(".focussedd")
  // );
  function removeDate() {
    document.querySelector(".focussedd").remove();
  }
  // function removeDate() {
  //   const last = Array.from(document.querySelectorAll(".focussedd")).pop();
  //   console.log("last", last);
  //   last.remove();
  // }
  function handleDateMethod(e) {
    setMethod(e.target.value);
    setRightSideDateMenu(true);
  }

  const handeDAtePickerClick = (e) => {
    // console.log("Date div clicked");
    // setRightSideDateMenu(false);
  };

  // calander class name
  // .react-datepicker__month-container
  // let marginValue = 0;
  // const remove_date_mergin = {
  //   marginTop: marginValue + "px",
  // };
  const datePickerElemnt = document.getElementById("date_picker");
  if (datePickerElemnt) {
    console.log("picker", document.getElementById("date_picker"));
  }
  // console.log("datePickerElemnt", datePickerElemnt);
  let date_picker_month_topMargin = 0;
  if (document.querySelector(".react-datepicker__month-container")) {
    date_picker_month_topMargin =
      document.querySelector(".react-datepicker__month-container")
        .offsetHeight + "px";
    console.log("element height", date_picker_month_topMargin);
  }

  return (
    <div>
      <div className="dropdown pb-3">
        <h6>Add Date</h6>
        <Form.Label>Select Date Format</Form.Label>
        <select
          onChange={handleDateMethod}
          className="shadow bg-white rounded w-100 h-75"
        >
          <option value="select" selected={method == "select"}>
            Select Format
          </option>
          <option value="first" selected={method == "first"}>
            4/19/2023
          </option>
          <option value="second" selected={method == "second"}>
            Tuesday, April 19, 2023
          </option>
          {/* <option value="third">April 19, 2022</option> */}
          <option value="fourth" selected={method == "fourth"}>
            2023-04-19
          </option>
          {/* <option value="fifth">19-April-2022</option> */}
        </select>

        <div id="date_picker_container" onClick={handeDAtePickerClick}>
          <DatePicker
            dateFormat="MMMM d, yyyy h:mm aa"
            selected={startDate}
            onChange={(date) => {
              console.log("date", date);
              setRightSideDateMenu(true);
              setStartDate(date);
            }}
            className="w-100 mt-2"
            id="date_picker"
          />
        </div>
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

      <div
        className={`text-center ${!rightSideDatemenu && "remove-date-mergin"}`}
        style={{
          marginTop: datePickerElemnt ? date_picker_month_topMargin : "36px",
        }}
      >
        <Button variant="primary" onClick={removeDate}>
          Remove Date
        </Button>
      </div>
      {/* <p>{startDate && startDate.toLocaleDateString()}</p> */}
    </div>
  );
};

export default CalendarRightSidebar;
