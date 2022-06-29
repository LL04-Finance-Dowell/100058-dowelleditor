import React, {useState} from 'react'
import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";


import Align from "./comp/Align";
import TextFill from "./comp/TextFill";
import Image from "./comp/Image";
import Table from "./comp/Table";
import Signs from "./comp/Signs";
import Calender from "./comp/Calender";
import DropDown from "./comp/DropDown";
import TextBox from './comp/TextBox';

import MidSection from '../midSection/MidSection';




const initialState = {
  align: false,
  textfill: false,
  image: false,
  table: false,
  signs: false,
  calendar: false,
  dropdown: false,
}


 const NavButton = ({ customFunc, icon }) => (
      <button type='button' 
        draggable='true'
        onDragStart = {dragStart}
      >
        <img src={icon} alt="icon" />
      </button>
  )
 const dragStart =  e => {

    e.dataTransfer.setData("text/plain", "text");

 }

  
const LeftMenu = ({ showSidebar }) => {
  const onDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    console.log(data);
  }

  const dragOver = (event) => {
    const isLink = event.dataTransfer.types.includes("text/plain");
    if (isLink) {
      event.preventDefault();
    }
  }

 const [isClicked, setIsClicked] = useState(initialState);

<MidSection style={{display:"none"}} onDragOver ={dragOver} onDrop={onDrop}/>

  return (
    <div className="leftMenu">
      
      <NavButton icon={editSecOptions[0].icon} />
      <NavButton icon={editSecOptions[1].icon} />
      <NavButton icon={editSecOptions[2].icon} />
      <NavButton icon={editSecOptions[3].icon} />
      <NavButton icon={editSecOptions[4].icon} />
      <NavButton icon={editSecOptions[5].icon} />
      <NavButton icon={editSecOptions[6].icon} />

      

      {isClicked.align && <Align />}
        {isClicked.textfill && <TextFill />}
        {isClicked.image && <Image />}
        {isClicked.table && <Table />}
        {isClicked.signs && <Signs />}
        {isClicked.calendar && <Calender />}
        {isClicked.dropdown && <DropDown />}

    </div>
  );
};

export default LeftMenu;
