import React from "react";

import { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";

const ImageRightSidebar = () => {
  var { setIsFinializeDisabled, handleClicked, setSidebar } = useStateContext();
  const [file, setFile] = useState(null);

  const addImageButtonInput = useRef(null);

  var uploadedImage = "";

  //clicked choose file button
  const chooseFileClick = (e) => {
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

    console.log("iamgeDiv", imageDiv);
    const removalbeFocusseddDiv = document.getElementsByClassName("focussedd");
    console.log("removalbeFocusseddDiv", removalbeFocusseddDiv);
    if (removalbeFocusseddDiv) {
      for (let i = 0; i < removalbeFocusseddDiv?.length; i++) {
        removalbeFocusseddDiv.classList.remove("focussedd");
      }
    }
    // addImageButton;
    while (1) {
      if (imageDiv.classList.contains("holderDIV")) {
        imageDiv.classList.add("focussedd");
        imageDiv.firstElementChild.classList.add("focussed");
        console.log("imageDiv", imageDiv);
        break;
      } else {
        imageDiv = imageDiv.parentElement;
      }
    }
    handleClicked("image2", "table2");

    // if(imageDiv.)

    if (imageDiv) {
      if (imageDiv.parentElement.classList.contains("holderDIV")) {
        imageDiv.parentElement.classList.add("element_updated");
        console.log("imagediv", imageDiv);
        // if (imageDiv.firstElementChild.classList.contains("imageInput")) {
        //   imageDiv.firstElementChild.classList.add("focussed");
        // }
      }
    }
  };
  const handleUpdate = () => {
    const imageName = document.getElementById("image_name");
    const button = document.querySelector(".focussed");
    if (imageName.value != "") {
      button.textContent = imageName.value;
    }
  };

  function removeImage() {
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
          onChange={() => {}}
        />
      </div>
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
