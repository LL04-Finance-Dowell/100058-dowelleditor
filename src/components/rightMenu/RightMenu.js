import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/contextProvider";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";
// import jwt from 'jsonwebtoken';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from "crypto-js";
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
  // token creation code
  // var tokenCreate = jwt.sign({ foo: 'bar' }, 'shhhhh');
  // console.log('token for test', tokenCreate);
  function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);
  
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');
  
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
  
    return encodedSource;
  }

var header = {
  "alg": "HS256",
  "typ": "JWT"
};

var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);

var data = {
  document_id: decoded.details._id,
  action: actionName,
}

var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
var encodedData = base64url(stringifiedData);

var exportToken = encodedHeader + "." + encodedData;
console.log("test token", exportToken);
  // token creation end

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
              onClick={() => alert(exportToken)}
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
