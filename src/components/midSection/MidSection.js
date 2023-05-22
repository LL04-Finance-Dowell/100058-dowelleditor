/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./MidSection.css";
import { useStateContext } from "../../contexts/contextProvider";
import Spinner from "../../utils/spinner/Spinner";
import Axios from "axios";
// import { TiDeleteOutline } from "react-icons/ti";
// import FileBase from "react-file-base64";
// import TextBox from "../leftMenu/comp/TextBox";
// import Image from "../leftMenu/comp/Image";
// import Table from "../leftMenu/comp/Table";
// import Signs from "../leftMenu/comp/Signs";
// import Calender from "../leftMenu/comp/Calender";
// import DropDown from "../leftMenu/comp/DropDown";
// import TextFill from "../leftMenu/comp/TextFill";
// import { editSec_midSec_ref } from '../editSection/EditSection';
import jwt_decode from "jwt-decode";
import { table_dropdown_focuseddClassMaintain } from "../../utils/focusClassMaintain/focusClass";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import useDateElement from "../../customHooks/useDateElement";
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
const MidSection = React.forwardRef((props, ref) =>
{
  const {
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
    setIsFinializeDisabled,
    newToken,
    data,
    setData,
    isDataRetrieved,
    setIsDataRetrieved,
    scaleId,
    setScaleId,
    scaleData,
    setScaleData,
    title,
    setTitle,
    isMenuVisible,
    setIsMenuVisible,
    handleDropp,
    focuseddClassMaintain,
    buttonLink,
    setButtonPurpose,
  } = useStateContext();

  // useEffect(() => {
  // const result_Date = useDateElement();
  // console.log(result_Date);
  // }, []);

  const [focusedElement, setFocusedElement] = useState(null);
  const [allPages, setAllPages] = useState([]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  const flag_editing = decoded?.details?.flag;
  const documnentsMap = decoded?.details?.document_map;
  const divList = documnentsMap?.map?.((item) => item.page);
  var documnetMap = documnentsMap?.map?.(item => item.content);

  console.log('decode', decoded)

  if (documnentsMap?.length > 0)
  {
    const documentsMap = documnentsMap;
  } else
  {
    console.log("There's no document map");
  }

  // useEffect(() => {
  //   localStorage.setItem('elementId', scaleId);
  //   console.log(scaleId, 'scaleId on localSt');
  // }, [scaleId]);

  function boldCommand()
  {
    const strongElement = document.createElement("strong");
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(strongElement);
  }

  const midSectionRef = useRef([]);

  useEffect(() =>
  {
    document.addEventListener("mousedown", (event) =>
    {
      const holderDIV = document.getElementsByClassName("holderDIV");
      const holderr = document.getElementsByClassName("holder-menu");
      const resizerr = document.getElementsByClassName("resizeBtn");
      //console.log("mouseDown inside if condition", event.target.id);
      // //console.log("mouseDown inside if condition", midSectionRef.current.id);

      if (event?.target?.id === midSectionRef?.current?.id)
      {
        // holderDIV.classList.remove('focussedd')
        if (document.querySelector(".focussedd"))
        {
          document.querySelector(".focussedd").classList.remove("focussedd");
        }
        if (document.querySelector(".focussed"))
        {
          document.querySelector(".focussed").classList.remove("focussed");
        }
        setIsMenuVisible(false);
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
          scale2: false,
          container2: false,
          iframe2: false,
          button2: false,
          email2: false,
        });

        const divsArray = document.getElementsByClassName(
          "enable_pointer_event"
        );
        //console.log(divsArray);
        //console.log("mouseDown inside if condition", event.target);
        // //console.log("mouseDown inside if condition", editSec_midSec_ref);
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
  // //console.log(decoded);

  // const [isLoading, setIsLoading] = useState(true);

  const getPostData = async () =>
  {
    var decoded = jwt_decode(token);
    //console.log(decoded);
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
      .then((res) =>
      {
        // console.log("midSection", res);
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);
        // console.log(pageData, 'pageData');
        //console.log(loadedData[0][0]);
        setData(loadedData[0][0]);
        setIsDataRetrieved(true);
        // setSort(loadedData[0][0]);
        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
        //  setData(oldArray => [...data, loadedData[0]]);
      })
      .catch((err) =>
      {
        setIsLoading(false);
        //console.log("error response from midsection get request", err);
        // //console.log(err);
      });
  };
  // useEffect(() => {
  //   getPostData();
  // }, []);

  // //console.log(JSON.stringify(postData));

  useEffect(() =>
  {
    if (data !== undefined)
    {
      //console.log(data);

      onPost();
      // onParagraphPost()
    } else
    {
      //console.log("loading data");
    }
  }, [isDataRetrieved]);

  let resizing = false;
  let contentFile = [];

  // const isTemplate = JSON.parse(document.getElementById('template'));

  function getResizer(attr1, attr2)
  {
    const resizer = document.createElement("span");
    resizer.style.width = "5px";
    resizer.style.height = "5px";
    resizer.style.display = "block";
    resizer.className = "resizeBtn";
    resizer.style.position = "absolute";
    resizer.style.backgroundColor = "#00aaff";

    if (attr1 === "top")
    {
      resizer.style.top = "-5px";
    } else
    {
      resizer.style.bottom = "-5px";
    }

    if (attr2 === "left")
    {
      resizer.style.left = "-5px";
    } else
    {
      resizer.style.right = "-5px";
    }

    if (
      (attr1 == "top" && attr2 === "right") ||
      (attr1 == "bottom" && attr2 === "left")
    )
    {
      resizer.onmouseover = (event) =>
      {
        event.target.style.cursor = "nesw-resize";
      };
    } else
    {
      resizer.onmouseover = (event) =>
      {
        event.target.style.cursor = "nwse-resize";
      };
    }

    resizer.onmousedown = (event) =>
    {
      let initX = event.screenX;
      let initY = event.screenY;
      resizing = true;
      event.preventDefault();

      const holder = event.target.parentNode;

      const holderSize = (function ()
      {
        const holderSize = {
          width:
            decoded.details.flag === "editing" ? holder.offsetWidth : undefined,
          height:
            decoded.details.flag === "editing"
              ? holder.offsetHeight
              : undefined,
          top:
            decoded.details.flag === "editing" ? holder.offsetTop : undefined,
          left:
            decoded.details.flag === "editing" ? holder.offsetLeft : undefined,

          // width: parseInt(holder.style.width.slice(0, -2)),
          // height: parseInt(holder.style.height.slice(0, -2)),
          // top: parseInt(holder.style.top.slice(0, -2)),
          // left: parseInt(holder.style.left.slice(0, -2))//elemLeft : 0
        };
        return Object.seal(holderSize);
      })();

      window.addEventListener("mousemove", resizeElement);
      function resizeElement(ev)
      {
        const el = document.getElementById("midSection_container");
        const midsectionRect = el.getBoundingClientRect();
        if (
          ev.screenX > midsectionRect.left &&
          ev.screenY > midsectionRect.top &&
          ev.screenX < midsectionRect.right
        )
        {
          if (attr1 == "bottom" && attr2 == "right")
          {
            holder.style.width = ev.screenX - initX + holderSize.width + "px";
            holder.style.height = ev.screenY - initY + holderSize.height + "px";
          } else if (attr1 == "bottom" && attr2 == "left")
          {
            holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
            holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
            holder.style.height = ev.screenY - initY + holderSize.height + "px";
          } else if (attr1 == "top" && attr2 == "left")
          {
            holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
            holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
            holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
            holder.style.height =
              holderSize.height - (ev.screenY - initY) + "px";
          } else if (attr1 == "top" && attr2 == "right")
          {
            holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
            holder.style.width = holderSize.width + (ev.screenX - initX) + "px";
            holder.style.height =
              holderSize.height - (ev.screenY - initY) + "px";
          }
        }
      }

      window.addEventListener("mouseup", stopResizing);
      function stopResizing(ev)
      {
        window.removeEventListener("mousemove", resizeElement);
        window.removeEventListener("mouseup", stopResizing);
        resizing = false;
      }
    };

    return resizer;
  }

  //Draggin element over page

  const dragElementOverPage = (event) =>
  {
    let holder;
    // console.log("dragElement", event.target);
    // event.dataTransfer.setData("text/plain", "DATE_INPUT");
    if (!resizing)
    {
      let initX = event.screenX;
      let initY = event.screenY;

      // console.log("initX ", initX, "initY ", initY);
      /* Ensure That target has changed */
      var counterCheck = true;
      var tempTarget = event.target;
      var hitTarget = "";
      while (counterCheck)
      {
        // if(tempTarget.className === 'holderDIV'){
        if (tempTarget.classList.contains("holderDIV"))
        {
          hitTarget = tempTarget;
          counterCheck = false;
        } else if (tempTarget.classList.contains("textInput"))
        {
          hitTarget = null;
          counterCheck = false;
        }
        tempTarget = tempTarget.parentNode;
      }

      holder = hitTarget;
      const holderPos = (function ()
      {
        const holderPos = {
          // top:
          //   decoded.details.flag === "editing" ? holder?.offsetTop : undefined,
          // left:
          //   decoded.details.flag === "editing" ? holder?.offsetLeft : undefined,
          top: parseInt(holder?.style?.top.slice(0, -2)),
          left: parseInt(holder?.style?.left.slice(0, -2)),
        };
        return Object.seal(holderPos);
      })();
      // holder.ondragstart = (e) => {
      //   console.log("i am dragged", e.target);
      // };
      // code for conatainer element move start
      let holderParentHolder = "";
      let holderParentHolderRect = "";
      let hodlerRect = "";
      if (holder?.parentElement.classList.contains("containerInput"))
      {
        holderParentHolder = holder?.parentElement?.parentElement;
      }
      if (holderParentHolder)
      {
        holderParentHolderRect = holderParentHolder.getBoundingClientRect();
      }
      hodlerRect = holder.getBoundingClientRect();
      // code for container element move end
      // console.log("finding moveable element", holderPos);

      window.addEventListener("mousemove", moveObject);
      function moveObject(ev)
      {
        //console.log(ev);
        ev.preventDefault();
        const el = document.getElementById("midSection_container");
        const midsectionRect = el.getBoundingClientRect();
        //console.log(
        //   midsectionRect.left,
        //   midsectionRect.top,
        //   midsectionRect.right
        // );
        //  screenX: 531, screenY: 175, clientX: 531, Top-left
        //  screenX: 1061, screenY: 154, Top right

        // console.log("midsectionRect", midsectionRect);
        // const eventClientX = ev.clientX;
        const elemtnMeasureX =
          ev.screenX + holderPos.left + hodlerRect.width - initX;
        const elmentMeasureY =
          ev.screenY + holderPos.top + hodlerRect.height - initY;
        // if (
        //   ev.screenX > holderParentHolderRect.left &&
        //   ev.screenY > holderParentHolderRect.top &&
        //   ev.screenX < holderParentHolderRect.right
        // ) {
        if (holder?.parentElement.classList.contains("containerInput"))
        {
          if (
            holderParentHolderRect.width > elemtnMeasureX + 5 &&
            // holderParentHolderRect.left + 20 < elemtnMeasureX &&
            ev.screenX + holderPos.left - initX > 0 &&
            holderParentHolderRect.height > elmentMeasureY + 5 &&
            // holderParentHolderRect.top - 50 < elmentMeasureY
            ev.screenY + holderPos.top - initY > 0
          )
          {
            //console.log("checking motion");
            const diffX = ev.screenX - initX;
            const diffY = ev.screenY - initY;
            holder.style.top = holderPos.top + diffY + "px";
            holder.style.left = holderPos.left + diffX + "px";
          } else
          {
            holder.style.top = holderPos.top + "px";
            holder.style.left = holderPos.left + "px";
          }
        } else
        {
          // if (
          //   ev.screenX > midsectionRect.left &&
          //   ev.screenY > midsectionRect.top &&
          //   ev.screenX < midsectionRect.right
          // ) {

          if (
            midsectionRect.width > elemtnMeasureX + 5 &&
            ev.screenX + holderPos.left - initX > 0 &&
            midsectionRect.height > elmentMeasureY + 5 &&
            // midsectionRect.top - 50 < elmentMeasureY
            ev.screenY + holderPos.top - initY > 0
          )
          {
            //console.log("checking motion");
            const diffX = ev.screenX - initX;
            const diffY = ev.screenY - initY;
            holder.style.top = holderPos.top + diffY + "px";
            holder.style.left = holderPos.left + diffX + "px";
          } else
          {
            holder.style.top = holderPos.top + "px";
            holder.style.left = holderPos.left + "px";
          }
        }
      }

      window.addEventListener("mouseup", stopMove);
      function stopMove(ev)
      {
        window.removeEventListener("mousemove", moveObject);
        window.removeEventListener("mouseup", stopMove);
      }
    }
  };

  function getHolderMenu(auth_user)
  {
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

  function getHolderDIV(measure, i, idMatch)
  {
    //console.log("from holder div", i);
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
    holderDIV.setAttribute("draggable", true);
    holderDIV.setAttribute("data-idD", "INPUT_HOLDER");
    holderDIV.style.display = "flex";
    holderDIV.style.flexDirection = "column";
    // holderDIV.style.border = "2px dotted gray";
    holderDIV.tabIndex = "1";
    // //console.log("measure", measure);
    holderDIV.style.width = measure.width;
    holderDIV.style.height = measure.height;
    holderDIV.style.left = measure.left;
    holderDIV.style.top = measure.top;
    holderDIV.classList.add(`page_${i}`);
    //console.log(idMatch);
    if (idMatch?.length > 0)
    {
      holderDIV.classList.add(`enable_pointer_event`);
      holderDIV.style.border = "1px solid green !important";
    } else if (idMatch?.length < 1 && actionName == "document")
    {
      holderDIV.classList.add(`dotted_border`);
      holderDIV.classList.add(`disable_pointer_event`);
    } else
    {
      holderDIV.classList.add(`dotted_border`);
    }

    holderDIV.addEventListener("dragstart", (event) =>
    {
      console.log("dragStart fun called");
    });
    holderDIV.ondragstart = (e) =>
    {
      console.log("dragStart fun called");
    };
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
      (event) =>
      {
        dragElementOverPage(event);
      },
      false
    );

    holderDIV.onresize = (evntt) =>
    {
      //console.log("Holder resized");
    };
    // }

    // holderDIV.style.border = "2px dotted gray";

    holderDIV.addEventListener("focus", function (e)
    {
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
    holderDIV.addEventListener("focusout", function (e)
    {
      // holderDIV.classList.remove("focussedd");
      // if(holderDIV.target.firstElementChild.classList.contains("textInput")){
      //   holderDIV.style.border = "3px dotted gray";

      // }
      holderDIV.classList.remove("zIndex-two");
      holderDIV.style.border = "3px dotted gray";

      holderMenu.remove();
      resizerTL.remove();
      resizerTR.remove();
      resizerBL.remove();
      resizerBR.remove();
    });

    // if (!isTemplate) {
    //   if (currUser == measure.auth_user) {
    //     //console.log("They are equal");
    //     //console.log(measure.auth_user);
    //     //console.log(currUser);

    //   }

    // }

    return holderDIV;
  }

  // dragging test

  let dragged = null;

  const source = document.querySelector(".focussedd");

  if (source)
  {
    source.addEventListener("dragstart", (event) =>
    {
      // store a ref. on the dragged elem
      dragged = event.target;
      console.log("dragged", dragged);
    });
  }

  // const target = document.getElementById("droptarget");
  // target.addEventListener("dragover", (event) => {
  //   // prevent default to allow drop
  //   event.preventDefault();
  // });

  // target.addEventListener("drop", (event) => {
  //   // prevent default action (open as link for some elements)
  //   event.preventDefault();
  //   // move dragged element to the selected drop target
  //   if (event.target.className === "dropzone") {
  //     dragged.parentNode.removeChild(dragged);
  //     event.target.appendChild(dragged);
  //   }
  // });

  // table_dropdown_focuseddClassMaintain
  // function table_dropdown_focuseddClassMaintain(e) {
  //   console.log("tabletargettest", e.target);

  //   if (
  //     !e.target?.classList?.contains("addImageButtonInput") &&
  //     !e.target?.classList?.contains("addSignButtonInput")
  //   ) {
  //     let allDiv = document.getElementsByClassName("focussedd");
  //     for (let i = 0; i < allDiv.length; i++) {
  //       allDiv[i].classList.remove("focussedd");
  //     }

  //     let findFocusElement = e.target.parentElement;

  //     while (1) {
  //       if (findFocusElement.classList.contains("holderDIV")) {
  //         findFocusElement.classList.add("focussedd");
  //         break;
  //       } else {
  //         findFocusElement = findFocusElement.parentElement;
  //       }
  //     }

  //     // if (e.target.parentElement.classList.contains("holderDIV")) {
  //     //   e.target.parentElement.classList.add("focussedd");
  //     // } else if (
  //     //   e.target.parentElement.parentElement.classList.contains("holderDIV")
  //     // ) {
  //     //   e.target.parentElement.parentElement.classList.add("focussedd");
  //     // } else if (
  //     //   e.target.parentElement.parentElement.parentElement.classList.contains(
  //     //     "holderDIV"
  //     //   )
  //     // ) {
  //     //   e.target.parentElement.parentElement.parentElement.classList.add(
  //     //     "focussedd"
  //     //   );
  //     // } else if (
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
  //     //     "holderDIV"
  //     //   )
  //     // ) {
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
  //     //     "focussedd"
  //     //   );
  //     // } else if (
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
  //     //     "holderDIV"
  //     //   )
  //     // ) {
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
  //     //     "focussedd"
  //     //   );
  //     // } else if (
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
  //     //     "holderDIV"
  //     //   )
  //     // ) {
  //     //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
  //     //     "focussedd"
  //     //   );
  //     // }
  //     let focussedDiv = document.getElementsByClassName("focussed");
  //     for (let i = 0; i < focussedDiv.length; i++) {
  //       focussedDiv[i].classList.remove("focussed");
  //     }
  //     if (e.target.classList.contains("dropdownInput")) {
  //       e.target.classList.add("focussed");
  //     } else if (e.target.parentElement.classList.contains("dropdownInput")) {
  //       e.target.parentElement.classList.add("focussed");
  //     }
  //     if (e.target.classList.contains("tableInput")) {
  //       e.target.classList.add("focussed");
  //     } else if (e.target.parentElement.classList.contains("tableInput")) {
  //       e.target.parentElement.classList.add("focussed");
  //     }
  //     if (e.target.classList.contains("iframeInput")) {
  //       e.target.classList.add("focussed");
  //     } else if (e.target.parentElement.classList.contains("iframeInput")) {
  //       e.target.parentElement.classList.add("focussed");
  //     }
  //     if (e.target.classList.contains("scaleInput")) {
  //       e.target.classList.add("focussed");
  //     } else if (e.target.parentElement.classList.contains("scaleInput")) {
  //       e.target.parentElement.classList.add("focussed");
  //     }
  //     // e.target.classList.add("focussed");
  //   }
  // }

  // table ondrop handle after retrieve

  const onPost = () =>
  {
    const curr_user = document.getElementById("curr_user");

    const midSec = document.getElementsByClassName("midSection_container");

    // const midsectionRect = midSec.getBoundingClientRect();
    // data?.forEach((arrayData) => {
    let pageNo = 0;
    let isAnyRequiredElementEdited = false;
    for (let p = 1; p <= item?.length; p++)
    {

      pageNo++;
      fetchedData[p]?.forEach((element) =>
      {
        if (element.type === "TEXT_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          console.log('element', element)

          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;

          let inputField = document.createElement("div");
          inputField.setAttribute("contenteditable", true);
          //  inputField.setAttribute('draggable', true);
          inputField.className = "textInput";
          inputField.id = id;
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
          inputField.oninput = (e) =>
          {
            //setIsFinializeDisabled(false);
            // const doc_map_copy = [...doc_map]
            if (inputField.parentElement.classList.contains("holderDIV"))
            {
              inputField.parentElement.classList.add("element_updated");
            }
            if (element.required)
            {
              isAnyRequiredElementEdited = true;
            }
          };
          inputField.onclick = (e) =>
          {
            focuseddClassMaintain(e);

            handleClicked("align2");
            setSidebar(true);
            // inputField.parentElement.focus()
          };
          // inputField.ontouchstart = () => {
          //   handleClicked("align2");
          //   setSidebar(true);
          // };
          const text = `${element.raw_data}`;

          inputField.innerHTML = text;
          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(inputField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "IMAGE_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          //console.log("measure from image input", measure);
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          // console.log(idMatch, "idMatch");
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let imageField = document.createElement("div");
          imageField.className = "imageInput";
          imageField.id = id;
          imageField.style.width = "100%";
          imageField.style.height = "100%";
          imageField.style.backgroundColor = "#0000";
          imageField.style.borderRadius = "0px";
          imageField.style.outline = "0px";
          imageField.style.overflow = "overlay";
          // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
          imageField.style.position = "relative";
          imageField.oninput = (e) =>
          {
            //setIsFinializeDisabled(false);
          };
          if (imageField?.parentElement?.classList.contains("holderDIV"))
          {
            imageField?.parentElement?.classList.add("element_updated");
          }
          if (element.required)
          {
            isAnyRequiredElementEdited = true;
          }

          // const copyImage = (e) => {
          //   console.log("get copy", e)
          //   const element = document.querySelector("inputImg");
          //   let counter = 1;
          //   const copyEle = element.cloneNode(true);
          //   copyEle.id += counter;
          //   holderDIV.body.appendChild(copyEle);
          //   console.log("coping", copyEle)
          // }

          // // console.log("get copy", copyImage(e))

          // imageField.addEventListener("click", () => {
          //   copyImage()

          // })

          imageField.onclick = (e) =>
          {
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

          imgBtn.addEventListener("input", () =>
          {
            const reader = new FileReader();

            reader.addEventListener("load", () =>
            {
              uploadedImage = reader.result;
              document.querySelector(
                ".focussed"
              ).style.backgroundImage = `url(${uploadedImage})`;
            });
            reader.readAsDataURL(imgBtn.files[0]);
          });

          // console.log(
          //   "image data retrive test",
          //   element.data.startsWith("url(")
          // );

          element.data.startsWith("url(")
            ? (imageField.style.backgroundImage = `${element.data}`)
            : (imageField.innerText = `${element.data}`);
          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          imageButton.append(imgBtn);
          holderDIV.append(imageField);
          holderDIV.append(imageButton);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "DATE_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let dateField = document.createElement("div");
          dateField.className = "dateInput";
          dateField.id = id;
          dateField.style.width = "100%";
          dateField.style.height = "100%";
          dateField.style.backgroundColor = "#dedede";
          dateField.style.borderRadius = "0px";
          dateField.style.outline = "0px";
          dateField.style.overflow = "overlay";
          dateField.style.position = "relative";

          function dateClick()
          {
            document.getElementById("date_picker")?.click();
          }
          // let dateFieldInnerText = "";
          // dateField.oninput = (e) =>{
          //   setIsFinializeDisabled(false);
          // }
          dateField.onclick = (e) =>
          {
            // dateFieldInnerText = e?.target?.innerText;
            focuseddClassMaintain(e);
            handleClicked("calendar2");
            setRightSideDateMenu(false);
            //console.log("innerText", e.target.innerText);
            if (e.target.innerText != "mm/dd/yyyy")
            {
              if (e.target.innerText.includes("/"))
              {
                const setDate = new Date(e.target.innerText);
                //console.log("First from Midsection", setDate);
                setMethod("first");
                setStartDate(setDate);
              } else
              {
                if (e.target.innerText.includes("-"))
                {
                  setMethod("fourth");
                } else
                {
                  setMethod("second");
                }
                const setDate = new Date(e.target.innerText);
                //console.log("Second from Midsection", setDate);

                setStartDate(setDate);
              }
            }
            setSidebar(true);
            setTimeout(dateClick, 0);
          };
          // dateField.onmouseleave = (e) =>{
          //   //console.log("mouseEvent", dateFieldInnerText, e.target.innerText);
          //   if((dateFieldInnerText != "") && (dateFieldInnerText != e.target.innerText)){
          //   setIsFinializeDisabled(false);
          //   }
          // }
          //console.log(`${element.data}`);
          dateField.innerText = `${element.data}`;

          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(dateField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "SIGN_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          //console.log("signupmatch", idMatch);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let signField = document.createElement("div");
          signField.className = "signInput";
          signField.id = id;
          signField.style.width = "100%";
          signField.style.height = "100%";
          signField.style.backgroundColor = "#0000";
          signField.style.borderRadius = "0px";
          signField.style.outline = "0px";
          signField.style.overflow = "overlay";
          // signField.innerHTML = `<img src="${postData.signField.value}" alt="">`;
          signField.style.position = "absolute";
          // signField.oninput = (e) =>{
          //   setIsFinializeDisabled(false);
          // }
          // let signFieldInnerText = "";

          signField.onclick = (e) =>
          {
            // signFieldInnerText=e.target.innerText
            focuseddClassMaintain(e);
            // if ((actionName = 'template')) {
            handleClicked("signs2");
            setSidebar(true);
            // } else {
            //   setSidebar(false);
            // }
          };
          // signField.onmouseleave = (e) =>{
          //   if(signFieldInnerText == e.target.innerText){
          //   setIsFinializeDisabled(false);
          //   }
          // }
          // if (
          //   decoded.details.action === "document" &&
          //   element.data == "Signature here"
          // ) {
          //   // signField.innerHTML = `<img src=${element.data} />`;
          //   signField.innerHTML = "Signature here";
          // }

          // if (
          //     decoded.details.action === "document"
          //   ) {
          element.data.startsWith("url(")
            ? (signField.innerHTML = `<img src=${element.data} />`)
            : (signField.innerHTML = `${element.data}`);

          // signField.innerHTML = "Signature here";
          // }

          // else if (
          //   decoded.details.action === "document" &&
          //   element.data == "Place your signature here"
          // ) {
          //   signField.innerHTML = "Signature here";
          // }
          // else if (
          //   decoded.details.action === "document" &&
          //   element.data == "Signature here "
          // ) {
          //   signField.innerHTML = "Signature here";
          // }
          // else if (decoded.details.action === "document" && element.data) {
          //   signField.innerHTML = `<img src=${element.data}  />`;
          // }
          // else {
          //   signField.innerHTML = "Signature here";
          // }

          const imageSignButton = document.createElement("div");
          imageSignButton.className = "addImageSignButton";
          imageSignButton.innerText = "Choose File";
          imageSignButton.style.display = "none";

          const signBtn = document.createElement("input");
          signBtn.className = "addSignButtonInput";
          signBtn.type = "file";
          signBtn.style.objectFit = "cover";
          var uploadedImage = "";

          signBtn.addEventListener("input", () =>
          {
            const reader = new FileReader();

            reader.addEventListener("load", () =>
            {
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
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "TABLE_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let tableField = document.createElement("div");
          tableField.className = "tableInput";
          tableField.id = id;
          tableField.style.width = "100%";
          tableField.style.height = "100%";
          tableField.style.backgroundColor = "#0000";
          tableField.style.borderRadius = "0px";
          tableField.style.outline = "0px";
          tableField.style.overflow = "overlay";
          // tableField.innerHTML = 'table';
          tableField.style.position = "absolute";
          tableField.oninput = (e) =>
          {
            //setIsFinializeDisabled(false);
          };
          tableField.onclick = (e) =>
          {
            // focuseddClassMaintain(e);

            table_dropdown_focuseddClassMaintain(e);
            // table_focuseddClassMaintain(e);

            handleClicked("table2");
            setSidebar(true);
          };

          const tabb = document.createElement("table");
          // tabb.innerHTML = element.data;
          const tableData = element?.data;
          // console.log("tableData", tableData);
          for (let i = 0; i < tableData.length; i++)
          {
            const tabbTR = document.createElement("tr");
            const tableTRData = tableData[i]["tr"];
            for (let j = 0; j < tableTRData.length; j++)
            {
              const tableTDData = tableTRData[j]["td"];
              // console.log("tableTD", tableTRData[j]["td"]);
              var cells = document.createElement("td");
              cells.className = "dropp";
              cells.ondragover = function (e)
              {
                e.preventDefault();
                e.target.classList.add("table_drag");
                if (!e.target.hasChildNodes())
                {
                  e.target.style.border = "3px solid blue";
                }
                if (e.target.classList.contains("imageInput"))
                {
                  e.target.style.border = "none";
                }
              };
              cells.ondragleave = (e) =>
              {
                e.preventDefault();
                if (
                  !e.target.hasChildNodes() &&
                  !e.target.classList.contains("imageInput")
                )
                {
                  e.target.style.border = "1px solid black";
                }
                if (e.target.classList.contains("imageInput"))
                {
                  e.target.style.border = "none";
                }
              };

              //  tableTDData.
              const cellsDiv = document.createElement("div");
              const dataType = tableTDData.type;
              cellsDiv.className =
                (dataType == "DATE_INPUT" && "dateInput") ||
                (dataType == "TEXT_INPUT" && "textInput") ||
                (dataType == "IMAGE_INPUT" && "imageInput") ||
                (dataType == "SIGN_INPUT" && "signInput");
              if (dataType == "DATE_INPUT")
              {
                setStartDate(new Date());
                setMethod("select");

                function dateClick()
                {
                  document.getElementById("date_picker").click();
                  setRightSideDateMenu(false);
                }
                cellsDiv.onclick = (e) =>
                {
                  focuseddClassMaintain(e);
                  handleClicked("calendar2");
                  setRightSideDateMenu(false);
                  if (e.target.innerText != "mm/dd/yyyy")
                  {
                    if (e.target.innerText.includes("/"))
                    {
                      const setDate = new Date(e.target.innerText);
                      setMethod("first");
                      setStartDate(setDate);
                    } else
                    {
                      if (e.target.innerText.includes("-"))
                      {
                        setMethod("fourth");
                      } else
                      {
                        setMethod("second");
                      }
                      const setDate = new Date(e.target.innerText);
                      setStartDate(setDate);
                    }
                  }
                  setSidebar(true);
                  setTimeout(dateClick, 0);
                  e.stopPropagation();
                };
              }
              if (dataType == "TEXT_INPUT")
              {
                cellsDiv.onclick = (e) =>
                {
                  focuseddClassMaintain(e);
                  // handleClicked("align2");
                  // setSidebar(true);
                  handleClicked("align2", "table2");
                  setSidebar(true);
                  e.stopPropagation();
                };
              }
              if (dataType == "IMAGE_INPUT")
              {
                cellsDiv.onclick = (e) =>
                {
                  focuseddClassMaintain(e);
                  // handleClicked("image2");
                  // setSidebar(true);
                  handleClicked("image2", "table2");
                  setSidebar(true);
                  // console.log("imageclick test", e.target);
                  e.stopPropagation();
                };
              }
              if (dataType == "SIGN_INPUT")
              {
                cellsDiv.onclick = (e) =>
                {
                  focuseddClassMaintain(e);
                  handleClicked("signs2", "table2");
                  setSidebar(true);
                  e.stopPropagation();
                };
              }
              cellsDiv.setAttribute("contenteditable", true);
              cellsDiv.style.width = "100%";
              cellsDiv.style.height = "100%";
              cellsDiv.style.backgroundColor = "#0000";
              cellsDiv.style.borderRadius = "0px";
              cellsDiv.style.outline = "0px";
              cellsDiv.style.overflow = "overlay";

              if (dataType == "IMAGE_INPUT")
              {
                const imageButton = document.createElement("div");
                imageButton.className = "addImageButton";
                imageButton.innerText = "Choose File";
                imageButton.style.display = "none";

                const imgBtn = document.createElement("input");
                imgBtn.className = "addImageButtonInput";
                imgBtn.type = "file";
                imgBtn.style.objectFit = "cover";
                var uploadedImage = "";

                imgBtn.addEventListener("input", () =>
                {
                  const reader = new FileReader();

                  reader.addEventListener("load", () =>
                  {
                    uploadedImage = reader.result;
                    document.querySelector(
                      ".focussed"
                    ).style.backgroundImage = `url(${uploadedImage})`;
                  });
                  reader.readAsDataURL(imgBtn.files[0]);
                });

                cellsDiv.style.backgroundImage = `${tableTDData.data}`;

                imageButton.append(imgBtn);
                if (dataType)
                {
                  cells.appendChild(cellsDiv);
                  cells.appendChild(imgBtn);
                }
              } else
              {
                cellsDiv.innerHTML = `${tableTDData.data}`;
                if (dataType)
                {
                  cells.appendChild(cellsDiv);
                }
              }

              cells.ondrop = handleDropp;
              tabbTR.appendChild(cells);
            }
            tabb.appendChild(tabbTR);
          }
          tableField.append(tabb);
          // var cells = tabb.getElementsByTagName("td");

          // for (var i = 0; i < cells.length; i++) {
          //   cells[i].onclick = function () {
          //     if (this.hasAttribute("data-clicked")) {
          //       return;
          //     }
          //     this.setAttribute("data-clicked", "yes");
          //     this.setAttribute("data-text", this.innerHtml);

          //     var input = document.createElement("input");
          //     input.setAttribute("type", "text");
          //     // input.value = this.innerHtml;
          //     input.style.width = this.offsetWidth - this.clientLeft * 2 + "px";
          //     input.style.height =
          //       this.offsetHeight - this.clientTop * 2 + "px";
          //     input.style.border = "0px";
          //     input.style.fontFamily = "inherit";
          //     input.style.fontSize = "inherit";
          //     input.style.textAlign = "inherit";
          //     input.style.backgroundColor = "LightGoldenRodYellow";

          //     input.onblur = function () {
          //       var td = input.parentElement;
          //       var org_text = input.parentElement.getAttribute("data-text");
          //       var current_text = this.value;

          //       if (org_text != current_text && current_text !== "") {
          //         td.removeAttribute("data-clicked");
          //         td.removeAttribute("data-text");
          //         td.innerHTML = current_text;
          //         td.style.cssText = "padding: 5px";
          //       } else {
          //         td.removeAttribute("data-clicked");
          //         td.removeAttribute("data-text");
          //         td.style.cssText = "padding: 5px";
          //         input.remove();
          //       }
          //     };

          //     input.onkeydown = function (event) {
          //       if (event.keyCode == 13) {
          //         this.onblur();
          //       }
          //     };
          //     this.innerHtml = "";
          //     this.style.cssText = "padding: 0px 0px";
          //     this.append(input);
          //     this.firstElementChild.select();
          //   };
          // }

          // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

          holderDIV.append(tableField);

          // holderDIV.append(paragraphField);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "IFRAME_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let iframeField = document.createElement("div");
          iframeField.className = "iframeInput";
          iframeField.id = id;
          iframeField.style.width = "100%";
          iframeField.style.height = "100%";
          iframeField.style.backgroundColor = "#dedede";
          iframeField.style.borderRadius = "0px";
          iframeField.style.outline = "0px";
          iframeField.style.overflow = "overlay";
          // iframeField.innerHTML = "iframe";
          iframeField.style.position = "absolute";

          if (element.data == "iFrame here")
          {
            iframeField.innerHTML = element.data;
          }
          if (element.data != "iFrame here")
          {
            const iframe = document.createElement("iframe");
            iframe.src = element.data;
            iframe.width = "100%";
            iframe.height = "100%";

            iframeField.append(iframe);
          }

          iframeField.onclick = (e) =>
          {
            // focuseddClassMaintain(e);
            table_dropdown_focuseddClassMaintain(e);
            handleClicked("iframe2");
            setSidebar(true);
          };

          holderDIV.append(iframeField);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }

        if (element.type === "BUTTON_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };

          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo);
          const id = `${element.id}`;
          const finalizeButton = document.getElementById("finalize-button");
          const rejectButton = document.getElementById("reject-button");

          let buttonField = document.createElement("button");
          buttonField.className = "buttonInput";
          buttonField.id = id;
          buttonField.style.width = "100%";
          buttonField.style.height = "100%";
          buttonField.style.backgroundColor = "#0000";
          buttonField.style.borderRadius = "0px";
          buttonField.style.outline = "0px";
          buttonField.style.overflow = "overlay";
          buttonField.style.position = "absolute";
          buttonField.textContent = element.data;

          if (
            decoded.details.action === "template" &&
            element.raw_data == "" &&
            element.purpose == ""
          )
          {
            buttonField.onclick = (e) =>
            {
              focuseddClassMaintain(e);
              handleClicked("button2");
              setSidebar(true);
            };
          }

          buttonField.onmouseover = (e) =>
          {
            if (buttonField?.parentElement?.classList.contains("holderDIV"))
            {
              buttonField?.parentElement?.classList.add("element_updated");
            }
            if (element.required)
            {
              isAnyRequiredElementEdited = true;
            }
          };

          if (
            decoded.details.action === "document" &&
            element.purpose == "custom" &&
            element.raw_data !== ""
          )
          {
            buttonField.onclick = (e) =>
            {
              window.open(element.raw_data, "_blank");
            };
          }

          if (finalizeButton)
          {
            if (isAnyRequiredElementEdited)
            {
              finalizeButton?.click();
            } else
            {
              finalizeButton.disabled = true;
            }
          }

          // if (
          //   decoded.details.action === "document" &&
          //   element.purpose == "finalize"
          // ) {
          //   buttonField.onclick = (e) => {
          //     finalizeButton?.click();
          //   };
          // }
          if (
            decoded.details.action === "document" &&
            element.purpose == "reject"
          )
          {
            buttonField.onclick = (e) =>
            {
              rejectButton?.click();
            };
          }

          const linkHolder = document.createElement("div");
          linkHolder.className = "link_holder";
          linkHolder.innerHTML = element.raw_data;
          linkHolder.style.display = "none";

          const purposeHolder = document.createElement("div");
          purposeHolder.className = "purpose_holder";
          purposeHolder.innerHTML = element.purpose;
          purposeHolder.style.display = "none";

          holderDIV.append(buttonField);
          holderDIV.append(linkHolder);
          holderDIV.append(purposeHolder);
          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }

        if (element.type === "SCALE_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let scaleField = document.createElement("div");
          scaleField.className = "scaleInput";
          scaleField.id = id;
          scaleField.style.width = "100%";
          scaleField.style.height = "100%";
          scaleField.style.backgroundColor = "#dedede";
          scaleField.style.borderRadius = "0px";
          scaleField.style.outline = "0px";
          scaleField.style.overflow = "overlay";
          // iframeField.innerHTML = "iframe";
          scaleField.style.position = "absolute";

          if (element.data == "scale here")
          {
            scaleField.innerHTML = element.data;
          }
          if (
            element.data != "scale here" &&
            decoded.details.action === "template"
          )
          {
            const iframe = document.createElement("iframe");
            iframe.style.width = "90%";
            iframe.style.height = "90%";
            iframe.src = element.scale_url;

            scaleField.addEventListener("resize", () =>
            {
              iframe.style.width = scaleField.clientWidth + "px";
              iframe.style.height = scaleField.clientHeight + "px";
            });

            scaleField.append(iframe);
          }

          if (
            element.details === "Template scale" &&
            decoded.details.action === "document"
          )
          {
            const iframe = document.createElement("iframe");
            iframe.style.width = "90%";
            iframe.style.height = "90%";

            Axios.post(
              "https://100035.pythonanywhere.com/api/nps_create_instance",
              {
                scale_id: element.scaleId,
              }
            )
              .then((res) =>
              {
                setIsLoading(false);
                console.log(res, "scaleData");
                const lastInstance = res.data.response.instances.slice(-1)[0];
                const lastValue = Object.values(lastInstance)[0];
                iframe.src = lastValue;
                console.log(lastValue);
              })
              .catch((err) =>
              {
                setIsLoading(false);
                console.log(err);
              });
            scaleField.addEventListener("resize", () =>
            {
              iframe.style.width = scaleField.clientWidth + "px";
              iframe.style.height = scaleField.clientHeight + "px";
            });

            scaleField.append(iframe);
          }

          if (
            element.details === "Document instance" &&
            decoded.details.action === "document"
          )
          {
            const iframe = document.createElement("iframe");
            iframe.style.width = "90%";
            iframe.style.height = "90%";
            iframe.src = element.scale_url;

            scaleField.addEventListener("resize", () =>
            {
              iframe.style.width = scaleField.clientWidth + "px";
              iframe.style.height = scaleField.clientHeight + "px";
            });

            scaleField.append(iframe);
          }

          const scaleIdHolder = document.createElement("div");

          scaleIdHolder.className = "scaleId_holder";
          scaleIdHolder.innerHTML = element.scaleId;
          scaleIdHolder.style.display = "none";

          const labelHolder = document.createElement("div");
          labelHolder.className = "label_holder";
          labelHolder.style.display = "none";

          scaleField.onclick = (e) =>
          {
            // focuseddClassMaintain(e);
            table_dropdown_focuseddClassMaintain(e);
            handleClicked("scale2");
            setSidebar(true);
          };

          holderDIV.append(scaleField);
          holderDIV.append(scaleIdHolder);
          holderDIV.append(labelHolder);

          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        // Limon
        if (element.type === "DROPDOWN_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);
          let dropdownField = document.createElement("div");
          dropdownField.className = "dropdownInput";
          dropdownField.id = id;
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

          dropdownField.onclick = (e) =>
          {
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
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        // conteiner retrive data
        if (element.type === "CONTAINER_INPUT")
        {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          let containerField = document.createElement("div");
          containerField.className = "containerInput";
          containerField.id = id;
          containerField.style.width = "100%";
          containerField.style.height = "100%";
          containerField.style.backgroundColor = "#0000";
          containerField.style.borderRadius = "0px";
          containerField.style.outline = "0px";
          containerField.style.overflow = "overlay";
          containerField.style.position = "relative";
          containerField.onclick = (e) =>
          {
            focuseddClassMaintain(e);
            handleClicked("container2");
            setSidebar(true);
          };
          // console.log("element.data container input retrieve", element.data);
          for (let p = 0; p < element.data.length; p++)
          {
            const containerElement = element.data[p];
            // const measureContainer = {
            //   width: "200px",
            //   height: "80px",
            //   left: event.clientX - containerRect.left + "px",
            //   top: event.clientY - containerRect.top + "px",
            //   auth_user: curr_user,
            // };
            const measureContainer = {
              width: containerElement.width + "px",
              height: containerElement.height + "px",
              left: containerElement.left - element.left + "px",
              top: containerElement.top - element.top + "px",
              auth_user: curr_user,
            };
            const typeOfOperationContainer = containerElement.type;
            const holderDIVContainer = getHolderDIV(measureContainer);
            if (typeOfOperationContainer === "DATE_INPUT")
            {
              let dateFieldContainer = document.createElement("div");
              dateFieldContainer.className = "dateInput";
              dateFieldContainer.style.width = "100%";
              dateFieldContainer.style.height = "100%";
              dateFieldContainer.style.backgroundColor = "#0000";
              dateFieldContainer.style.borderRadius = "0px";
              dateFieldContainer.style.outline = "0px";
              dateFieldContainer.style.overflow = "overlay";
              dateFieldContainer.style.position = "relative";

              dateFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  calenderField: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };
              setStartDate(new Date());
              setMethod("select");
              function dateClick()
              {
                document.getElementById("date_picker").click();
                setRightSideDateMenu(false);
              }
              dateFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("calendar2", "container2");
                setRightSideDateMenu(false);
                if (e.target.innerText != "mm/dd/yyyy")
                {
                  if (e.target.innerText.includes("/"))
                  {
                    const setDate = new Date(e.target.innerText);
                    setMethod("first");
                    setStartDate(setDate);
                  } else
                  {
                    if (e.target.innerText.includes("-"))
                    {
                      setMethod("fourth");
                    } else
                    {
                      setMethod("second");
                    }
                    const setDate = new Date(e.target.innerText);
                    setStartDate(setDate);
                  }
                }
                setSidebar(true);
                setTimeout(dateClick, 0);
              };
              dateFieldContainer.innerText = containerElement.data;

              holderDIVContainer.append(dateFieldContainer);
            } else if (typeOfOperationContainer === "IMAGE_INPUT")
            {
              let imageFieldContainer = document.createElement("div");
              imageFieldContainer.className = "imageInput";
              imageFieldContainer.style.width = "100%";
              imageFieldContainer.style.height = "100%";
              imageFieldContainer.style.backgroundColor = "#0000";
              imageFieldContainer.style.borderRadius = "0px";
              imageFieldContainer.style.outline = "0px";
              imageFieldContainer.style.overflow = "overlay";
              // imageFieldContainer.innerText = "Choose Image";
              imageFieldContainer.style.position = "relative";

              containerElement.data.startsWith("url(")
                ? (imageFieldContainer.style.backgroundImage = `${containerElement.data}`)
                : (imageFieldContainer.innerText = `${containerElement.data}`);

              imageFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("image2", "table2");
                setSidebar(true);
              };

              const imageButtonContainer = document.createElement("div");
              imageButtonContainer.className = "addImageButton";
              imageButtonContainer.innerText = "Choose File";
              imageButtonContainer.style.display = "none";
              // imageButtonContainer.onclick = (e) => chooseFileClick(e);

              const imgBtnContainer = document.createElement("input");
              imgBtnContainer.className = "addImageButtonInput";
              imgBtnContainer.type = "file";
              imgBtnContainer.style.objectFit = "cover";
              var uploadedImage = "";

              imgBtnContainer.addEventListener("input", () =>
              {
                const reader = new FileReader();

                reader.addEventListener("load", () =>
                {
                  uploadedImage = reader.result;
                  document.querySelector(
                    ".focussed"
                  ).style.backgroundImage = `url(${uploadedImage})`;
                });
                reader.readAsDataURL(imgBtnContainer.files[0]);
              });

              // imgBtnContainer.style.width = "100%";
              imageButtonContainer.append(imgBtnContainer);
              holderDIVContainer.append(imageFieldContainer);
              holderDIVContainer.append(imageButtonContainer);
            } else if (typeOfOperationContainer === "DROPDOWN_INPUT")
            {
              let dropdownFieldContainer = document.createElement("div");
              dropdownFieldContainer.className = "dropdownInput";
              dropdownFieldContainer.style.width = "100%";
              dropdownFieldContainer.style.height = "100%";
              dropdownFieldContainer.style.backgroundColor = "#0000";
              dropdownFieldContainer.style.borderRadius = "0px";
              dropdownFieldContainer.style.outline = "0px";
              dropdownFieldContainer.style.overflow = "overlay";
              dropdownFieldContainer.style.position = "absolute";

              const selectElement = document.createElement("select");
              selectElement.className = "select-element";
              selectElement.style.width = "500";
              selectElement.style.height = "auto";
              selectElement.onclick = () =>
              {
                selectElement.parentElement.click();
              };

              dropdownFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  dropdownFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              // if (dropdownFieldContainer) {
              //   const dropdownFieldContainer = {
              //     dropdownFieldContainer: {
              //       value: event.target.value,
              //       xcoordinate: getOffset(holderDIVContainer).left,
              //       ycoordinate: getOffset(holderDIVContainer).top,
              //     },
              //   };
              // }

              dropdownFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("dropdown2");
                setRightSideDropDown(false);
                setSidebar(true);
              };

              const para = document.createElement("p");
              para.innerHTML = " Dropdown Name";
              para.className = "dropdownName";
              para.onclick = () =>
              {
                para.parentElement.click();
              };
              dropdownFieldContainer.append(para);
              dropdownFieldContainer.append(selectElement);
              holderDIVContainer.append(dropdownFieldContainer);
            } else if (typeOfOperationContainer === "TEXT_INPUT")
            {
              let inputFieldContainer = document.createElement("div");
              inputFieldContainer.setAttribute("contenteditable", true);
              //  inputFieldContainer.setAttribute('draggable', true);
              inputFieldContainer.className = "textInput";
              inputFieldContainer.id = id;
              inputFieldContainer.style.width = "100%";
              inputFieldContainer.style.height = "100%";
              inputFieldContainer.style.resize = "none";
              inputFieldContainer.style.zIndex = 2;
              inputFieldContainer.style.backgroundColor = "#0000";
              inputFieldContainer.style.borderRadius = "0px";
              inputFieldContainer.style.outline = "0px";
              inputFieldContainer.style.overflow = "overlay";
              inputFieldContainer.style.position = "relative";
              inputFieldContainer.style.cursor = "text";
              inputFieldContainer.oninput = (e) =>
              {
                //setIsFinializeDisabled(false);
                // const doc_map_copy = [...doc_map]
                if (
                  inputFieldContainer.parentElement.classList.contains(
                    "holderDIV"
                  )
                )
                {
                  inputFieldContainer.parentElement.classList.add(
                    "element_updated"
                  );
                }
                if (element.required)
                {
                  isAnyRequiredElementEdited = true;
                }
              };
              inputFieldContainer.onclick = (e) =>
              {
                focuseddClassMaintain(e);

                handleClicked("align2");
                setSidebar(true);
                // inputFieldContainer.parentElement.focus()
              };
              // inputFieldContainer.ontouchstart = () => {
              //   handleClicked("align2");
              //   setSidebar(true);
              // };
              const text = `${containerElement.raw_data}`;

              inputFieldContainer.innerHTML = text;
              holderDIVContainer.append(inputFieldContainer);
            } else if (typeOfOperationContainer === "SIGN_INPUT")
            {
              let signFieldContainer = document.createElement("div");
              signFieldContainer.className = "signInput";
              signFieldContainer.style.width = "100%";
              signFieldContainer.style.height = "100%";
              signFieldContainer.style.backgroundColor = "#0000";
              signFieldContainer.style.borderRadius = "0px";
              signFieldContainer.style.outline = "0px";
              signFieldContainer.style.overflow = "overlay";
              signFieldContainer.innerText = "Signature here";
              signFieldContainer.style.position = "absolute";

              signFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  signFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              signFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("signs2");
                setSidebar(true);
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

              signBtn.addEventListener("input", () =>
              {
                const reader = new FileReader();

                reader.addEventListener("load", () =>
                {
                  uploadedImage = reader.result;
                  const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                  document.querySelector(".focussed").innerHTML = signImage;
                });
                reader.readAsDataURL(signBtn.files[0]);
              });

              imageSignButton.append(signBtn);
              holderDIVContainer.append(signFieldContainer);
              holderDIVContainer.append(imageSignButton);
            } else if (typeOfOperationContainer === "IFRAME_INPUT")
            {
              let iframeFieldContainer = document.createElement("div");
              iframeFieldContainer.className = "iframeInput";
              iframeFieldContainer.style.width = "100%";
              iframeFieldContainer.style.height = "100%";
              iframeFieldContainer.style.backgroundColor = "#dedede";
              iframeFieldContainer.style.borderRadius = "0px";
              iframeFieldContainer.style.outline = "0px";
              iframeFieldContainer.style.overflow = "overlay";
              iframeFieldContainer.style.position = "absolute";
              iframeFieldContainer.innerText = "iFrame here";

              iframeFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("iframe2");
                setSidebar(true);
              };

              holderDIVContainer.append(iframeFieldContainer);
            } else if (typeOfOperationContainer === "SCALE_INPUT")
            {
              setIsLoading(true);

              let scaleFieldContainer = document.createElement("div");
              scaleFieldContainer.className = "scaleInput";
              scaleFieldContainer.style.width = "100%";
              scaleFieldContainer.style.height = "100%";
              scaleFieldContainer.style.backgroundColor = "#dedede";
              scaleFieldContainer.style.borderRadius = "0px";
              scaleFieldContainer.style.outline = "0px";
              scaleFieldContainer.style.overflow = "overlay";
              // scaleFieldContainer.innerHTML = 'iframe';
              scaleFieldContainer.style.position = "absolute";
              // scaleFieldContainer.innerText = "scale here";

              let scale = document.createElement("iframe");
              scaleFieldContainer.append(scale);
              Axios.post(
                "https://100035.pythonanywhere.com/api/nps_settings_create/",
                {
                  username: "nake",
                  orientation: "horizontal",
                  scalecolor: "#8f1e1e",
                  roundcolor: "#938585",
                  fontcolor: "#000000",
                  fomat: "numbers",
                  time: "00",
                  name: `${title}_scale`,
                  left: "good",
                  right: "best",
                  center: "neutral",
                }
              )
                .then((res) =>
                {
                  setIsLoading(false);
                  console.log(res.data, "scaleData");
                  setScaleData(res.data);
                  const success = res.data.success;
                  var successObj = JSON.parse(success);
                  const id = successObj.inserted_id;
                  console.log(res.scale_urls, "stateScale");
                  if (id.length)
                  {
                    setScaleId(id);
                  }
                  scale.src = res.data.scale_urls;
                })
                .catch((err) =>
                {
                  setIsLoading(false);
                  console.log(err);
                });

              scaleFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("scale2");
                setSidebar(true);
              };

              holderDIVContainer.append(scaleFieldContainer);
            } else if (typeOfOperationContainer === "TABLE_INPUT")
            {
              let tableFieldContainer = document.createElement("div");
              tableFieldContainer.className = "tableInput";
              tableFieldContainer.style.width = "100%";
              tableFieldContainer.style.height = "100%";
              tableFieldContainer.style.backgroundColor = "#dedede";
              tableFieldContainer.style.borderRadius = "0px";
              tableFieldContainer.style.outline = "0px";
              tableFieldContainer.style.overflow = "overlay";
              tableFieldContainer.style.position = "absolute";

              tableFieldContainer.onchange = (event) =>
              {
                event.preventDefault();

                setPostData({
                  ...postData,
                  tableFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              tableFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("table2");
                setSidebar(true);
              };
              holderDIVContainer.append(tableFieldContainer);
            } else if (typeOfOperationContainer == "BUTTON_INPUT")
            {
              const measure = {
                width: element.width + "px",
                height: element.height + "px",
                left: element.left + "px",
                top: element.topp,
                auth_user: curr_user,
              };

              const idMatch = documnetMap?.filter(
                (elmnt) => elmnt == element?.id
              );
              // const holderDIV = getHolderDIV(measure, pageNo);
              const id = `${element.id}`;
              const finalizeButton = document.getElementById("finalize-button");
              const rejectButton = document.getElementById("reject-button");

              let buttonFieldContainer = document.createElement("button");
              buttonFieldContainer.className = "buttonInput";
              buttonFieldContainer.id = id;
              buttonFieldContainer.style.width = "100%";
              buttonFieldContainer.style.height = "100%";
              buttonFieldContainer.style.backgroundColor = "#0000";
              buttonFieldContainer.style.borderRadius = "0px";
              buttonFieldContainer.style.outline = "0px";
              buttonFieldContainer.style.overflow = "overlay";
              buttonFieldContainer.style.position = "absolute";
              buttonFieldContainer.textContent = containerElement.data;

              if (
                decoded.details.action === "template" &&
                containerElement.raw_data == "" &&
                containerElement.purpose == ""
              )
              {
                buttonFieldContainer.onclick = (e) =>
                {
                  focuseddClassMaintain(e);
                  handleClicked("button2", "container2");
                  setSidebar(true);
                };
              }

              buttonFieldContainer.onmouseover = (e) =>
              {
                if (
                  buttonFieldContainer?.parentElement?.classList.contains(
                    "holderDIV"
                  )
                )
                {
                  buttonFieldContainer?.parentElement?.classList.add(
                    "element_updated"
                  );
                }
                if (element.required)
                {
                  isAnyRequiredElementEdited = true;
                }
              };

              if (
                decoded.details.action === "document" &&
                containerElement.purpose == "custom" &&
                containerElement.raw_data !== ""
              )
              {
                buttonFieldContainer.onclick = (e) =>
                {
                  window.open(containerElement.raw_data, "_blank");
                };
              }

              if (
                decoded.details.action === "document" &&
                containerElement.purpose == "finalize"
              )
              {
                buttonFieldContainer.onclick = (e) =>
                {
                  finalizeButton?.click();
                };
              }
              if (
                decoded.details.action === "document" &&
                containerElement.purpose == "reject"
              )
              {
                buttonFieldContainer.onclick = (e) =>
                {
                  rejectButton?.click();
                };
              }

              const linkHolder = document.createElement("div");
              linkHolder.className = "link_holder";
              linkHolder.innerHTML = containerElement.raw_data;
              linkHolder.style.display = "none";

              const purposeHolder = document.createElement("div");
              purposeHolder.className = "purpose_holder";
              purposeHolder.innerHTML = containerElement.purpose;
              purposeHolder.style.display = "none";

              holderDIVContainer.append(buttonFieldContainer);
              holderDIVContainer.append(linkHolder);
              holderDIVContainer.append(purposeHolder);
            }
            if (typeOfOperationContainer !== "CONTAINER_INPUT")
              containerField.append(holderDIVContainer);
          }

          containerField.ondrop = (event) =>
          {
            const container = event.target;
            const containerRect = container.getBoundingClientRect();
            const typeOfOperationContainer =
              event.dataTransfer.getData("text/plain");
            //             const midSec = document.querySelector(".drop_zone");
            //     const midsectionRect = midSec.getBoundingClientRect();
            // const measure = {
            //       width: "200px",
            //       height: "80px",
            //       left: event.clientX - midsectionRect.left + "px",
            //       top: event.clientY - midsectionRect.top + "px",
            //       auth_user: curr_user,
            //     };
            // console.log("typeOfOperationContainer", typeOfOperationContainer);
            const measureContainer = {
              width: "200px",
              height: "80px",
              left: event.clientX - containerRect.left + "px",
              top: event.clientY - containerRect.top + "px",
              auth_user: curr_user,
            };

            const holderDIVContainer = getHolderDIV(measureContainer);
            if (typeOfOperationContainer === "DATE_INPUT")
            {
              let dateFieldContainer = document.createElement("div");
              dateFieldContainer.className = "dateInput";
              dateFieldContainer.style.width = "100%";
              dateFieldContainer.style.height = "100%";
              dateFieldContainer.style.backgroundColor = "#0000";
              dateFieldContainer.style.borderRadius = "0px";
              dateFieldContainer.style.outline = "0px";
              dateFieldContainer.style.overflow = "overlay";
              dateFieldContainer.style.position = "relative";

              dateFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  calenderField: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };
              setStartDate(new Date());
              setMethod("select");
              function dateClick()
              {
                document.getElementById("date_picker").click();
                setRightSideDateMenu(false);
              }
              dateFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("calendar2", "container2");
                setRightSideDateMenu(false);
                if (e.target.innerText != "mm/dd/yyyy")
                {
                  if (e.target.innerText.includes("/"))
                  {
                    const setDate = new Date(e.target.innerText);
                    setMethod("first");
                    setStartDate(setDate);
                  } else
                  {
                    if (e.target.innerText.includes("-"))
                    {
                      setMethod("fourth");
                    } else
                    {
                      setMethod("second");
                    }
                    const setDate = new Date(e.target.innerText);
                    setStartDate(setDate);
                  }
                }
                setSidebar(true);
                setTimeout(dateClick, 0);
              };
              dateFieldContainer.innerText = "mm/dd/yyyy";

              holderDIVContainer.append(dateFieldContainer);
            } else if (typeOfOperationContainer === "IMAGE_INPUT")
            {
              let imageFieldContainer = document.createElement("div");
              imageFieldContainer.className = "imageInput";
              imageFieldContainer.style.width = "100%";
              imageFieldContainer.style.height = "100%";
              imageFieldContainer.style.backgroundColor = "#0000";
              imageFieldContainer.style.borderRadius = "0px";
              imageFieldContainer.style.outline = "0px";
              imageFieldContainer.style.overflow = "overlay";
              imageFieldContainer.innerText = "Choose Image";
              imageFieldContainer.style.position = "relative";

              imageFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("image2");
                setSidebar(true);
              };

              const imageButtonContainer = document.createElement("div");
              imageButtonContainer.className = "addImageButton";
              imageButtonContainer.innerText = "Choose File";
              imageButtonContainer.style.display = "none";
              // imageButtonContainer.onclick = (e) => chooseFileClick(e);

              const imgBtnContainer = document.createElement("input");
              imgBtnContainer.className = "addImageButtonInput";
              imgBtnContainer.type = "file";
              imgBtnContainer.style.objectFit = "cover";
              var uploadedImage = "";

              imgBtnContainer.addEventListener("input", () =>
              {
                const reader = new FileReader();

                reader.addEventListener("load", () =>
                {
                  uploadedImage = reader.result;
                  document.querySelector(
                    ".focussed"
                  ).style.backgroundImage = `url(${uploadedImage})`;
                });
                reader.readAsDataURL(imgBtnContainer.files[0]);
              });

              // imgBtnContainer.style.width = "100%";
              imageButtonContainer.append(imgBtnContainer);
              holderDIVContainer.append(imageFieldContainer);
              holderDIVContainer.append(imageButtonContainer);
            } else if (typeOfOperationContainer === "DROPDOWN_INPUT")
            {
              let dropdownFieldContainer = document.createElement("div");
              dropdownFieldContainer.className = "dropdownInput";
              dropdownFieldContainer.style.width = "100%";
              dropdownFieldContainer.style.height = "100%";
              dropdownFieldContainer.style.backgroundColor = "#0000";
              dropdownFieldContainer.style.borderRadius = "0px";
              dropdownFieldContainer.style.outline = "0px";
              dropdownFieldContainer.style.overflow = "overlay";
              dropdownFieldContainer.style.position = "absolute";

              const selectElement = document.createElement("select");
              selectElement.className = "select-element";
              selectElement.style.width = "500";
              selectElement.style.height = "auto";
              selectElement.onclick = () =>
              {
                selectElement.parentElement.click();
              };

              dropdownFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  dropdownFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              // if (dropdownFieldContainer) {
              //   const dropdownFieldContainer = {
              //     dropdownFieldContainer: {
              //       value: event.target.value,
              //       xcoordinate: getOffset(holderDIVContainer).left,
              //       ycoordinate: getOffset(holderDIVContainer).top,
              //     },
              //   };
              // }

              dropdownFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("dropdown2");
                setRightSideDropDown(false);
                setSidebar(true);
              };

              const para = document.createElement("p");
              para.innerHTML = " Dropdown Name";
              para.className = "dropdownName";
              para.onclick = () =>
              {
                para.parentElement.click();
              };
              dropdownFieldContainer.append(para);
              dropdownFieldContainer.append(selectElement);
              holderDIVContainer.append(dropdownFieldContainer);
            } else if (typeOfOperationContainer === "TEXT_INPUT")
            {
              let inputFieldContainer = document.createElement("div");
              //  inputFieldContainer.setAttribute('draggable', true);
              inputFieldContainer.setAttribute("contenteditable", true);
              inputFieldContainer.className = "textInput";
              inputFieldContainer.innerHTML = "Enter text here";
              inputFieldContainer.style.width = "100%";
              inputFieldContainer.style.height = "100%";
              inputFieldContainer.style.resize = "none";
              inputFieldContainer.style.backgroundColor = "#0000";
              inputFieldContainer.style.borderRadius = "0px";
              inputFieldContainer.style.outline = "0px";
              inputFieldContainer.style.overflow = "overlay";
              inputFieldContainer.style.position = "relative";
              inputFieldContainer.style.cursor = "text";
              if (inputFieldContainer.innerHTML[0])
              {
                const editTextField = {
                  editTextField: {
                    value: inputFieldContainer.innerHTML,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                };
              }

              if (inputFieldContainer.value !== "")
              {
                // setPostData({
                //   ...postData,
                //   editTextField: { value: inputFieldContainer.value, xcoordinate: getOffset(holderDIVContainer).left, ycoordinate: getOffset(holderDIVContainer).top }
                // })
              }

              inputFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("align2");
                setSidebar(true);
              };
              holderDIVContainer.append(inputFieldContainer);
            } else if (typeOfOperationContainer === "SIGN_INPUT")
            {
              let signFieldContainer = document.createElement("div");
              signFieldContainer.className = "signInput";
              signFieldContainer.style.width = "100%";
              signFieldContainer.style.height = "100%";
              signFieldContainer.style.backgroundColor = "#0000";
              signFieldContainer.style.borderRadius = "0px";
              signFieldContainer.style.outline = "0px";
              signFieldContainer.style.overflow = "overlay";
              signFieldContainer.innerText = "Signature here";
              signFieldContainer.style.position = "absolute";

              signFieldContainer.onchange = (event) =>
              {
                event.preventDefault();
                setPostData({
                  ...postData,
                  signFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              signFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("signs2");
                setSidebar(true);
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

              signBtn.addEventListener("input", () =>
              {
                const reader = new FileReader();

                reader.addEventListener("load", () =>
                {
                  uploadedImage = reader.result;
                  const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                  document.querySelector(".focussed").innerHTML = signImage;
                });
                reader.readAsDataURL(signBtn.files[0]);
              });

              imageSignButton.append(signBtn);
              holderDIVContainer.append(signFieldContainer);
              holderDIVContainer.append(imageSignButton);
            } else if (typeOfOperationContainer === "IFRAME_INPUT")
            {
              let iframeFieldContainer = document.createElement("div");
              iframeFieldContainer.className = "iframeInput";
              iframeFieldContainer.style.width = "100%";
              iframeFieldContainer.style.height = "100%";
              iframeFieldContainer.style.backgroundColor = "#dedede";
              iframeFieldContainer.style.borderRadius = "0px";
              iframeFieldContainer.style.outline = "0px";
              iframeFieldContainer.style.overflow = "overlay";
              iframeFieldContainer.style.position = "absolute";
              iframeFieldContainer.innerText = "iFrame here";

              iframeFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("iframe2");
                setSidebar(true);
              };

              holderDIVContainer.append(iframeFieldContainer);
            } else if (typeOfOperationContainer === "SCALE_INPUT")
            {
              setIsLoading(true);

              let scaleFieldContainer = document.createElement("div");
              scaleFieldContainer.className = "scaleInput";
              scaleFieldContainer.style.width = "100%";
              scaleFieldContainer.style.height = "100%";
              scaleFieldContainer.style.backgroundColor = "#dedede";
              scaleFieldContainer.style.borderRadius = "0px";
              scaleFieldContainer.style.outline = "0px";
              scaleFieldContainer.style.overflow = "overlay";
              // scaleFieldContainer.innerHTML = 'iframe';
              scaleFieldContainer.style.position = "absolute";
              // scaleFieldContainer.innerText = "scale here";

              let scale = document.createElement("iframe");
              scaleFieldContainer.append(scale);
              Axios.post(
                "https://100035.pythonanywhere.com/api/nps_settings_create/",
                {
                  username: "nake",
                  orientation: "horizontal",
                  scalecolor: "#8f1e1e",
                  roundcolor: "#938585",
                  fontcolor: "#000000",
                  fomat: "numbers",
                  time: "00",
                  name: `${title}_scale`,
                  left: "good",
                  right: "best",
                  center: "neutral",
                }
              )
                .then((res) =>
                {
                  setIsLoading(false);
                  console.log(res.data, "scaleData");
                  setScaleData(res.data);
                  const success = res.data.success;
                  var successObj = JSON.parse(success);
                  const id = successObj.inserted_id;
                  console.log(res.scale_urls, "stateScale");
                  if (id.length)
                  {
                    setScaleId(id);
                  }
                  scale.src = res.data.scale_urls;
                })
                .catch((err) =>
                {
                  setIsLoading(false);
                  console.log(err);
                });

              scaleFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("scale2");
                setSidebar(true);
              };

              holderDIVContainer.append(scaleFieldContainer);
            } else if (typeOfOperationContainer === "TABLE_INPUT")
            {
              let tableFieldContainer = document.createElement("div");
              tableFieldContainer.className = "tableInput";
              tableFieldContainer.style.width = "100%";
              tableFieldContainer.style.height = "100%";
              tableFieldContainer.style.backgroundColor = "#dedede";
              tableFieldContainer.style.borderRadius = "0px";
              tableFieldContainer.style.outline = "0px";
              tableFieldContainer.style.overflow = "overlay";
              tableFieldContainer.style.position = "absolute";

              tableFieldContainer.onchange = (event) =>
              {
                event.preventDefault();

                setPostData({
                  ...postData,
                  tableFieldContainer: {
                    value: event.target.value,
                    xcoordinate: getOffset(holderDIVContainer).left,
                    ycoordinate: getOffset(holderDIVContainer).top,
                  },
                });
              };

              tableFieldContainer.onclick = (e) =>
              {
                e.stopPropagation();
                table_dropdown_focuseddClassMaintain(e);
                handleClicked("table2");
                setSidebar(true);
              };
              holderDIVContainer.append(tableFieldContainer);
            } else if (typeOfOperationContainer == "BUTTON_INPUT")
            {
              let buttonField = document.createElement("button");
              buttonField.className = "buttonInput";
              buttonField.style.width = "100%";
              buttonField.style.height = "100%";
              buttonField.style.backgroundColor = "#0000";
              buttonField.style.borderRadius = "0px";
              buttonField.style.outline = "0px";
              buttonField.style.overflow = "overlay";
              buttonField.style.position = "absolute";
              buttonField.textContent = "Button";

              buttonField.onclick = (e) =>
              {
                e.stopPropagation();
                focuseddClassMaintain(e);
                handleClicked("button2", "container2");
                setSidebar(true);
              };

              const linkHolder = document.createElement("div");
              linkHolder.className = "link_holder";
              linkHolder.style.display = "none";

              const purposeHolder = document.createElement("div");
              purposeHolder.className = "purpose_holder";
              purposeHolder.style.display = "none";

              // holderDIVContainer.append(dateFieldContainer);
              holderDIVContainer.append(buttonField);
              holderDIVContainer.append(linkHolder);
              holderDIVContainer.append(purposeHolder);
            }
            if (typeOfOperationContainer !== "CONTAINER_INPUT")
              containerField.append(holderDIVContainer);
          };

          holderDIV.append(containerField);
          document
            .getElementsByClassName("midSection_container")
          [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
      });
    }
  };

  const onParagraphPost = () =>
  {
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
    paragraphField.onclick = () =>
    {
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

  function getOffset(el)
  {
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

  function getPosition(el)
  {
    const rect = el[0].getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  }

  const chooseFileClick = () =>
  {
    const addImageButtonInput = document.getElementsByClassName(
      "addImageButtonInput"
    );
    addImageButtonInput.item(0).click();
  };

  const dragOver = (event) =>
  {
    //console.log("log from on drag", event);
    const isLink = event.dataTransfer.types.includes("text/plain");
    // console.log("isLink", isLink);
    if (isLink)
    {
      event.preventDefault();
      event.currentTarget.classList.add("drop_zone");
      if (document.querySelector(".focussedd"))
      {
        document.querySelector(".focussedd").classList.remove("focussedd");
      }
      if (document.querySelector(".focussed"))
      {
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
        button2: false,
        iframe2: false,
        scale2: false,
        container2: false,
      });
    }
  };

  const onDrop = (event) =>
  {
    event.preventDefault();
    //console.log("log from on drop", event);
    // document.querySelector('.drop_zone').classList.remove('drop_zone')
    const has_table_drag_class = event.target.classList.contains("table_drag");
    const has_container_drag_class =
      event.target.classList.contains("containerInput");
    const typeOfOperation = event.dataTransfer.getData("text/plain");
    // console.log("typeOfOperation", typeOfOperation);
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
    let pageNum = null;
    let holderDIV = null;
    if (event.target.classList.contains("midSection_container"))
    {
      pageNum = event.target.innerText.split("\n")[0];
      holderDIV = getHolderDIV(measure, pageNum);
    } else
    {
      holderDIV = getHolderDIV(measure);
    }

    // inputField.setAttribute('draggable', false);
    // let editButtonField = undefined;

    if (!has_table_drag_class && !has_container_drag_class)
    {
      if (
        typeOfOperation === "TEXT_INPUT" &&
        decoded.details.action === "template"
      )
      {
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

        const txt = document.getElementsByClassName("textInput");
        if (txt.length)
        {
          const h = txt.length;
          inputField.id = `t${h + 1}`;
        } else
        {
          inputField.id = "t1";
        }
        // inputField.innerText = `${postData.editTextField.value}`

        // inputField.oninput = (event) => {
        //   event.preventDefault();
        if (inputField.innerHTML[0])
        {
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

        if (inputField.value !== "")
        {
          // setPostData({
          //   ...postData,
          //   editTextField: { value: inputField.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
          // })
        }


        const copyInput = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              // imageField.classList.add("focussed");
              handleClicked("image2", "container2");
              // copyImage()
              // resizing = true;
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        inputField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyInput()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })

        inputField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("align2", "container2");
          setSidebar(true);
          // holderDIV.classList.add('focussedd')
          // inputField.classList.add("focussed");
          // inputField.parentElement.focus()
        };
        holderDIV.append(inputField);
      } else if (
        typeOfOperation === "IMAGE_INPUT" &&
        decoded.details.action === "template"
      )
      {
        let imageField = document.createElement("div");
        imageField.className = "imageInput";
        imageField.id = "inputImg";
        imageField.style.width = "100%";
        imageField.style.height = "100%";
        imageField.style.backgroundColor = "#0000";
        imageField.style.borderRadius = "0px";
        imageField.style.outline = "0px";
        imageField.style.overflow = "overlay";
        imageField.innerText = "Choose Image";
        // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
        imageField.style.position = "relative";

        const img = document.getElementsByClassName("imageInput");
        if (img.length)
        {
          const h = img.length;
          imageField.id = `i${h + 1}`;
        } else
        {
          imageField.id = "i1";
        }

        // if(typeOfOperation === "IMAGE_INPUT") {
        //   console.log("type of offereaction", typeOfOperation)
        const copyImage = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              // imageField.classList.add("focussed");
              handleClicked("image2", "container2");
              // copyImage()
              // resizing = true;
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        imageField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyImage()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })
        // } else {
        //   console.log("Not Image INPUT")
        // }



        // let copyMenu = document.querySelectorAll("#inputImg");
        // let cloneMenu = copyMenu.cloneNode(true);
        // cloneMenu.id = 'mobile-menu';
        // document.body.appendChild(cloneMenu);
        // console.log("clone", cloneMenu)

        // const copyImage = () => {
        //   const element = document.getElementById("inputImg");
        //   let counter = 1;
        //   const copyEle = element.cloneNode(true);
        //   copyEle.id += counter;
        //   document.body.appendChild(copyEle);
        //   console.log("coping", copyEle)
        // }

        // imageField.addEventListener("click", () => {
        //   copyImage()

        // })

        imageField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          // imageField.classList.add("focussed");
          handleClicked("image2", "container2");
          // copyImage()
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

        imgBtn.addEventListener("input", () =>
        {
          const reader = new FileReader();

          reader.addEventListener("load", () =>
          {
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
      } else if (typeOfOperation === "TEXT_FILL")
      {
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

        texttField.onchange = (event) =>
        {
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
      }

      // else if (
      //   typeOfOperation === "IMAGE_INPUT" &&
      //   decoded.details.action === "template"
      // ) {
      //   let imageField = document.createElement("div");
      //   imageField.className = "imageInput";
      //   imageField.style.width = "100%";
      //   imageField.style.height = "100%";
      //   imageField.style.backgroundColor = "#0000";
      //   imageField.style.borderRadius = "0px";
      //   imageField.style.outline = "0px";
      //   imageField.style.overflow = "overlay";
      //   // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
      //   imageField.style.position = "relative";

      //   imageField.onclick = (e) => {
      //     focuseddClassMaintain(e);
      //     // imageField.classList.add("focussed");
      //     handleClicked("image2");
      //     setSidebar(true);
      //   };

      //   const imageButton = document.createElement("div");
      //   imageButton.className = "addImageButton";
      //   imageButton.innerText = "Choose File";
      //   imageButton.style.display = "none";
      //   // imageButton.onclick = (e) => chooseFileClick(e);

      //   const imgBtn = document.createElement("input");
      //   imgBtn.className = "addImageButtonInput";
      //   imgBtn.type = "file";
      //   imgBtn.style.objectFit = "cover";
      //   var uploadedImage = "";

      //   imgBtn.addEventListener("input", () => {
      //     const reader = new FileReader();

      //     reader.addEventListener("load", () => {
      //       uploadedImage = reader.result;
      //       document.querySelector(
      //         ".focussed"
      //       ).style.backgroundImage = `url(${uploadedImage})`;
      //     });
      //     reader.readAsDataURL(imgBtn.files[0]);
      //   });

      //   // imgBtn.style.width = "100%";
      //   imageButton.append(imgBtn);
      //   holderDIV.append(imageField);
      //   holderDIV.append(imageButton);
      // } else if (typeOfOperation === "TEXT_FILL") {
      //   let texttField = document.createElement("textarea");
      //   texttField.className = "texttInput";
      //   texttField.placeholder = "input text here";
      //   texttField.style.width = "100%";
      //   texttField.style.height = "100%";
      //   texttField.style.resize = "none";
      //   texttField.style.backgroundColor = "#0000";
      //   texttField.style.borderRadius = "0px";
      //   texttField.style.outline = "0px";
      //   texttField.style.overflow = "overlay";
      //   // texttField.innerText = `${postData.textField.value}`
      //   texttField.style.position = "relative";

      //   texttField.onchange = (event) => {
      //     event.preventDefault();
      //     const textField = {
      //       textField: {
      //         value: event.target.value,
      //         xcoordinate: getOffset(holderDIV).left,
      //         ycoordinate: getOffset(holderDIV).top,
      //       },
      //     };

      //     // postData.push(textField);
      //     // setPostData({
      //     //   ...postData,
      //     //   textField: { value: event.target.value, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
      //     // })
      //   };

      //   holderDIV.append(texttField);
      // }
      //  else if (
      //   typeOfOperation === "TABLE_INPUT" &&
      //   decoded.details.action === "template"
      // ) {
      //   let tableField = document.createElement("div");
      //   tableField.className = "tableInput";
      //   tableField.style.width = "100%";
      //   tableField.style.height = "100%";
      //   tableField.style.backgroundColor = "#dedede";
      //   tableField.style.borderRadius = "0px";
      //   tableField.style.outline = "0px";
      //   tableField.style.overflow = "overlay";
      //   // tableField.innerHTML = 'table';
      //   tableField.style.position = "absolute";

      //   tableField.onchange = (event) => {
      //     event.preventDefault();

      //     setPostData({
      //       ...postData,
      //       tableField: {
      //         value: event.target.value,
      //         xcoordinate: getOffset(holderDIV).left,
      //         ycoordinate: getOffset(holderDIV).top,
      //       },
      //     });
      //   };

      //   // if (tableField) {
      //   //   const tableField = {
      //   //     tableField: {
      //   //       value: event.target.value,
      //   //       xcoordinate: getOffset(holderDIV).left,
      //   //       ycoordinate: getOffset(holderDIV).top,
      //   //     },
      //   //   };

      //   //   // postData.push(tableField);
      //   //   // setPostData({
      //   //   //   ...postData,
      //   //   //   tableField: { value: tableField.innerHTML, xcoordinate: getOffset(holderDIV).left, ycoordinate: getOffset(holderDIV).top }
      //   //   // })
      //   // }

      //   tableField.onclick = (e) => {
      //     // focuseddClassMaintain(e);
      //     table_dropdown_focuseddClassMaintain(e);
      //     // tableField.classList.add("focussed");
      //     handleClicked("table2");
      //     setSidebar(true);
      //   };

      //   // tableField.appendChild(tab)

      //   // const para = document.createElement("p");
      //   // para.innerHTML = "Table";
      //   // tableField.append(para);
      //   holderDIV.append(tableField);
      // }
      else if (
        typeOfOperation === "IFRAME_INPUT" &&
        decoded.details.action === "template"
      )
      {
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
        iframeField.innerText = "iFrame here";

        const iframes = document.getElementsByClassName("iframeInput");
        if (iframes.length)
        {
          const i = iframes.length;
          iframeField.id = `ifr${i + 1}`;
        } else
        {
          iframeField.id = "ifr1";
        }

        const copyIframes = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              // tableField.classList.add("focussed");
              handleClicked("iframe2", "container2");
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        iframeField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyIframes()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })

        iframeField.onclick = (e) =>
        {
          // focuseddClassMaintain(e);
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          // tableField.classList.add("focussed");
          handleClicked("iframe2", "container2");
          setSidebar(true);
        };

        holderDIV.append(iframeField);
      }

      //Limon
      else if (
        typeOfOperation === "SCALE_INPUT" &&
        decoded.details.action === "template"
      )
      {
        setIsLoading(true);

        let scaleField = document.createElement("div");
        scaleField.className = "scaleInput";
        scaleField.style.width = "100%";
        scaleField.style.height = "100%";
        scaleField.style.backgroundColor = "#dedede";
        scaleField.style.borderRadius = "0px";
        scaleField.style.outline = "0px";
        scaleField.style.overflow = "overlay";
        // scaleField.innerHTML = 'iframe';
        scaleField.style.position = "absolute";
        // scaleField.innerText = "scale here";

        const scales = document.getElementsByClassName("scaleInput");
        if (scales.length)
        {
          const s = scales.length;
          scaleField.id = `scl${s + 1}`;
        } else
        {
          scaleField.id = "scl1";
        }

        let scale = document.createElement("iframe");
        scale.style.width = "90%";
        scale.style.height = "90%";
        const scaleIdHolder = document.createElement("div");
        scaleIdHolder.className = "scaleId_holder";
        scaleIdHolder.style.display = "none";

        const labelHolder = document.createElement("div");
        labelHolder.className = "label_holder";
        labelHolder.style.display = "none";

        scaleField.addEventListener("resize", () =>
        {
          scale.style.width = scaleField.clientWidth + "px";
          scale.style.height = scaleField.clientHeight + "px";
        });

        scaleField.append(scale);
        Axios.post(
          "https://100035.pythonanywhere.com/api/nps_settings_create/",
          {
            username: "nake",
            orientation: "horizontal",
            scalecolor: "#8f1e1e",
            roundcolor: "#938585",
            fontcolor: "#000000",
            fomat: "numbers",
            time: "00",
            name: `${title}_scale`,
            left: "good",
            right: "best",
            center: "neutral",
          }
        )
          .then((res) =>
          {
            setIsLoading(false);
            console.log(res.data, "scaleData");
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(res.scale_urls, "stateScale");
            if (id.length)
            {
              console.log(id, "id");
              // setScaleId(id);
              scaleIdHolder.innerHTML = id;
            }
            scale.src = res.data.scale_urls;
          })
          .catch((err) =>
          {
            setIsLoading(false);
            console.log(err);
          });

        const copyScales = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              // imageField.classList.add("focussed");
              handleClicked("image2", "container2");
              // copyImage()
              // resizing = true;
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        scaleField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyScales()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })

        scaleField.onclick = (e) =>
        {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          handleClicked("scale2");
          setSidebar(true);
        };

        holderDIV.append(scaleField);
        holderDIV.append(scaleIdHolder);
        holderDIV.append(labelHolder);
      }
      // Limon
      // else if (
      //   typeOfOperation === 'SIGN_INPUT' &&
      //   decoded.details.action === 'template'
      // ) {
      //   let signField = document.createElement('div');
      //   signField.className = 'signInput';
      //   signField.style.width = '100%';
      //   signField.style.height = '100%';
      //   signField.style.backgroundColor = '#dedede';
      //   signField.style.borderRadius = '0px';
      //   signField.style.outline = '0px';
      //   signField.style.overflow = 'overlay';
      //   // signField.innerHTML = 'Place your signature here';
      //   signField.innerText = 'Place your signature here';
      //   signField.style.position = 'absolute';

      //   signField.onchange = (event) => {
      //     event.preventDefault();
      //     setPostData({
      //       ...postData,
      //       signField: {
      //         value: event.target.value,
      //         xcoordinate: getOffset(holderDIV).left,
      //         ycoordinate: getOffset(holderDIV).top,
      //       },
      //     });
      //   };

      //   signField.onclick = (e) => {
      //     focuseddClassMaintain(e);
      //     // if (actionName != 'template') {
      //     // signField.classList.add("focussed");
      //     handleClicked('signs2');
      //     setSidebar(true);
      //     // e.stopPropagation();
      //     // holderDIV.classList.add('focussedd')
      //     // }
      //     holderDIV.append(signField);
      //   };
      // }
      else if (typeOfOperation === "TEXT_FILL")
      {
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

        texttField.onchange = (event) =>
        {
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
      } else if (
        typeOfOperation === "TABLE_INPUT" &&
        decoded.details.action === "template"
      )
      {
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

        tableField.onchange = (event) =>
        {
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



        tableField.onclick = (e) =>
        {
          e.stopPropagation();
          // focuseddClassMaintain(e);
          // tableField.removeAttribute("data-bs-toggle", "modal");
          table_dropdown_focuseddClassMaintain(e);
          // tableField.classList.add("focussed");
          handleClicked("table2", "container2");
          setSidebar(true);
        };
        // tableField.ondblclick = (e) => {
        //   tableField.setAttribute("data-bs-toggle", "modal");
        //   tableField.setAttribute("data-bs-target", "#tableUpdateModal");
        //   tableField.click();
        // };

        // tableField.appendChild(tab)

        // const para = document.createElement("p");
        // para.innerHTML = "Table";
        // tableField.append(para);
        holderDIV.append(tableField);
      } else if (
        typeOfOperation === "SIGN_INPUT" &&
        decoded.details.action === "template"
      )
      {
        let signField = document.createElement("div");
        signField.className = "signInput";
        signField.style.width = "100%";
        signField.style.height = "100%";
        signField.style.backgroundColor = "#0000";
        signField.style.borderRadius = "0px";
        signField.style.outline = "0px";
        signField.style.overflow = "overlay";
        // signField.innerHTML = 'Place your signature here';
        signField.innerText = "Signature here";
        signField.style.position = "absolute";

        signField.onchange = (event) =>
        {
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

        const copySign = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("signs2", "container2");
              setSidebar(true);
              console.log("sign field clicked");
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        signField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copySign()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })

        signField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          // if (actionName = "template") {
          // signField.classList.add("focussed");
          handleClicked("signs2", "container2");
          setSidebar(true);
          console.log("sign field clicked");
          // } else {
          //   setSidebar(false);
          // }
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

        signBtn.addEventListener("input", () =>
        {
          const reader = new FileReader();

          reader.addEventListener("load", () =>
          {
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
      } else if (
        typeOfOperation === "DATE_INPUT" &&
        decoded.details.action === "template"
      )
      {
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
        // dateField.setAttribute("draggable", true);
        // dateField?.parentElement?.setAttribute("draggable", true);

        dateField.onchange = (event) =>
        {
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


        const copyDates = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("calendar2", "container2");
              setRightSideDateMenu(false);
              if (e.target.innerText != "mm/dd/yyyy")
              {
                if (e.target.innerText.includes("/"))
                {
                  const setDate = new Date(e.target.innerText);
                  setMethod("first");
                  setStartDate(setDate);
                } else
                {
                  if (e.target.innerText.includes("-"))
                  {
                    setMethod("fourth");
                  } else
                  {
                    setMethod("second");
                  }
                  const setDate = new Date(e.target.innerText);
                  setStartDate(setDate);
                }
              }
              setSidebar(true);
              setTimeout(dateClick, 0);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        dateField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyDates()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })


        function dateClick()
        {
          document.getElementById("date_picker").click();
          setRightSideDateMenu(false);
        }
        dateField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("calendar2", "container2");
          setRightSideDateMenu(false);
          if (e.target.innerText != "mm/dd/yyyy")
          {
            if (e.target.innerText.includes("/"))
            {
              const setDate = new Date(e.target.innerText);
              setMethod("first");
              setStartDate(setDate);
            } else
            {
              if (e.target.innerText.includes("-"))
              {
                setMethod("fourth");
              } else
              {
                setMethod("second");
              }
              const setDate = new Date(e.target.innerText);
              setStartDate(setDate);
            }
          }
          setSidebar(true);
          setTimeout(dateClick, 0);
        };
        // dateField.ondragstart = (e) => {
        //   console.log("dragStart fun called");
        // };
        // dateField.ondragend = (e) => {
        //   // if (dateField) {
        //   //   dateField.parentElement.ondragstart = (e) => {
        //   //     console.log("dragStart fun called parentElement");
        //   //   };
        //   // }
        //   dateField.ondragend = (e) => {
        //     console.log("ondragend fun called");
        //   };
        dateField.innerText = "mm/dd/yyyy";

        // //console.log(startDate);
        // const para = document.createElement("p");

        // dateField.append(para)
        // console.log("my date field", dateField);
        holderDIV.append(dateField);
        //console.log(para);
      } else if (
        typeOfOperation === "DROPDOWN_INPUT" &&
        decoded.details.action === "template"
      )
      {
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
        selectElement.onclick = () =>
        {
          selectElement.parentElement.click();
        };

        dropdownField.onchange = (event) =>
        {
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

        if (dropdownField)
        {
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


        const copyDropdown = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              handleClicked("dropdown2", "container2");
              setRightSideDropDown(false);
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        dropdownField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyDropdown()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })



        dropdownField.onclick = (e) =>
        {
          e.stopPropagation();
          // focuseddClassMaintain(e);
          table_dropdown_focuseddClassMaintain(e);
          // dropdownField.classList.add("focussed");
          handleClicked("dropdown2", "container2");
          setRightSideDropDown(false);
          setSidebar(true);
        };

        const para = document.createElement("p");
        para.innerHTML = " Dropdown Name";
        para.className = "dropdownName";
        para.onclick = () =>
        {
          para.parentElement.click();
        };
        dropdownField.append(para);
        dropdownField.append(selectElement);
        holderDIV.append(dropdownField);
      } else if (
        typeOfOperation === "BUTTON_INPUT" &&
        decoded.details.action === "template"
      )
      {
        let buttonField = document.createElement("button");
        buttonField.className = "buttonInput";
        buttonField.style.width = "100%";
        buttonField.style.height = "100%";
        buttonField.style.backgroundColor = "#0000";
        buttonField.style.borderRadius = "0px";
        buttonField.style.outline = "0px";
        buttonField.style.overflow = "overlay";
        buttonField.style.position = "absolute";
        buttonField.textContent = "Button";



        const copyButton = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("button2", "container2");
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        buttonField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyButton()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })

        buttonField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("button2", "container2");
          setSidebar(true);
        };

        const linkHolder = document.createElement("div");
        linkHolder.className = "link_holder";
        linkHolder.style.display = "none";

        const purposeHolder = document.createElement("div");
        purposeHolder.className = "purpose_holder";
        purposeHolder.style.display = "none";

        holderDIV.append(buttonField);
        holderDIV.append(linkHolder);
        holderDIV.append(purposeHolder);
      } else if (
        typeOfOperation === "CONTAINER_INPUT" &&
        decoded.details.action === "template"
      )
      {
        // console.log("typeOfOperation", typeOfOperation);
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


        const copyContainer = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";


          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });


            copyEle.ondrop = (event) =>
            {
              const container = event.target;
              const containerRect = container.getBoundingClientRect();
              const typeOfOperationContainer =
                event.dataTransfer.getData("text/plain");
              //             const midSec = document.querySelector(".drop_zone");
              //     const midsectionRect = midSec.getBoundingClientRect();
              // const measure = {
              //       width: "200px",
              //       height: "80px",
              //       left: event.clientX - midsectionRect.left + "px",
              //       top: event.clientY - midsectionRect.top + "px",
              //       auth_user: curr_user,
              //     };
              // console.log("typeOfOperationContainer", typeOfOperationContainer);
              const measureContainer = {
                width: "200px",
                height: "80px",
                left: event.clientX - containerRect.left + "px",
                top: event.clientY - containerRect.top + "px",
                auth_user: curr_user,
              };

              const holderDIVContainer = getHolderDIV(measureContainer);
              if (typeOfOperationContainer === "DATE_INPUT")
              {
                let dateFieldContainer = document.createElement("div");
                dateFieldContainer.className = "dateInput";
                dateFieldContainer.style.width = "100%";
                dateFieldContainer.style.height = "100%";
                dateFieldContainer.style.backgroundColor = "#0000";
                dateFieldContainer.style.borderRadius = "0px";
                dateFieldContainer.style.outline = "0px";
                dateFieldContainer.style.overflow = "overlay";
                dateFieldContainer.style.position = "relative";

                copyEle.onchange = (event) =>
                {
                  event.preventDefault();
                  setPostData({
                    ...postData,
                    calenderField: {
                      value: event.target.value,
                      xcoordinate: getOffset(holderDIVContainer).left,
                      ycoordinate: getOffset(holderDIVContainer).top,
                    },
                  });
                };
                setStartDate(new Date());
                setMethod("select");
                function dateClick()
                {
                  document.getElementById("date_picker").click();
                  setRightSideDateMenu(false);
                }
                copyEle.onclick = (e) =>
                {
                  e.stopPropagation();
                  focuseddClassMaintain(e);
                  handleClicked("calendar2", "container2");
                  setRightSideDateMenu(false);
                  if (e.target.innerText != "mm/dd/yyyy")
                  {
                    if (e.target.innerText.includes("/"))
                    {
                      const setDate = new Date(e.target.innerText);
                      setMethod("first");
                      setStartDate(setDate);
                    } else
                    {
                      if (e.target.innerText.includes("-"))
                      {
                        setMethod("fourth");
                      } else
                      {
                        setMethod("second");
                      }
                      const setDate = new Date(e.target.innerText);
                      setStartDate(setDate);
                    }
                  }
                  setSidebar(true);
                  setTimeout(dateClick, 0);
                };
                copyEle.innerText = "mm/dd/yyyy";

                holderDIVContainer.append(copyEle);
              } else if (typeOfOperationContainer === "IMAGE_INPUT")
              {
                let imageFieldContainer = document.createElement("div");
                imageFieldContainer.className = "imageInput";
                imageFieldContainer.style.width = "100%";
                imageFieldContainer.style.height = "100%";
                imageFieldContainer.style.backgroundColor = "#0000";
                imageFieldContainer.style.borderRadius = "0px";
                imageFieldContainer.style.outline = "0px";
                imageFieldContainer.style.overflow = "overlay";
                imageFieldContainer.innerText = "Choose Image";
                imageFieldContainer.style.position = "relative";

                imageFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  focuseddClassMaintain(e);
                  handleClicked("image2");
                  setSidebar(true);
                };

                const imageButtonContainer = document.createElement("div");
                imageButtonContainer.className = "addImageButton";
                imageButtonContainer.innerText = "Choose File";
                imageButtonContainer.style.display = "none";
                // imageButtonContainer.onclick = (e) => chooseFileClick(e);

                const imgBtnContainer = document.createElement("input");
                imgBtnContainer.className = "addImageButtonInput";
                imgBtnContainer.type = "file";
                imgBtnContainer.style.objectFit = "cover";
                var uploadedImage = "";

                imgBtnContainer.addEventListener("input", () =>
                {
                  const reader = new FileReader();

                  reader.addEventListener("load", () =>
                  {
                    uploadedImage = reader.result;
                    document.querySelector(
                      ".focussed"
                    ).style.backgroundImage = `url(${uploadedImage})`;
                  });
                  reader.readAsDataURL(imgBtnContainer.files[0]);
                });

                // imgBtnContainer.style.width = "100%";
                imageButtonContainer.append(imgBtnContainer);
                holderDIVContainer.append(imageFieldContainer);
                holderDIVContainer.append(imageButtonContainer);
              } else if (typeOfOperationContainer === "DROPDOWN_INPUT")
              {
                let dropdownFieldContainer = document.createElement("div");
                dropdownFieldContainer.className = "dropdownInput";
                dropdownFieldContainer.style.width = "100%";
                dropdownFieldContainer.style.height = "100%";
                dropdownFieldContainer.style.backgroundColor = "#0000";
                dropdownFieldContainer.style.borderRadius = "0px";
                dropdownFieldContainer.style.outline = "0px";
                dropdownFieldContainer.style.overflow = "overlay";
                dropdownFieldContainer.style.position = "absolute";

                const selectElement = document.createElement("select");
                selectElement.className = "select-element";
                selectElement.style.width = "500";
                selectElement.style.height = "auto";
                selectElement.onclick = () =>
                {
                  selectElement.parentElement.click();
                };

                dropdownFieldContainer.onchange = (event) =>
                {
                  event.preventDefault();
                  setPostData({
                    ...postData,
                    dropdownFieldContainer: {
                      value: event.target.value,
                      xcoordinate: getOffset(holderDIVContainer).left,
                      ycoordinate: getOffset(holderDIVContainer).top,
                    },
                  });
                };

                // if (dropdownFieldContainer) {
                //   const dropdownFieldContainer = {
                //     dropdownFieldContainer: {
                //       value: event.target.value,
                //       xcoordinate: getOffset(holderDIVContainer).left,
                //       ycoordinate: getOffset(holderDIVContainer).top,
                //     },
                //   };
                // }

                dropdownFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  table_dropdown_focuseddClassMaintain(e);
                  handleClicked("dropdown2");
                  setRightSideDropDown(false);
                  setSidebar(true);
                };

                const para = document.createElement("p");
                para.innerHTML = " Dropdown Name";
                para.className = "dropdownName";
                para.onclick = () =>
                {
                  para.parentElement.click();
                };
                dropdownFieldContainer.append(para);
                dropdownFieldContainer.append(selectElement);
                holderDIVContainer.append(dropdownFieldContainer);
              } else if (typeOfOperationContainer === "TEXT_INPUT")
              {
                let inputFieldContainer = document.createElement("div");
                //  inputFieldContainer.setAttribute('draggable', true);
                inputFieldContainer.setAttribute("contenteditable", true);
                inputFieldContainer.className = "textInput";
                inputFieldContainer.innerHTML = "Enter text here";
                inputFieldContainer.style.width = "100%";
                inputFieldContainer.style.height = "100%";
                inputFieldContainer.style.resize = "none";
                inputFieldContainer.style.backgroundColor = "#0000";
                inputFieldContainer.style.borderRadius = "0px";
                inputFieldContainer.style.outline = "0px";
                inputFieldContainer.style.overflow = "overlay";
                inputFieldContainer.style.position = "relative";
                inputFieldContainer.style.cursor = "text";
                if (inputFieldContainer.innerHTML[0])
                {
                  const editTextField = {
                    editTextField: {
                      value: inputFieldContainer.innerHTML,
                      xcoordinate: getOffset(holderDIVContainer).left,
                      ycoordinate: getOffset(holderDIVContainer).top,
                    },
                  };
                }

                if (inputFieldContainer.value !== "")
                {
                  // setPostData({
                  //   ...postData,
                  //   editTextField: { value: inputFieldContainer.value, xcoordinate: getOffset(holderDIVContainer).left, ycoordinate: getOffset(holderDIVContainer).top }
                  // })
                }

                inputFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  focuseddClassMaintain(e);
                  handleClicked("align2");
                  setSidebar(true);
                };
                holderDIVContainer.append(inputFieldContainer);
              } else if (typeOfOperationContainer === "SIGN_INPUT")
              {
                let signFieldContainer = document.createElement("div");
                signFieldContainer.className = "signInput";
                signFieldContainer.style.width = "100%";
                signFieldContainer.style.height = "100%";
                signFieldContainer.style.backgroundColor = "#0000";
                signFieldContainer.style.borderRadius = "0px";
                signFieldContainer.style.outline = "0px";
                signFieldContainer.style.overflow = "overlay";
                signFieldContainer.innerText = "Signature here";
                signFieldContainer.style.position = "absolute";

                signFieldContainer.onchange = (event) =>
                {
                  event.preventDefault();
                  setPostData({
                    ...postData,
                    signFieldContainer: {
                      value: event.target.value,
                      xcoordinate: getOffset(holderDIVContainer).left,
                      ycoordinate: getOffset(holderDIVContainer).top,
                    },
                  });
                };

                signFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  focuseddClassMaintain(e);
                  handleClicked("signs2");
                  setSidebar(true);
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

                signBtn.addEventListener("input", () =>
                {
                  const reader = new FileReader();

                  reader.addEventListener("load", () =>
                  {
                    uploadedImage = reader.result;
                    const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                    document.querySelector(".focussed").innerHTML = signImage;
                  });
                  reader.readAsDataURL(signBtn.files[0]);
                });

                imageSignButton.append(signBtn);
                holderDIVContainer.append(signFieldContainer);
                holderDIVContainer.append(imageSignButton);
              } else if (typeOfOperationContainer === "IFRAME_INPUT")
              {
                let iframeFieldContainer = document.createElement("div");
                iframeFieldContainer.className = "iframeInput";
                iframeFieldContainer.style.width = "100%";
                iframeFieldContainer.style.height = "100%";
                iframeFieldContainer.style.backgroundColor = "#dedede";
                iframeFieldContainer.style.borderRadius = "0px";
                iframeFieldContainer.style.outline = "0px";
                iframeFieldContainer.style.overflow = "overlay";
                iframeFieldContainer.style.position = "absolute";
                iframeFieldContainer.innerText = "iFrame here";

                iframeFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  table_dropdown_focuseddClassMaintain(e);
                  handleClicked("iframe2");
                  setSidebar(true);
                };

                holderDIVContainer.append(iframeFieldContainer);
              } else if (typeOfOperationContainer === "SCALE_INPUT")
              {
                setIsLoading(true);

                let scaleFieldContainer = document.createElement("div");
                scaleFieldContainer.className = "scaleInput";
                scaleFieldContainer.style.width = "100%";
                scaleFieldContainer.style.height = "100%";
                scaleFieldContainer.style.backgroundColor = "#dedede";
                scaleFieldContainer.style.borderRadius = "0px";
                scaleFieldContainer.style.outline = "0px";
                scaleFieldContainer.style.overflow = "overlay";
                // scaleFieldContainer.innerHTML = 'iframe';
                scaleFieldContainer.style.position = "absolute";
                // scaleFieldContainer.innerText = "scale here";

                let scale = document.createElement("iframe");
                scaleFieldContainer.append(scale);
                Axios.post(
                  "https://100035.pythonanywhere.com/api/nps_settings_create/",
                  {
                    username: "nake",
                    orientation: "horizontal",
                    scalecolor: "#8f1e1e",
                    roundcolor: "#938585",
                    fontcolor: "#000000",
                    fomat: "numbers",
                    time: "00",
                    name: `${title}_scale`,
                    left: "good",
                    right: "best",
                    center: "neutral",
                  }
                )
                  .then((res) =>
                  {
                    setIsLoading(false);
                    console.log(res.data, "scaleData");
                    setScaleData(res.data);
                    const success = res.data.success;
                    var successObj = JSON.parse(success);
                    const id = successObj.inserted_id;
                    console.log(res.scale_urls, "stateScale");
                    if (id.length)
                    {
                      console.log(id, "id");
                      setScaleId(id);
                    }
                    scale.src = res.data.scale_urls;
                  })
                  .catch((err) =>
                  {
                    setIsLoading(false);
                    console.log(err);
                  });

                scaleFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  focuseddClassMaintain(e);
                  handleClicked("scale2");
                  setSidebar(true);
                };

                holderDIVContainer.append(scaleFieldContainer);
              } else if (typeOfOperationContainer === "TABLE_INPUT")
              {
                let tableFieldContainer = document.createElement("div");
                tableFieldContainer.className = "tableInput";
                tableFieldContainer.style.width = "100%";
                tableFieldContainer.style.height = "100%";
                tableFieldContainer.style.backgroundColor = "#dedede";
                tableFieldContainer.style.borderRadius = "0px";
                tableFieldContainer.style.outline = "0px";
                tableFieldContainer.style.overflow = "overlay";
                tableFieldContainer.style.position = "absolute";

                tableFieldContainer.onchange = (event) =>
                {
                  event.preventDefault();

                  setPostData({
                    ...postData,
                    tableFieldContainer: {
                      value: event.target.value,
                      xcoordinate: getOffset(holderDIVContainer).left,
                      ycoordinate: getOffset(holderDIVContainer).top,
                    },
                  });
                };

                tableFieldContainer.onclick = (e) =>
                {
                  e.stopPropagation();
                  table_dropdown_focuseddClassMaintain(e);
                  handleClicked("table2");
                  setSidebar(true);
                };
                holderDIVContainer.append(tableFieldContainer);
              }
              if (typeOfOperationContainer !== "CONTAINER_INPUT")
                containerField.append(holderDIVContainer);
            };



            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("container2");
              setSidebar(true);
              console.log("container field clicked");
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        containerField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyContainer()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })



        containerField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("container2");
          setSidebar(true);
          console.log("container field clicked");
        };
        containerField.ondragover = (e) =>
        {
          console.log("console from container dragover", e.target);
        };
        containerField.ondrop = (event) =>
        {
          const container = event.target;
          const containerRect = container.getBoundingClientRect();
          const typeOfOperationContainer =
            event.dataTransfer.getData("text/plain");
          //             const midSec = document.querySelector(".drop_zone");
          //     const midsectionRect = midSec.getBoundingClientRect();
          // const measure = {
          //       width: "200px",
          //       height: "80px",
          //       left: event.clientX - midsectionRect.left + "px",
          //       top: event.clientY - midsectionRect.top + "px",
          //       auth_user: curr_user,
          //     };
          // console.log("typeOfOperationContainer", typeOfOperationContainer);
          const measureContainer = {
            width: "200px",
            height: "80px",
            left: event.clientX - containerRect.left + "px",
            top: event.clientY - containerRect.top + "px",
            auth_user: curr_user,
          };

          const holderDIVContainer = getHolderDIV(measureContainer);
          if (typeOfOperationContainer === "DATE_INPUT")
          {
            let dateFieldContainer = document.createElement("div");
            dateFieldContainer.className = "dateInput";
            dateFieldContainer.style.width = "100%";
            dateFieldContainer.style.height = "100%";
            dateFieldContainer.style.backgroundColor = "#0000";
            dateFieldContainer.style.borderRadius = "0px";
            dateFieldContainer.style.outline = "0px";
            dateFieldContainer.style.overflow = "overlay";
            dateFieldContainer.style.position = "relative";

            dateFieldContainer.onchange = (event) =>
            {
              event.preventDefault();
              setPostData({
                ...postData,
                calenderField: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };
            setStartDate(new Date());
            setMethod("select");
            function dateClick()
            {
              document.getElementById("date_picker").click();
              setRightSideDateMenu(false);
            }
            dateFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("calendar2", "container2");
              setRightSideDateMenu(false);
              if (e.target.innerText != "mm/dd/yyyy")
              {
                if (e.target.innerText.includes("/"))
                {
                  const setDate = new Date(e.target.innerText);
                  setMethod("first");
                  setStartDate(setDate);
                } else
                {
                  if (e.target.innerText.includes("-"))
                  {
                    setMethod("fourth");
                  } else
                  {
                    setMethod("second");
                  }
                  const setDate = new Date(e.target.innerText);
                  setStartDate(setDate);
                }
              }
              setSidebar(true);
              setTimeout(dateClick, 0);
            };
            dateFieldContainer.innerText = "mm/dd/yyyy";

            holderDIVContainer.append(dateFieldContainer);
          } else if (typeOfOperationContainer === "IMAGE_INPUT")
          {
            let imageFieldContainer = document.createElement("div");
            imageFieldContainer.className = "imageInput";
            imageFieldContainer.style.width = "100%";
            imageFieldContainer.style.height = "100%";
            imageFieldContainer.style.backgroundColor = "#0000";
            imageFieldContainer.style.borderRadius = "0px";
            imageFieldContainer.style.outline = "0px";
            imageFieldContainer.style.overflow = "overlay";
            imageFieldContainer.innerText = "Choose Image";
            imageFieldContainer.style.position = "relative";

            imageFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("image2");
              setSidebar(true);
            };

            const imageButtonContainer = document.createElement("div");
            imageButtonContainer.className = "addImageButton";
            imageButtonContainer.innerText = "Choose File";
            imageButtonContainer.style.display = "none";
            // imageButtonContainer.onclick = (e) => chooseFileClick(e);

            const imgBtnContainer = document.createElement("input");
            imgBtnContainer.className = "addImageButtonInput";
            imgBtnContainer.type = "file";
            imgBtnContainer.style.objectFit = "cover";
            var uploadedImage = "";

            imgBtnContainer.addEventListener("input", () =>
            {
              const reader = new FileReader();

              reader.addEventListener("load", () =>
              {
                uploadedImage = reader.result;
                document.querySelector(
                  ".focussed"
                ).style.backgroundImage = `url(${uploadedImage})`;
              });
              reader.readAsDataURL(imgBtnContainer.files[0]);
            });

            // imgBtnContainer.style.width = "100%";
            imageButtonContainer.append(imgBtnContainer);
            holderDIVContainer.append(imageFieldContainer);
            holderDIVContainer.append(imageButtonContainer);
          } else if (typeOfOperationContainer === "DROPDOWN_INPUT")
          {
            let dropdownFieldContainer = document.createElement("div");
            dropdownFieldContainer.className = "dropdownInput";
            dropdownFieldContainer.style.width = "100%";
            dropdownFieldContainer.style.height = "100%";
            dropdownFieldContainer.style.backgroundColor = "#0000";
            dropdownFieldContainer.style.borderRadius = "0px";
            dropdownFieldContainer.style.outline = "0px";
            dropdownFieldContainer.style.overflow = "overlay";
            dropdownFieldContainer.style.position = "absolute";

            const selectElement = document.createElement("select");
            selectElement.className = "select-element";
            selectElement.style.width = "500";
            selectElement.style.height = "auto";
            selectElement.onclick = () =>
            {
              selectElement.parentElement.click();
            };

            dropdownFieldContainer.onchange = (event) =>
            {
              event.preventDefault();
              setPostData({
                ...postData,
                dropdownFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            // if (dropdownFieldContainer) {
            //   const dropdownFieldContainer = {
            //     dropdownFieldContainer: {
            //       value: event.target.value,
            //       xcoordinate: getOffset(holderDIVContainer).left,
            //       ycoordinate: getOffset(holderDIVContainer).top,
            //     },
            //   };
            // }

            dropdownFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              handleClicked("dropdown2");
              setRightSideDropDown(false);
              setSidebar(true);
            };

            const para = document.createElement("p");
            para.innerHTML = " Dropdown Name";
            para.className = "dropdownName";
            para.onclick = () =>
            {
              para.parentElement.click();
            };
            dropdownFieldContainer.append(para);
            dropdownFieldContainer.append(selectElement);
            holderDIVContainer.append(dropdownFieldContainer);
          } else if (typeOfOperationContainer === "TEXT_INPUT")
          {
            let inputFieldContainer = document.createElement("div");
            //  inputFieldContainer.setAttribute('draggable', true);
            inputFieldContainer.setAttribute("contenteditable", true);
            inputFieldContainer.className = "textInput";
            inputFieldContainer.innerHTML = "Enter text here";
            inputFieldContainer.style.width = "100%";
            inputFieldContainer.style.height = "100%";
            inputFieldContainer.style.resize = "none";
            inputFieldContainer.style.backgroundColor = "#0000";
            inputFieldContainer.style.borderRadius = "0px";
            inputFieldContainer.style.outline = "0px";
            inputFieldContainer.style.overflow = "overlay";
            inputFieldContainer.style.position = "relative";
            inputFieldContainer.style.cursor = "text";
            if (inputFieldContainer.innerHTML[0])
            {
              const editTextField = {
                editTextField: {
                  value: inputFieldContainer.innerHTML,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              };
            }

            if (inputFieldContainer.value !== "")
            {
              // setPostData({
              //   ...postData,
              //   editTextField: { value: inputFieldContainer.value, xcoordinate: getOffset(holderDIVContainer).left, ycoordinate: getOffset(holderDIVContainer).top }
              // })
            }

            inputFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("align2");
              setSidebar(true);
            };
            holderDIVContainer.append(inputFieldContainer);
          } else if (typeOfOperationContainer === "SIGN_INPUT")
          {
            let signFieldContainer = document.createElement("div");
            signFieldContainer.className = "signInput";
            signFieldContainer.style.width = "100%";
            signFieldContainer.style.height = "100%";
            signFieldContainer.style.backgroundColor = "#0000";
            signFieldContainer.style.borderRadius = "0px";
            signFieldContainer.style.outline = "0px";
            signFieldContainer.style.overflow = "overlay";
            signFieldContainer.innerText = "Signature here";
            signFieldContainer.style.position = "absolute";

            signFieldContainer.onchange = (event) =>
            {
              event.preventDefault();
              setPostData({
                ...postData,
                signFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            signFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("signs2");
              setSidebar(true);
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

            signBtn.addEventListener("input", () =>
            {
              const reader = new FileReader();

              reader.addEventListener("load", () =>
              {
                uploadedImage = reader.result;
                const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                document.querySelector(".focussed").innerHTML = signImage;
              });
              reader.readAsDataURL(signBtn.files[0]);
            });

            imageSignButton.append(signBtn);
            holderDIVContainer.append(signFieldContainer);
            holderDIVContainer.append(imageSignButton);
          } else if (typeOfOperationContainer === "IFRAME_INPUT")
          {
            let iframeFieldContainer = document.createElement("div");
            iframeFieldContainer.className = "iframeInput";
            iframeFieldContainer.style.width = "100%";
            iframeFieldContainer.style.height = "100%";
            iframeFieldContainer.style.backgroundColor = "#dedede";
            iframeFieldContainer.style.borderRadius = "0px";
            iframeFieldContainer.style.outline = "0px";
            iframeFieldContainer.style.overflow = "overlay";
            iframeFieldContainer.style.position = "absolute";
            iframeFieldContainer.innerText = "iFrame here";

            iframeFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              handleClicked("iframe2");
              setSidebar(true);
            };

            holderDIVContainer.append(iframeFieldContainer);
          } else if (typeOfOperationContainer === "SCALE_INPUT")
          {
            setIsLoading(true);

            let scaleFieldContainer = document.createElement("div");
            scaleFieldContainer.className = "scaleInput";
            scaleFieldContainer.style.width = "100%";
            scaleFieldContainer.style.height = "100%";
            scaleFieldContainer.style.backgroundColor = "#dedede";
            scaleFieldContainer.style.borderRadius = "0px";
            scaleFieldContainer.style.outline = "0px";
            scaleFieldContainer.style.overflow = "overlay";
            // scaleFieldContainer.innerHTML = 'iframe';
            scaleFieldContainer.style.position = "absolute";
            // scaleFieldContainer.innerText = "scale here";

            let scale = document.createElement("iframe");
            scaleFieldContainer.append(scale);
            Axios.post(
              "https://100035.pythonanywhere.com/api/nps_settings_create/",
              {
                username: "nake",
                orientation: "horizontal",
                scalecolor: "#8f1e1e",
                roundcolor: "#938585",
                fontcolor: "#000000",
                fomat: "numbers",
                time: "00",
                name: `${title}_scale`,
                left: "good",
                right: "best",
                center: "neutral",
              }
            )
              .then((res) =>
              {
                setIsLoading(false);
                console.log(res.data, "scaleData");
                setScaleData(res.data);
                const success = res.data.success;
                var successObj = JSON.parse(success);
                const id = successObj.inserted_id;
                console.log(res.scale_urls, "stateScale");
                if (id.length)
                {
                  console.log(id, "id");
                  setScaleId(id);
                }
                scale.src = res.data.scale_urls;
              })
              .catch((err) =>
              {
                setIsLoading(false);
                console.log(err);
              });

            scaleFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("scale2");
              setSidebar(true);
            };

            holderDIVContainer.append(scaleFieldContainer);
          } else if (typeOfOperationContainer === "TABLE_INPUT")
          {
            let tableFieldContainer = document.createElement("div");
            tableFieldContainer.className = "tableInput";
            tableFieldContainer.style.width = "100%";
            tableFieldContainer.style.height = "100%";
            tableFieldContainer.style.backgroundColor = "#dedede";
            tableFieldContainer.style.borderRadius = "0px";
            tableFieldContainer.style.outline = "0px";
            tableFieldContainer.style.overflow = "overlay";
            tableFieldContainer.style.position = "absolute";

            tableFieldContainer.onchange = (event) =>
            {
              event.preventDefault();

              setPostData({
                ...postData,
                tableFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            tableFieldContainer.onclick = (e) =>
            {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              handleClicked("table2");
              setSidebar(true);
            };
            holderDIVContainer.append(tableFieldContainer);
          } else if (typeOfOperationContainer == "BUTTON_INPUT")
          {
            let buttonField = document.createElement("button");
            buttonField.className = "buttonInput";
            buttonField.style.width = "100%";
            buttonField.style.height = "100%";
            buttonField.style.backgroundColor = "#0000";
            buttonField.style.borderRadius = "0px";
            buttonField.style.outline = "0px";
            buttonField.style.overflow = "overlay";
            buttonField.style.position = "absolute";
            buttonField.textContent = "Button";

            buttonField.onclick = (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("button2", "container2");
              setSidebar(true);
            };

            const linkHolder = document.createElement("div");
            linkHolder.className = "link_holder";
            linkHolder.style.display = "none";

            const purposeHolder = document.createElement("div");
            purposeHolder.className = "purpose_holder";
            purposeHolder.style.display = "none";

            // holderDIVContainer.append(dateFieldContainer);
            holderDIVContainer.append(buttonField);
            holderDIVContainer.append(linkHolder);
            holderDIVContainer.append(purposeHolder);
          }
          if (typeOfOperationContainer !== "CONTAINER_INPUT")
            containerField.append(holderDIVContainer);
        };
        holderDIV.append(containerField);
      } else if (
        typeOfOperation === "FORM" &&
        decoded.details.action === "template"
      )
      {
        let buttonField = document.createElement("button");
        console.log("button field")
        buttonField.className = "emailButton";
        buttonField.style.width = "100%";
        buttonField.style.height = "100%";
        // buttonField.style.backgroundColor = "#0000";
        buttonField.style.borderRadius = "0px";
        buttonField.style.outline = "0px";
        buttonField.style.overflow = "overlay";
        buttonField.style.position = "absolute";
        buttonField.type = "submit";
        buttonField.textContent = "Send";
        buttonField.style.backgroundColor = "#007bff";
        buttonField.style.color = "#fff";
        // buttonField.style.border = "none";
        buttonField.style.padding = "10px 20px";
        buttonField.style.margin = "0 auto";
        buttonField.style.border = "1px solid #0000";


        const copyForm = () =>
        {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";





          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd")
          copyEle.firstChild.classList.remove("focussed")
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop)
          copyEle.onfocus = () =>
          {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          }
          copyEle.onblur = () =>
          {
            copyEle.style.border = "1px dotted black";
          }
          if (copyEle)
          {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";


            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) =>
              {
                dragElementOverPage(event);
              },
              false
            );


            const resizerTL = getResizer("top", "left");
            const resizerTR = getResizer("top", "right");
            const resizerBL = getResizer("bottom", "left");
            const resizerBR = getResizer("bottom", "right");
            // parseInt(holder.style.top.slice(0, -2))




            copyEle.addEventListener("focus", function (e)
            {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });





            copyEle.addEventListener("click", (e) =>
            {
              e.stopPropagation();
              focuseddClassMaintain(e);
              handleClicked("email2", "container2");
              setSidebar(true);
            })
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle)
          // }
        }


        buttonField.addEventListener("click", (event) =>
        {
          // console.log("clicked it")
          // copyImage()
          // setSidebar(true)
          if (event.ctrlKey)
          {
            console.log("clicked it")
            copyForm()
            // setSidebar(true)
          }
          else
          {
            console.log("Faild to copy")
          }
        })












        // create submit button
        // const submitButton = document.createElement("button");
        // submitButton.type = "submit";
        // submitButton.textContent = "Send";
        // submitButton.style.backgroundColor = "#007bff";
        // submitButton.style.color = "#fff";
        // submitButton.style.border = "none";
        // submitButton.style.padding = "10px 20px";

        // add onClick event listener
        // submitButton.addEventListener("click", (e) => {
        //   // prevent default form submission
        //   e.preventDefault();
        //   const formData = {
        //     topic: "EditorMailComponent",
        //     toName: nameInput.value,
        //     fromName: nameInput1.value,
        //     toEmail: emailInput.value,
        //     fromeEmail: emailInput1.value,
        //     subject: subjectInput.value,
        //     email_body: messageInput.value,
        //   };
        //   // Handle validations
        //   Axios.post(
        //     "https://100085.pythonanywhere.com/api/editor-component/",
        //     formData
        //   ).then((response) => {
        //     console.log(response);
        //   });
        //   // alert("Mail sent!");
        //   console.log(formData); // log form data to console
        // });

        // add form to the form container

        // add form container to the document
        document.body.appendChild(buttonField);

        buttonField.onclick = (e) =>
        {
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("email2", "container2");
          setSidebar(true);
        }

        const linkHolder = document.createElement("div");
        linkHolder.className = "link_holder";
        linkHolder.style.display = "none";

        const purposeHolder = document.createElement("div");
        purposeHolder.className = "purpose_holder";
        purposeHolder.style.display = "none";

        holderDIV.append(buttonField);
        holderDIV.append(linkHolder);
        holderDIV.append(purposeHolder);
      }
      if (decoded.details.action === "template")
      {
        document.querySelector(".drop_zone").append(holderDIV);
      }
    }
  };

  // const measure = {
  //   width: "200px",
  //   height: "80px",
  //   left: event.clientX - midsectionRect.left + "px",
  //   top: event.clientY - midsectionRect.top + "px",
  //   auth_user: curr_user,
  // };

  // const holderDIV = getHolderDIV(measure);

  // const copyImage = () => {
  //   const element = document.querySelector(".imageInput");
  //   let counter = 1;
  //   const copyEle = element.cloneNode(true);
  //   copyEle.id += counter;
  //   holderDIV.appendChild(copyEle);
  //   console.log("coping", copyEle)
  // }

  // document.addEventListener("click", () => {
  //   console.log("clicked it")
  //   copyImage()
  //   setSidebar(true)

  // })
  contentFile = [];
  let page = [];

  let elem = {};
  // function saveDocument() {
  //   const txt = document.getElementsByClassName("textInput");
  //   if (txt.length) {
  //     if (txt[0].parentElement.classList.contains("holderDIV")) {
  //       elem = {
  //         width: getPosition(txt).right,
  //         height: getPosition(txt).bottom,
  //         top: getPosition(txt).top,
  //         left: getPosition(txt).left,
  //         type: "TEXT_INPUT",
  //         data: txt[0].innerHTML,
  //       };
  //       page.push(elem);
  //     }
  //   }

  //   const img_input = document.getElementsByTagName("input");
  //   if (img_input.length) {
  //     //console.log("Image_input", img_input[0]);
  //     if (img_input[0].type === "file") {
  //       elem = {
  //         width: getPosition(img_input).right,
  //         height: getPosition(img_input).bottom,
  //         top: getPosition(img_input).top,
  //         left: getPosition(img_input).left,
  //         type: "IMAGE_INPUT",
  //         data: img_input[0].value,
  //       };
  //       page.push(elem);
  //     }
  //   }

  //   const text2 = document.getElementsByClassName("texttInput");

  //   if (text2.length) {
  //     if (text2[0].parentElement.classList.contains("holderDIV")) {
  //       elem = {
  //         width: getPosition(text2).right,
  //         height: getPosition(text2).bottom,
  //         top: getPosition(text2).top,
  //         left: getPosition(text2).left,
  //         type: "TEXT_FILL",
  //         data: text2[0].value,
  //       };
  //       page.push(elem);
  //     }
  //   }

  //   const date = document.getElementsByClassName("dateInput");
  //   if (date.length) {
  //     elem = {
  //       width: getPosition(date).right,
  //       height: getPosition(date).bottom,
  //       top: getPosition(date).top,
  //       left: getPosition(date).left,
  //       type: "DATE_INPUT",
  //       data: date[0].innerHTML,
  //     };
  //     page.push(elem);
  //   }
  //   const tablee = document.getElementsByTagName("TABLE");
  //   if (tablee.length < 1) {
  //     const img = document.getElementsByTagName("img");
  //     if (img.length) {
  //       const canvas = document.createElement("canvas");
  //       canvas.setAttribute("width", document.style.width);
  //       canvas.setAttribute("height", document.style.height);
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(
  //         img[0],
  //         0,
  //         0,
  //         parseInt(document.style.width.slice(0, -2)),
  //         parseInt(document.style.height.slice(0, -2))
  //       );
  //       elem = {
  //         width: getPosition(tablee).style.width,
  //         height: getPosition(tablee).style.height,
  //         top: getPosition(tablee).style.top,
  //         left: getPosition(tablee).style.left,
  //         type: "IMG_INPUT",
  //         data: canvas.toDataURL(),
  //       };
  //       page.push(elem);
  //     }
  //   }

  //   contentFile.push(page);
  //   //console.log("ContentFile While saveDoc", contentFile);

  //   return contentFile;
  // }

  return (
    <>
      {item?.map((currentItem, index) =>
      {
        return (
          // <div key={index} className={`midSection ${actionName == 'document' && 'disable_pointer_event'}`}>
          // <div key={index} className={`midSection disable_pointer_event`}>
          <Print>
            <div
              ref={ref}
              key={index}
              className={`midSection print_midsection_${index}`}
            >
              <Container
                as="div"
                ref={midSectionRef}
                className={
                  // !sidebar
                  //   ? "midSection_without_RightMenu_container"
                  "midSection_container print_container"
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
          </Print>
        );
      })}
      {/* <!-- Modal --> */}
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
});

export default MidSection;
