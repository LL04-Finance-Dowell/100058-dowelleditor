import React from "react";
import { Container } from "react-bootstrap";
import "./MidSection.css";

import { onDrop, dragOver } from "../leftMenu/LeftMenu";

export const TextBox = () => {
  return (
    <div className="textBox">
     <div>passing data</div> 
    </div>
  );
}
const MidSection = () => {

  return (
  
    
    <div className="midSection">
      <Container as="div" className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}>
       
      </Container>
    </div>
  
  );
};

export default MidSection;
