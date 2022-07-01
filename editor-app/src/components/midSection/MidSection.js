import React from "react";
import { Container } from "react-bootstrap";
import "./MidSection.css";

import { onDrop, dragOver } from "../leftMenu/LeftMenu";
import { TextBox } from "../leftMenu/comp/TextBox";


const MidSection = () => {

  return (
  
    
    <div className="midSection">
      <Container as="div" className="midSection_container" onDragOver={dragOver}
        onDrop={onDrop}>
       <TextBox />
      </Container>
    </div>
  
  );
};

export default MidSection;
