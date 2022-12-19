import React, { useEffect, useRef, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import TextBox from "../leftMenu/comp/TextBox";
import LeftMenu from "../leftMenu/LeftMenu";
import MidSection from "../midSection/MidSection.js";
import RightMenu from "../rightMenu/RightMenu";

import AlignRightSide from "../rightMenu/AlignRightSide";
import CalendarRightSidebar from "../rightMenu/CalendarRightSidebar";
import DropDownRightSide from "../rightMenu/DropDownRightSide";
import ImageRightSidebar from "../rightMenu/ImageRightSidebar";
import SignsRightSidebar from "../rightMenu/SignsRightSidebar";
import TableRightSidebar from "../rightMenu/TableRightSidebar";

import "./EditSection.css";
import { useStateContext } from "../../contexts/contextProvider";

const EditSection = () => {
  const { isClicked, sidebar } = useStateContext();

  // var {
  //   sidebar,
  //   dropdownName,
  //   isDropped,
  //   isClicked,
  //   setIsClicked,
  //   setSidebar,
  //   handleClicked,
  //   startDate,
  //   dropdownOptions,
  //   item,
  //   setItem,
  //   isLoading,
  //   setIsLoading,
  // } = useStateContext();

  // const midSectionRef = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     const holderDIV = document.getElementsByClassName("holderDIV");
  //     const holderr = document.getElementsByClassName("holder-menu");
  //     const resizerr = document.getElementsByClassName("resizeBtn");
  //     if (event.target === midSectionRef.current) {
  //       // holderDIV.classList.remove('focussedd')
  //       if (document.querySelector(".focussedd")) {
  //         document.querySelector(".focussedd").classList.remove("focussedd");
  //       }
  //       if (document.querySelector(".focussed")) {
  //         document.querySelector(".focussed").classList.remove("focussed");
  //       }
  //       setSidebar(false);
  //       setIsClicked(false);
  //       setIsClicked({
  //         ...isClicked,
  //         align2: false,
  //         textfill2: false,
  //         image2: false,
  //         table2: false,
  //         signs2: false,
  //         calendar2: false,
  //         dropdown2: false,
  //       });
  //       console.log("mouseDown inside if condition");
  //     }
  //   });
  // }, []);

  const newPageButton = document.querySelector(".new-page-btn");

  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col lg={1}>
            {/* <LeftMenu showSidebar={showSidebar} /> */}
            <LeftMenu />
          </Col>
          <Col
            lg={sidebar ? 8 : 11}
            as="div"
            // ref={midSectionRef}
            className="editSec_midSec"
          >
            {/* <MidSection showSidebar={showSidebar}/> */}
            <MidSection />
          </Col>

          <Col
            style={sidebar ? { display: "block" } : { display: "none" }}
            lg={sidebar ? 3 : 0}
            as="div"
            className="editSec_rightMenu"
          >
            <RightMenu />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EditSection;
