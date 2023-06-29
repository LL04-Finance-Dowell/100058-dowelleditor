import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import { Row, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";

import { useStateContext } from '../../contexts/contextProvider';

const IframeRightSidebar = () =>
{
  const { setSidebar, handleClicked, setIsFinializeDisabled,  iframeBorderSize, setIframeBorderSize, iframeBorderColor, setIframeBorderColor } =
    useStateContext();

  // const [borderSize, setBorderSize] = useState(
  //   Number(localStorage.getItem("borderSize")) || 0
  // );
  // const [borderColor, setBorderColor] = useState(
  //   localStorage.getItem("borderColor") || "#000000"
  // );
  const [showSlider, setShowSlider] = useState(false);

  const makeIframe = () =>
  {
    var iframeDiv = document.querySelector('.focussed');
    var iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = document.getElementById('iframe_src').value;
    iframe.height = document.getElementById('iframe_height').value;
    iframe.width = document.getElementById('iframe_width').value;

    iframeDiv.appendChild(iframe);
    //setIsFinializeDisabled(false)
    if (iframeDiv.parentElement.classList.contains('holderDIV'))
    {
      iframeDiv.parentElement.classList.add('element_updated');
      // console.log('iframe.parentElement', iframeDiv.parentElement);
    }
  };
  function handleChange()
  {
    document.querySelector('.focussed').innerHTML = '';
  }

  function removeIframe()
  {
    document.querySelector('.focussedd').remove();
  }

  const handleBorderSizeChange = (e) =>
  {
    setIframeBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${iframeBorderSize}px`;

  };

  const handleBorderColorChange = (e) =>
  {
    setIframeBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${iframeBorderColor}`;

  };
  const handleRangeBlur = (e) =>
  {
    e.target.focus();
  };
  // useEffect(() =>
  // {
  //   localStorage.setItem("borderSize", borderSize === "0")
  //   localStorage.setItem("borderColor", borderColor === "black")
  // }, [borderSize, borderColor]);
  return (
    <>
      <div>
        <h3>Iframe Settings</h3>
        <Form.Label>Website Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Website link"
          id="iframe_src"
          onChange={handleChange}
        />
      </div>

      <div>
        <h6 className="pt-4">Iframe Size</h6>
        <Form.Label>Enter Height</Form.Label>
        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="iframe_height"
          className="shadow bg-white rounded mb-4"
        />

        <Form.Label>Enter width</Form.Label>

        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="iframe_width"
          className="shadow bg-white rounded mb-4"
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
              value={iframeBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={iframeBorderSize}
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
        <Button variant="secondary" className="px-5" onClick={makeIframe}>
          Create Iframe
        </Button>
      </div>

      <div className="mt-2 text-center pt-5">
        <Button
          variant="primary"
          className="px-5 remove_button"
          onClick={removeIframe}
        >
          Remove Iframe
        </Button>
      </div>
    </>
  );
};

export default IframeRightSidebar;
