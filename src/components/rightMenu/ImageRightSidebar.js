import React from "react";

import { useRef, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";

const ImageRightSidebar = () => {
  var { setIsFinializeDisabled, handleClicked } = useStateContext();
  const [file, setFile] = useState(null);

  const addImageButtonInput = useRef(null);

  var uploadedImage = "";

  //clicked choose file button
  const chooseFileClick = (e) => {
    
    const addImageButtonInput = document.getElementsByClassName(
      "addImageButtonInput"
    );
    addImageButtonInput.item(0).click();
    var imageDiv = document.querySelector(".focussed");
    if (imageDiv) {
      if (imageDiv.parentElement.classList.contains("holderDIV")) {
        imageDiv.parentElement.classList.add("element_updated");
      }
    }
  };

  function removeImage() {
    document.querySelector(".focussedd").remove();
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
