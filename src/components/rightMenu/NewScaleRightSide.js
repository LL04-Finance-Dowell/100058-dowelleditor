/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useSearchParams } from "react-router-dom";
import { GrEmoji } from "react-icons/gr";
import Picker from "emoji-picker-react";

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
    setScaleData,
    setScaleId,
    scaleId,
  } = useStateContext();

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [score, setScore] = useState(false);
  const [showBorder, setShowBorder] = useState(true);
  const [holdText, setHoldText] = useState("");
  
  const fontStyles = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Comic Sans MS",
    "Impact",
    "Arial Black",
  ];
  let scale = document.querySelector(".focussedd");
  const scaleDisplay = scale?.querySelector(".scool_input").style.display;
  let circles = scale?.querySelector(".circle_label");
  let scaleBg = scale?.querySelector(".label_hold");
  let fontColor = scale?.firstChild;
  const element = JSON.parse(sessionStorage.getItem("cutItem"));
  // console.log(scale);
  // console.log(fontColor.style.color);
  let fontFamlity = scale?.firstChild;
  // console.log(fontFamlity);

  // if(!scale)
  if (fontColor) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(fontColor).color;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    fontColor =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");

    // console.log(fontColor);
  }
  // console.log(circles);
  if (circles) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(circles).backgroundColor;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    circles =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");

    // console.log(circles);
  }

  if (scaleBg) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(scaleBg).backgroundColor;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    scaleBg =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");
  }
  // console.log(scaleDisplay);

  const leftChild = scale?.querySelector(".left_child");
  const neutralChild = scale?.querySelector(".neutral_child");
  const rightChild = scale?.querySelector(".right_child");
  const scaleT = scale?.querySelector(".scale_text")

  const [scaleTitle, setScaleTitle] = useState(scaleT ? scaleT.innerHTML:"")

  // console.log(leftChild.innerHTML);
  const handleFormat = () => {
    const format = document.getElementById("select");
    const selectedValue = format.value;
    if (selectedValue === "select") {
      document.getElementById("emoji").style.display = "none";
      document.getElementById("image").style.display = "none";
    } else if (selectedValue === "emoji") {
      document.getElementById("emoji").style.display = "flex";
      document.getElementById("image").style.display = "none";
    } else if (selectedValue === "image") {
      document.getElementById("image").style.display = "flex";
      document.getElementById("emoji").style.display = "none";
    }
  };

  const onEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setInputStr((prevInputStr) => prevInputStr + emoji);
    setShowPicker(false);
  };
  const [borderSize, setBorderSize] = useState(
    Number(localStorage.getItem("borderSize")) || 0
  );
  const [borderColor, setBorderColor] = useState(
    localStorage.getItem("borderColor") || "#000000"
  );
  const [showSlider, setShowSlider] = useState(false);

  const [iframeKey, setIframeKey] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  console.log(data, "data");
  console.log(companyId);

  const holderDIV = document.querySelector(".focussedd");
  // const scaleId = holderDIV?.children[1].innerHTML;
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
    console.log("This is the scale", scaleId)
    e.preventDefault();
    setIsLoading(true);
    Axios.post("https://100035.pythonanywhere.com/api/nps_custom_data/", {
      template_id: decoded.details._id,
      scale_id: element?.raw_data?.scaleID,
      custom_input_groupings: selectedOptions,
      scale_label: scaleTitle,
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

  const buttonChildLeft = document.querySelector(".left_child");

  console.log(scale);
  const handleUpdates = () => {
    const scale = document.querySelector(".focussedd");
    console.log(scale);
    const circles = scale?.querySelector(".circle_label");
    console.log(circles);
    const btnUpdateButton = document.getElementById("button_color");
    const btnUpdateScale = document.getElementById("scale_color");
    const btnUpdateFontColor = document.getElementById("font_color");
    const btnUpdateScaleFont = document.getElementById("font_style");
    const beNametnUpdateScal = document.getElementById("scaleLabel");

    const headerText = document.getElementById("headerText");
    console.log(headerText);
    console.log(btnUpdateScale);
    // const btnUpdateOrientation = document.getElementById("orientation");
    const btnUpdateLeft = document.getElementById("left");
    const btnUpdateRight = document.getElementById("right");
    const btnUpdateCenter = document.getElementById("centre");
    // const btnUpdateScales = document.getElementById("scales");
    // const btnUpdateScore = document.getElementById("score");
     const btnUpdateScaleLabel = document.getElementById("scaleLabel");
    // const btnUpdateTime = document.getElementById("time");
    // const btnUpdateFormat = document.getElementById("select");
    // const button1 = document.querySelector(".focussed");

    const button = scale?.querySelector(".label_hold");
    console.log(button);
    // const btnParent = document.getElementById("parent");
    const scaleText = scale?.querySelector(".scale_text");
    // const buttonScaleField = document.querySelector(".scaleInput");
    const button4 = scale?.querySelector(".scool_input");
    const font = scale?.querySelector(".newScaleInput");
    console.log(font);
    console.log(button4);
    const buttonCircle = scale?.querySelectorAll(".circle_label");
    const buttonCircleM = scale?.querySelector(".circle_label");
    const buttonChild = document.getElementById("child");
    const buttonChildLeft = scale?.querySelector(".left_child");
    const buttonChildRight = scale?.querySelector(".right_child");
    const buttonChildNeutral = scale?.querySelector(".neutral_child");
    const option =
      document.querySelector("select").options[
        document.querySelector("select").selectedIndex
      ];
    console.log(option.value);
    console.log(option);
    console.log(button4.style.display);
    console.log(buttonCircleM);
    button4.style.display = "block";
    console.log(button4.style.display);

    // if (btnUpdateScaleName.value !== "") {
    //   button3.textContent = btnUpdateScaleName.value;
    // }

    if (btnUpdateScale.value !== "") {
      button.style.backgroundColor = btnUpdateScale.value;
    }

    for (let i = 0; i < buttonCircle.length; i++) {
      if (btnUpdateButton.value !== "") {
        buttonCircle[i].style.backgroundColor = btnUpdateButton.value;
      }
    }

    if (btnUpdateFontColor.value !== "") {
      button4.style.color = btnUpdateFontColor.value;
    }

    if (btnUpdateScaleFont.value !== "") {
      button4.style.fontFamily = btnUpdateScaleFont.value;
    }

    if (option.value === "Horizontal") {
      button4.style.border = "block";
      button4.style.textAlign = "center";
      button.style.display = "flex";
      button.style.flexDirection = "row";
      // button.style.marginTop = "5%";
      button.style.alignItems = "center";
      // buttonCircle.style.flexDirection = "row";
      button.style.height = "85%";
      button.style.width = "100%";
      button.style.flexDirection = "row";
      buttonChildRight.style.marginTop = "0px";
      buttonChildNeutral.style.marginTop = "0px";
      buttonChild.style.flexDirection = "row";
      buttonChild.style.justifyContent = "space-between";
      buttonChild.style.alignItems = "center";
      button.style.position = "relative";
      buttonChild.style.marginLeft = "0px";
      button.style.marginLeft = "0px";
    }

    if (option.value === "Vertical") {
      button4.style.border = "none";
      button4.style.textAlign = "center";
      button.style.height = "100%";
      button.style.width = "30%";
      button.style.position = "absolute";
      button.style.flexDirection = "column";
      button.style.alignItems = "center";
      button.style.marginTop = "0";
      // button.style.marginLeft = "26%";
      buttonChild.style.display = "flex";
      buttonChild.style.flexDirection = "column";
      buttonChild.style.justifyContent = "space-between";
      // buttonChild.style.marginLeft = "38%";
      buttonChildLeft.style.marginTop = "0px";
      buttonChildRight.style.marginTop = "40%";
      buttonChildNeutral.style.marginTop = "50%";
      //buttonCircle.style.flexDirection = "column";
      buttonCircleM.style.marginTop = "2px";
    }

    if (btnUpdateLeft.value !== "") {
      buttonChildLeft.textContent = btnUpdateLeft.value;
    }

    if (btnUpdateRight.value !== "") {
      buttonChildRight.textContent = btnUpdateRight.value;
    }

    if (btnUpdateCenter.value !== "") {
      buttonChildNeutral.textContent = btnUpdateCenter.value;
    }
    // if (btnUpdateScales.value !=="") {
    //   button4.style.textContent = btnUpdateScales.value;
    // }
    // if (btnUpdateScore.value !=="") {
    //   buttonChild.style.color = btnUpdateScore.value;
    // }
    if (beNametnUpdateScal.value !=="") {
       scaleText.textContent = beNametnUpdateScal.value;
     }
    console.log(btnUpdateButton.value);
    console.log(btnUpdateScale.value);
    console.log(btnUpdateFontColor.value);
    // setScaleId("");
    const idHolder = scale?.querySelector(".scaleId");
    console.log(idHolder);
    console.log(scaleId);
    let timeId = document.getElementById("timeId");
    let time = document.getElementById("time");

    if (idHolder.textContent === "scale Id" || idHolder.textContent === "id") {
      setIsLoading(true);
      console.log("post req");
      Axios.post("https://100035.pythonanywhere.com/api/nps_create/", {
        user: "true",
        username: "NdoneAmbrose",
        orientation: option?.value,
        scalecolor: btnUpdateScale.value,
        roundcolor: btnUpdateButton.value,
        fontcolor: btnUpdateFontColor.value,
        fomat: "number",
        allow_resp: false,
        show_total_score: true,
        no_of_scales: 6,
        time: timeId.style.display === "none" ? "00" : time?.value,
        name: beNametnUpdateScal.value,
        left: btnUpdateLeft.value,
        right: btnUpdateRight.value,
        center: btnUpdateCenter.value,
        label_images: { 0: "imagefile", 1: "imagefile", 2: "imagefile" },
        fontstyle: btnUpdateScaleFont.value,
        emoji_format: { 0: "😀", 1: "😃", 2: "😄" },
      })
        .then((res) => {
          if (res.status == 200) {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            if (id.length) {
              setScaleId(id);
              const idHolder = scale?.querySelector(".scaleId");
              idHolder.textContent = scaleId && scaleId;
            }
            console.log(res);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setIsLoading(true);
      console.log("PUT req");
      console.log(idHolder.textContent);
      Axios.put("https://100035.pythonanywhere.com/api/nps_create/", {
        user: "true",
        scale_id: idHolder.textContent,
        username: "NdoneAmbrose",
        orientation: option?.value,
        scalecolor: btnUpdateScale.value,
        roundcolor: btnUpdateButton.value,
        fontcolor: btnUpdateFontColor.value,
        fomat: "number",
        allow_resp: false,
        show_total_score: true,
        no_of_scales: 6,
        time: timeId?.style?.display === "none" ? "00" : time?.value,
        name: beNametnUpdateScal.value,
        left: btnUpdateLeft.value,
        right: btnUpdateRight.value,
        center: btnUpdateCenter.value,
        label_images: { 0: "imagefile", 1: "imagefile", 2: "imagefile" },
        fontstyle: btnUpdateScaleFont.value,
        emoji_format: { 0: "😀", 1: "😃", 2: "😄" },
      })
        .then((res) => {
          if (res.status == 200) {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            setScaleId(scaleId);
            console.log(res);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
    }
  };
  const idHolder = scale?.querySelector(".scaleId");
  console.log(idHolder);
  console.log(scaleId);
  function showIframe() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    const updateScale = document.getElementById("updateScale");
    const setScale = document.getElementById("setScale");
    divIframeRight.style.display = "block";
    updateScale.style.borderBottom = "2px solid lightgreen";
    setScale.style.border = "none";
    divSettingRight.style.display = "none";
    const border = document.getElementById("border");
    border.style.display = "none";
  }

  function showSetting() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    const setScale = document.getElementById("setScale");
    const updateScale = document.getElementById("updateScale");

    divIframeRight.style.display = "none";
    updateScale.style.border = "none";
    setScale.style.borderBottom = "2px solid lightgreen";
    divSettingRight.style.display = "block";
    const border = document.getElementById("border");
    border.style.display = "block";
  }

  const showSingle = () => {
    const divSingleRight = document.getElementById("singleScale");
    const divMultiRight = document.getElementById("multiScale");
    const divInVisible = document.getElementById("invisible");
    divSingleRight.style.display = "block";
    divMultiRight.style.display = "none";
    divInVisible.style.display = "block";
    divSingleRight.style.marginTop = "10px";
  };

  const showMulti = () => {
    const divSingleRight = document.getElementById("singleScale");
    const divMultiRight = document.getElementById("multiScale");
    const divInVisible = document.getElementById("invisible");
    divSingleRight.style.display = "none";
    divMultiRight.style.display = "block";
    divInVisible.style.display = "block";
    divMultiRight.style.marginTop = "10px";
  };

  // const iframeSrc = `https://100035.pythonanywhere.com/nps-editor/settings/${scaleId}`;
  // console.log(iframeSrc, "iframeSrc");

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

  const filteredArray = newArray?.filter((obj) => !customId.includes(obj.id));

  // const elems = document.getElementsByClassName("holderDIV");
  // for (let index = 0; index < elems.length; index++) {
  //   const element = elems[index];
  //   console.log(element.children[0]);
  // }

  const handleSelect = (event) => {
    let selectField = document.querySelectorAll("#select");
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
  const refreshIframe = () => {
    //Assigning the src of iframe to itself to refresh it
    document.getElementById("iframeId").src =
      document.getElementById("iframeId").src;
  };

  const onScoreChange = (e) => {
    let scoreId = document.getElementById("scoreInput");
    if (e.target.checked) {
      scoreId.style.display = "flex";
    } else {
      scoreId.style.display = "none";
    }
  };
  const onTimeChange = (e) => {
    let timeId = document.getElementById("timeId");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };
  return (
    <>
    {
      decoded.details.action === "document" ?
     <>
    <div
      style={{
        width: "100%",
        display: "flex",
        // borderRadius: "20px",
        // backgroundColor: "red",
     }}
    >
      <button
        style={{
          width: "100%",
          border: "none",
          fontWeight: "600",
        }}
        id="updateScale"
        className="py-2 bg-white border-none"
        // style={{"}}
        // onClick={showIframe}
      >
        Appearance
      </button>
      <button
        style={{
          width: "100%",
          border: "none",
          fontWeight: "600",
        }}
        id="setScale"
        className="py-2 bg-white border-none"
        // style={{ bordern: "none", outline: "none" }}
        // onClick={showSetting}
      >
        Configurations
      </button>
    </div>
      <div id="iframeRight">
        <div className="mb-4">
        </div>
      </div>
      { showBorder === true ?
      <>
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
              id="range"
              className="range-color"

            />

          </div>
        )}
      </Row>
      <hr />
      </>: ""
       }
      <div id="settingRight" style={{ display: 'none' }}>
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
        </div>
      </div>
      </>:
      <>
      <div
        style={{
          width: "100%",
          display: "flex",
          // borderRadius: "20px",
          // backgroundColor: "red",
        }}
      >
        <button
          style={{
            width: "100%",
            border: "none",
            fontWeight: "600",
          }}
          id="updateScale"
          className="py-2 bg-white border-none"
          // style={{"}}
          onClick={showIframe}
        >
          Appearance
        </button>
        <button
          style={{
            width: "100%",
            border: "none",
            fontWeight: "600",
          }}
          id="setScale"
          className="py-2 bg-white border-none"
          // style={{ bordern: "none", outline: "none" }}
          onClick={showSetting}
        >
          Configurations
        </button>
      </div>

      <div
        style={{
          width: "100%",
          overflowY: "auto",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
          marginTop: "15px",
          fontSize: "10px",
        }}
        id="iframeRight"
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "0",
              padding: "0",
              flexDirection: "column",
              // gap: "5px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h1
                id="headerText"
                style={{ margin: "auto 0", fontSize: "15px" }}
              >
                Edit {scaleTitle}
              </h1>
            </div>
            <h6 style={{ fontSize: "12px" }}>Orientation</h6>
            <div
              style={{
                backgroundColor: "#e8e8e8",
                // padding: "5px 10px",
                borderRadius: "10px",
                padding: "5px 7px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <select
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  // borderRadius: "10px",
                  // padding: "3px 10px",
                  height: "15px",
                  border: "none",
                  justifyContent: "center",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  margin: "0 auto",
                }}
                className="bg-gray-800"
                id="orientationId"
              >
                <option value="Horizontal" style={{ color: "black" }}>
                  Horizontal
                </option>
                <option value="Vertical" style={{ color: "black" }}>
                  Vertical
                </option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
              // alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Scale Color
                </h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="color"
                    style={{
                      width: "100px",
                      height: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    // defaultValue={
                    //   scaleDisplay.style.display !== "none" ? scaleBg : ""
                    // }
                    // defaultValue={
                    //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                    //   !scaleDisplay
                    //     ? undefined
                    //     : scaleDisplay === "none"
                    //     ? undefined
                    //     : scaleBg
                    // }
                    defaultValue={scaleBg ? scaleBg : ""}
                    id="scale_color"
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Button Color
                </h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="color"
                    style={{
                      width: "100px",
                      height: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    // defaultValue={
                    //   // scaleDisplay.style?.display !== "none" ? circles : ""
                    //   // scaleDisplay?.style?.display ? scaleDisplay.style.display ==="block" ? circles : ""
                    // }
                    // defaultValue={
                    //   scaleDisplay.style.display === "none"
                    //     ? undefined
                    //     : circles
                    // }
                    // defaultValue={
                    //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                    //   !scaleDisplay
                    //     ? undefined
                    //     : scaleDisplay === "none"
                    //     ? undefined
                    //     : circles
                    // }
                    defaultValue={circles ? circles : ""}
                    id="button_color"
                  />
                  {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Font Color
                </h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="color"
                    style={{
                      width: "100px",
                      height: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    // defaultValue={
                    //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                    //   !scaleDisplay
                    //     ? undefined
                    //     : scaleDisplay === "none"
                    //     ? undefined
                    //     : fontColor
                    // }
                    // defaultValue={
                    //   scaleDisplay.style.display === "none"
                    //     ? undefined
                    //     : fontColor
                    // }
                    // defaultValue={
                    //   scaleDisplay.style.display !== "none" ? fontColor : ""
                    // }
                    defaultValue={fontColor ? fontColor : ""}
                    id="font_color"
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Font Style
                </h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "3px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <select
                    style={{
                      width: "100px",
                      height: "15px",
                      display: "flex",
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      alignItems: "center",
                    }}
                    id="font_style"
                    defaultValue={
                      // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                      fontFamlity ? fontFamlity.style.fontFamily : "Select"
                    }
                  >
                    <option style={{ fontSize: "11px" }}>Select</option>
                    {fontStyles.map((fontStyle, index) => (
                      <option key={index} value={fontStyle}>
                        {fontStyle}
                      </option>
                    ))}
                  </select>
                  {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>Format</h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "3px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <select
                    style={{
                      width: "100px",
                      height: "15px",
                      display: "flex",
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      alignItems: "center",
                    }}
                    id="select"
                    onChange={handleFormat}
                  >
                    <option value="select">Select</option>
                    <option value="image">Image</option>
                    <option value="emoji">Emoji</option>
                  </select>
                  {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>Scale label</h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    onChange={(e)=>setScaleTitle(e.target.value)}
                    // defaultValue={leftChild ? leftChild.innerHTML : ""}
                    // defaultValue={
                    //   scaleDisplay.style.display === "none"
                    //     ? ""
                    //     : leftChild.innerHTML
                    // }
                    defaultValue={
                      // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                      scaleT ? scaleT.innerHTML : ""
                    }
                    style={{
                      width: "100px",
                      height: "12px",
                      display: "flex",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      alignItems: "center",
                    }}
                    id="scaleLabel"
                  />
                </div>
              </div>
              <div
                style={{ display: "none", flexDirection: "column", gap: "2px" }}
                id="emoji"
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Select Emoji
                </h6>
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#e8e8e8",
                    padding: "3px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      width: "100px",
                      height: "15px",
                      display: "flex",
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      alignItems: "center",
                    }}
                    value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "-140px",
                      zIndex: 1,
                      maxWidth: "250px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "5px",
                    }}
                  >
                    {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                  </div>
                  <GrEmoji
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      backgroundColor: "#e8e8e8",
                      right: "-14px",
                      // top: "1px",
                    }}
                    onClick={() => setShowPicker(!showPicker)}
                  />
                </div>
              </div>
              <div
                style={{ display: "none", flexDirection: "column", gap: "2px" }}
                id="image"
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                  Upload Image
                </h6>
                <div
                  style={{
                    position: "relative",
                    // backgroundColor: "#e8e8e8",
                    padding: "3px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      width: "100px",
                      // height: "18px",
                      display: "flex",
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      alignItems: "center",
                    }}
                    type="file"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>Left</h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    // defaultValue={leftChild ? leftChild.innerHTML : ""}
                    // defaultValue={
                    //   scaleDisplay.style.display === "none"
                    //     ? ""
                    //     : leftChild.innerHTML
                    // }
                    defaultValue={
                      // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                      leftChild ? leftChild.innerHTML : ""
                    }
                    style={{
                      width: "100px",
                      height: "12px",
                      display: "flex",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      alignItems: "center",
                    }}
                    id="left"
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h6 style={{ margin: "auto 0", fontSize: "12px" }}>Centre</h6>
                <div
                  style={{
                    backgroundColor: "#e8e8e8",
                    padding: "3px 7px",
                    borderRadius: "7px",
                    // height: "30px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      width: "100px",
                      height: "15px",
                      display: "flex",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      alignItems: "center",
                    }}
                    defaultValue={
                      // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                      neutralChild ? neutralChild.innerHTML : ""
                    }
                    id="centre"
                  />
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <h6 style={{ margin: "auto 0", fontSize: "12px" }}>Right</h6>
              <div
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "3px 7px",
                  borderRadius: "7px",
                  // height: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: "15px",
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    alignItems: "center",
                  }}
                  defaultValue={
                    // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                    rightChild ? rightChild.innerHTML : ""
                  }
                  id="right"
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                Number of scales
              </h6>
              <div
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "3px 7px",
                  borderRadius: "7px",
                  // height: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="1"
                  style={{
                    width: "100%",
                    height: "15px",
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    alignItems: "center",
                  }}
                  id="scales"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                // gap: "2px",
                alignItems: "center",
                justifyContent: "space-between      ",
              }}
            >
              <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>

              <div class="form-check form-switch">
                <input
                  style={{ cursor: "pointer" }}
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  // onChange={(e) => setIsSwitchEnabled(e.target.checked)}
                  onChange={onTimeChange}
                />
              </div>
            </div>

            <div
              style={{
                display: "none",
                flexDirection: "column",
                gap: "2px",
                marginTop: "-10px",
              }}
              id="timeId"
            >
              <div
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "3px 7px",
                  borderRadius: "7px",
                  // height: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="1"
                  style={{
                    width: "100%",
                    height: "15px",
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    alignItems: "center",
                  }}
                  id="time"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                // gap: "2px",
                alignItems: "center",
                justifyContent: "space-between      ",
              }}
            >
              <h6 style={{ fontSize: "12px" }}>
                Show total score for all instances
              </h6>

              <div class="form-check form-switch">
                <input
                  style={{ cursor: "pointer" }}
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  // onChange={(e) => setScore(e.target.checked)}
                  onChange={onScoreChange}
                />
              </div>
            </div>

            {/* {score && ( */}
            <div
              style={{
                display: "none",
                flexDirection: "column",
                gap: "2px",
                marginTop: "-10px",
              }}
              id="scoreInput"
            >
              <div
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "3px 7px",
                  borderRadius: "7px",
                  // height: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="1"
                  style={{
                    width: "100%",
                    height: "15px",
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    alignItems: "center",
                  }}
                  id="score"
                />
              </div>
            </div>
            {/* // )} */}
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "0 5px",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h6 style={{ fontSize: "13px" }}>Grouped Elements</h6>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  // padding: "10px 10px",
                  borderRadius: "10px",
                  // padding: "5px 7px",
                  width: "100%",
                  margin: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="shadow-sm p-3 bg-white rounded "
              >
                <select
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    // borderRadius: "10px",
                    // padding: "3px 10px",
                    // height: "15px",
                    border: "none",
                    justifyContent: "center",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    margin: "0 auto",
                  }}
                  className="bg-gray-800"
                >
                  <option style={{ color: "black" }}>Nothing Selected</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h6 style={{ fontSize: "13px" }}>User Permissions</h6>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  // padding: "10px 10px",
                  borderRadius: "10px",
                  // padding: "2px 0",

                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="shadow-sm p-3 bg-white rounded"
              >
                <select
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    // borderRadius: "10px",
                    // padding: "3px 10px",
                    // height: "15px",
                    border: "none",
                    justifyContent: "center",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    margin: "0 auto",
                  }}
                  className="bg-gray-800"
                >
                  <option style={{ color: "black" }}>Nothing Selected</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Button id="button_id" onClick={handleUpdates}>
        Update
      </Button>
      <div style={{ display: "none" }} id="border">
        <Row className="pt-4">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h6 style={{ marginRight: "10rem" }}>Border</h6>
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => setShowSlider(!showSlider)}
              />
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
      </div>
      <div id="settingRight" style={{ display: "none" }}>
        <h3>Configurations</h3>
        <div id="settingSelect">
          <select
            onChange={handleSelect}
            id="select"
            // onChange={handleDateMethod}
            className="select border-0 bg-white rounded w-100 h-75 p-2"
            //multiple
            style={{ marginBottom: "40px" }}
          >
            <option value="select">Select Element</option>
            {options}
          </select>
        </div>
        <h4>Grouped Elements</h4>
        <div style={{ display: "flex", gap: "10px", padding: "5px" }}>
          <Button
            id="updateSingleScale"
            type="button"
            variant="secondary"
            onClick={showSingle}
          >
            Single Select
          </Button>
          <Button type="button" variant="secondary" onClick={showMulti}>
            Multi Select
          </Button>
        </div>
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
        </div>
        <div id="invisible">
          <div
            id="singleScale"
            style={{ padding: "10px", gap: "10px" }}
            className="select border-0 bg-white rounded w-100 h-75 p-2"
          >
            <p>group 1</p>
            <p>group 2</p>
            <p>group 3</p>
            <p>group 4</p>
          </div>

          <div id="multiScale">
            <select
              onChange={handleSelect}
              id="select"
              // onChange={handleDateMethod}
              className="select border-0 bg-white rounded w-100 h-75 p-2"
              //multiple
              style={{ marginBottom: "30px" }}
            >
              {filteredArray?.map((element, index) => (
                <option key={index} value={element.type} id={element.id}>
                  {`${element.type} ${element.id}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2 text-center pt-3">
          <Button variant="primary" className="px-5" onClick={refreshIframe}>
            refresh
          </Button>
        </div>
        <div className="text-center pt-3" style={{ display: "flex", gap: "10px" }} >
          <Button
            variant="primary"
            className="px-5"
            onClick={scaleSubmit}
            style={{ marginRight: "10px" }}
          >
            Save
          </Button>

          <Button
            variant="secondary"
            // className="remove_button"
            className="remove_button"
            onClick={removeScale}
          >
            Remove Scale
          </Button>
        </div>
        {/* iframe */}
      </div>
    </>
      }
    </>
  );
};

export default ScaleRightSide;
// https://100035.pythonanywhere.com/api/nps_settings_create

//not working