import React from 'react'
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";

import { useStateContext } from '../../contexts/ContextProvider';

import MidSection from '../midSection/MidSection';
import TextFill from './comp/TextFill';
import TextBox from './comp/TextBox';
import { EditorContent } from '@tiptap/react';




const NavButton = ({ customFunc, icon }) => (
  <button type='button'
    draggable='true'
    onDragStart={dragStart}
    onDragEnd={customFunc}

  >
    <img src={icon} alt="icon" />
  </button>
)

const dragStart = e => {

  e.dataTransfer.setData("text/plain", "TEXT_INPUT");
  console.log("drag start");
}

export const onDrop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  if(data === "TEXT_INPUT") {
    console.log("text inputttt");
    const inputField = document.createElement("input");
    // const resizerNE = document.createElement("div");
    // const resizerNW = document.createElement("div");
    // const resizerSE = document.createElement("div");
    // const resizerSW = document.createElement("div");
    // resizerNE.classList.add("resizer ne");
    // resizerNW.classList.add("resizer nw");
    // resizerSE.classList.add("resizer se");
    // resizerSW.classList.add("resizer sw");

    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Enter text here");
    inputField.setAttribute("class", "textInput");
    inputField.setAttribute("id", "textInput");
    inputField.setAttribute("name", "textInput");
    inputField.setAttribute("value", "");


    

    document.getElementsByClassName("midSection_container").item(0).appendChild(inputField);



  }
  // const data = event.dataTransfer.getData("text/plain");
  // console.log(data);
  // if (data === "TEXT_INPUT") {
  //   console.log("text input");
  // } return TextBox();
  
}

export const dragOver = (event) => {
  const isLink = event.dataTransfer.types.includes("text/plain");
  if (isLink) {
    event.preventDefault();
    console.log("drag over");
  }
}
const LeftMenu = ({ showSidebar }) => {
  const { handleDrop } = useStateContext()
  return (
    <div className="leftMenu">

      <NavButton customFunc={() => handleDrop('align')} icon={editSecOptions[0].icon} />
      <NavButton customFunc={() => handleDrop('textfill')} icon={editSecOptions[1].icon} />
      <NavButton customFunc={() => handleDrop('image')} icon={editSecOptions[2].icon} />
      <NavButton customFunc={() => handleDrop('table')} icon={editSecOptions[3].icon} />
      <NavButton customFunc={() => handleDrop('signs')} icon={editSecOptions[4].icon} />
      <NavButton customFunc={() => handleDrop('calendar')} icon={editSecOptions[5].icon} />
      <NavButton customFunc={() => handleDrop('dropdown')} icon={editSecOptions[6].icon} />


    </div>
  );
};

export default LeftMenu;
