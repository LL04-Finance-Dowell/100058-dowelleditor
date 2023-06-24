import React, { Children, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";

import { useStateContext } from "../../contexts/contextProvider";

import { BiImage, BiText } from "react-icons/bi";
import {
  BsCalendar2Date,
  BsMenuButtonWideFill,
  BsTable,
  BsCodeSquare,
} from "react-icons/bs";

import { SiBigbluebutton, SiLinuxcontainers } from "react-icons/si";
import { FaSignature } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IoScale } from "react-icons/io5";
import { FaCamera } from "react-icons/fa"

import MidSection from "../midSection/MidSection";
import TextFill from "./comp/TextFill";
import TextBox from "./comp/TextBox";
import { EditorContent } from "@tiptap/react";
import { useSearchParams } from "react-router-dom";

const NavButton = ({ customFunc, icon, dragStartFunc, clickFunc, title }) => (
  <button
    type="button"
    title={title}
    draggable="true"
    onDragStart={dragStartFunc}
    id="draggable"
    onDragEnd={dragEndFunc}
    onClick={clickFunc}
  >
    {/* <img src={icon} alt="icon" /> */}
    {icon}
  </button>
);

const CustomButton = ({ children, style }) => (
  <button className={style} type="button">
    {children}
  </button>
);

const dragStartAlign = (e) => {
  const element = document.getElementById("draggable");

  e.dataTransfer.setData("text/plain", "TEXT_INPUT");
  element.classList.add("dragging");
  //console.log("drag start fumb");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartTextF = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "TEXT_FILL");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartImage = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "IMAGE_INPUT");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartTable = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "TABLE_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartSigns = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "SIGN_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartCalendar = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "DATE_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartDropdown = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "DROPDOWN_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};
// const dragStartContainerr = (e) => {
//   const element = document.getElementById("draggable");
//   e.dataTransfer.setData("text/plain", "CONTAINER_INPUT");
//   element.classList.add("dragging");
//   if (document.querySelector(".drop_zone")) {
//     document.querySelector(".drop_zone").classList.remove("drop_zone");
//   }
// };
const dragStartIframe = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "IFRAME_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};
// container

const dragStartContainer = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "CONTAINER_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

// Limon
const dragStartScale = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "SCALE_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragStartNewScale = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "NEW_SCALE_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
    //console.log("drag start fumb");
  }
};

const dragStartCamera = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "CAMERA_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
    //console.log("drag start fumb");
  }
};

const dragStartButton = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "BUTTON_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};
const dragStartEmail = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "FORM");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragEndFunc = () => {
  const element = document.getElementById("draggable");
  element.classList.remove("dragging");
  //console.log("dragend func");
};

export const onDrop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  if (data === "TEXT_INPUT") {
    //console.log("text inputtt");
    // const textInput = document.createElement("textarea");
    // textInput.className = "dropped7";
    // textInput.placeholder = "Enter text here";
    // textInput.style.width = "20%";
    // textInput.style.height = "10%";
    // textInput.onclick = handleClick('align2')
    // document.getElementsByClassName("midSection_container").item(0).appendChild(textInput);
  }
  // const data = event.dataTransfer.getData("text/plain");
  // //console.log(data);
  // if (data === "TEXT_INPUT") {
  //   //console.log("text input");
  // } return TextBox();
};

