import React, { Children, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";

import { useStateContext } from "../../contexts/contextProvider";

import MidSection from "../midSection/MidSection";
import TextFill from "./comp/TextFill";
import TextBox from "./comp/TextBox";
import { EditorContent } from "@tiptap/react";

const NavButton = ({ customFunc, icon, dragStartFunc, clickFunc }) => (
  <button
    type="button"
    draggable="true"
    onDragStart={dragStartFunc}
    id="draggable"
    onDragEnd={dragEndFunc}
    onClick={clickFunc}
  >
    <img src={icon} alt="icon" />
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
  console.log("drag start fumb");
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
const dragStartContainerr = (e) => {
  const element = document.getElementById("draggable");
  e.dataTransfer.setData("text/plain", "CONTAINER_INPUT");
  element.classList.add("dragging");
  if (document.querySelector(".drop_zone")) {
    document.querySelector(".drop_zone").classList.remove("drop_zone");
  }
};

const dragEndFunc = () => {
  const element = document.getElementById("draggable");
  element.classList.remove("dragging");
  console.log("dragend func");
};

export const onDrop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  if (data === "TEXT_INPUT") {
    console.log("text inputtt");

    // const textInput = document.createElement("textarea");
    // textInput.className = "dropped7";
    // textInput.placeholder = "Enter text here";
    // textInput.style.width = "20%";
    // textInput.style.height = "10%";
    // textInput.onclick = handleClick('align2')

    // document.getElementsByClassName("midSection_container").item(0).appendChild(textInput);
  }
  // const data = event.dataTransfer.getData("text/plain");
  // console.log(data);
  // if (data === "TEXT_INPUT") {
  //   console.log("text input");
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
  // console.log(leftMenuWidth);
  // const leftMenuWidth = document
  //   .querySelector(".leftMenu")
  //   .getBoundingClientRect();
  // console.log(window.screen);
  // useEffect(() => {
  //   if (window.screen.width < 426) {
  //     setIsMobileView(true);
  //   } else {
  //     setIsMobileView(false);
  //   }
  // }, [window.screen.width]);
  // const bodyElement = document.getElementsByName("body");
  // console.log(bodyElement);
  // console.log(window.screen.width);
  const { handleDrop, isFlipClicked } = useStateContext();
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
              icon={editSecOptions[1].icon}
            />
            {/* <NavButton dragStartFunc={dragStartTextF} customFunc={() => handleDrop('textfill')} icon={editSecOptions[1].icon} /> */}
            <NavButton
              dragStartFunc={dragStartImage}
              customFunc={() => handleDrop("image")}
              icon={editSecOptions[2].icon}
            />
            <NavButton
              dragStartFunc={dragStartTable}
              customFunc={() => handleDrop("table")}
              icon={editSecOptions[3].icon}
            />
            <NavButton
              dragStartFunc={dragStartSigns}
              customFunc={() => handleDrop("signs")}
              icon={editSecOptions[4].icon}
            />
            <NavButton
              dragStartFunc={dragStartCalendar}
              customFunc={() => handleDrop("calendar")}
              icon={editSecOptions[5].icon}
            />
            <NavButton
              dragStartFunc={dragStartDropdown}
              customFunc={() => handleDrop("dropdown")}
              icon={editSecOptions[6].icon}
            />
            <NavButton
              dragStartFunc={dragStartContainerr}
              clickFunc={removeContainer}
              customFunc={() => handleDrop("containerr")}
              icon={editSecOptions[0].icon}
            />
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
