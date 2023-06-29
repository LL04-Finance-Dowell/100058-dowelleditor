import React, { useState, useEffect } from "react";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Row, Button, Form } from "react-bootstrap";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";

const DropDownRightSide = () =>
{
  const {
    dropdownName,
    setDropdownName,
    dropdownLabel,
    setDropdownLabel,
    dropdownItems,
    setDropdownItems,
    dropdownOptions,
    setDropdownOptions,
    rightSideDropDown,
    setRightSideDropDown,
    dropdownBorderSize, 
    setDropdownBorderSize,
    dropdownBorderColor,
    setDropdownBorderColor
  } = useStateContext();

  // const [borderSize, setBorderSize] = useState(
  //   Number(localStorage.getItem("borderSize")) || 0
  // );
  // const [borderColor, setBorderColor] = useState(
  //   localStorage.getItem("borderColor") || "#000000"
  // );
  const [showSlider, setShowSlider] = useState(false);

  const dropdownField = document.querySelector(".focussed");
  if (dropdownField)
  {
    //console.log(dropdownField.firstElementChild);
    //console.log(dropdownField.lastElementChild);
  }

  // Dropdown Name

  const dropdownNameField = dropdownField?.firstElementChild
  if (dropdownNameField !== null && rightSideDropDown)
  {
    dropdownNameField.innerHTML = `${dropdownName}`;
  }



  function handleNameChange(e)
  {
    setDropdownName(e.target.value);
  }

  // Dropdown Items

  useEffect(() =>
  {

    const selectionn = dropdownField?.lastElementChild
    if (rightSideDropDown && selectionn !== null)
    {
      var options = document.createElement("option");
      for (const [index, a] of dropdownOptions.entries())
      {
        options.value = index;
        options.innerHTML = a;
      }
      selectionn.appendChild(options);
    }
    // localStorage.setItem("borderSize", borderSize === "0")
    // localStorage.setItem("borderColor", borderColor === "black")
  }, [dropdownOptions]);

  function handleItemsChange(e)
  {
    setDropdownItems(e.target.value);
  }

  const addOptions = () =>
  {
    if (dropdownItems !== "")
    {
      setDropdownOptions([...dropdownOptions, [dropdownItems]]);
    }
    setDropdownItems("");
    setRightSideDropDown(true);
  };

  function removeDropdown()
  {
    document.querySelector(".focussedd").remove();
    // const focusseddElmnt = document.querySelector(".focussedd");
    // if (focusseddElmnt.classList.contains("holderDIV")) {
    //   document.querySelector(".focussedd").remove();
    // }
  }

  const handleBorderSizeChange = (e) =>
  {
    setDropdownBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${dropdownBorderSize}px`;

  };

  const handleBorderColorChange = (e) =>
  {
    setDropdownBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${dropdownBorderColor}`;

  };
  const handleRangeBlur = (e) =>
  {
    e.target.focus();
  };
  return (
    <div>
      <h3>Dropdown Settings</h3>
      <Form.Label>Dropdown Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Name"
        onChange={handleNameChange}
      />

      <Form.Label>List Items</Form.Label>
      <Form.Control
        type="text"
        placeholder="Add List Items"
        value={dropdownItems}
        onChange={handleItemsChange}
      />
      <Button
        variant="primary"
        className="mt-2 mb-5 w-100"
        onClick={addOptions}
      >
        +
      </Button>
      <hr />
      {/* <div className='dropdown '>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}

      <Row className="pt-4">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h6 style={{ marginRight: "10rem" }}>Border</h6>
          <label className="switch">
            <input type="checkbox" onClick={() => setShowSlider(!showSlider)} />
            <span className="slider round"></span>
          </label>
        </div>
        {showSlider && (
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
            <input
              type="color"
              value={dropdownBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={dropdownBorderSize}
              onChange={handleBorderSizeChange}
              onBlur={handleRangeBlur}
              id="range"
              className="range-color"

            />

          </div>
        )}
      </Row>

      <hr />

      <div />
      <div>
        <Button onClick={removeDropdown} variant="primary" className="mt-5 remove_button">
          Remove Dropdown
        </Button>
      </div>
    </div>
  );
};

export default DropDownRightSide;
