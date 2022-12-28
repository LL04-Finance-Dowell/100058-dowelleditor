import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import { CgPlayListRemove } from "react-icons/cg";
import {
  MdOutlinePostAdd,
  MdSignalCellular0Bar,
  MdOutlineFlipCameraAndroid,
} from "react-icons/md";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { current } from "@reduxjs/toolkit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { item, setItem, setIsLoading, isFlipClicked, setIsFlipClicked } =
    useStateContext();
  //   console.log(headerData);

  const handleUndo = () => {
    document.execCommand("undo");
  };
  const handleRedo = () => {
    document.execCommand("redo");
  };
  const handleCut = () => {
    document.querySelector(".focussedd").remove();
  };
  const handleCopy = () => {
    document.execCommand("copy");
  };

  function createNewPage() {
    const current = [...item];
    current.push("newDiv");
    console.log("create page click", current);
    setItem(current);
    console.log("create page click after", current);
  }

  function removePage() {
    const current = [...item];

    var name = prompt("Enter the number of page to delete");
    if (name != null) {
      const index = name - 1;
      if (index >= 0) {
        //remove item from the basket
        current.splice(index, 1);
        setItem(current);
      } else {
        console.warn(`Cant remove page`);
      }
    }
    console.log(item);
  }

  function getPosition(el) {
    // const rect = el[0].getBoundingClientRect();
    // console.log(el);
    const midSec = document.getElementById("midSection_container");

    const rect = el.getBoundingClientRect();
    const midsectionRect = midSec.getBoundingClientRect();

    // "[[{"width":584.1484375,"height":170.9921875,"top":90.9921875,"left":384.1484375,"type":"TEXT_INPUT","data":"left test text","id":"editTextBox 1"},{"width":1177.1484375,"height":169.9921875,"top":89.9921875,"left":977.1484375,"type":"TEXT_INPUT","data":"right test text","id":"editTextBox 2"}]]"

    //     {width: 584.1484375, height: 170.9921875, top: 90.9921875, left: 384.1484375, type: 'TEXT_INPUT', …}
    // {width: 1177.1484375, height: 169.9921875, top: 89.9921875, left: 977.1484375, type: 'TEXT_INPUT', …}

    return {
      top: rect.top - midsectionRect.top,
      left: rect.left - midsectionRect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
  }

  let contentFile = [];
  let page = [];

  function savingTableData() {
    const tables = document.getElementsByClassName("tableInput");
    let tables_tags = [];

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        var new_table = document.getElementsByTagName("table")[0];
        console.log("New Table");
        console.log(new_table);
        tables_tags.push(new_table);
        console.log("table_tags");
        console.log(tables_tags);
      }
    }
  }

  // let url = "https://100058.pythonanywhere.com/api/save-data-into-collection/";
  // https://100058.pythonanywhere.com/api/post-data-into-collection/
  let elem = {};
  function saveDocument() {
    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      if (txt[0].parentElement.classList.contains("holderDIV")) {
        for (let h = 0; h < txt.length; h++) {
          let tempElem = txt[h].parentElement;
          let tempPosn = getPosition(tempElem);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            left: tempPosn.left,
            type: "TEXT_INPUT",
            data: txt[h].innerHTML,
            id: `t${h + 1}`,
          };

          page.push(elem);
        }
      }
    }

    const img_input = document.getElementsByTagName("input");
    const img = document.getElementsByClassName("imageInput");
    if (img) {
      console.log("Image_input", img_input[0]);
      // if (img_input[0].type === "file") {
      for (let h = 0; h < img.length; h++) {
        const reader = new FileReader();
        let tempElem = img[h].parentElement;
        let tempPosn = getPosition(tempElem);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          left: tempPosn.left,
          type: "IMAGE_INPUT",
          data: img[h].style.backgroundImage,
          id: `i${h + 1}`,
        };
        page.push(elem);
      }
      // }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        let tempElem = date[h].parentElement;
        let tempPosn = getPosition(tempElem);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          left: tempPosn.left,
          type: "DATE_INPUT",
          data: date[h].innerHTML,
          id: `d${h + 1}`,
        };
        page.push(elem);
      }
    }

    const sign = document.getElementsByClassName("signInput");
    if (sign.length) {
      for (let h = 0; h < sign.length; h++) {
        let tempElem = sign[h].parentElement;
        let tempPosn = getPosition(tempElem);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          left: tempPosn.left,
          type: "SIGN_INPUT",
          data:
            decoded.details.action === "document"
              ? sign[h].firstElementChild.src
              : sign[h].innerHTML,
          id: `s${h + 1}`,
        };
        page.push(elem);
      }
    }

    const tables = document.getElementsByClassName("tableInput");

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        // var new_table = document.getElementsByTagName("table")[0];
        let tempElem = tables[t].parentElement;
        let tempPosn = getPosition(tempElem);
        console.log(tables[t].firstElementChild.innerHTML);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          left: tempPosn.left,
          type: "TABLE_INPUT",
          data: tables[t].firstElementChild.innerHTML,
          id: `tab${t + 1}`,
        };
        page.push(elem);
      }
    }
    const dropDowns = document.getElementsByClassName("dropdownInput");

    if (dropDowns.length) {
      for (let d = 0; d < dropDowns.length; d++) {
        // var new_table = document.getElementsByTagName("table")[0];
        let tempElem = dropDowns[d].parentElement;
        let tempPosn = getPosition(tempElem);
        console.log(dropDowns[d].firstElementChild.innerHTML);
        console.log(dropDowns[d].lastElementChild.innerHTML);
        elem = {
          width: tempPosn.width,
          height: tempPosn.height,
          top: tempPosn.top,
          left: tempPosn.left,
          type: "DROPDOWN_INPUT",
          data1: dropDowns[d].firstElementChild.innerHTML,
          data2: dropDowns[d].lastElementChild.innerHTML,
          id: `dd${d + 1}`,
        };
        page.push(elem);
      }
    }

    contentFile.push(page);
    const data = JSON.stringify(contentFile);
    // console.log("ContentFile While saveDoc", data);

    return contentFile;
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  console.log("In header.js", actionName);

  const [data, setData] = useState(["Untitled-file"]);
  const getPostData = async () => {
    const response = await Axios.post(
      "https://100058.pythonanywhere.com/api/get-data-by-collection/",
      {
        database: decoded.details.database,
        collection: decoded.details.collection,
        fields: decoded.details.field,
        id: decoded.details._id,
      }
    )
      .then((res) => {
        const loadedData = res.data;
        console.log(res);

        if (decoded.details.action === "template") {
          setData(loadedData.template_name);
        } else if (decoded.details.action === "document") {
          setData(loadedData.document_name);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  let currentTitle = "Untitled-File";
  // function currentTitleFinder() {
  //   if( decoded.details.action === "template"){
  //     // currentTitle = decoded.details.update_field.template_name
  //     currentTitle = data

  //     console.log("Is template title");
  //    }

  // //   if(decoded.details.action === "document"){
  // //     // currentTitle = decoded.details.update_field.document_name
  // //     currentTitle = data
  // //   }
  // }

  useEffect(() => {
    getPostData();
  }, []);

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const dataa = saveDocument();

    const titleName = document.querySelector(".title-name").innerHTML;

    const field = {
      _id: decoded.details._id,
    };
    let updateField = {};
    if (decoded.details.action === "template") {
      updateField = {
        template_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    } else if (decoded.details.action === "document") {
      updateField = {
        document_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    }

    console.log(updateField);
    console.log(field);

    <iframe src="http://localhost:5500/"></iframe>;

    function sendMessage() {
      const message =
        decoded.details.action === "document"
          ? "Document saved"
          : "Template saved";
      const iframe = document.querySelector("iframe");
      iframe.contentWindow.postMessage(message, "*");
    }

    Axios.post(
      "https://100058.pythonanywhere.com/api/save-data-into-collection/",
      {
        cluster: decoded.details.cluster,
        collection: decoded.details.collection,
        command: decoded.details.command,
        database: decoded.details.database,
        document: decoded.details.document,
        field: field,
        function_ID: decoded.details.function_ID,
        team_member_ID: decoded.details.team_member_ID,
        update_field: updateField,
        page: item,
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          // alert("Data saved successfully");
          toast.success("Saved successfully");
          sendMessage();
        }
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  const handleFlipClick = (e) => {
    setIsFlipClicked(!isFlipClicked);
  };

  return (
    <div
      className={`header ${
        actionName == "template" ? "header_bg_template" : "header_bg_document"
      }`}
    >
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start lhs-header">
            <div className="header_btn">
              <Button
                variant="primary"
                size="md"
                className="rounded "
                id="saving-button"
                onClick={submit}
              >
                Save
              </Button>
              {/* {actionName == "template" && (
                <>
                  <Button
                    variant="success"
                    size="md"
                    className="rounded "
                    id="saving-button"
                    onClick={() => alert("Finilize Clicked")}
                  >
                    Finalize
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    className="rounded "
                    id="saving-button"
                    onClick={() => alert("Rejcet Clicked")}
                  >
                    Reject
                  </Button>
                </>
              )} */}
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon} alt="" />
              <img onClick={handleRedo} src={headerData[1].icon} alt="" />
              <img onClick={handleCut} src={headerData[2].icon} alt="" />
              <img onClick={handleCopy} src={headerData[3].icon} alt="" />
              <img onClick={() => {}} src={headerData[4].icon} alt="" />
              <img onClick={() => {}} src={headerData[5].icon} alt="" />
              <button className="page_btn" onClick={() => createNewPage()}>
                <MdOutlinePostAdd color="white" size={32} />
              </button>
              <button className="page_btn" onClick={() => removePage()}>
                <CgPlayListRemove color="white" size={32} />
              </button>
              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>
          </Col>

          <Col className="d-flex justify-content-center header_p ">
            {/* <div style={{ color: "white", fontSize: 30 }}>Title</div> */}
            <div
              className="title-name"
              contentEditable={true}
              style={{ color: "white", fontSize: 30 }}
              spellCheck="false"
            >
              {/* {(decoded.details.action == "template") ? ((data.data.template_name == "") ? ("Untitled-File"): (data.data.template_name) )
               : ((data.data.document_name == "") ? ("Untitled-File"): (data.data.document_name))} */}
              {data && data}
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end header_user">
            <ToastContainer size={5} />
            <span className="badge bg-warning">
              {actionName == "template" ? "Template" : "Document"}
            </span>
            {/* <MdOutlineFlipCameraAndroid
              className="ms-2 cursor_pointer"
              color="white"
              size={32}
              onClick={handleFlipClick}
            /> */}
            {/* <img src={user} alt="" /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
