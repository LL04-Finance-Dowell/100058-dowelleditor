import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useSearchParams } from "react-router-dom";

const ScaleRightSide = () => {
  const {
    sidebar,
    setIsLoading,
    scaleData,
    data,
    item,
    isDropped,
    companyId,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
    customId,
    setIframek,
    iframeKey, 
    setIframeKey
  } = useStateContext();

  const [borderSize, setBorderSize] = useState(
    Number(localStorage.getItem("borderSize")) || 0
  );
  const [borderColor, setBorderColor] = useState(
    localStorage.getItem("borderColor") || "#000000"
  );
  const [showSlider, setShowSlider] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  console.log(data, "data");
  console.log(companyId);

  const holderDIV = document.querySelector('.focussedd');
  const scaleField = document.querySelector('.focussed');
  const iframe = scaleField.firstElementChild
  iframe.setAttribute("key", iframeKey);
  iframe.setAttribute("id", "iframeId");
  //console.log(iframe)
  const scaleId = holderDIV?.children[1].innerHTML;
  const label = holderDIV?.children[2];

  const handleChange = (e) => {
    label.innerHTML = e.target.value;
  };

  useEffect(() => {
    setCustom1(localStorage.getItem("inputValue1"));
    setCustom2(localStorage.getItem("inputValue2"));
    setCustom3(localStorage.getItem("inputValue3"));
    localStorage.setItem("borderSize", borderSize === "0");
    localStorage.setItem("borderColor", borderColor === "black");
  }, [borderSize, borderColor]);

  // useEffect(() => {
  //   // Access the iframe's window object and add an event listener to it
  //   const iframeWindow = document.getElementById("update_ifr");
  //   iframeWindow.addEventListener('click', handleClick);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     iframeWindow.removeEventListener('blur', handleClick);
  //   };
  // }, []);
  // function handleClick(event) {
  //   console.log('Click event inside iframe:', event);
  //   setIframeKey(prevKey => prevKey + 1);
  // }

  function sendMessage() {
    const message =
      decoded.details.action === "document"
        ? "Document saved"
        : "Template saved";
    const iframe = document.querySelector("iframe");
    iframe?.contentWindow?.postMessage(message, "*");
  }
  function scaleSubmit(e) {
    console.log(selectedOptions);
    console.log(selectedOptions[0]);
    e.preventDefault();
    setIsLoading(true);
    Axios.post("https://100035.pythonanywhere.com/api/nps_custom_data/", {
      template_id: decoded.details._id,
      scale_id: scaleId,
      custom_input_groupings: selectedOptions,
      scale_label: label.innerHTML,
    })
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          sendMessage();
          console.log(res, "kk");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function showIframe() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    divIframeRight.style.display = "block";
    divSettingRight.style.display = "none";
  }
  function showSetting() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    divIframeRight.style.display = "none";
    divSettingRight.style.display = "block";
  }

  const iframeSrc = `https://100035.pythonanywhere.com/nps-editor/settings/${scaleId}`;
  console.log(iframeSrc, "iframeSrc");

  function removeScale() {
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
  }
  const myArray = Object.values(data)[0];
  function excludeElementsWithAttributeValue(arr, attribute, valueToExclude) {
    return arr?.filter(function (element) {
      return (
        element.hasOwnProperty(attribute) &&
        element[attribute] !== valueToExclude
      );
    });
  }

  var newArray = excludeElementsWithAttributeValue(
    myArray,
    "type",
    "SCALE_INPUT"
  );

  var newArray = excludeElementsWithAttributeValue(
    myArray,
    "type",
    "SCALE_INPUT"
  );

  const filteredArray = newArray?.filter((obj) => !customId.includes(obj.id));

  const elems = document.getElementsByClassName("holderDIV");
  for (let index = 0; index < elems.length; index++) {
    const element = elems[index];
    console.log(element.children[0]);
  }

  const handleSelect = (event) => {
    let selectField = document.getElementById("select");
    var selectedValues = {};
    const options = selectField.options;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        selectedValues[option.value] = option.id;
      }
    }
    console.log(selectedValues);
    setSelectedOptions(selectedValues);

    let selectedOption = selectField.options[selectField.selectedIndex];
    let selectedElementId = selectedOption.id;
    console.log(selectedElementId, "selectedElementId");
    // const selectedElement = myArray.find(
    //   (element) => element.type === selectedTitle
    // );

    const selectedElements = myArray.find(
      (element) => element.id === selectedElementId
    );
    console.log(selectedElements, "selectedElement");

    let divElement = document.getElementById(selectedElements.id);
    console.log(divElement.id, "divElement");

    // divElement.style.border = '4px solid #f00 !important';
    divElement.parentElement.style.border = "2px solid green";
    divElement.focus();

    // if (selectedElementId === divElement.id) {
    //   divElement.style.border = '10px solid #f00 !important';
    //   divElement.style.backgroundColor = '#f00 !important';
    //   divElement.focus();
    // }
  };

  const options = filteredArray?.map((element, index) => (
    <option key={index} value={element.type} id={element.id}>
      {`${element.type} ${element.id}`}
    </option>
  ));

  const handleBorderSizeChange = (e) => {
    setBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${borderSize}px`;
  };

  const handleBorderColorChange = (e) => {
    setBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${borderColor}`;
  };

  const handleRangeBlur = (e) => {
    e.target.focus();
  };

  const refreshIframe = () =>{
    //Assigning the src of iframe to itself to refresh it
    document.getElementById('iframeId').src = document.getElementById('iframeId').src
  }
  return (
    <>
      <div className="">
        <button id="updateScale" onClick={showIframe}>
          Update
        </button>
        <button id="setScale" style={{marginLeft:"10px"}} onClick={showSetting}>
          Settings
        </button>
      </div>
      <div id="iframeRight">
        <h3>Update scale</h3>
        <div className="mb-4">
          <Form.Label>Scale Type</Form.Label>
          <select className="rounded w-100 h-75 p-2 ">
            <option>select</option>
            <option>nps scale</option>
          </select>
        </div>
        <div>
          <iframe
            key={iframeKey}
            style={{ border: "solid 2px black", height: "400px" }}
            id="update_ifr"
            src={iframeSrc}
          ></iframe>
        </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#abab",
              gap: "10px",
              height: "40px",
              width: "90%",
            }}
          >
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
      <div id="settingRight" style={{ display: "none" }}>
        <h3>Configurations</h3>
        {/* iframe */}
        <div>
          {/* <Form.Control
            type="text"
            placeholder={`${decoded.details._id}_scl1`}
            disabled
            className="mb-4"
          // id="iframe_src"
          // onChange={handleChange}
          /> */}

          <select
            onChange={handleSelect}
            id="select"
            // onChange={handleDateMethod}
            className="select border-0 bg-white rounded w-100 h-75 p-2"
            //multiple
            style={{marginBottom:'120px'}}
          >
            {
              filteredArray?.map((element, index) => (
                <option key={index} value={element.type} id={element.id}>
                 {`${element.type} ${element.id}`}
                </option>
                 ))
            }
          </select>
        </div>
        <div>
          <Form.Label>Scale Label</Form.Label>
          <Form.Control
            type="text"
            placeholder="Scale Label"
            value={custom1}
            name="label"
            // id="iframe_src"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2 text-center pt-3">
        <Button variant="primary" className="px-5"     onClick={refreshIframe}>
            refresh
      </Button>
      </div>
        <div className="mt-2 text-center pt-3">
          <Button variant="primary" className="px-5" onClick={scaleSubmit}
          style={{marginRight:"10px"}} >
            Save
          </Button>

          <Button
          variant="secondary"
          className="remove_button"
          onClick={removeScale}
        >
          Remove Scale
        </Button>
        </div>
        {/* iframe */}
      </div>
    </>
  );
};

export default ScaleRightSide;
// https://100035.pythonanywhere.com/api/nps_settings_create
