import React from "react";

import { useRef, useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";

const ImageRightSidebar = () =>
{
  var { setIsFinializeDisabled, handleClicked, setSidebar } = useStateContext();
  const [file, setFile] = useState(null);

  const [borderSize, setBorderSize] = useState(
    Number(localStorage.getItem("borderSize")) || 0
  );
  const [borderColor, setBorderColor] = useState(
    localStorage.getItem("borderColor") || "#000000"
  );
  const [showSlider, setShowSlider] = useState(false);

  const addImageButtonInput = useRef(null);

  var uploadedImage = "";

  //clicked choose file button
  const chooseFileClick = (e) =>
  {
    e.stopPropagation();

    var imageDiv = document.querySelector(".focussedd");
    const addImageButtonInput = document.getElementsByClassName(
      "addImageButtonInput"
    );
    addImageButtonInput.item(0).click();
    imageDiv.firstElementChild.innerText = "";
    // console.log(
    //   "imageDiv.classList.contains",
    //   imageDiv.classList.contains("holderDIV")
    // );
    // if (!imageDiv.classList.contains("holderDIV")) {
    // imageDiv.classList.add("focussedd");
    // }
    // imageDiv.firstElementChild.classList.add("focussed");
    handleClicked("image2", "table2");

    console.log("iamgeDiv", imageDiv);
    const removalbeFocusseddDiv = document.getElementsByClassName("focussedd");
    // console.log("removalbeFocusseddDiv", removalbeFocusseddDiv);
    if (removalbeFocusseddDiv)
    {
      for (let i = 0; i < removalbeFocusseddDiv?.length; i++)
      {
        removalbeFocusseddDiv[i].classList.remove("focussedd");
      }
    }

    const removalbeFocussedDiv = document.getElementsByClassName("focussed");
    // console.log("removalbeFocusseddDiv", removalbeFocusseddDiv);
    if (removalbeFocussedDiv)
    {
      for (let i = 0; i < removalbeFocussedDiv?.length; i++)
      {
        removalbeFocussedDiv[i].classList.remove("focussed");
      }
    }
    // // addImageButton;
    while (1)
    {
      if (imageDiv.classList.contains("holderDIV"))
      {
        imageDiv.classList.add("focussedd");
        imageDiv.firstElementChild.classList.add("focussed");
        console.log("imageDiv", imageDiv);
        break;
      } else
      {
        imageDiv = imageDiv.parentElement;
      }
    }

    // if(imageDiv.)

    if (imageDiv)
    {
      if (imageDiv.parentElement.classList.contains("holderDIV"))
      {
        imageDiv.parentElement.classList.add("element_updated");
        console.log("imagediv", imageDiv);
        // if (imageDiv.firstElementChild.classList.contains("imageInput")) {
        //   imageDiv.firstElementChild.classList.add("focussed");
        // }
      }
    }
  };
  const handleUpdate = () =>
  {
    const imageName = document.getElementById("image_name");
    const button = document.querySelector(".focussed");
    if (imageName.value != "")
    {
      button.textContent = imageName.value;
    }
  };

  function removeImage()
  {
    if (document.querySelector(".focussedd").classList.contains("dropp"))
    {
      if (document.querySelector(".focussedd").hasChildNodes())
      {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++)
        {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else
    {
      document.querySelector(".focussedd").remove();
    }
  }

  const handleBorderSizeChange = (e) =>
  {
    setBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${borderSize}px`;

  };

  const handleBorderColorChange = (e) =>
  {
    setBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${borderColor}`;

  };
  const handleRangeBlur = (e) =>
  {
    e.target.focus();
  };
  useEffect(() =>
  {
    localStorage.setItem("borderSize", borderSize === "0")
    localStorage.setItem("borderColor", borderColor === "black")
  }, [borderSize, borderColor]);
  return (
    <>
      {/* <div className='dropdown pt-4'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}

      <div className="mt-2 mb-3 w-100">
        <h3>Image Settings</h3>
        <Form.Label>Place Holder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Choose Image"
          id="image_name"
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
              value={borderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={borderSize}
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
      <div className="mt-5 text-center pt-1">
        <Button
          className="w-75"
          variant="secondary"
          onClick={(e) => chooseFileClick(e)}
        >
          Choose Image
        </Button>
      </div>
      <div className="mt-5 text-center pt-1">
        <Button
          className="w-75 remove_button"
          variant="primary"
          onClick={removeImage}
        >
          Remove Image
        </Button>
      </div>
    </>
  );
};

export default ImageRightSidebar;
