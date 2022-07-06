import React from "react";
import { Container } from "react-bootstrap";
import "./MidSection.css";

import { onDrop, dragOver } from "../leftMenu/LeftMenu";
import { TextBox } from "../leftMenu/comp/TextBox";
import { useStateContext } from "../../contexts/ContextProvider";

import Align from "../leftMenu/comp/Align";
import Image from "../leftMenu/comp/Image";
import Table from "../leftMenu/comp/Table";
import Signs from "../leftMenu/comp/Signs";
import Calender from "../leftMenu/comp/Calender";
import DropDown from "../leftMenu/comp/DropDown";



const MidSection = ({showSidebar}) => {
 const { isDropped, handleDrop } = useStateContext();

  return (
  
    <div className="midSection">
      <Container as="div" className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}
        >
        { isDropped.textfill && <TextBox showSidebar={showSidebar}/>}
        { isDropped.align && <TextBox showSidebar={showSidebar}/>}
        { isDropped.image && <Image showSidebar={showSidebar}/>}
        { isDropped.table && <Table showSidebar={showSidebar}/>}
        { isDropped.signs && <Signs showSidebar={showSidebar}/>}
        { isDropped.calendar && <Calender showSidebar={showSidebar}/>}
        { isDropped.dropdown && <DropDown showSidebar={showSidebar}/>}

       
      </Container>
    </div>
  
  );
};

export default MidSection;
