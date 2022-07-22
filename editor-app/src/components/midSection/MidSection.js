import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "./MidSection.css";


import { onDrop, dragOver } from "../leftMenu/LeftMenu";
import TextBox from "../leftMenu/comp/TextBox";
import { useStateContext } from "../../contexts/ContextProvider";


import Image from "../leftMenu/comp/Image";
import Table from "../leftMenu/comp/Table";
import Signs from "../leftMenu/comp/Signs";
import Calender from "../leftMenu/comp/Calender";
import DropDown from "../leftMenu/comp/DropDown";




// const MidSection = ({showSidebar}) => {
const MidSection = () => {
  const { isDropped, setIsClicked, setSidebar } = useStateContext();

  const midSectionRef = useRef(null);


  console.log(midSectionRef.current);


  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (event.target === midSectionRef.current) {
        setSidebar(false);
        setIsClicked(false);
      }
    })
  }, [midSectionRef, setSidebar, setIsClicked]);


  return (

    <div className="midSection" >
      <Container as="div" ref={midSectionRef} className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}
      >
        {isDropped.textfill && <TextBox />}
        {isDropped.align && <TextBox />}
        {isDropped.image &&<Image />}
        {isDropped.table && <Table />}
        {isDropped.signs && <Signs />}
        {isDropped.calendar && <Calender />}
        {isDropped.dropdown && <DropDown />}


      </Container>
    </div>

  );
};

export default MidSection;
