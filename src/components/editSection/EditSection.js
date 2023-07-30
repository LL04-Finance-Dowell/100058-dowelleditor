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
import {
  TEXT_INPUT,
  IMAGE_INPUT,
  DATE_INPUT,
  SIGN_INPUT,
  TABLE_INPUT,
  CONTAINER_INPUT,
  IFRAME_INPUT,
  SCALE_INPUT,
  NEW_SCALE_INPUT,
  CAMERA_INPUT,
  BUTTON_INPUT,
  DROPDOWN_INPUT,
  EMAIL_BUTTON,
} from "../selectAnsAndQuestion";
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
    questionAndAnswerGroupedData, setQuestionAndAnsGroupedData
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





  const [prevSelectedElement, setPrevSelectedElement] = useState(null);
  const [prevSelElmAns, setPrevSelElmAns] = useState([])

  const selectedElement = document.querySelector('.focussedd div')?.id;

  // useEffect(() => {
  //   let borderStyles = "2px solid red";

  //   if (!selectedElement) return;

  //   const questions = new Set();
  //   const answers = new Set();

  //   const data = [...questionAndAnswerGroupedData].map(elm => {
  //     questions.add(elm.question);
  //     answers.add(...elm.answers);
  //     return elm;
  //   });

  //   const updateAnsElmBorder = () => {
  //     const updateBorder = (items) => {
  //       [...items].forEach(item => {
  //         const element = document.getElementById(item);
  //         element.style.border = borderStyles;
  //       })
  //     }
  //     const result = data.find(item => item.question === selectedElement);
  //     const resultAns = result?.answers
  //     if (resultAns) {
  //       updateBorder(resultAns)
  //     }

  //     if (prevSelElmAns?.length > 1) {
  //       updateAnsElmBorder(prevSelElmAns)
  //     }
  //   }

  //   const element = document.getElementById(selectedElement);
  //   element.style.border = borderStyles;

  //   if (prevSelectedElement && prevSelectedElement !== selectedElement) {
  //     console.log("bad if got valled");
  //     const prevElement = document.getElementById(prevSelectedElement);
  //     prevElement.style.border = "none";
  //     updateAnsElmBorder("none");
  //   }

  //   setPrevSelectedElement(selectedElement);
  //   setPrevSelElmAns([...data.find(item => item?.question === selectedElement)?.answers])

  //   if (questions.has(selectedElement)) {
  //     updateAnsElmBorder(borderStyles);
  //   }
  // });

  useEffect(() => {
    const borderStyles = "2px solid red";

    if (!selectedElement) return;

    const questions = new Set();
    const answers = new Set();

    const updateAnsElmBorder = (items, border) => {
      items.forEach(item => {
        if (!item) return;
        // if (!answers.has(item)) return;
        const element = document.getElementById(item);
        element.style.border = border;
      });
    };

    const data = [...questionAndAnswerGroupedData].map(elm => {
      questions.add(elm.question);
      elm?.answers?.forEach(ans => answers.add(ans));
      return elm;
    });

    const element = document.getElementById(selectedElement);
    element.style.border = borderStyles;

    if (prevSelectedElement && prevSelectedElement !== selectedElement) {
      const prevElement = document.getElementById(prevSelectedElement);
      prevElement.style.border = "none";
      updateAnsElmBorder(prevSelElmAns, "none");
    }

    setPrevSelectedElement(selectedElement);
    const result = data.find(item => item?.question === selectedElement);
    setPrevSelElmAns(result?.answers || []);

    if (questions.has(selectedElement)) {
      updateAnsElmBorder(result?.answers, borderStyles);
    }
  }, [prevSelElmAns, prevSelectedElement, questionAndAnswerGroupedData, selectedElement]);





  useEffect(() => {
    const elements = [
      ...document.querySelectorAll(`.${TEXT_INPUT}`),
      ...document.querySelectorAll(`.${IMAGE_INPUT}`),
      ...document.querySelectorAll(`.${DATE_INPUT}`),
      ...document.querySelectorAll(`.${SIGN_INPUT}`),
      ...document.querySelectorAll(`.${TABLE_INPUT}`),
      ...document.querySelectorAll(`.${CONTAINER_INPUT}`),
      ...document.querySelectorAll(`.${IFRAME_INPUT}`),
      ...document.querySelectorAll(`.${SCALE_INPUT}`),
      ...document.querySelectorAll(`.${NEW_SCALE_INPUT}`),
      ...document.querySelectorAll(`.${CAMERA_INPUT}`),
      ...document.querySelectorAll(`.${BUTTON_INPUT}`),
      ...document.querySelectorAll(`.${DROPDOWN_INPUT}`),
      ...document.querySelectorAll(`.${EMAIL_BUTTON}`),
    ];
  })
  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col
            lg={1}
            // style={actionName == "document" && { background: "#e3eeff" }}
            className={`${actionName == "document" && "document_left_col"}`}
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
