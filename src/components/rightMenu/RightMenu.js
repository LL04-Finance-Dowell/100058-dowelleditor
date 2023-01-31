import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/contextProvider";

import { useSearchParams } from "react-router-dom";
import {
  FaCopy
} from "react-icons/fa";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";
import "./RightMenu.css";

import Axios from "axios";

import { Container, Row, Col, Button } from "react-bootstrap";

import AlignRightSide from "./AlignRightSide";
import CalendarRightSidebar from "./CalendarRightSidebar";
import ImageRightSidebar from "./ImageRightSidebar";
import SignsRightSidebar from "./SignsRightSidebar";
import TableRightSidebar from "./TableRightSidebar";
import DropDownRightSide from "./DropDownRightSide";
import IframeRightSidebar from "./IframeRightSidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightMenu = () => {
  const { isClicked,
    setIsClicked,
    setSidebar,
    isFinializeDisabled,
    newToken,
    setNewToken,
    data,
    setData,
    title,
    setTitle,
    setFetchedData,
    setIsLoading,
    setItem,
    setIsDataRetrieved,
   } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;
  // token creation code
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

  var dataa = {
    document_id: decoded.details._id,
    action: actionName,
  }

  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(dataa));
  var encodedData = base64url(stringifiedData);

  var exportToken = encodedHeader + "." + encodedData;
  console.log("test token", exportToken);
  // token creation end
  // copy text function

function copyText(){
  let div = document.querySelector('.token_text');
  let text = div.innerText;
  let textArea  = document.createElement('textarea');
  textArea.width  = "1px"; 
  textArea.height = "1px";
  textArea.background =  "transparents" ;
  textArea.value = text;
  document.body.append(textArea);
  textArea.select();
  document.execCommand('copy');   //No i18n
  document.body.removeChild(textArea);
  toast('Text coppied', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
// copy text function end



  const getPostData = async () => {
    const decodedTok = jwt_decode(exportToken);
    console.log("tokkkkkkennn", decodedTok);
    const response = await Axios.post(
      "https://100058.pythonanywhere.com/api/get-data-from-collection/",
      {
        document_id: decodedTok.document_id,
        action: decodedTok.action,
      }
    )
      .then((res) => {
        // Handling title
        const loadedDataT = res.data;
        console.log(res);

        if (decoded.details.action === "template") {
          setTitle(loadedDataT.template_name);
        } else if (decoded.details.action === "document") {
          setTitle(loadedDataT.document_name);
        }

        //Handling content
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);
        console.log(loadedData);
        console.log(loadedData[0][0]);
        setData(loadedData[0][0]);
        setIsDataRetrieved(true);
        // setSort(loadedData[0][0]);
        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  function handleToken() {
    
      getPostData()
      
  }

  if (actionName == "document" && docMap) {
    setSidebar(true)
    const delete_buttons = document.getElementsByClassName("remove_button");
    console.log(delete_buttons);
    for (let d = 0; d < delete_buttons?.length; d++) {
      console.log(delete_buttons[d]);
      delete_buttons[d].classList.add("disable_button")
    }
  }

  if (newToken) {
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
                disabled={isFinializeDisabled}
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
          {/* <div className="mt-2 text-center pt-5">
            <Button
              variant="success"
              size="md"
              className="rounded px-5"
              id="saving-button"
              onClick={() => alert(exportToken)}
            >
              Export
            </Button>
          </div> */}
          {/* <!-- Button trigger modal --> */}
          <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
          <div className="mt-2 text-center pt-5">
<button type="button" class="btn btn-success rounded px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Export
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Token</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body token_text">
      {exportToken}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={copyText} type="button" data-bs-dismiss="modal" class="copyBtn"><FaCopy color="gray" size={32} /></button>
      </div>
    </div>
  </div>
</div>
</div>

            <div className="mt-2 text-center pt-5">
              <Button
                variant="success"
                size="md"
                className="rounded px-5"
                id="saving-button"
                onClick={handleToken}
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
