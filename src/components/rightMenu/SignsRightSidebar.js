import React, { useRef, useState, useEffect } from "react";

import SignatureCanvas from "react-signature-canvas";

// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { Row, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";

// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SignsRightSidebar = () =>
{
  const [borderSize, setBorderSize] = useState(
    Number(localStorage.getItem("borderSize")) || 0
  );
  const [borderColor, setBorderColor] = useState(
    localStorage.getItem("borderColor") || "#000000"
  );
  const [showSlider, setShowSlider] = useState(false);
  const { signState, setSignState, setIsFinializeDisabled, handleClicked } =
    useStateContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  let sigPad = useRef({});
  let data = "";

  const clear = () =>
  {
    sigPad.current.clear();
  };

  const save = () =>
  {
    data = sigPad.current.getTrimmedCanvas().toDataURL("image/png");

    setSignState({ trimmedDataURL: data });

    const signImage = `<img src=${data} />`;

    const sign = document.querySelector(".focussed");
    if (sign.parentElement.classList.contains("focussedd"))
    {
      if (document.querySelector(".focussed").innerHTML != signImage)
      {
        // console.log("signature right menu", document.querySelector('.focussed').innerHTML,"data", data );
        //setIsFinializeDisabled(false)
        if (sign.parentElement.classList.contains("holderDIV"))
        {
          sign.parentElement.classList.add("element_updated");
        }
      }
      console.log("sign data", data);
      document.querySelector(".focussed").innerHTML = signImage;
    }

    //console.log(signImage);
  };

  //clicked choose file button
  const chooseFileClick = () =>
  {
    const addImageButtonInput =
      document.getElementsByClassName("addSignButtonInput");
    addImageButtonInput.item(0).click();
    handleClicked("sign2", "table2");
  };

  function removeSign()
  {
    // document.querySelector('.focussedd').remove();
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
  const handleUpdate = () =>
  {
    const imageName = document.getElementById("image_name");
    const button = document.querySelector(".focussed");
    if (imageName.value != "")
    {
      button.textContent = imageName.value;
    }
  };

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
    <div>
      {decoded.details.action === "document" && (
        <>
          <h3>Add Signature</h3>
          <div>
            <div className="signature">
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 200,
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={sigPad}
              />
            </div>
            <div className="mt-5 text-left pt-1">
              <Button
                className="w-75"
                variant="secondary"
                onClick={(e) => chooseFileClick(e)}
              >
                Upload Sign
              </Button>
            </div>
            <div className="buttons p-4">
              <Button onClick={clear} variant="secondary">
                Clear
              </Button>{" "}
              &nbsp;
              <Button onClick={save} variant="primary">
                Done
              </Button>
            </div>
          </div>
          <hr />

          {/* <div className='dropdown pt-2'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-75 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}
        </>
      )}
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
      <div className="mt-2 mb-3 w-100">
        <h3>Signature Settings</h3>
        <Form.Label>Place Holder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Signature Place Holder"
          id="image_name"
          onChange={() => { }}
        />
      </div>
      <div className="mt-2 text-center pt-5">
        <Button variant="secondary" className="px-5" onClick={handleUpdate}>
          Update Changes
        </Button>
      </div>
      <hr />
      {/* {signState.trimmedDataURL && <img src={signState.trimmedDataURL} alt="sig" />} */}
      <div className="mt-5 text-center">
 
          <Button
            variant="primary"
            onClick={removeSign}
            // className="remove_button"
            className = {decoded.details.action === "template" ? "remove_button" : "remove_button disable_button"}
          >
            Remove Signature
          </Button>
       
      </div>
    </div>
  );
};

export default SignsRightSidebar;
