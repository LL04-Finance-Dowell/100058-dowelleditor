import React, { useEffect, useState } from "react";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Row, Button, Form } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";

import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ButtonRightSide = () => {
  const { buttonLink, setButtonLink, buttonPurpose, setButtonPurpose, buttonBorderSize, setButtonBorderSize, buttonBorderColor, setButtonBorderColor } =
    useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  const button = document.querySelector(".focussed");
  const holderDIV = document.querySelector(".focussedd");

  const finalizeButton = document.getElementById("finalize-button");
  const select = document.getElementById("selectt");
  const rejectButton = document.getElementById("reject-button");

  const purpose = holderDIV?.children[2]?.innerHTML;
  const link = holderDIV?.children[1]?.innerHTML;

  // const [borderSize, setBorderSize] = useState(1);
  // const [borderColor, setBorderColor] = useState("#000000");
  // const [borderSize, setBorderSize] = useState(
  //   Number(localStorage.getItem("borderSize")) || 0
  // );
  // const [borderColor, setBorderColor] = useState(
  //   localStorage.getItem("borderColor") || "#000000"
  // );
  const [showSlider, setShowSlider] = useState(false);

  // useEffect(() => {
  //     if (button) {
  //         button.addEventListener('click', function () {
  //             console.log(purpose);
  //             const selectedValue = select?.value;
  //             if (purpose === 'finalize' && link == "") {
  //                 console.log('finalize selected');
  //                 finalizeButton?.click();
  //             } else if (purpose === 'reject' && link == "") {
  //                 console.log('reject 2 selected');
  //                 rejectButton?.click();
  //             } else if (purpose === 'custom' && link != "") {
  //                 console.log('custom 3 selected');
  //                 window.open(link, '_blank');

  //             } else {
  //                 console.log('No option selected');
  //             }
  //         });
  //     }
  // }, [purpose])

  const handleUpdate = () => {
    const btnName = document.getElementById("button_name");
    const button = document.querySelector(".focussed");

    if (btnName.value != "") {
      button.textContent = btnName.value;
    }

    const link = document.getElementById("link").value;
    if (link.value != "") {
      setButtonLink(link);
      holderDIV.children[1].innerHTML = link;
    }
  };

  const handleSelect = (event) => {
    let selectField = document.getElementById("selectt");
    const linkDiv = document.getElementById("website_link");
    const holderDIV = document.querySelector(".focussedd");

    let selectedOption = selectField.options[selectField.selectedIndex];

    setButtonPurpose(selectedOption.value);
    holderDIV.children[2].innerHTML = selectedOption.value;

    if (selectedOption.value == "custom") {
      linkDiv.style.display = "block";
    } else if (selectedOption.value !== "custom") {
      setButtonLink("");
    } else {
      console.log("No option selected");
    }
  };

  const removeButton = () => {
    document.querySelector(".focussedd").remove();
  };

  const handleBorderSizeChange = (e) =>
  {
    setButtonBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${buttonBorderSize}px`;

  };

  const handleBorderColorChange = (e) =>
  {
    setButtonBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${buttonBorderColor}`;
  };
  const handleRangeBlur = (e) => {
    e.target.focus();
  };

  // useEffect(() =>
  // {
  //   localStorage.setItem("borderSize", borderSize === "0")
  //   localStorage.setItem("borderColor", borderColor === "black")
  // }, [borderSize, borderColor]);

  return (
    <>
      <div className="mt-2 mb-3 w-100">
        <h3>Button Settings</h3>
        <Form.Label>Button Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Button name"
          id="button_name"
          onChange={() => { }}
        />
      </div>
      <select
        onChange={handleSelect}
        id="selectt"
        // onChange={handleDateMethod}
        className="select border-0 bg-white rounded w-100 h-75 p-2"
      >
        <option value="">Select</option>
        <option value="finalize">Finalize</option>
        <option value="reject">Reject</option>
        <option value="custom">Custom</option>
      </select>

      <div
        id="website_link"
        className="mt-5 mb-5 w-100"
        style={{ display: "none" }}
      >
        <Form.Label>Website Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Website link"
          id="link"
          onChange={() => { }}
        />
      </div>
      <hr />
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
              value={buttonBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={buttonBorderSize}
              onChange={handleBorderSizeChange}
              onBlur={handleRangeBlur}
              id="range"
              className="range-color"

            />

          </div>
        )}
      </Row>
      <hr />
      <div className="mt-2 text-center pt-5">
        <Button variant="secondary" className="px-5" onClick={handleUpdate}>
          Update Changes
        </Button>
      </div>

      <div className="mt-2 text-center pt-5">
        <Button
          variant="primary"
          className={decoded.details.action === "template" ? "px-5 remove_button" : "px-5 remove_button disable_button"}
          onClick={removeButton}
        >
          Remove Button
        </Button>
      </div>
    </>
  );
};

export default ButtonRightSide;
