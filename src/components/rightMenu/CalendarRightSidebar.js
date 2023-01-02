import React, { useEffect, useState } from "react";

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

  const [datePickerMargin, setDatePickerMargin] = useState("");
  const date = document.querySelector(".focussed");

  if (date?.parentElement?.classList?.contains("focussedd")) {
    if (rightSideDatemenu) {
      if (method == "select") {
        date.innerHTML = startDate.toLocaleString().split(",")[0];
      } else if (method == "first") {
        console.log("first", startDate);
        if (startDate) {
          const localDate = new Date(startDate).toLocaleString().split(",")[0];
          const localDateArray = localDate.split("/");
          console.log(
            "First DAte Replace",
            `${localDateArray[1]}/${localDateArray[0]}/${localDateArray[2]}`
          );
          date.innerHTML = `${localDateArray[1]}/${localDateArray[0]}/${localDateArray[2]}`;
        }
      } else if (method == "second") {
        console.log("second", startDate);
        date.innerHTML = startDate && new Date(startDate)?.toDateString();
      } else if (method == "fourth") {
        console.log("fourth", startDate);
        date.innerHTML =
          startDate && new Date(startDate)?.toISOString().split("T")[0];
      }
    }
  }

  // document.getElementsByClassName('dateInput').item(1).innerHTML = startDate.toLocaleDateString();

  function removeDate() {
    document.querySelector(".focussedd").remove();
  }

  function handleDateMethod(e) {
    setMethod(e.target.value);
    setRightSideDateMenu(true);
  }

  useEffect(() => {
    if (document.querySelector(".react-datepicker")) {
      console.log("datePicker", document.querySelector(".react-datepicker"));
      setDatePickerMargin(
        document.querySelector(".react-datepicker").offsetHeight + "px"
      );
    }
  }, [datePickerMargin]);

  // console.log("datePickerMargin", datePickerMargin);
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
          {/* <option value="fourth" selected={method == "fourth"}>
            2023-04-19
          </option> */}
          {/* <option value="fifth">19-April-2022</option> */}
        </select>

        <div id="date_picker_container">
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
      <div className={`text-center`}>
        <Button variant="primary" onClick={removeDate}>
          Remove Date
        </Button>
      </div>
    </div>
  );
};

export default CalendarRightSidebar;
