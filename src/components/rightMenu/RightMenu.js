import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/contextProvider";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "./RightMenu.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import AlignRightSide from "./AlignRightSide";
import CalendarRightSidebar from "./CalendarRightSidebar";
import ImageRightSidebar from "./ImageRightSidebar";
import SignsRightSidebar from "./SignsRightSidebar";
import TableRightSidebar from "./TableRightSidebar";
import DropDownRightSide from "./DropDownRightSide";
import IframeRightSidebar from "./IframeRightSidebar";

const RightMenu = () => {
  const { isClicked, setIsClicked, setSidebar, isFinializeDisabled, newToken, setNewToken } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;

  if (actionName == "document" && docMap) {
    setSidebar(true)
    const delete_buttons = document.getElementsByClassName("remove_button");
    console.log(delete_buttons);
    for(let d=0; d<delete_buttons?.length; d++){
      console.log(delete_buttons[d]);
      delete_buttons[d].classList.add("disable_button")
    }
  }

  if(newToken){
    setSidebar(true)
  }

  useEffect(() => {
    if (isClicked.align2) {
      setIsClicked({
        ...isClicked,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
      });
    }
    if (isClicked.image2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
      });
    }
    if (isClicked.table2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
      });
    }
    if (isClicked.signs2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
      });
    }
    if (isClicked.calendar2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        iframe2: false,
      });
    }
    if (isClicked.dropdown2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        iframe2: false,
      });
    }
    if (isClicked.iframe2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
      });
    }
  }, [
    isClicked.align2,
    isClicked.image2,
    isClicked.table2,
    isClicked.signs2,
    isClicked.calendar2,
    isClicked.dropdown2,
  ]);

  return (
    <div className="fixed3">
      {actionName == "document" && docMap &&
       isClicked.align2 == false &&
       isClicked.image2 == false &&
       isClicked.table2 == false &&
       isClicked.signs2 == false &&
       isClicked.calendar2 == false &&
       isClicked.iframe2 == false &&
       isClicked.dropdown2 == false && (
        <>
          <div className="mt-2 text-center pt-5">
            <Button
              variant="success"
              size="md"
              className="rounded px-5"
              id="saving-button"
              disabled = {isFinializeDisabled}
              onClick={() => alert("Finilize Clicked")}
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
              
              onClick={() => alert("Rejcet Clicked")}
            >
              Reject
            </Button>
          </div>
        </>
      )}
      {newToken &&
        isClicked.align2 == false &&
        isClicked.image2 == false &&
        isClicked.table2 == false &&
        isClicked.signs2 == false &&
        isClicked.calendar2 == false &&
        isClicked.iframe2 == false &&
        isClicked.dropdown2 == false && (
          <>
          <div className="mt-2 text-center pt-5">
            <Button
              variant="success"
              size="md"
              className="rounded px-5"
              id="saving-button"
              onClick={() => alert("Export Clicked")}
            >
              Export
            </Button>
          </div>

          <div className="mt-2 text-center pt-5">
            <Button
              variant="success"
              size="md"
              className="rounded px-5"
              id="saving-button"
              onClick={() => alert("Import Clicked")}
            >
              Import
            </Button>
          </div>
          </>
        )
      }
      {isClicked.align2 && <AlignRightSide />}
      {isClicked.image2 && <ImageRightSidebar />}
      {isClicked.table2 && <TableRightSidebar />}
      {isClicked.signs2 && <SignsRightSidebar />}
      {isClicked.calendar2 && <CalendarRightSidebar />}
      {isClicked.dropdown2 && <DropDownRightSide />}
      {isClicked.iframe2 && <IframeRightSidebar />}
    </div>
  );
};

export default RightMenu;
