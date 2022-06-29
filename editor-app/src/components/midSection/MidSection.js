import React from "react";
import { Container } from "react-bootstrap";
import "./MidSection.css";


const MidSection = ({onDragOver, onDrop}) => {

  return (
    <div className="midSection">
      <Container as="div" className="midSection_container" onDragOver={onDragOver}
        onDrop={onDrop}>
       
      </Container>
    </div>
  );
};

export default MidSection;
