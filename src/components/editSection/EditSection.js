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
export const editSec_midSec_ref = document.querySelector(".editSec_midSec");

const EditSection = () => {
  const { isClicked, sidebar } = useStateContext();

  const newPageButton = document.querySelector(".new-page-btn");

  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col lg={1}>
            {/* <LeftMenu showSidebar={showSidebar} /> */}
            <LeftMenu />
          </Col>
          <Col lg={sidebar ? 8 : 11} as="div" className="editSec_midSec">
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
