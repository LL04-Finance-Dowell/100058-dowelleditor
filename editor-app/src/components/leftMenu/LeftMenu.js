import React from 'react'
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";

import { useStateContext } from '../../contexts/ContextProvider';

import MidSection from '../midSection/MidSection';
import TextFill from './comp/TextFill';
import { TextBox } from './comp/TextBox';
import { EditorContent } from '@tiptap/react';



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
  
  const data = event.dataTransfer.getData("text/plain");
 console.log(data);
 event.preventDefault();
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
