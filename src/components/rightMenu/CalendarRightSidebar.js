import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "react-datepicker/dist/react-datepicker.css";
import jwt_decode from "jwt-decode";

import DatePicker from "react-datepicker";
import { useStateContext } from "../../contexts/contextProvider";
import { useSearchParams } from "react-router-dom";

const CalendarRightSidebar = (props) => {
  const {
    startDate,
    setStartDate,
    fetchedData,
    rightSideDatemenu,
    setRightSideDateMenu,
    method,
    setMethod,
    setIsFinializeDisabled,
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  const documnetMap = decoded?.details?.document_map;

  const [datePickerMargin, setDatePickerMargin] = useState("");
  const date = document.querySelector(".focussed");

  // enable disable finalize btn
  // let dateInnerText = "";

  if (date?.parentElement?.classList?.contains("focussedd")) {
    if (rightSideDatemenu) {
      // dateInnerText = date.innerText;
      //console.log("date inner text", dateInnerText);
      if (method == "select") {
        date.innerHTML = startDate.toLocaleString().split(",")[0];
      } else if (method == "first") {
        //console.log("first", startDate);
        if (startDate) {
          const localDate = new Date(startDate).toLocaleString().split(",")[0];
          const localDateArray = localDate.split("/");
          //console.log(
          //   "First DAte Replace",
          //   `${localDateArray[1]}/${localDateArray[0]}/${localDateArray[2]}`
          // );
          date.innerHTML = `${localDateArray[1]}/${localDateArray[0]}/${localDateArray[2]}`;
        }
      } else if (method == "second") {
        //console.log("second", startDate);
        date.innerHTML = startDate && new Date(startDate)?.toDateString();
      } else if (method == "fourth") {
        //console.log("fourth", startDate);
        date.innerHTML =
          startDate && new Date(startDate)?.toISOString().split("T")[0];
      }
    }
  }

  // document.getElementsByClassName('dateInput').item(1).innerHTML = startDate.toLocaleDateString();

  function removeDate() {
    if (document.querySelector(".focussedd").classList.contains("dropp")) {
      if (document.querySelector(".focussedd").hasChildNodes()) {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++) {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else {
      document.querySelector(".focussedd").remove();
    }
  }

  function handleDateMethod(e) {
    setMethod(e.target.value);
    setRightSideDateMenu(true);
  }

  useEffect(() => {
    if (document.querySelector(".react-datepicker")) {
      //console.log("datePicker", document.querySelector(".react-datepicker"));
      setDatePickerMargin(
        document.querySelector(".react-datepicker").offsetHeight + "px"
      );
    }
  }, [datePickerMargin]);

  // //console.log("datePickerMargin", datePickerMargin);
  //console.log("rightSideDatemenu", rightSideDatemenu);
  return (
    <div>
      <div className="dropdown pb-3">
        <h5 className="fs-5">Add Date</h5>
        <Form.Label>Select Date Format</Form.Label>
        <select
          onChange={handleDateMethod}
          className="select border-0 bg-white rounded w-100 h-75 p-2"
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

        <div id="date_picker_container">
          <DatePicker
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText=""
            openToDate={new Date()}
            selected={startDate}
            open={true}
            onChange={(date) => {
              // console.log("date", date, startDate);
              if (date != startDate) {
                // console.log("date?.innerHTML", dateInnerText);
                //setIsFinializeDisabled(false)
                var dateDiv = document.querySelector(".focussed");
                if (dateDiv.parentElement.classList.contains("holderDIV")) {
                  dateDiv.parentElement.classList.add("element_updated");
                }
              }
              setRightSideDateMenu(true);
              setStartDate(date);
            }}
            className="calendar datePicker  mt-2 p-2 border-0"
            id="date_picker"
          />
        </div>
      </div>
      {/* <hr /> */}
      {!documnetMap && (
        <div
          className={`text-center`}
          style={{ marginTop: !rightSideDatemenu && "25px" }}
        >
          <Button
            variant="primary"
            onClick={removeDate}
            className="remove_button"
          >
            Remove Date
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarRightSidebar;
