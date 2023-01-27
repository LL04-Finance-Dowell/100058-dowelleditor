import React, { useEffect, useRef, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { TiDeleteOutline } from "react-icons/ti";

import { useSearchParams } from "react-router-dom";

import FileBase from "react-file-base64";

import { Container } from "react-bootstrap";

import "./MidSection.css";

import TextBox from "../leftMenu/comp/TextBox";
import { useStateContext } from "../../contexts/contextProvider";
import Spinner from "../../utils/spinner/Spinner";
import Image from "../leftMenu/comp/Image";
import Table from "../leftMenu/comp/Table";
import Signs from "../leftMenu/comp/Signs";
import Calender from "../leftMenu/comp/Calender";
import DropDown from "../leftMenu/comp/DropDown";
import TextFill from "../leftMenu/comp/TextFill";
import Axios from "axios";

import jwt_decode from "jwt-decode";
import { editSec_midSec_ref } from "../editSection/EditSection";

// tHIS IS FOR A TEST COMMIT

const dummyData = {
  normal: {
    is_error: false,
    data: [
      [
        {
          _id: "61e50b063623fc65b472e6eb",
          title: "Livinglab did not create wonderful applications.",
          paragraph:
            "When you\u2019re programming in Python, , your data will be structured as a float.\r\n\r\nThis is important we will focus on two of these data types: strings and numbers.",
          source:
            "https://careerkarma.com/blog/python-string-to-int/#:~:text=To%20convert%20a%20string%20to,as%20an%20int%20%2C%20or%20integer.",
          subject: "Livinglab",
          dowelltime: "32941222",
          edited: 0,
          eventId: "FB1010000000016424005125815918",
        },
      ],
    ],
    sampling_status: false,
    sampling_status_text: "Not expected",
  },
};

// const MidSection = ({showSidebar}) => {
const MidSection = () => {
  var {
    sidebar,
    dropdownName,
    setDropdownName,
    isDropped,
    isClicked,
    setIsClicked,
    setSidebar,
    handleClicked,
    startDate,
    dropdownOptions,
    item,
    setItem,
    isLoading,
    setIsLoading,
    fetchedData,
    setFetchedData,
    rightSideDatemenu,
    setRightSideDateMenu,
    setStartDate,
    setRightSideDropDown,
    setMethod,
    deletePages,
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  const flag_editing = decoded?.details?.flag;
  const documnetMap = decoded?.details?.document_map;

  function boldCommand() {
    const strongElement = document.createElement("strong");
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(strongElement);
  }

  const midSectionRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      const holderDIV = document.getElementsByClassName("holderDIV");
      const holderr = document.getElementsByClassName("holder-menu");
      const resizerr = document.getElementsByClassName("resizeBtn");
      // console.log("mouseDown inside if condition", event.target.id);
      // console.log("mouseDown inside if condition", midSectionRef.current.id);

      if (event?.target?.id === midSectionRef?.current?.id) {
        // holderDIV.classList.remove('focussedd')
        if (document.querySelector(".focussedd")) {
          document.querySelector(".focussedd").classList.remove("focussedd");
        }
        if (document.querySelector(".focussed")) {
          document.querySelector(".focussed").classList.remove("focussed");
        }
        setSidebar(false);
        setIsClicked(false);
        setRightSideDateMenu(false);
        setIsClicked({
          ...isClicked,
          align2: false,
          textfill2: false,
          image2: false,
          table2: false,
          signs2: false,
          calendar2: false,
          dropdown2: false,
        });
        // console.log("mouseDown inside if condition", event.target);
        // console.log("mouseDown inside if condition", editSec_midSec_ref);
      }
    });
  }, []);

  // document.querySelectorAll('.midSection_container').forEach()

  const [postData, setPostData] = useState({});
  //   editTextField: { value: "", xcoordinate: "", ycoordinate: "" }
  //   , textField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   imageField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   tableField: { value: "4", xcoordinate: 0, ycoordinate: 0 },
  //   signField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   calenderField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  //   dropdownField: { value: "", xcoordinate: 0, ycoordinate: 0 },
  // });

  // const [searchParams] = useSearchParams();

  // const d_name = searchParams.get('d_name');
  // const col_name = searchParams.get('col_name');
  // const id = searchParams.get('id');
  // const fields = searchParams.get('fields');
  // const token = searchParams.get("token");
  // var decoded = jwt_decode(token);
  // console.log(decoded);

  // const [isLoading, setIsLoading] = useState(true);
  const [isDataRetrieved, setIsDataRetrieved] = useState(false);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState([]);
  const getPostData = async () => {
    var decoded = jwt_decode(token);
    console.log(decoded);
    const response = await Axios.post(
      // "https://100058.pythonanywhere.com/api/get-data-by-collection/",
      // {
      //   database: decoded.details.database,
      //   collection: decoded.details.collection,
      //   fields: decoded.details.field,
      //   id: decoded.details._id,
      // }
      "https://100058.pythonanywhere.com/api/get-data-from-collection/",
      {
        document_id: decoded.details._id,
        action: decoded.details.action,
      }

    )
      .then((res) => {
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);
        console.log(loadedData);
        console.log(loadedData[0][0]);
        setData(loadedData[0][0]);
        setIsDataRetrieved(true);
        setSort(loadedData[0][0]);
        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
        //  setData(oldArray => [...data, loadedData[0]]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error response from midsection get request", err);
        // console.log(err);
      });
  };
  useEffect(() => {
    getPostData();
  }, []);

  // console.log(JSON.stringify(postData));

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);

      onPost();
      // onParagraphPost()
    } else {
      console.log("loading data");
    }
  }, [isDataRetrieved]);

  let resizing = false;
  let contentFile = [];

  // const isTemplate = JSON.parse(document.getElementById('template'));

  function getResizer(attr1, attr2) {
    const resizer = document.createElement("span");
    resizer.style.width = "5px";
    resizer.style.height = "5px";
    resizer.style.display = "block";
    resizer.className = "resizeBtn";
    resizer.style.position = "absolute";
    resizer.style.backgroundColor = "#00aaff";

    if (attr1 === "top") {
      resizer.style.top = "-5px";
    } else {
      resizer.style.bottom = "-5px";
    }

    if (attr2 === "left") {
      resizer.style.left = "-5px";
    } else {
      resizer.style.right = "-5px";
    }

    if (
      (attr1 == "top" && attr2 === "right") ||
      (attr1 == "bottom" && attr2 === "left")
    ) {
      resizer.onmouseover = (event) => {
        event.target.style.cursor = "nesw-resize";
      };
    } else {
      resizer.onmouseover = (event) => {
        event.target.style.cursor = "nwse-resize";
      };
    }

    resizer.onmousedown = (event) => {
      let initX = event.screenX;
      let initY = event.screenY;
      resizing = true;
      event.preventDefault();

      const holder = event.target.parentNode;

      const holderSize = (function () {
        const holderSize = {
          width: holder.offsetWidth,
          height: holder.offsetHeight,
          top: holder.offsetTop,
          left: holder.offsetLeft,
          // width: parseInt(holder.style.width.slice(0, -2)),
          // height: parseInt(holder.style.height.slice(0, -2)),
          // top: parseInt(holder.style.top.slice(0, -2)),
          // left: parseInt(holder.style.left.slice(0, -2))//elemLeft : 0
        };
        return Object.seal(holderSize);
      })();

      window.addEventListener("mousemove", resizeElement);
      function resizeElement(ev) {
        const el = document.getElementById("midSection_container");
        const midsectionRect = el.getBoundingClientRect();
        if (
          ev.screenX > midsectionRect.left &&
          ev.screenY > midsectionRect.top &&
          ev.screenX < midsectionRect.right
        ) {
          if (attr1 == "bottom" && attr2 == "right") {
            holder.style.width = ev.screenX - initX + holderSize.width + "px";
            holder.style.height = ev.screenY - initY + holderSize.height + "px";
          } else if (attr1 == "bottom" && attr2 == "left") {
            holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
            holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
            holder.style.height = ev.screenY - initY + holderSize.height + "px";
          } else if (attr1 == "top" && attr2 == "left") {
            holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
            holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
            holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
            holder.style.height =
              holderSize.height - (ev.screenY - initY) + "px";
          } else if (attr1 == "top" && attr2 == "right") {
            holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
            holder.style.width = holderSize.width + (ev.screenX - initX) + "px";
            holder.style.height =
              holderSize.height - (ev.screenY - initY) + "px";
          }
        }
      }

      window.addEventListener("mouseup", stopResizing);
      function stopResizing(ev) {
        window.removeEventListener("mousemove", resizeElement);
        window.removeEventListener("mouseup", stopResizing);
        resizing = false;
      }
    };

    return resizer;
  }

  //Draggin element over page

  const dragElementOverPage = (event) => {
    let holder;
    console.log("dragElement", event);
    if (!resizing) {
      let initX = event.screenX;
      let initY = event.screenY;

      /* Ensure That target has changed */
      var counterCheck = true;
      var tempTarget = event.target;
      var hitTarget = "";
      while (counterCheck) {
        // if(tempTarget.className === 'holderDIV'){
        if (tempTarget.classList.contains("holderDIV")) {
          hitTarget = tempTarget;
          counterCheck = false;
        } else if (tempTarget.classList.contains("textInput")) {
          hitTarget = null;
          counterCheck = false;
        }
        tempTarget = tempTarget.parentNode;
      }

      holder = hitTarget;
      const holderPos = (function () {
        const holderPos = {
          top: holder.offsetTop,
          left: holder.offsetLeft,
          // top: parseInt(holder.style.top.slice(0, -2)),
          // left: parseInt(holder.style.left.slice(0, -2))
        };
        return Object.seal(holderPos);
      })();

      window.addEventListener("mousemove", moveObject);
      function moveObject(ev) {
        console.log(ev);
        ev.preventDefault();
        const el = document.getElementById("midSection_container");
        const midsectionRect = el.getBoundingClientRect();
        console.log(
          midsectionRect.left,
          midsectionRect.top,
          midsectionRect.right
        );
        //  screenX: 531, screenY: 175, clientX: 531, Top-left
        //  screenX: 1061, screenY: 154, Top right
        if (
          ev.screenX > midsectionRect.left &&
          ev.screenY > midsectionRect.top &&
          ev.screenX < midsectionRect.right
        ) {
          console.log("checking motion");
          const diffX = ev.screenX - initX;
          const diffY = ev.screenY - initY;
          holder.style.top = holderPos.top + diffY + "px";
          holder.style.left = holderPos.left + diffX + "px";
        } else {
          holder.style.top = holderPos.top + "px";
          holder.style.left = holderPos.left + "px";
        }
      }

      window.addEventListener("mouseup", stopMove);
      function stopMove(ev) {
        window.removeEventListener("mousemove", moveObject);
        window.removeEventListener("mouseup", stopMove);
      }
    }
  };

  function getHolderMenu(auth_user) {
    //putting functional menu on holder

    const HMContainer = document.createElement("div");

    HMContainer.style.height = "100%";
    HMContainer.style.padding = "5px";
    HMContainer.style.display = "flex";
    HMContainer.style.alignItems = "center";
    HMContainer.style.justifyContent = "center";
    HMContainer.style.backgroundColor = "rgb(129 129 129 / 50%)";

    // HMContainer.append(getSelectOptionsField(auth_user));

    // if (isTemplate) {
    //     HMContainer.append(getDeleteBtn());
    // }

    const holderMenu = document.createElement("div");
    holderMenu.className = "holder-menu";
    holderMenu.style.height = "35px";
    holderMenu.style.display = "flex";
    holderMenu.style.justifyContent = "center";
    holderMenu.style.width = "100%";
    holderMenu.style.borderRadius = "0%";
    holderMenu.style.position = "absolute";
    holderMenu.style.right = "0px";
    holderMenu.style.top = "-40px";

    holderMenu.append(HMContainer);
    //holderMenu.style.transform = 'translateX(-50%)';

    return holderMenu;
  }

  function getHolderDIV(measure, i, idMatch) {
    console.log("from holder div", i);
    //creating holder for every input field over the page
    const holderDIV = document.createElement("div");
    // holderDIV.style.border = '1px dotted rgb(255 191 0)';
    holderDIV.style.position = "absolute";
    holderDIV.style.overflow = "visible";
    holderDIV.style.display = "flex";
    holderDIV.style.cursor = "move";
    holderDIV.style.zIndex = 1;
    holderDIV.className = "holderDIV";
    holderDIV.setAttribute("id", "holderId");
    holderDIV.setAttribute("data-idD", "INPUT_HOLDER");
    holderDIV.style.display = "flex";
    holderDIV.style.flexDirection = "column";
    // holderDIV.style.border = "2px dotted gray";
    holderDIV.tabIndex = "1";
    // console.log("measure", measure);
    holderDIV.style.width = measure.width;
    holderDIV.style.height = measure.height;
    holderDIV.style.left= measure.left;
    holderDIV.style.top = measure.top;
    holderDIV.classList.add(`page${i}`);
    if(idMatch?.length>0) {
      holderDIV.classList.add(`enable_pointer_event`)
      holderDIV.style.border = '1px solid green !important'
    }else{
      holderDIV.classList.add(`dotted_border`)
    }
    //Putting resize button on holder

    const resizerTL = getResizer("top", "left");
    const resizerTR = getResizer("top", "right");
    const resizerBL = getResizer("bottom", "left");
    const resizerBR = getResizer("bottom", "right");
    const holderMenu = getHolderMenu(measure.auth_user);

    // const isTemplate = JSON.parse(document.getElementById('template'));
    // const currUser = JSON.parse(document.getElementById('curr_user'));

    // if (isTemplate) {
    //   holderDIV.style.border = '1px dotted rgb(255 191 0)';
    //              const resizerTL = getResizer('top', 'left');
    // const resizerTR = getResizer('top', 'right');
    // const resizerBL = getResizer('bottom', 'left');
    // const resizerBR = getResizer('bottom', 'right');

    holderDIV.onmousedown = holderDIV.addEventListener(
      "mousedown",
      (event) => {
        dragElementOverPage(event);
      },
      false
    );

    holderDIV.onresize = (evntt) => {
      console.log("Holder resized");
    };
    // }

    // holderDIV.style.border = "2px dotted gray";

    holderDIV.addEventListener("focus", function (e) {
      // holderDIV.classList.add("focussedd");
      holderDIV.classList.add("zIndex-two");
      holderDIV.style.border = "2px solid orange";
      // holderDIV.append(holderMenu);

      holderDIV.append(resizerTL, resizerTR, resizerBL, resizerBR);
    });

    // holderDIV.addEventListener("click", function (e) {
    //   let allDiv = document.getElementsByClassName("focussedd");
    //   for (let i = 0; i < allDiv.length; i++) {
    //     allDiv[i].classList.remove("focussedd");
    //   }
    //   e.target.parentElement.classList.add("focussedd");
    // });
    holderDIV.addEventListener("focusout", function (e) {
      // holderDIV.classList.remove("focussedd");
      holderDIV.classList.remove("zIndex-two");
      holderDIV.style.border = "2px dotted gray";
      holderMenu.remove();
      resizerTL.remove();
      resizerTR.remove();
      resizerBL.remove();
      resizerBR.remove();
    });

    // if (!isTemplate) {
    //   if (currUser == measure.auth_user) {
    //     console.log("They are equal");
    //     console.log(measure.auth_user);
    //     console.log(currUser);

    //   }

    // }

    return holderDIV;
  }
  function focuseddClassMaintain(e) {
    let allDiv = document.getElementsByClassName("focussedd");
    for (let i = 0; i < allDiv.length; i++) {
      allDiv[i].classList.remove("focussedd");
    }
    e.target.parentElement.classList.add("focussedd");

    let focussedDiv = document.getElementsByClassName("focussed");
    for (let i = 0; i < focussedDiv.length; i++) {
      focussedDiv[i].classList.remove("focussed");
    }
    e.target.classList.add("focussed");

    // e.target.style.backgroundColor = "lightBlue";
  }

  function table_dropdown_focuseddClassMaintain(e) {
    let allDiv = document.getElementsByClassName("focussedd");
    for (let i = 0; i < allDiv.length; i++) {
      allDiv[i].classList.remove("focussedd");
    }
    if (e.target.parentElement.classList.contains("holderDIV")) {
      e.target.parentElement.classList.add("focussedd");
    } else if (
      e.target.parentElement.parentElement.classList.contains("holderDIV")
    ) {
      e.target.parentElement.parentElement.classList.add("focussedd");
    } else if (
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "holderDIV"
      )
    ) {
      e.target.parentElement.parentElement.parentElement.classList.add(
        "focussedd"
      );
    } else if (
      e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
        "holderDIV"
      )
    ) {
      e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
        "focussedd"
      );
    } else if (
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
        "holderDIV"
      )
    ) {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
        "focussedd"
      );
    } else if (
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
        "holderDIV"
      )
    ) {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
        "focussedd"
      );
    }
    let focussedDiv = document.getElementsByClassName("focussed");
    for (let i = 0; i < focussedDiv.length; i++) {
      focussedDiv[i].classList.remove("focussed");
    }
    if (e.target.classList.contains("dropdownInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("dropdownInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    if (e.target.classList.contains("tableInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("tableInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    if (e.target.classList.contains("iframeInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("iframeInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    // e.target.classList.add("focussed");
  }

  const onPost = () => {
    const curr_user = document.getElementById("curr_user");

    const midSec = document.getElementsByClassName("midSection_container");
    
    // const midsectionRect = midSec.getBoundingClientRect();
    // data?.forEach((arrayData) => {
    let pageNo = 0;
    for (let p = 1; p <= item?.length; p++) {

      // const page = midSec[p];
      // if(item && page?.childNodes.length < 2){
      //   // midSec[p].parentElement.remove()
      //   const current = [...item];
      //   current.splice(p-1, 1);
      //   setItem(current);
      // }
      // arrayData.forEach((element) => {
      pageNo++;
      console.log("data" + [p], fetchedData[p]);
      fetchedData[p]?.forEach((element) => {
        console.log("each content", element);
        if (element.type === "TEXT_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
         const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)

          const holderDIV = getHolderDIV(measure, pageNo, idMatch);

          let inputField = document.createElement("div");
          inputField.setAttribute("contenteditable", true);
          //  inputField.setAttribute('draggable', true);
          inputField.className = "textInput";
          inputField.style.width = "100%";
          inputField.style.height = "100%";
          inputField.style.resize = "none";
          inputField.style.zIndex = 2;
          inputField.style.backgroundColor = "#0000";
          inputField.style.borderRadius = "0px";
          inputField.style.outline = "0px";
          inputField.style.overflow = "overlay";
          inputField.style.position = "relative";
          inputField.style.cursor = "text";
          inputField.onclick = (e) => {
            focuseddClassMaintain(e);

            handleClicked("align2");
            setSidebar(true);
            // inputField.parentElement.focus()
          };
          inputField.ontouchstart = () => {
            handleClicked("align2");
            setSidebar(true);
          };
          const text = `${element.raw_data}`;

          inputField.innerHTML = text;
          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(inputField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "IMAGE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          console.log("measure from image input", measure);
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);

          let imageField = document.createElement("div");
          imageField.className = "imageInput";
          imageField.style.width = "100%";
          imageField.style.height = "100%";
          imageField.style.backgroundColor = "#0000";
          imageField.style.borderRadius = "0px";
          imageField.style.outline = "0px";
          imageField.style.overflow = "overlay";
          // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
          imageField.style.position = "relative";

          imageField.onclick = (e) => {
            focuseddClassMaintain(e);
            handleClicked("image2");
            setSidebar(true);
          };

          const imageButton = document.createElement("div");
          imageButton.className = "addImageButton";
          imageButton.innerText = "Choose File";
          imageButton.style.display = "none";

          const imgBtn = document.createElement("input");
          imgBtn.className = "addImageButtonInput";
          imgBtn.type = "file";
          imgBtn.style.objectFit = "cover";
          var uploadedImage = "";

          imgBtn.addEventListener("input", () => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
              uploadedImage = reader.result;
              document.querySelector(
                ".focussed"
              ).style.backgroundImage = `url(${uploadedImage})`;
            });
            reader.readAsDataURL(imgBtn.files[0]);
          });

          imageField.style.backgroundImage = `${element.data}`;
          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          imageButton.append(imgBtn);
          holderDIV.append(imageField);
          holderDIV.append(imageButton);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "DATE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);

          let dateField = document.createElement("div");
          dateField.className = "dateInput";
          dateField.style.width = "100%";
          dateField.style.height = "100%";
          dateField.style.backgroundColor = "#dedede";
          dateField.style.borderRadius = "0px";
          dateField.style.outline = "0px";
          dateField.style.overflow = "overlay";
          // dateField.innerText = `${postData.calenderField.value}`
          dateField.style.position = "relative";

          function dateClick() {
            document.getElementById("date_picker")?.click();
          }
          dateField.onclick = (e) => {
            focuseddClassMaintain(e);
            handleClicked("calendar2");
            setRightSideDateMenu(false);
            console.log("innerText", e.target.innerText);
            if (e.target.innerText != "mm/dd/yyyy") {
              if (e.target.innerText.includes("/")) {
                const setDate = new Date(e.target.innerText);
                console.log("First from Midsection", setDate);
                setMethod("first");
                setStartDate(setDate);
              } else {
                if (e.target.innerText.includes("-")) {
                  setMethod("fourth");
                } else {
                  setMethod("second");
                }
                const setDate = new Date(e.target.innerText);
                console.log("Second from Midsection", setDate);

                setStartDate(setDate);
              }
            }
            setSidebar(true);
            setTimeout(dateClick, 0);
          };
          console.log(`${element.data}`);
          dateField.innerText = `${element.data}`;

          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(dateField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "SIGN_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          console.log("signupmatch", idMatch);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);

          let signField = document.createElement("div");
          signField.className = "signInput";
          signField.style.width = "100%";
          signField.style.height = "100%";
          signField.style.backgroundColor = "#0000";
          signField.style.borderRadius = "0px";
          signField.style.outline = "0px";
          signField.style.overflow = "overlay";
          // signField.innerHTML = `<img src="${postData.signField.value}" alt="">`;
          signField.style.position = "absolute";

          signField.onclick = (e) => {
            focuseddClassMaintain(e);
            if (actionName != "template") {
              handleClicked("signs2");
              setSidebar(true);
            } else {
              setSidebar(false);
            }
          };
          if (
            decoded.details.action === "document" &&
            element.data == "Place your signature here"
          ) {
            // signField.innerHTML = `<img src=${element.data} />`;
            signField.innerHTML = "Place your signature here";
          } else if (decoded.details.action === "document" && element.data) {
            signField.innerHTML = `<img src=${element.data} />`;
          } else {
            signField.innerHTML = "Place your signature ";
          }

          const imageSignButton = document.createElement("div");
          imageSignButton.className = "addImageSignButton";
          imageSignButton.innerText = "Choose File";
          imageSignButton.style.display = "none";

          const signBtn = document.createElement("input");
          signBtn.className = "addSignButtonInput";
          signBtn.type = "file";
          signBtn.style.objectFit = "cover";
          var uploadedImage = "";

          signBtn.addEventListener("input", () => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
              uploadedImage = reader.result;
              const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
              document.querySelector(".focussed").innerHTML = signImage;
            });
            reader.readAsDataURL(signBtn.files[0]);
          });

          imageSignButton.append(signBtn);
          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;
          holderDIV.append(imageSignButton);
          holderDIV.append(signField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "TABLE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);

          let tableField = document.createElement("div");
          tableField.style.backgroundColor = "#0000";
          tableField.style.borderRadius = "0px";
          tableField.style.outline = "0px";
          tableField.style.overflow = "overlay";
          // tableField.innerHTML = 'table';
          tableField.style.position = "absolute";

          tableField.onclick = (e) => {
            // focuseddClassMaintain(e);

            table_dropdown_focuseddClassMaintain(e);

            handleClicked("table2");
            setSidebar(true);
          };

          const tabb = document.createElement("table");
          tabb.innerHTML = element.data;

          tableField.append(tabb);
          var cells = tabb.getElementsByTagName("td");

          for (var i = 0; i < cells.length; i++) {
            cells[i].onclick = function () {
              if (this.hasAttribute("data-clicked")) {
                return;
              }
              this.setAttribute("data-clicked", "yes");
              this.setAttribute("data-text", this.innerHtml);

              var input = document.createElement("input");
              input.setAttribute("type", "text");
              // input.value = this.innerHtml;
              input.style.width = this.offsetWidth - this.clientLeft * 2 + "px";
              input.style.height =
                this.offsetHeight - this.clientTop * 2 + "px";
              input.style.border = "0px";
              input.style.fontFamily = "inherit";
              input.style.fontSize = "inherit";
              input.style.textAlign = "inherit";
              input.style.backgroundColor = "LightGoldenRodYellow";

              input.onblur = function () {
                var td = input.parentElement;
                var org_text = input.parentElement.getAttribute("data-text");
                var current_text = this.value;

                if (org_text != current_text && current_text !== "") {
                  td.removeAttribute("data-clicked");
                  td.removeAttribute("data-text");
                  td.innerHTML = current_text;
                  td.style.cssText = "padding: 5px";
                } else {
                  td.removeAttribute("data-clicked");
                  td.removeAttribute("data-text");
                  td.style.cssText = "padding: 5px";
                  input.remove();
                }
              };

              input.onkeydown = function (event) {
                if (event.keyCode == 13) {
                  this.onblur();
                }
              };
              this.innerHtml = "";
              this.style.cssText = "padding: 0px 0px";
              this.append(input);
              this.firstElementChild.select();
            };
          }

          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(tableField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "IFRAME_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);

          let iframeField = document.createElement("div");
          iframeField.className = "iframeInput";
          iframeField.style.width = "100%";
          iframeField.style.height = "100%";
          iframeField.style.backgroundColor = "#dedede";
          iframeField.style.borderRadius = "0px";
          iframeField.style.outline = "0px";
          iframeField.style.overflow = "overlay";
          // iframeField.innerHTML = "iframe";
          iframeField.style.position = "absolute";

          if(element.data == "iFrame here"){
            iframeField.innerHTML = element.data;
          }
          if(element.data != "iFrame here"){
            const iframe = document.createElement("iframe");
          iframe.src = element.data;
          iframe.width = "100%"
          iframe.height = "100%"

          iframeField.append(iframe);
          }
          



          iframeField.onclick = (e) => {
            // focuseddClassMaintain(e);
            table_dropdown_focuseddClassMaintain(e);
            handleClicked("iframe2");
            setSidebar(true);
          };

          holderDIV.append(iframeField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "DROPDOWN_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp ,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter(elmnt => elmnt == element?.id)
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          // const holderDIV = getHolderDIV(measure, pageNo);
          let dropdownField = document.createElement("div");
          dropdownField.className = "dropdownInput";
          dropdownField.style.width = "100%";
          dropdownField.style.height = "100%";
          dropdownField.style.backgroundColor = "#0000";
          dropdownField.style.borderRadius = "0px";
          dropdownField.style.outline = "0px";
          dropdownField.style.overflow = "overlay";
          // dropdownField.innerHTML = `<select><option>${postData.dropdownField.value}</option></select>`;
          dropdownField.style.position = "absolute";

          const selectElement = document.createElement("select");
          selectElement.className = "select-element";
          // selectElement.style.width = "auto";
          // selectElement.style.height = "auto";

          dropdownField.onclick = (e) => {
            // focuseddClassMaintain(e);
            table_dropdown_focuseddClassMaintain(e);
            handleClicked("dropdown2");
            setRightSideDropDown(false);
            setSidebar(true);
          };

          selectElement.innerHTML = element.data2;

          const para = document.createElement("p");
          para.innerHTML = " Dropdown Name";
          para.className = "dropdownName";
          para.innerText = element.data1;

          dropdownField.append(para);
          dropdownField.append(selectElement);
          setDropdownName(element.data1);

          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(dropdownField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")[p - 1]
            // ?.item(0)
            ?.append(holderDIV);
        }
       
      });
      
    }
    // });
  };

  const onParagraphPost = () => {
    const curr_user = document.getElementById("curr_user");

    const measure = {
      width: "300px",
      height: "100px",
      top: "100px",
      auth_user: curr_user,
    };

    const holderDIV = getHolderDIV(measure);

    let paragraphField = document.createElement("div");
    //  inputField.setAttribute('draggable', true);
    paragraphField.setAttribute("contenteditable", true);
    paragraphField.className = "textInput";
    paragraphField.style.width = "100%";
    paragraphField.style.height = "100%";
    paragraphField.style.resize = "none";
    paragraphField.style.zIndex = 3;
    paragraphField.style.backgroundColor = "#0000";
    paragraphField.style.borderRadius = "0px";
    paragraphField.style.outline = "0px";
    paragraphField.style.overflow = "overlay";
    paragraphField.style.position = "relative";
    paragraphField.style.cursor = "text";
    paragraphField.onclick = () => {
      handleClicked("align2");
      setSidebar(true);
      paragraphField.parentElement.focus();
    };

    paragraphField.innerText = `${data.paragraph}`;
    // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

    holderDIV.append(paragraphField);

    document
      .getElementById("midSection_container")
      // .item(0)
      .append(holderDIV);
  };

  function getOffset(el) {
    const parent = document.getElementById("midSection_container");
    const parentPos = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top - parentPos.top,
      left: rect.left - parentPos.left,
      bottom: rect.bottom - parentPos.top,
      right: rect.right - parentPos.left,
      // left: rect.left + window.scrollX,
      // top: rect.top + window.scrollY
    };
  }

  function getPosition(el) {
    const rect = el[0].getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  }

  const chooseFileClick = () => {
    const addImageButtonInput = document.getElementsByClassName(
      "addImageButtonInput"
    );
    addImageButtonInput.item(0).click();
  };

  const dragOver = (event) => {
    console.log("log from on drag", event);
    const isLink = event.dataTransfer.types.includes("text/plain");
    if (isLink) {
      event.preventDefault();
      event.currentTarget.classList.add("drop_zone");
      if (document.querySelector(".focussedd")) {
        document.querySelector(".focussedd").classList.remove("focussedd");
      }
      if (document.querySelector(".focussed")) {
        document.querySelector(".focussed").classList.remove("focussed");
      }
      setSidebar(false);
      setIsClicked(false);
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
      });
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    console.log("log from on drop", event);
    // document.querySelector('.drop_zone').classList.remove('drop_zone')

    const typeOfOperation = event.dataTransfer.getData("text/plain");
    const curr_user = document.getElementById("current-user");

    const midSec = document.querySelector(".drop_zone");
    const midsectionRect = midSec.getBoundingClientRect();

    const measure = {
      width: "200px",
      height: "80px",
      left: event.clientX - midsectionRect.left + "px",
      top: event.clientY - midsectionRect.top + "px",
      auth_user: curr_user,
    };

    const holderDIV = getHolderDIV(measure);

    // inputField.setAttribute('draggable', false);
    // let editButtonField = undefined;

    if (typeOfOperation === "TEXT_INPUT" && decoded.details.action === "template") {
      let inputField = document.createElement("div");
      //  inputField.setAttribute('draggable', true);
      inputField.setAttribute("contenteditable", true);
      inputField.className = "textInput";
      inputField.innerHTML = "Enter text here";
      inputField.style.width = "100%";
      inputField.style.height = "100%";
      inputField.style.resize = "none";
      inputField.style.backgroundColor = "#0000";
      inputField.style.borderRadius = "0px";
      inputField.style.outline = "0px";
      inputField.style.overflow = "overlay";
      inputField.style.position = "relative";
      inputField.style.cursor = "text";

      // inputField.innerText = `${postData.editTextField.value}`

      // inputField.onchange = (event) => {
      //   event.preventDefault();
      if (inputField.innerHTML[0]) {
        const editTextField = {
          editTextField: {
            value: inputField.innerHTML,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        };

        // postData.push(editTextField);
        // setPostData({
        //   ...postData,
        //   editTextField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

      if (inputField.value !== "") {
        // setPostData({
        //   ...postData,
        //   editTextField: { value: inputField.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

      inputField.onclick = (e) => {
        focuseddClassMaintain(e);
        handleClicked("align2");
        setSidebar(true);
        // holderDIV.classList.add('focussedd')
        // inputField.classList.add("focussed");
        // inputField.parentElement.focus()
      };
      holderDIV.append(inputField);
    } else if (typeOfOperation === "IMAGE_INPUT" && decoded.details.action === "template") {
      let imageField = document.createElement("div");
      imageField.className = "imageInput";
      imageField.style.width = "100%";
      imageField.style.height = "100%";
      imageField.style.backgroundColor = "#0000";
      imageField.style.borderRadius = "0px";
      imageField.style.outline = "0px";
      imageField.style.overflow = "overlay";
      // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
      imageField.style.position = "relative";

      imageField.onclick = (e) => {
        focuseddClassMaintain(e);
        // imageField.classList.add("focussed");
        handleClicked("image2");
        setSidebar(true);
      };

      const imageButton = document.createElement("div");
      imageButton.className = "addImageButton";
      imageButton.innerText = "Choose File";
      imageButton.style.display = "none";
      // imageButton.onclick = (e) => chooseFileClick(e);

      const imgBtn = document.createElement("input");
      imgBtn.className = "addImageButtonInput";
      imgBtn.type = "file";
      imgBtn.style.objectFit = "cover";
      var uploadedImage = "";

      imgBtn.addEventListener("input", () => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          uploadedImage = reader.result;
          document.querySelector(
            ".focussed"
          ).style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(imgBtn.files[0]);
      });

      // imgBtn.style.width = "100%";
      imageButton.append(imgBtn);
      holderDIV.append(imageField);
      holderDIV.append(imageButton);
    } else if (typeOfOperation === "TEXT_FILL") {
      let texttField = document.createElement("textarea");
      texttField.className = "texttInput";
      texttField.placeholder = "input text here";
      texttField.style.width = "100%";
      texttField.style.height = "100%";
      texttField.style.resize = "none";
      texttField.style.backgroundColor = "#0000";
      texttField.style.borderRadius = "0px";
      texttField.style.outline = "0px";
      texttField.style.overflow = "overlay";
      // texttField.innerText = `${postData.textField.value}`
      texttField.style.position = "relative";

      texttField.onchange = (event) => {
        event.preventDefault();
        const textField = {
          textField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        };

        // postData.push(textField);
        // setPostData({
        //   ...postData,
        //   textField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      };

      holderDIV.append(texttField);
    } else if (typeOfOperation === "TABLE_INPUT" && decoded.details.action === "template") {
      let tableField = document.createElement("div");
      tableField.className = "tableInput";
      tableField.style.width = "100%";
      tableField.style.height = "100%";
      tableField.style.backgroundColor = "#dedede";
      tableField.style.borderRadius = "0px";
      tableField.style.outline = "0px";
      tableField.style.overflow = "overlay";
      // tableField.innerHTML = 'table';
      tableField.style.position = "absolute";

      tableField.onchange = (event) => {
        event.preventDefault();

        setPostData({
          ...postData,
          tableField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        });
      };

      // if (tableField) {
      //   const tableField = {
      //     tableField: {
      //       value: event.target.value,
      //       xcoordinate: getOffset(holderDIV).left,
      //       ycoordinate: getOffset(holderDIV).top,
      //     },
      //   };

      //   // postData.push(tableField);
      //   // setPostData({
      //   //   ...postData,
      //   //   tableField: { value: tableField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
      //   // })
      // }

      tableField.onclick = (e) => {
        // focuseddClassMaintain(e);
        table_dropdown_focuseddClassMaintain(e);
        // tableField.classList.add("focussed");
        handleClicked("table2");
        setSidebar(true);
      };

      // tableField.appendChild(tab)

      // const para = document.createElement("p");
      // para.innerHTML = "Table";
      // tableField.append(para);
      holderDIV.append(tableField);
    } else if (typeOfOperation === "IFRAME_INPUT" && decoded.details.action === "template") {
      let iframeField = document.createElement("div");
      iframeField.className = "iframeInput";
      iframeField.style.width = "100%";
      iframeField.style.height = "100%";
      iframeField.style.backgroundColor = "#dedede";
      iframeField.style.borderRadius = "0px";
      iframeField.style.outline = "0px";
      iframeField.style.overflow = "overlay";
      // iframeField.innerHTML = "iframe";
      iframeField.style.position = "absolute";
      iframeField.innerText = "iFrame here"



      iframeField.onclick = (e) => {
        // focuseddClassMaintain(e);
        table_dropdown_focuseddClassMaintain(e);
        // tableField.classList.add("focussed");
        handleClicked("iframe2");
        setSidebar(true);
      };

      holderDIV.append(iframeField);
    } else if (typeOfOperation === "SIGN_INPUT" && decoded.details.action === "template") {
      let signField = document.createElement("div");
      signField.className = "signInput";
      signField.style.width = "100%";
      signField.style.height = "100%";
      signField.style.backgroundColor = "#0000";
      signField.style.borderRadius = "0px";
      signField.style.outline = "0px";
      signField.style.overflow = "overlay";
      signField.innerHTML = "Place your signature here";
      signField.style.position = "absolute";

      signField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          signField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        });
      };

      signField.onclick = (e) => {
        focuseddClassMaintain(e);
        if (actionName != "template") {
          // signField.classList.add("focussed");
          handleClicked("signs2");
          setSidebar(true);
        } else {
          setSidebar(false);
        }
      };
      const imageSignButton = document.createElement("div");
      imageSignButton.className = "addImageSignButton";
      imageSignButton.innerText = "Choose File";
      imageSignButton.style.display = "none";

      const signBtn = document.createElement("input");
      signBtn.className = "addSignButtonInput";
      signBtn.type = "file";
      signBtn.style.objectFit = "cover";
      var uploadedImage = "";

      signBtn.addEventListener("input", () => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          uploadedImage = reader.result;
          const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
          document.querySelector(".focussed").innerHTML = signImage;
        });
        reader.readAsDataURL(signBtn.files[0]);
      });

      imageSignButton.append(signBtn);

      // const para = document.createElement("p");
      // para.innerHTML = "Place your signature here";
      // signField.append(para);
      holderDIV.append(signField);
      holderDIV.append(imageSignButton);
    } else if (typeOfOperation === "DATE_INPUT" && decoded.details.action === "template") {
      let dateField = document.createElement("div");
      dateField.className = "dateInput";
      dateField.style.width = "100%";
      dateField.style.height = "100%";
      dateField.style.backgroundColor = "#0000";
      dateField.style.borderRadius = "0px";
      dateField.style.outline = "0px";
      dateField.style.overflow = "overlay";
      // dateField.innerText = `${postData.calenderField.value}`
      dateField.style.position = "relative";

      dateField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          calenderField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        });
      };
      setStartDate(new Date());
      setMethod("select");
      // if (dateField) {
      //   const dateField = {
      //     dateField: {
      //       value: event.target.value,
      //       xcoordinate: getOffset(holderDIV).left,
      //       ycoordinate: getOffset(holderDIV).top,
      //     },
      //   };

      //   // postData.push(dateField);
      //   // setPostData({
      //   //   ...postData,
      //   //   calenderField: { value: dateField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
      //   // })
      // }
      function dateClick() {
        document.getElementById("date_picker").click();
        setRightSideDateMenu(false);
      }
      dateField.onclick = (e) => {
        focuseddClassMaintain(e);
        handleClicked("calendar2");
        setRightSideDateMenu(false);
        if (e.target.innerText != "mm/dd/yyyy") {
          if (e.target.innerText.includes("/")) {
            const setDate = new Date(e.target.innerText);
            setMethod("first");
            setStartDate(setDate);
          } else {
            if (e.target.innerText.includes("-")) {
              setMethod("fourth");
            } else {
              setMethod("second");
            }
            const setDate = new Date(e.target.innerText);
            setStartDate(setDate);
          }
        }
        setSidebar(true);
        setTimeout(dateClick, 0);
      };
      dateField.innerText = "mm/dd/yyyy";

      // console.log(startDate);
      const para = document.createElement("p");

      // dateField.append(para)
      holderDIV.append(dateField);
      console.log(para);
    } else if (typeOfOperation === "DROPDOWN_INPUT" && decoded.details.action === "template") {
      let dropdownField = document.createElement("div");
      dropdownField.className = "dropdownInput";
      dropdownField.style.width = "100%";
      dropdownField.style.height = "100%";
      dropdownField.style.backgroundColor = "#0000";
      dropdownField.style.borderRadius = "0px";
      dropdownField.style.outline = "0px";
      dropdownField.style.overflow = "overlay";
      // dropdownField.innerHTML = `<select><option>${postData.dropdownField.value}</option></select>`;
      dropdownField.style.position = "absolute";

      const selectElement = document.createElement("select");
      selectElement.className = "select-element";
      selectElement.style.width = "500";
      selectElement.style.height = "auto";
      selectElement.onclick = () => {
        selectElement.parentElement.click();
      };

      dropdownField.onchange = (event) => {
        event.preventDefault();
        setPostData({
          ...postData,
          dropdownField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        });
      };

      if (dropdownField) {
        const dropdownField = {
          dropdownField: {
            value: event.target.value,
            xcoordinate: getOffset(holderDIV).left,
            ycoordinate: getOffset(holderDIV).top,
          },
        };

        // postData.push(dropdownField);
        // setPostData({
        //   ...postData,
        //   dropdownField: { value: dropdownField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
        // })
      }

      dropdownField.onclick = (e) => {
        // focuseddClassMaintain(e);
        table_dropdown_focuseddClassMaintain(e);
        // dropdownField.classList.add("focussed");
        handleClicked("dropdown2");
        setRightSideDropDown(false);
        setSidebar(true);
      };

      const para = document.createElement("p");
      para.innerHTML = " Dropdown Name";
      para.className = "dropdownName";
      para.onclick = () => {
        para.parentElement.click();
      };
      dropdownField.append(para);
      dropdownField.append(selectElement);
      holderDIV.append(dropdownField);
    } else if (typeOfOperation === "CONTAINER_INPUT" && decoded.details.action === "template") {
      let containerField = document.createElement("div");
      containerField.className = "containerInput";
      containerField.id = "containerInput";
      containerField.style.width = "100%";
      containerField.style.height = "100%";
      containerField.style.backgroundColor = "#0000";
      containerField.style.borderRadius = "0px";
      containerField.style.outline = "0px";
      containerField.style.overflow = "overlay";
      containerField.style.position = "absolute";

      holderDIV.append(containerField);
    }
    if (decoded.details.action === "template") {
      document.querySelector(".drop_zone").append(holderDIV);
    }

  };

  contentFile = [];
  let page = [];

  let elem = {};
  function saveDocument() {
    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      if (txt[0].parentElement.classList.contains("holderDIV")) {
        elem = {
          width: getPosition(txt).right,
          height: getPosition(txt).bottom,
          top: getPosition(txt).top,
          left: getPosition(txt).left,
          type: "TEXT_INPUT",
          data: txt[0].innerHTML,
        };
        page.push(elem);
      }
    }

    const img_input = document.getElementsByTagName("input");
    if (img_input.length) {
      console.log("Image_input", img_input[0]);
      if (img_input[0].type === "file") {
        elem = {
          width: getPosition(img_input).right,
          height: getPosition(img_input).bottom,
          top: getPosition(img_input).top,
          left: getPosition(img_input).left,
          type: "IMAGE_INPUT",
          data: img_input[0].value,
        };
        page.push(elem);
      }
    }

    const text2 = document.getElementsByClassName("texttInput");

    if (text2.length) {
      if (text2[0].parentElement.classList.contains("holderDIV")) {
        elem = {
          width: getPosition(text2).right,
          height: getPosition(text2).bottom,
          top: getPosition(text2).top,
          left: getPosition(text2).left,
          type: "TEXT_FILL",
          data: text2[0].value,
        };
        page.push(elem);
      }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      elem = {
        width: getPosition(date).right,
        height: getPosition(date).bottom,
        top: getPosition(date).top,
        left: getPosition(date).left,
        type: "DATE_INPUT",
        data: date[0].innerHTML,
      };
      page.push(elem);
    }
    const tablee = document.getElementsByTagName("TABLE");
    if (tablee.length < 1) {
      const img = document.getElementsByTagName("img");
      if (img.length) {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", document.style.width);
        canvas.setAttribute("height", document.style.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img[0],
          0,
          0,
          parseInt(document.style.width.slice(0, -2)),
          parseInt(document.style.height.slice(0, -2))
        );
        elem = {
          width: getPosition(tablee).style.width,
          height: getPosition(tablee).style.height,
          top: getPosition(tablee).style.top,
          left: getPosition(tablee).style.left,
          type: "IMG_INPUT",
          data: canvas.toDataURL(),
        };
        page.push(elem);
      }
    }

    contentFile.push(page);
    console.log("ContentFile While saveDoc", contentFile);

    return contentFile;
  }

  return (
    <>
      {item?.map((currentItem, index) => {
        return (
          // <div key={index} className={`midSection ${(actionName == 'document' && flag_editing =='editing') || (actionName == 'document' && flag_editing =='signing') && 'disable_pointer_event'}`}>
          <div key={index} className={`midSection disable_pointer_event`}>

            <Container
              as="div"
              ref={midSectionRef}
              className={
                // !sidebar
                //   ? "midSection_without_RightMenu_container"
                "midSection_container"
              }
              // className="midSection_container"
              id="midSection_container"
              onDragOver={dragOver}
              onDrop={onDrop}
            >
              <Row>
                <Col className="d-flex justify-content-end header_user">
                  <span>{index + 1}</span>
                  {isLoading && <Spinner />}
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </>

    // <div className="midSection" >
    //   <Container as="div" ref={midSectionRef} className="midSection_container"
    //     onDragOver={dragOver}
    //     onDrop={onDrop}

    //   >
    //     {/* <button onClick={saveDocument}>
    //       Save
    //     </button> */}
    //     {/* {isDropped.align && <TextBox />}  */}
    //     {/* {isDropped.textfill && <TextFill />}
    //     {isDropped.image && <Image />}
    //     {isDropped.table && <Table />}
    //     {isDropped.signs && <Signs />}
    //     {isDropped.calendar && <Calender />}
    //     {isDropped.dropdown && <DropDown />}  */}

    //   </Container>
    // </div>
  );
};

export default MidSection;
