import React, { useEffect, useRef, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";

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
import Axios from "axios";

import "./EditSection.css";
import { useStateContext } from "../../contexts/contextProvider";
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
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const { authorized, process_id } = decoded?.details;

  const saveButton = document.getElementById("saving-button");
  console.log(saveButton);
  function handleFinalize() {
    saveButton.click()
    if(isLoading == false)
    Axios.post("https://100094.pythonanywhere.com/v0.1/process/verification/", {
      action: "finalize",
      process_id: process_id,
      authorized: authorized,
    })
      .then((res) => {
        console.log(res);
        alert(res?.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }
  function handleReject() {
    setIsLoading(true)
    Axios.post("https://100094.pythonanywhere.com/v0.1/process/verification/", {
      action: "reject",
      process_id: process_id,
      authorized: authorized,
    })
      .then((res) => {
        setIsLoading(false)        
        console.log(res);
        alert(res?.data);
      })
      .catch((err) => {
        setIsLoading(false) 
        console.log(err);
      });
  }

  const newPageButton = document.querySelector(".new-page-btn");
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;

  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col
            lg={1}
            style={
              actionName == "document"
                ? { background: "#e3eeff" }
                : { background: "#ffffff" }
            }
          >
            {/* <LeftMenu showSidebar={showSidebar} /> */}
            {actionName == "template" && <LeftMenu />}
          </Col>
          <Col lg={sidebar ? 8 : 11} as="div" className="editSec_midSec">
            {/* <MidSection showSidebar={showSidebar}/> */}

            <MidSection />
            {actionName == "document" &&
              docMap &&
              data != "" &&
              isClicked.align2 == false &&
              isClicked.image2 == false &&
              isClicked.table2 == false &&
              isClicked.signs2 == false &&
              isClicked.calendar2 == false &&
              isClicked.iframe2 == false &&
              isClicked.dropdown2 == false && (
                // <div className="finalize_reject_wraper">
                <div
                  className={`finalize_reject d-flex justify-content-center`}
                  style={{
                    position: "fixed",
                    top: window.innerHeight - 150,
                    left: "44%",
                    zIndex: 5,
                  }}
                >
                  <div className="mt-2 text-center pt-5 me-2">
                    <Button
                      variant="success"
                      size="md"
                      className="rounded px-5"
                      id="saving-button"
                      disabled={isFinializeDisabled}
                      onClick={handleFinalize}
                    >
                      Finalize
                    </Button>
                  </div>

                  <div className="mt-2 text-center pt-5">
                    <Button
                      variant="danger"
                      size="md"
                      className="rounded px-5"
                      id="saving-button"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
                // </div>
              )}
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