const LeftMenu = ({ showSidebar }) => {
  const leftMenuRef = useRef(null);
  const alignRef = useRef(null);
  const textfillRef = useRef(null);
  const imageRef = useRef(null);
  const tableRef = useRef(null);
  const signsRef = useRef(null);
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  function removeContainer() {
    document.getElementById("containerInput").parentElement.remove();
  }
  // const leftMenuWidth = leftMenuRef.current;
  // //console.log(leftMenuWidth);
  // const leftMenuWidth = document
  //   .querySelector(".leftMenu")
  //   .getBoundingClientRect();
  // //console.log(window.screen);
  // useEffect(() => {
  //   if (window.screen.width < 426) {
  //     setIsMobileView(true);
  //   } else {
  //     setIsMobileView(false);
  //   }
  // }, [window.screen.width]);
  // const bodyElement = document.getElementsByName("body");
  // //console.log(bodyElement);
  // //console.log(window.screen.width);
  const { handleDrop, isFlipClicked } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // const handleContainerDrop = (event) => {
  //   const typeOfOperation = event.dataTransfer.getData("text/plain");
  //   console.log("typeOfOperation in left menu", typeOfOperation);
  // };
  return (
    <>
      {isFlipClicked ? (
        isMobileView ? (
          <span>X</span>
        ) : (
          <div className="leftMenu fixed2" ref={leftMenuRef}>
            <NavButton
              dragStartFunc={dragStartAlign}
              customFunc={() => handleDrop("align")}
              // icon={editSecOptions[1].icon}
              icon={<BiText />}
              title="Text"
            />
            {/* <NavButton dragStartFunc={dragStartTextF} customFunc={() => handleDrop('textfill')} icon={editSecOptions[1].icon} /> */}
            <NavButton
              dragStartFunc={dragStartImage}
              customFunc={() => handleDrop("image")}
              icon={<BiImage />}
              title="Image"
            />
            {/* test place to see console */}
            <NavButton
              icon={<SiLinuxcontainers />}
              title="Container"
              dragStartFunc={dragStartContainer}
              customFunc={() => handleDrop("container")}
              // onDrop={handleContainerDrop}
              // onDragOver = {e=>{console.log(alert("I am contianer"));}}
            />
            <NavButton
              dragStartFunc={dragStartTable}
              customFunc={() => handleDrop("table")}
              icon={<BsTable />}
              title="Table"
            />
            <NavButton
              dragStartFunc={dragStartSigns}
              customFunc={() => handleDrop("signs")}
              icon={<FaSignature />}
              title="Signature"
            />
            <NavButton
              dragStartFunc={dragStartCalendar}
              customFunc={() => handleDrop("calendar")}
              icon={<BsCalendar2Date />}
              title="Calender"
            />
            <NavButton
              dragStartFunc={dragStartDropdown}
              customFunc={() => handleDrop("dropdown")}
              icon={<BsMenuButtonWideFill />}
              title="Dropdown"
            />
            {/* <NavButton
              dragStartFunc={dragStartContainerr}
              clickFunc={removeContainer}
              customFunc={() => handleDrop('containerr')}
              icon={<BiImage />}
            /> */}
            <NavButton
              dragStartFunc={dragStartIframe}
              customFunc={() => handleDrop("iframe")}
              icon={<BsCodeSquare />}
              title="Iframe"
            />
            <NavButton
              dragStartFunc={dragStartScale}
              customFunc={() => handleDrop("scale")}
              icon={<IoScale />}
              title="Scale"
            />

            <NavButton
              dragStartFunc={dragStartButton}
              customFunc={() => handleDrop("button")}
              icon={<SiBigbluebutton />}
              title="Button"
            />
            <NavButton
              dragStartFunc={dragStartEmail}
              customFunc={() => handleDrop("email")}
              icon={<AiOutlineMail />}
              title="Email"
            />

            <NavButton
              dragStartFunc={dragStartNewScale}
              customFunc={() => handleDrop("newScale")}
              icon={<IoScale />}
              title="NewScale"
            />
            <NavButton
              dragStartFunc={dragStartCamera}
              customFunc={() => handleDrop("camera")}
              icon={<FaCamera />}
              title="camera"
            />: ""
           {"}"}
            {/* test div */}
            {/* <NavButton
              dragStartFunc={dragStartButton}
              customFunc={() => handleDrop("button")}
              icon={<IoScale />}
              title="Button"
            /> */}
          </div>
        )
      ) : (
        <>
          <CustomButton style={"custom_reject_button"}>Reject</CustomButton>
          <CustomButton style={"custom_finalize_button"}>Finalize</CustomButton>
        </>
      )}
    </>
  );
};

export default LeftMenu;
