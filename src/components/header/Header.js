import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { headerData } from "../../data/data";
import user from "../../assets/headerIcons/user.png";
import { FaCopy, FaPen, FaSave } from "react-icons/fa";
import { BiImport, BiExport, BiCut, BiCopyAlt } from "react-icons/bi";
import { ImRedo, ImUndo, ImPaste } from "react-icons/im";
import CryptoJS from "crypto-js";
import print from "print-js";
import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import { CgMenuLeft, CgPlayListRemove } from "react-icons/cg";
import {
  MdOutlinePostAdd,
  MdSignalCellular0Bar,
  MdOutlineFlipCameraAndroid,
  MdOutlineIosShare,
} from "react-icons/md";

import { useSearchParams } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { current } from "@reduxjs/toolkit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillPrinter } from "react-icons/ai";
// import Printer from "../../utils/spinner/Printer";

// import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import MidSection from "../midSection/MidSection";
// import MidSection from "../../components/midSection/MidSection";

// const Printer = () => {
//   const componentRef = useRef();

//   return (
//     <div>
//       <ReactToPrint
//         trigger={() => <button>Print!</button>}
//         content={() => componentRef.current}
//       />
//       <MidSection ref={componentRef} />
//     </div>
//   );
// };
// export default Printer;

const Header = () => {
  const inputRef = useRef(null);
  const componentRef = useRef(null);

  // import { ToastContainer, toast } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';
  // import { AiFillPrinter } from 'react-icons/ai';

  // const Header = () => {
  // const inputRef = useRef(null);
  const menuRef = useRef(null);
  const {
    item,
    setItem,
    isLoading,
    setIsLoading,
    isFlipClicked,
    setIsFlipClicked,
    fetchedData,
    setFetchedData,
    deletePages,
    setDeletepages,
    title,
    setTitle,
    data,
    setData,
    isClicked,
    isFinializeDisabled,
    setIsDataRetrieved,
    setIsFinializeDisabled,
    scaleId,
    setScaleId,
    scaleData,
    setScaleData,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
    companyId,
    setCompanyId,
    isMenuVisible,
    setIsMenuVisible,
    buttonLink,
    buttonPurpose,
    setCustomId,
  } = useStateContext();

  const [printContent, setPrintContent] = useState(false);

  const handleOptions = () => {
    setIsMenuVisible(!isMenuVisible);
  };
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
    // const element = document.querySelector(".focussedd");
    // // console.log(element);
    // let counter = 1;
    // const copyEle = element.cloneNode(true);
    // // console.log(copyEle)
    // copyEle.id += counter;
    // holderDIV.appendChild(copyEle);
    // console.log("coping", copyEle)
  };
  const handlePaste = () => {
    document.execCommand("paste");
  };
  const handleTitle = () => {
    const divElement = inputRef.current;
    divElement.focus();

    const range = document.createRange();
    range.selectNodeContents(divElement);

    const endOffset = divElement.innerText.length;
    range.setStart(divElement.firstChild, endOffset);
    range.setEnd(divElement.firstChild, endOffset);

    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  let createPageNumber;
  if (item?.length) {
    createPageNumber = item[item?.length - 1].split("_")[1];
  } else {
    createPageNumber = 0;
  }
  function createNewPage() {
    createPageNumber++;
    const current = [...item];
    current.push(`div_${createPageNumber}`);
    //console.log("create page click", current);
    setItem(current);
    //console.log("create page click after", current);
  }
  // console.log('fetchedData', fetchedData);
  function removePage() {
    const current = [...item];

    var pageNumber = prompt("Enter the number of page to delete");
    if (pageNumber != null) {
      const index = pageNumber - 1;
      const page = document.getElementsByClassName("midSection_container")[
        index
      ];

      //console.log(page);
      // page.innerHTML = "";
      if (index > 0 && index < item?.length) {
        //remove item from the basket
        // //console.log("fetchedData", fetchedData, "nameofpage", pageNumber);
        // delete fetchedData[pageNumber];
        // //console.log("after fetchedData", fetchedData);
        // const currentPges = [...deletePages];
        // currentPges.push(pageNumber);
        // setDeletepages(currentPges);
        // //console.log("deletePages", deletePages);
        // setFetchedData(fetchedData);

        // let allPageElement = document.getElementsByClassName(
        //   `page${pageNumber}`
        // );
        // let elementLength = allPageElement?.length;
        // for (let i = 0; i < elementLength; i++) {
        //   allPageElement[0].remove();
        // }
        // //console.log("allPageElement", allPageElement, current.splice(index, 1));
        // current.splice(index, 1);

        page.parentElement.remove();
        item.pop();
        // setItem(item);
      } else {
        console.warn(`Cant remove page`);
      }
    }
  }

  // Adding a new branch comment

  function getPosition(el) {
    // const rect = el[0].getBoundingClientRect();
    // //console.log(el);
    const midSec = document.getElementById("midSection_container");

    const rect = el.getBoundingClientRect();
    const midsectionRect = midSec.getBoundingClientRect();
    // const rect = el.getBoundingClientRect();
    // console.log("element check ", el);
    // console.log("heaer react and midesctionRect", rect, midsectionRect);
    return {
      top:
        rect.top > 0
          ? Math.abs(midsectionRect.top)
          : rect.top - midsectionRect.top,
      left: rect.left - midsectionRect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
  }

  let contentFile = [];
  let page = [{}];

  for (let i = 1; i <= item?.length; i++) {
    const element = { [i]: [] };
    page[0] = { ...page[0], ...element };
  }

  const dataInsertWithPage = (tempPosn, elem) => {
    let low = 0;
    let high = 1122;
    for (let i = 1; i <= item?.length; i++) {
      if (tempPosn.top >= low && tempPosn.top < high) {
        page[0][i].push(elem);
      }
      low += 1122;
      high += 1122;
    }
  };

  const findPaageNum = (element) => {
    let targetParent = element;
    let pageNum = null;
    while (1) {
      if (targetParent?.classList?.contains("midSection_container")) {
        targetParent = targetParent;
        break;
      } else {
        targetParent = targetParent?.parentElement;
      }
    }
    pageNum = targetParent?.innerText.split("\n")[0];
    return pageNum;
  };
  function savingTableData() {
    const tables = document.getElementsByClassName("tableInput");
    let tables_tags = [];

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        var new_table = document.getElementsByTagName("table")[0];
        //console.log("New Table");
        //console.log(new_table);
        tables_tags.push(new_table);
        //console.log("table_tags");
        //console.log(tables_tags);
      }
    }
  }

  // let url = "https://100058.pythonanywhere.com/api/save-data-into-collection/";
  // https://100058.pythonanywhere.com/api/post-data-into-collection/
  let elem = {};

  function saveDocument() {
    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      for (let h = 0; h < txt.length; h++) {
        if (
          txt[h]?.parentElement?.classList?.contains("holderDIV") &&
          !txt[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = txt[h].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(txt[h].parentElement.style.top);
          //console.log(txt[h].innerText);
          //console.log(txt[h].innerHTML);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: txt[h].parentElement.style.top,
            left: tempPosn.left,
            type: "TEXT_INPUT",
            data: txt[h].innerText,
            raw_data: txt[h].innerHTML,
            id: `t${h + 1}`,
            // border: txt[h].parentElement.style.border,
            borderWidth: txt[h].parentElement.style.borderWidth,
            borderColor: txt[h].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          // let targetParent = txt[h];
          // let pageNum = null;
          // while (1) {
          //   if (targetParent.classList.contains("midSection_container")) {
          //     targetParent = targetParent;
          //     break;
          //   } else {
          //     targetParent = targetParent.parentElement;
          //   }
          // }
          // pageNum = targetParent.innerText.split("\n")[0];

          // const classListOfParentElement = txt[h]?.parentElement?.classList;
          // const pageNum = classListOfParentElement[1].split("_")[1];
          // console.log(
          //   "classListOfParentElement",
          //   classListOfParentElement[1].split("_")[1]
          // );
          const pageNum = findPaageNum(txt[h]);
          page[0][pageNum].push(elem);
          // page.push(elem);
        }
      }
    }

    const img_input = document.getElementsByTagName("input");
    const img = document.getElementsByClassName("imageInput");
    if (img) {
      //console.log("Image_input", img_input[0]);
      // if (img_input[0].type === "file") {
      for (let h = 0; h < img.length; h++) {
        if (
          img[h]?.parentElement?.classList?.contains("holderDIV") &&
          !img[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          const reader = new FileReader();
          let tempElem = img[h].parentElement;
          let tempPosn = getPosition(tempElem);
          console.log(
            "img[h].style.backgroundImage",
            img[h].style.backgroundImage
          );
          const dataName = img[h].style.backgroundImage
            ? img[h].style.backgroundImage
            : img[h].innerText;
          console.log("dataName", dataName);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: img[h].parentElement.style.top,
            left: tempPosn.left,
            type: "IMAGE_INPUT",
            data: dataName,
            id: `i${h + 1}`,
            // border: img[h].parentElement.style.border,
            borderWidth: img[h].parentElement.style.borderWidth,
            borderColor: img[h].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(img[h]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        if (
          date[h]?.parentElement?.classList?.contains("holderDIV") &&
          !date[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = date[h].parentElement;
          let tempPosn = getPosition(tempElem);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: date[h].parentElement.style.top,
            left: tempPosn.left,
            type: "DATE_INPUT",
            data: date[h].innerHTML,
            id: `d${h + 1}`,
            // border: date[h].parentElement.style.border,
            borderWidth: date[h].parentElement.style.borderWidth,
            borderColor: date[h].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(date[h]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const sign = document.getElementsByClassName("signInput");
    if (sign.length) {
      for (let h = 0; h < sign.length; h++) {
        if (
          sign[h]?.parentElement?.classList?.contains("holderDIV") &&
          !sign[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = sign[h].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(sign[h].innerHTML);
          //console.log(sign[h].firstElementChild);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: sign[h].parentElement.style.top,
            left: tempPosn.left,
            type: "SIGN_INPUT",
            data:
              sign[h].firstElementChild === null
                ? // decoded.details.action === "document"
                  sign[h].innerHTML
                : sign[h].firstElementChild.src,
            id: `s${h + 1}`,
            // border: sign[h].parentElement.style.border,
            borderWidth: sign[h].parentElement.style.borderWidth,
            borderColor: sign[h].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(sign[h]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    const tables = document.getElementsByClassName("tableInput");

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        if (
          tables[t]?.parentElement?.classList?.contains("holderDIV") &&
          !tables[t]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          // var new_table = document.getElementsByTagName("table")[0];
          let tempElem = tables[t].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(tables[t].firstElementChild.innerHTML);
          function getChildData() {
            const allTableCCells = [];
            const tableChildren = tables[t]?.firstElementChild?.children;
            for (let i = 0; i < tableChildren?.length; i++) {
              const tableTR = { tr: null };
              const newTableTR = [];
              for (let j = 0; j < tableChildren[i]?.children?.length; j++) {
                // const element = tableChildren[i];

                const TdDivClassName =
                  tableChildren[i]?.children[
                    j
                  ]?.firstElementChild?.className.split(" ")[0];

                const trChild = {
                  td: {
                    type:
                      (TdDivClassName == "dateInput" && "DATE_INPUT") ||
                      (TdDivClassName == "textInput" && "TEXT_INPUT") ||
                      (TdDivClassName == "imageInput" && "IMAGE_INPUT") ||
                      (TdDivClassName == "signInput" && "SIGN_INPUT"),
                    // if(){
                    data:
                      TdDivClassName == "imageInput"
                        ? tableChildren[i].children[j]?.firstElementChild.style
                            .backgroundImage
                        : tableChildren[i].children[j]?.firstElementChild
                            ?.innerHTML,
                    id: `tableTd${j + 1}`,
                  },
                };

                newTableTR.push(trChild);
              }
              tableTR.tr = newTableTR;
              allTableCCells.push(tableTR);
            }
            // console.log("allTableCCells", allTableCCells);
            return allTableCCells;
          }
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: tables[t].parentElement.style.top,
            left: tempPosn.left,
            type: "TABLE_INPUT",
            // start work here
            // data: tables[t].firstElementChild.innerHTML,
            data: getChildData(),
            id: `tab${t + 1}`,
            // border: tables[t].parentElement.style.border,
            borderWidth: tables[t].parentElement.style.borderWidth,
            borderColor: tables[t].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(tables[t]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    const containerElements = document.getElementsByClassName("containerInput");
    // console.log("containerInput", containerElements[0]);
    if (containerElements.length) {
      for (let h = 0; h < containerElements.length; h++) {
        if (
          containerElements[h]?.parentElement?.classList?.contains("holderDIV")
        ) {
          let tempElem = containerElements[h].parentElement;
          let tempPosn = getPosition(tempElem);

          function getChildData() {
            const allContainerChildren = [];
            const containerChildren = containerElements[h].children;
            // console.log(
            //   "containerChildren",
            //   containerChildren.length,
            //   containerChildren
            // );
            for (let i = 0; i < containerChildren.length; i++) {
              const element = containerChildren[i];
              // console.log("elements", i, " ", element);
              // let tempElem = element.parentElement;
              let tempPosnChild = getPosition(element);
              const containerChildClassName =
                containerChildren[i].firstElementChild?.className.split(" ")[0];
              const childData = {};
              childData.width = tempPosnChild.width;
              childData.height = tempPosnChild.height;
              childData.top = tempPosnChild.top;
              childData.topp = containerElements[h].parentElement.style.top;
              childData.left = tempPosnChild.left;

              // console.log("childData", childData);
              let type = "";
              // console.log("containerChildClassName", containerChildClassName);
              switch (containerChildClassName) {
                case "dateInput":
                  type = "DATE_INPUT";
                  break;
                case "textInput":
                  type = "TEXT_INPUT";
                  break;
                case "imageInput":
                  type = "IMAGE_INPUT";
                  break;
                case "signInput":
                  type = "SIGN_INPUT";
                  break;
                case "iframeInput":
                  type = "IFRAME_INPUT";
                  break;
                case "scaleInput":
                  type = "SCALE_INPUT";
                  break;
                case "buttonInput":
                  type = "BUTTON_INPUT";
                  break;
                case "dropdownInput":
                  type = "DROPDOWN_INPUT";
                  break;
                case "emailButton":
                  type = "FORM";
                  break;
                default:
                  type = "";
              }

              // (containerChildClassName == "dateInput" && "DATE_INPUT") ||
              //         (containerChildClassName == "textInput" && "TEXT_INPUT") ||
              //         (containerChildClassName == "imageInput" && "IMAGE_INPUT") ||
              //         (containerChildClassName == "signInput" && "SIGN_INPUT"),
              childData.type = type;
              const imageData =
                "imageInput" &&
                element?.firstElementChild?.style?.backgroundImage
                  ? element.firstElementChild.style.backgroundImage
                  : element.firstElementChild?.innerHTML;
              if (type != "TEXT_INPUT") {
                childData.data = imageData;
              }
              if (type == "TEXT_INPUT") {
                childData.data = element.firstElementChild?.innerText;
                childData.raw_data = element.firstElementChild?.innerHTML;
              }
              // else{
              // childData.data = element.firstElementChild.innerHTML
              // }
              childData.id = `${containerChildClassName[0]}${h + 1}`;
              allContainerChildren.push(childData);
            }
            // for (let i = 0; i < tableChildren.length; i++) {
            //   const tableTR = { tr: null };
            //   const newTableTR = [];
            //   for (let j = 0; j < tableChildren[i].children.length; j++) {
            //     // const element = tableChildren[i];

            //     const TdDivClassName =
            //       tableChildren[i].children[
            //         j
            //       ]?.firstElementChild?.className.split(" ")[0];

            //     const trChild = {
            //       td: {
            //         type:
            //           (TdDivClassName == "dateInput" && "DATE_INPUT") ||
            //           (TdDivClassName == "textInput" && "TEXT_INPUT") ||
            //           (TdDivClassName == "imageInput" && "IMAGE_INPUT") ||
            //           (TdDivClassName == "signInput" && "SIGN_INPUT"),
            //         // if(){
            //         data:
            //           TdDivClassName == "imageInput"
            //             ? tableChildren[i].children[j]?.firstElementChild.style
            //                 .backgroundImage
            //             : tableChildren[i].children[j]?.firstElementChild
            //                 ?.innerHTML,
            //         id: `tableTd${j + 1}`,
            //       },
            //     };

            //     newTableTR.push(trChild);
            //   }
            //   tableTR.tr = newTableTR;
            //   allTableCCells.push(tableTR);
            // }
            // console.log("allTableCCells", allContainerChildren);
            return allContainerChildren;
          }
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: containerElements[h].parentElement.style.top,
            left: tempPosn.left,
            type: "CONTAINER_INPUT",
            data: getChildData(),
            id: `c${h + 1}`,
            borderWidth: containerElements[h].parentElement.style.borderWidth,
            borderColor: containerElements[h].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(containerElements[h]);
          page[0][pageNum].push(elem);
        }
      }
    }
    const iframes = document.getElementsByClassName("iframeInput");
    if (iframes.length) {
      for (let i = 0; i < iframes.length; i++) {
        if (
          !iframes[i]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          // var new_table = document.getElementsByTagName("table")[0];
          let tempElem = iframes[i].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(iframes[i].innerText);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: iframes[i].parentElement.style.top,
            left: tempPosn.left,
            type: "IFRAME_INPUT",
            data: iframes[i].innerText
              ? "iFrame here"
              : iframes[i].firstElementChild.src,
            id: `ifr${i + 1}`,
            borderWidth: iframes[i].parentElement.style.borderWidth,
            borderColor: iframes[i].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(iframes[i]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    const scales = document.getElementsByClassName("scaleInput");
    if (scales.length) {
      for (let s = 0; s < scales.length; s++) {
        if (
          !scales[s]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = scales[s].parentElement;
          let tempPosn = getPosition(tempElem);
          console.log(scales[s].firstElementChild);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: scales[s].parentElement.style.top,
            left: tempPosn.left,
            type: "SCALE_INPUT",
            data: `${title}_scale_${s + 1}`,
            scale_url: scales[s].firstElementChild.src,
            scaleId: tempElem.children[1].innerHTML,
            id: `scl${s + 1}`,
            borderWidth: scales[s].parentElement.style.borderWidth,
            borderColor: scales[s].parentElement.style.borderColor,
            details:
              decoded.details.action === "document"
                ? "Document instance"
                : "Template scale",
            // scale_url: `${scaleData}`,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(scales[s]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    const buttons = document.getElementsByClassName("buttonInput");
    if (buttons.length) {
      for (let b = 0; b < buttons.length; b++) {
        if (
          !buttons[b]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = buttons[b].parentElement;
          let tempPosn = getPosition(tempElem);
          const link = buttonLink;

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: buttons[b].parentElement.style.top,
            left: tempPosn.left,
            type: "BUTTON_INPUT",
            data: buttons[b].textContent,
            raw_data: tempElem.children[1].innerHTML,
            purpose: tempElem.children[2].innerHTML,
            id: `btn${b + 1}`,
            borderWidth: buttons[b].parentElement.style.borderWidth,
            borderColor: buttons[b].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(buttons[b]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }
    const email = document.getElementsByClassName("emailButton");
    if (email.length) {
      for (let e = 0; e < email.length; e++) {
        if (
          !email[e]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = email[e].parentElement;
          let tempPosn = getPosition(tempElem);
          // const link = buttonLink;

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: email[e].parentElement.style.top,
            left: tempPosn.left,
            type: "FORM",
            data: email[e].textContent,
            raw_data: tempElem.children[1].innerHTML,
            purpose: tempElem.children[2].innerHTML,
            id: `eml${e + 1}`,
            borderWidth: email[e].parentElement.style.borderWidth,
            borderColor: email[e].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(email[e]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const dropDowns = document.getElementsByClassName("dropdownInput");

    if (dropDowns.length) {
      for (let d = 0; d < dropDowns.length; d++) {
        if (
          !dropDowns[d]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          // var new_table = document.getElementsByTagName("table")[0];
          let tempElem = dropDowns[d].parentElement;
          let tempPosn = getPosition(tempElem);
          //console.log(dropDowns[d].firstElementChild.innerHTML);
          const selectElement = dropDowns[d].lastElementChild;
          const selectedOption =
            selectElement.options[selectElement.selectedIndex];
          const selectedText = selectedOption?.textContent;
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: dropDowns[d].parentElement.style.top,
            left: tempPosn.left,
            type: "DROPDOWN_INPUT",
            data: selectedText,
            data1: dropDowns[d].firstElementChild.innerHTML,
            data2: dropDowns[d].lastElementChild.innerHTML,
            id: `dd${d + 1}`,
            borderWidth: dropDowns[d].parentElement.style.borderWidth,
            borderColor: dropDowns[d].parentElement.style.borderColor,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(dropDowns[d]);
          page[0][pageNum].push(elem);

          // page.push(elem);
        }
      }
    }

    contentFile.push(page);
    // const data = JSON.stringify(contentFile);
    // //console.log("ContentFile While saveDoc", data);

    return contentFile;
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  //console.log(decoded.details);
  const { action, authorized, process_id, document_map, _id, role } =
    decoded?.details;
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;
  
  // console.log(authorized);
  // console.log(process_id);
  // console.log(_id);
  // console.log(role);

  // console.log("In header.js", decoded, document_map);
  const element_updated_length =
    document.getElementsByClassName("element_updated").length;

  useEffect(() => {
    // set_doc_map(document_map)
    if (document_map?.length == element_updated_length) {
      setIsFinializeDisabled(false);
    }
  }, [element_updated_length]);

  // console.log(
  //   "Document_map test",
  //   element_updated_length,
  //   document_map?.length
  // );

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
    //console.log(field);

    <iframe src="http://localhost:5500/"></iframe>;

    function sendMessage() {
      const message =
        decoded.details.action === "document"
          ? "Document saved"
          : "Template saved";
      const iframe = document.querySelector("iframe");
      iframe?.contentWindow?.postMessage(message, "*");
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
        // scale_url: `${scaleData}`,
        company_id: companyId,
        type: decoded.details.action,
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          // alert("Data saved successfully");
          toast.success("Saved successfully");
          sendMessage();
        }
        //console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  // const handleFlipClick = (e) => {
  //   setIsFlipClicked(!isFlipClicked);
  // };

  // token creation code
  function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
  }

  var header = {
    alg: "HS256",
    typ: "JWT",
  };

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);

  var dataa = {
    document_id: decoded.details._id,
    action: actionName,
  };

  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(dataa));
  var encodedData = base64url(stringifiedData);

  var exportToken = encodedHeader + "." + encodedData;
  // console.log("test token", exportToken);
  // token creation end

  const getPostData = async () => {
    const response = await Axios.post(
      "https://100058.pythonanywhere.com/api/get-data-from-collection/",
      {
        document_id: decoded.details._id,
        action: decoded.details.action,
      }
    )
      .then((res) => {
        // Handling title
        const loadedDataT = res.data;
        // console.log(res.data.content, "loaded");

        if (decoded.details.action === "template") {
          setTitle(loadedDataT.template_name);
        } else if (decoded.details.action === "document") {
          setTitle(loadedDataT.document_name);
        }

        //Handling content
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);
        // console.log(loadedData);
        // console.log(loadedData[0][0]);
        setData(loadedData[0][0]);
        setIsDataRetrieved(true);
        // setSort(loadedData[0][0]);
        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
        // setScaleId(scaleId);

        //Handling company_id
        const company_id = res.data.company_id;
        setCompanyId(company_id);
        npsCustomData();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const npsCustomData = () => {
    console.log(decoded.details._id);
    Axios.post("https://100035.pythonanywhere.com/api/nps_custom_data_all", {
      template_id: decoded.details._id,
    })
      .then((res) => {
        console.log(res.data);
        const data = res.data.data;
        setCustomId(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getPostData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        isMenuVisible(false);
      }
    }
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // copy text function

  function copyText() {
    let div = document.querySelector(".token_text");
    let text = div.innerText;
    let textArea = document.createElement("textarea");
    textArea.width = "1px";
    textArea.height = "1px";
    textArea.background = "transparents";
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy"); //No i18n
    document.body.removeChild(textArea);
    toast("Text coppied", {
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

  function handleToken() {
    setData([]);
    setIsLoading(true);
    var tokenn = prompt("Paste your token here");
    if (tokenn != null) {
      const decodedTok = jwt_decode(tokenn);
      console.log("tokkkkkkennn", tokenn);
      const getPostData = async () => {
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
              setTitle("Untitle-File");
            } else if (decoded.details.action === "document") {
              setTitle("Untitle-File");
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
            setIsLoading(false);
            console.log(err);
          });
      };
      getPostData();
    }
  }

  // console.log('page count check', item);
  const saveButton = document.getElementById("saving-buttonn");
  function handleFinalize() {
    setIsLoading(true);

    Axios.post(
      // `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize/`,
      `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize-or-reject/`,
      {
        action: "finalize",
        // item_id: process_id,
        authorized: authorized,
        // document_id: _id,
        item_type: action,
        item_id: _id,
        company_id: companyId,
        role: role,
      }
    )
      .then((res) => {
        console.log(res);
        // alert(res?.data);
        toast.success(res?.data);
        saveButton.click();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err);
        // alert(err?.message);
      });
  }

  function handleReject() {
    setIsLoading(true);
    Axios.post(
      // `https://100094.pythonanywhere.com/v1/processes/${process_id}/reject/`,
      `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize-or-reject/`,
      {
        action: "reject",
        // item_id: process_id,
        authorized: authorized,
        // document_id: _id,
        item_type: action,
        item_id: _id,
        company_id: companyId,
        role: role,
      }
    )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        // alert(res?.data);
        toast.error(res?.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err);
      });
  }
  const hanldePrint = (e) => {
    // const bodyEl = document.getElementsByTagName("BODY")[0];
    // bodyEl.style.display = "none";
    // const midsection = document.getElementsByClassName("midSection_container");
    // for (let i = 0; i < midsection?.length; i++) {
    //   midsection[i].style.display = "block";
    // }
    // const print_mideSctions = document.getElementsByClassName(`midSection`);
    // for (let i = 0; i < print_mideSctions.length; i++) {
    //   print_mideSctions[i].style.mirginTop = "-170px";
    // }
    window.print();
    // bodyEl.style.display = "block";
  };

  // console.log("page count check", item);
  // console.log("isMenuVisible", isMenuVisible);
  return (
    <div
      className={`header ${
        actionName == "template" ? "header_bg_template" : "header_bg_document"
      }`}
    >
      <Container fluid>
        <Row>
          <Col className="d-flex lhs-header">
            <div className="header_icons position-relative">
              <CgMenuLeft className="head-bar" onClick={handleOptions} />
              {isMenuVisible && (
                <div
                  ref={menuRef}
                  className={`position-absolute bg-white d-flex flex-column p-4 bar-menu menu ${
                    isMenuVisible ? "show" : ""
                  }`}
                >
                  <div className="d-flex cursor_pointer" onClick={handleUndo}>
                    <ImUndo />
                    <p>Undo</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleRedo}>
                    <ImRedo />
                    <p>Redo</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleCut}>
                    <BiCut />
                    <p>Cut</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleCopy}>
                    <BiCopyAlt />
                    <p>Copy</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handlePaste}>
                    <ImPaste />
                    <p>Paste</p>
                  </div>
                  <div
                    className="d-flex cursor_pointer"
                    onClick={() => setPrintContent(true)}
                  >
                    {/* <ReactToPrint
                      trigger={
                        (e) => ( */}
                    <p onClick={hanldePrint}>
                      {/* <p onClick={printJS('docs/printjs.pdf')}> */}
                      <AiFillPrinter /> Print
                    </p>
                    {/* )
                      }
                      content={() => componentRef.current}
                      // onBeforeGetContent={() => console.log("test")}
                      // removeAfterPrint="true"
                      // onBeforePrint={() => setPrintContent(true)}
                      onAfterPrint={() => setPrintContent(false)}
                    />
                    {printContent && <MidSection ref={componentRef} />} */}
                  </div>

                  {/* <img onClick={handleRedo} src={headerData[1].icon} alt="" /> */}
                  {/* <img onClick={handleCut} src={headerData[2].icon} alt="" /> */}
                  {/* <img onClick={handleCopy} src={headerData[3].icon} alt="" /> */}
                  {/* <img onClick={() => {}} src={headerData[4].icon} alt="" /> */}
                  {/* <img onClick={() => {}} src={headerData[5].icon} alt="" /> */}
                  {actionName == "template" && (
                    <button
                      className="page_btn p-0 d-flex"
                      onClick={() => createNewPage()}
                    >
                      <MdOutlinePostAdd />
                      <p>Add Page</p>
                    </button>
                  )}
                  {actionName == "template" && (
                    <button className="page_btn p-0 d-flex">
                      <CgPlayListRemove onClick={() => removePage()} />
                      <p>Remove Page</p>
                    </button>
                  )}
                  <button className="page_btn p-0 d-flex">
                    <BiImport onClick={handleToken} />
                    <p>Import</p>
                  </button>
                  <button
                    className="d-flex page_btn p-0"
                    id="saving-button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <BiExport />
                    <p>Export</p>
                  </button>
                </div>
              )}

              {/* {headerData.map((item, index) => {
                return <img src={item.icon} alt="icon" key={index} />;
              })} */}
            </div>
            {/* <span className="badge bg-warning temp_doc">
              {actionName == 'template' ? 'Template' : 'Document'}
            </span> */}
            <div className="d-flex align-items-center gap-2 header_p">
              {/* <div style={{ color: "white", fontSize: 30 }}>Title</div> */}
              <div
                className="title-name px-3"
                contentEditable={true}
                style={{ fontSize: 24 }}
                spellCheck="false"
                ref={inputRef}
              >
                {/* {(decoded.details.action == "template") ? ((data.data.template_name == "") ? ("Untitled-File"): (data.data.template_name) )
               : ((data.data.document_name == "") ? ("Untitled-File"): (data.data.document_name))} */}
                {title && title}
              </div>
              <FaPen className="cursor-pointer" onClick={handleTitle} />
            </div>
          </Col>

          <Col>
            <div className="right_header">
              <div className={docMap ? "header_btn" : "savee"}>
                {/* <Button
                  variant="outline"
                  size="md"
                  className="rounded share-btn me-4"
                  id="saving-buttonn"
                  onClick={submit}
                >
                  Share <BiExport />
                </Button> */}
                <Button
                  size="md"
                  className="rounded"
                  id="saving-buttonn"
                  onClick={submit}
                >
                  Save <FaSave color="white" />
                </Button>
              </div>
              <div className="mt-1 text-center p-2">
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Token
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body token_text">{exportToken}</div>
                      <div class="modal-footer head">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={copyText}
                          type="button"
                          data-bs-dismiss="modal"
                          class="copyBtnn btn btn-primary"
                        >
                          <FaCopy className="me-2" color="white" size={32} />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {actionName == "document" && docMap && data != "" && (
                // <div className="finalize_reject_wraper">
                <>
                  <div className="mt-2 text-center mb-2 px-2">
                    <Button
                      variant="success"
                      size="md"
                      className="rounded px-4"
                      id="finalize-button"
                      disabled={isFinializeDisabled}
                      onClick={handleFinalize}
                    >
                      Finalize
                    </Button>
                  </div>

                  <div className="mt-2 text-center mb-2 px-2">
                    <Button
                      variant="danger"
                      size="md"
                      className="rounded px-4"
                      id="reject-button"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </div>
                </>
              )}
            </div>
            <ToastContainer size={5} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
