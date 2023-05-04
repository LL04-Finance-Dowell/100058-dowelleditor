import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TextBox from "../leftMenu/comp/TextBox";
import LeftMenu from "../leftMenu/LeftMenu";
import MidSection from "../midSection/MidSection.js";
import RightMenu from "../rightMenu/RightMenu";

// import AlignRightSide from '../rightMenu/AlignRightSide';
// import CalendarRightSidebar from '../rightMenu/CalendarRightSidebar';
// import DropDownRightSide from '../rightMenu/DropDownRightSide';
// import ImageRightSidebar from '../rightMenu/ImageRightSidebar';
// import SignsRightSidebar from '../rightMenu/SignsRightSidebar';
// import TableRightSidebar from '../rightMenu/TableRightSidebar';
import Axios from "axios";

import "./EditSection.css";
import { useStateContext } from "../../contexts/contextProvider";
import Printer from "../../utils/spinner/Printer";
export const editSec_midSec_ref = document.querySelector(".editSec_midSec");

const EditSection = () => {
  const {
    isClicked,
    sidebar,
    newToken,
    setNewToken,
    isFinializeDisabled,
    isLoading,
    setIsLoading,
    data,
    setIsMenuVisible,
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const { authorized, process_id } = decoded?.details;

  const newPageButton = document.querySelector(".new-page-btn");
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;

  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     setIsMenuVisible(false);
  //   });
  // }, []);

  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col
            lg={1}
            style={actionName == "document" && { background: "#e3eeff" }}
          >
            {/* <LeftMenu showSidebar={showSidebar} /> */}
            {/* <Printer /> */}

            {actionName == "template" && (
              <div
                style={
                  actionName == "document"
                    ? { background: "#e3eeff" }
                    : { background: "#1c2b48" }
                }
                className="left_menu_wrapper scrollbar"
              >
                <LeftMenu />
              </div>
            )}
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
