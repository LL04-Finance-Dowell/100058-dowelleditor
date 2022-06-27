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
      <button type='button' onClick={customFunc}
      >
        <img src={icon} alt="icon" />
      </button>
  )

const LeftMenu = ({ showSidebar }) => {
 const [isClicked, setIsClicked] = useState(initialState);

 const handleClick = (clicked) => {
  setIsClicked({ ...isClicked, [clicked]: true});
}
  return (
    <div className="leftMenu">
      
      <NavButton customFunc={() => handleClick('cart')} icon={editSecOptions[0].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[1].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[2].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[3].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[4].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[5].icon} />
      <NavButton customFunc={showSidebar} icon={editSecOptions[6].icon} />

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
