import React, { useState } from 'react'
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";


// import Align from "./comp/Align";
// import TextFill from "./comp/TextFill";
// import Image from "./comp/Image";
// import Table from "./comp/Table";
// import Signs from "./comp/Signs";
// import Calender from "./comp/Calender";
// import DropDown from "./comp/DropDown";
// import TextBox from './comp/TextBox';

import MidSection from '../midSection/MidSection';
import { TextBox } from '../midSection/MidSection';



const NavButton = ({ customFunc, icon }) => (
  <button type='button'
    draggable='true'
    onDragStart={dragStart}
  >
    <img src={icon} alt="icon" />
  </button>
)

const dragStart = e => {
  e.dataTransfer.setData("text/plain", "TEXT_INPUT");
  console.log("drag start");

}

export const onDrop = (event) => {
  if ( event.dataTransfer.getData("text/plain") === "TEXT_INPUT") {
    const data = event.dataTransfer.getData("text/plain");
    console.log(data);
    const textBox = document.createElement("div");
    textBox.className = "TEXT_INPUT";
    textBox.innerHTML = data;
    event.target.appendChild(textBox);

    event.preventDefault();

  }

}

export const dragOver = (event) => {
  const isLink = event.dataTransfer.types.includes("text/plain");
  if (isLink) {
    event.preventDefault();
    console.log("drag over");
  }
}
const LeftMenu = ({ showSidebar }) => {

  return (
    <div className="leftMenu">

      <NavButton icon={editSecOptions[0].icon} />
      <NavButton icon={editSecOptions[1].icon} />
      <NavButton icon={editSecOptions[2].icon} />
      <NavButton icon={editSecOptions[3].icon} />
      <NavButton icon={editSecOptions[4].icon} />
      <NavButton icon={editSecOptions[5].icon} />
      <NavButton icon={editSecOptions[6].icon} />


    </div>
  );
};

export default LeftMenu;
