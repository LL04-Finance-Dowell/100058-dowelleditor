import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";

import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import { CgPlayListRemove } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { current } from "@reduxjs/toolkit";

const Header = () => {
  const { item, setItem } = useStateContext();
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
    setItem(current);
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
    console.log(el);
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  }

  let contentFile = [];
  let page = [];

  let url = "https://100058.pythonanywhere.com/api/save-data-into-collection/";
  // https://100058.pythonanywhere.com/api/post-data-into-collection/
  let elem = {};
  function saveDocument() {
    console.log(document.getElementsByClassName("textInput"));
    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      if (txt[0].parentElement.classList.contains("holderDIV")) {
        for (let h = 0; h < txt.length; h++) {
          let tempElem = txt[h].parentElement
          let tempPosn = getPosition(tempElem)
          elem = {
            width: tempPosn.right,
            height: tempPosn.bottom,
            top: tempPosn.top,
            left: tempPosn.left,
            type: "TEXT_INPUT",
            data: txt[h].innerHTML,
            id: `editTextBox ${h + 1}`,
          };

          page.push(elem);
        }
      }
    }

    const img_input = document.getElementsByTagName("input");
    const img = document.getElementsByClassName("imageInput");
    if (img.length) {
      console.log("Image_input", img_input[0]);
      if (img_input[0].type === "file") {
        for (let h = 0; h < img_input.length; h++) {
          const reader = new FileReader();
          let tempElem = img[h].parentElement
          let tempPosn = getPosition(tempElem)
          elem = {
            width: tempPosn.right,
            height: tempPosn.bottom,
            top: tempPosn.top,
            left: tempPosn.left,
            type: "IMAGE_INPUT",
            data: reader.result,
            id: `image component ${h + 1}`,
          };
          page.push(elem);
        }
      }
    }

    const text2 = document.getElementsByClassName("texttInput");


    if (text2.length) {
      if (text2[0].parentElement.classList.contains("holderDIV")) {
        for (let h = 0; h < text2.length; h++) {
          elem = {
            width: getPosition(text2).right,
            height: getPosition(text2).bottom,
            top: getPosition(text2).top,
            left: getPosition(text2).left,
            type: "TEXT_FILL",
            data: text2[h].value,
            id: `text component ${h + 1}`,
          };
          page.push(elem);
        }
      }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        elem = {
          width: getPosition(date).right,
          height: getPosition(date).bottom,
          top: getPosition(date).top,
          left: getPosition(date).left,
          type: "DATE_INPUT",
          data: date[h].innerHTML,
          id: `date component ${h + 1}`,
        };
        page.push(elem);
      }
    }
    // const tablee = document.getElementsByTagName("TABLE")
    // if (tablee.length < 1) {
    //   const img = document.getElementsByTagName("img");
    //   if (img.length) {
    //     const canvas = document.createElement('canvas');
    //     canvas.setAttribute('width', document.style.width);
    //     canvas.setAttribute('height', document.style.height);
    //     const ctx = canvas.getContext('2d');
    //     ctx.drawImage(img[0], 0, 0, parseInt(document.style.width.slice(0, -2)), parseInt(document.style.height.slice(0, -2)));
    //     elem = {
    //       width: getPosition(tablee).style.width,
    //       height: getPosition(tablee).style.height,
    //       top: getPosition(tablee).style.top,
    //       left: getPosition(tablee).style.left,
    //       type: 'IMG_INPUT',
    //       data: canvas.toDataURL(),
    //     }
    //     page.push(elem)
    //   }

    // }

    contentFile.push(page);
    const data = JSON.stringify(contentFile);
    // console.log("ContentFile While saveDoc", data);

    return contentFile;
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  
  
  console.log("In header.js");
  console.log(decoded);

  const [data, setData] = useState([]);
  const getPostData = async () => {
    const response = await Axios.post("https://100058.pythonanywhere.com/api/get-data-by-collection/", {
      database: decoded.details.database,
      collection: decoded.details.collection,
      fields: decoded.details.field,
      id: decoded.details._id
    })
      .then(res => {
        const loadedData = JSON.parse(res.data)
        console.log(res);
        console.log(loadedData);
        setData(loadedData.template_name);
      }).catch(err => {
        // console.log(err);
      }
      );
      
  }

  getPostData();


  let currentTitle = ""
  function currentTitleFinder() {
    if( decoded.details.action === "template"){
      // currentTitle = decoded.details.update_field.template_name
      currentTitle = data
  
      console.log("Is template title");
     } 

  //   if(decoded.details.action === "document"){
  //     // currentTitle = decoded.details.update_field.document_name
  //     currentTitle = data
  //   }
  }



  useEffect(() => {
    if (data !== undefined) {
      currentTitleFinder()
    
    } else {
    console.log("loading");
    }

  },[data])

  



  function submit(e) {
    e.preventDefault();

    const data = saveDocument();

    const titleName = document.querySelector(".title-name").innerHTML


    const field = {
      _id: decoded.details._id,
    };
    let updateField ={}
    if(decoded.details.action === "template"){
      updateField = {
        template_name: titleName,
        content: JSON.stringify(data),
      };
    } 
    if(decoded.details.action === "document"){
      updateField = {
        document_name: titleName,
        content: JSON.stringify(data),
      };
    }
   
    console.log(updateField);

    Axios.post(url, {
      cluster: decoded.details.cluster,
      collection: decoded.details.collection,
      command: decoded.details.command,
      database: decoded.details.database,
      document: decoded.details.document,
      field: field,
      function_ID: decoded.details.function_ID,
      team_member_ID: decoded.details.team_member_ID,
      update_field: updateField,
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="header">
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
            </div>
            <div className="header_icons">
              <img onClick={handleUndo} src={headerData[0].icon} alt="" />
              <img onClick={handleRedo} src={headerData[1].icon} alt="" />
              <img onClick={handleCut} src={headerData[2].icon} alt="" />
              <img onClick={handleCopy} src={headerData[3].icon} alt="" />
              <img onClick={() => { }} src={headerData[4].icon} alt="" />
              <img onClick={() => { }} src={headerData[5].icon} alt="" />
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

          <Col className="d-flex justify-content-center header_p">
            <div className="title-name"
              contentEditable={true}
              style={{ color: "white", fontSize: 30 }}
              spellCheck="false"
            >
             {/* {(decoded.details.action == "template") ? ((data.data.template_name == "") ? ("Untitled-File"): (data.data.template_name) )
               : ((data.data.document_name == "") ? ("Untitled-File"): (data.data.document_name))} */}
               {(currentTitle =="") ? ("Untitled-File") : ((currentTitle))}
            </div>
          </Col>
          <Col className="d-flex justify-content-end header_user">
            <img src={user} alt="" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
