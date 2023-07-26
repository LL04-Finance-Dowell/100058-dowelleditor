import React, { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSearchParams } from "react-router-dom";

const StateContext = createContext();

const initialState = {
  align: true,
  textfill: true,
  image: false,
  table: false,
  signs: false,
  calendar: false,
  dropdown: false,
  container: false,
  iframe: false,
  scale: false,
  button: false,
  email: false,
  newScale: false,
  camera: false
};
const initialState2 = {
  align2: false,
  textfill2: false,
  image2: false,
  table2: false,
  signs2: false,
  calendar2: false,
  dropdown2: false,
  iframe2: false,
  scale2: false,
  container2: false,
  button2: false,
  email2: false,
  newScale2: false,
  camera2: false
};

export const ContextProvider = ({ children }) => {
  const [fetchedData, setFetchedData] = useState({});
  const [isClicked, setIsClicked] = useState(initialState2);

  const [isDataSaved, setIsDataSaved] = useState(false)

  const [isDropped, setIsDropped] = useState(initialState);

  const [isResizing, setIsResizing] = useState(false);

  // Fetched Data
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(["Untitled-file"]);
  const [isDataRetrieved, setIsDataRetrieved] = useState(false);

  //nps scale custom data
  const [customId, setCustomId] = useState([]);

  //Right Sidebar context
  const [signState, setSignState] = React.useState({ trimmedDataURL: null }); // Signature

  const [startDate, setStartDate] = useState(new Date()); // Calendar

  const [dropdownName, setDropdownName] = useState("Dropdown Name");
  const [dropdownLabel, setDropdownLabel] = useState("Dropdown Label");
  const [dropdownItems, setDropdownItems] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState(["Enter List Items"]);

  const [buttonLink, setButtonLink] = useState("");
  const [buttonPurpose, setButtonPurpose] = useState("");

  const [fontPlus, setFontPlus] = useState(false);
  const [fontMinus, setFontMinus] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);
  const [iframek, setIframek] = useState(0);

  const handleDrop = (dropped) => {
    setIsDropped({ ...isDropped, [dropped]: true });
  };

  const handleClicked = (clicked, tableRighMenu) => {
    setIsClicked({ ...initialState2, [clicked]: true, [tableRighMenu]: false });
  };
  // console.log("");
  console.log("isClicked", isClicked, "initialState2", initialState2);
  const [newToken, setNewToken] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipClicked, setIsFlipClicked] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [rightSideDatemenu, setRightSideDateMenu] = useState(false);
  const [rightSideDropDown, setRightSideDropDown] = useState(false);
  // handling date format
  const [method, setMethod] = useState("first");
  // handling page delete
  const [deletePages, setDeletepages] = useState([]);
  // const showSidebar = () => setSidebar(!sidebar);
  const [isFinializeDisabled, setIsFinializeDisabled] = useState(true);
  //handling new pages

  const [item, setItem] = useState(["div_1"]);

  //   //console.log("item check", item);

  // Scale id
  const [scaleId, setScaleId] = useState("id");
  const [scaleData, setScaleData] = useState([]);
  const [custom1, setCustom1] = useState("");
  const [custom2, setCustom2] = useState("");
  const [custom3, setCustom3] = useState("");
  //Handling the refreshing for scale
  const [iframeKey, setIframeKey] = useState(0);

  // borderColors and sizes
  const [borderSize, setBorderSize] = useState(2);
  const [borderColor, setBorderColor] = useState("gray");
  const [inputBorderSize, setInputBorderSize] = useState(2);
  const [inputBorderColor, setInputBorderColor] = useState("gray");
  const [calendarBorderSize, setCalendarBorderSize] = useState(2);
  const [calendarBorderColor, setCalendarBorderColor] = useState("gray");
  const [dropdownBorderSize, setDropdownBorderSize] = useState(2);
  const [dropdownBorderColor, setDropdownBorderColor] = useState("gray");
  const [buttonBorderSize, setButtonBorderSize] = useState(2);
  const [buttonBorderColor, setButtonBorderColor] = useState("gray");
  const [signBorderSize, setSignBorderSize] = useState(2);
  const [signBorderColor, setSignBorderColor] = useState("gray");
  const [tableBorderSize, setTableBorderSize] = useState(2);
  const [tableBorderColor, setTableBorderColor] = useState("gray");
  const [iframeBorderSize, setIframeBorderSize] = useState(2);
  const [iframeBorderColor, setIframeBorderColor] = useState("gray");
  const [scaleBorderSize, setScaleBorderSize] = useState(2);
  const [scaleBorderColor, setScaleBorderColor] = useState("gray");
  const [containerBorderSize, setContainerBorderSize] = useState(2);
  const [containerBorderColor, setContainerBorderColor] = useState("gray");
  const [formBorderSize, setFormBorderSize] = useState(2);
  const [formBorderColor, setFormBorderColor] = useState("gray");

  //Company id
  const [companyId, setCompanyId] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  // handle drop event for table and retrieve midsection


  const [questionAndAnswerGroupedData,
    setQuestionAndAnsGroupedData] = useState([])


  const [confirmRemove, setConfirmRemove] = useState(false)
  const [confirmation, setConfirmation] = useState('')

  const handleDropp = (e) => {
    e.preventDefault();
    if (
      e.target.childNodes.length < 2 &&
      !e.target.classList.contains("imageInput")
    ) {
      e.target.style.border = "1px solid black";
    }
    if (e.target.classList.contains("imageInput")) {
      e.target.style.border = "none";
    }
    const typeOfOperation = e.dataTransfer.getData("text/plain");
    console.log("cell has been dropped on " + typeOfOperation);
    // console.log("e.target", e.target, e.target.hasChildNodes());
    if (
      e.target.childNodes.length < 2 &&
      !e.target.classList.contains("imageInput")
    ) {
      if (typeOfOperation === "TEXT_INPUT") {
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
        inputField.onclick = (e) => {
          if (inputField) {
            //   handleClicked("align2", "table2");
            //   setSidebar(true);
            //   e.stopPropagation();
            // }
            focuseddClassMaintain(e);
            handleClicked("align2", "table2");
            setSidebar(true);
            e.stopPropagation();
          }
        };

        e.target.append(inputField);
      }
      //  else if (typeOfOperation === "IMAGE_INPUT") {
      //   let imageField = document.createElement("div");
      //   imageField.className = "imageInput";
      //   imageField.style.width = "100%";
      //   imageField.style.height = "50%";
      //   imageField.style.backgroundColor = "#0000";
      //   imageField.style.borderRadius = "0px";
      //   imageField.style.outline = "0px";
      //   imageField.style.overflow = "overlay";
      //   imageField.innerHTML = "Image here";
      //   imageField.style.position = "relative";

      //   imageField.onclick = (e) => {
      //     if (imageField) {
      //       handleClicked("image2", "table2");
      //       setSidebar(true);
      //       e.stopPropagation();
      //       alert("image filed clicked");
      //     }
      //   };
      //   const imgBtn = document.createElement("input");
      //   imgBtn.type = "file";
      //   imgBtn.style.objectFit = "cover";
      //   var uploadedImage = "";

      //   imgBtn.addEventListener("input", () => {
      //     const reader = new FileReader();

      //     reader.addEventListener("load", () => {
      //       uploadedImage = reader.result;
      //       imageField.style.backgroundImage = `url(${uploadedImage})`;
      //     });
      //     reader.readAsDataURL(imgBtn.files[0]);
      //   });

      //   e.target.append(imageField);
      // }
      else if (
        typeOfOperation === "IMAGE_INPUT"
        //  &&
        // decoded.details.action === "template"
      ) {
        let imageField = document.createElement("div");
        imageField.className = "imageInput";
        imageField.style.minHeight = "100%";
        imageField.style.minWidth = "100%";
        imageField.style.backgroundColor = "#0000";
        imageField.style.borderRadius = "0px";
        imageField.style.outline = "0px";
        imageField.style.overflow = "overlay";
        // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
        imageField.style.position = "relative";
        // imageField.innerHTML = "Image here";
        imageField.onclick = (e) => {
          // table_dropdown_focuseddClassMaintain(e);
          // imageField.classList.add("focussed");
          focuseddClassMaintain(e);
          // imageFocuseddClassMaintain(e);
          e.preventDefault();
          handleClicked("image2", "table2");
          // handleClicked("image2");
          setSidebar(true);
          // console.log("imageclick test", e.target);
          e.stopPropagation();
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
          // console.log("baprebap", document.querySelector(".focussed"));
          // document.querySelector(".focussed").innerHTML = null;
        });

        // if (uploadedImage) {
        // console.log("imageField", imageField, uploadedImage);
        // }
        // imgBtn.style.width = "100%";
        imageButton.append(imgBtn);
        e.target.append(imageField);
        e.target.append(imageButton);
        e.target.style.width = imageField.style.width;
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

        e.target.append(texttField);
      } else if (typeOfOperation === "FORM") {
        let texttField = document.createElement("div");
        texttField.className = "texttField";
        texttField.style.width = "100%";
        texttField.style.height = "30vh";
        texttField.style.position = "relative";
        e.target.append(texttField);
      } else if (typeOfOperation === "SIGN_INPUT") {
        // {
        //   let signField = document.createElement("div");
        //   signField.className = "signInput";
        //   signField.style.width = "100%";
        //   signField.style.height = "100%";
        //   signField.style.backgroundColor = "#0000";
        //   signField.style.borderRadius = "0px";
        //   signField.style.outline = "0px";
        //   signField.style.overflow = "overlay";
        //   signField.innerHTML = "Signature here";
        //   signField.style.position = "absolute";

        //   signField.onclick = (e) => {
        //     // focuseddClassMaintain(e);
        //     if (signField) {
        //       // signField.classList.add("focussed");
        //       handleClicked("signs2", "table2");
        //       setSidebar(true);
        //       e.stopPropagation();
        //     } else {
        //       setSidebar(false);
        //     }
        //   };
        //   e.target.append(signField);
        //   // document.getElementsByClassName("dropp").item(0).append(signField);
        // }
        let signField = document.createElement("div");
        signField.className = "signInput";
        signField.style.width = "100%";
        signField.style.height = "100%";
        signField.style.backgroundColor = "#0000";
        signField.style.borderRadius = "0px";
        signField.style.outline = "0px";
        signField.style.overflow = "overlay";
        signField.innerHTML = "signature here";
        signField.style.position = "absolute";
        signField.style.top = 0;
        signField.style.left = 0;
        e.target.style.position = "relative";

        // signField.onchange = (event) => {
        //   event.preventDefault();
        //   setPostData({
        //     ...postData,
        //     signField: {
        //       value: event.target.value,
        //       xcoordinate: getOffset(holderDIV).left,
        //       ycoordinate: getOffset(holderDIV).top,
        //     },
        //   });
        // };

        signField.onclick = (e) => {
          focuseddClassMaintain(e);
          // if (actionName != "template") {
          // signField.classList.add("focussed");
          // handleClicked("signs2");
          // setSidebar(true);
          handleClicked("signs2", "table2");
          setSidebar(true);
          e.stopPropagation();
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
        e.target.append(signField);
        e.target.append(imageSignButton);
        e.target.style.width = signField.style.width;
        e.target.style.height = signField.style.height;
      } else if (typeOfOperation === "DATE_INPUT") {
        let dateField = document.createElement("div");
        dateField.className = "dateInput";
        dateField.style.width = "100%";
        dateField.style.height = "100%";
        dateField.style.backgroundColor = "#0000";
        dateField.style.borderRadius = "0px";
        dateField.style.outline = "0px";
        dateField.style.overflow = "overlay";
        dateField.style.position = "relative";

        setStartDate(new Date());
        setMethod("select");

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
          e.stopPropagation();
        };
        dateField.innerText = "mm/dd/yyyy";

        // dateField.append(para)
        e.target.append(dateField);
        //console.log(para);
      }
    }
  };

  // focus class maintain for table and midsection
  function focuseddClassMaintain(e) {
    let allDiv = document.getElementsByClassName("focussedd");
    for (let i = 0; i < allDiv.length; i++) {
      allDiv[i].classList.remove("focussedd");
    }
    e.target.parentElement.classList.add("focussedd");
    // e.target.parentElement.classList.add("test_image");

    let focussedDiv = document.getElementsByClassName("focussed");
    for (let i = 0; i < focussedDiv.length; i++) {
      focussedDiv[i].classList.remove("focussed");
    }
    e.target.classList.add("focussed");
    // console.log("focussed class maintain", e);
    // e.target.style.backgroundColor = "lightBlue";
  }

  // hanlde copypaste

  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  // var decoded = jwt_decode(token);

  // let resizing = false;

  // const dragElementOverPage = (event) => {
  //   let holder;
  //   // console.log("dragElement", event.target);
  //   // event.dataTransfer.setData("text/plain", "DATE_INPUT");
  //   if (!resizing) {
  //     let initX = event.screenX;
  //     let initY = event.screenY;

  //     // console.log("initX ", initX, "initY ", initY);
  //     /* Ensure That target has changed */
  //     var counterCheck = true;
  //     var tempTarget = event.target;
  //     var hitTarget = "";
  //     while (counterCheck) {
  //       // if(tempTarget.className === 'holderDIV'){
  //       if (tempTarget.classList.contains("holderDIV")) {
  //         hitTarget = tempTarget;
  //         counterCheck = false;
  //       } else if (tempTarget.classList.contains("textInput")) {
  //         hitTarget = null;
  //         counterCheck = false;
  //       }
  //       tempTarget = tempTarget.parentNode;
  //     }

  //     holder = hitTarget;
  //     const holderPos = (function () {
  //       const holderPos = {
  //         // top:
  //         //   decoded.details.flag === "editing" ? holder?.offsetTop : undefined,
  //         // left:
  //         //   decoded.details.flag === "editing" ? holder?.offsetLeft : undefined,
  //         top: parseInt(holder?.style?.top.slice(0, -2)),
  //         left: parseInt(holder?.style?.left.slice(0, -2)),
  //       };
  //       return Object.seal(holderPos);
  //     })();
  //     // holder.ondragstart = (e) => {
  //     //   console.log("i am dragged", e.target);
  //     // };
  //     // code for conatainer element move start
  //     let holderParentHolder = "";
  //     let holderParentHolderRect = "";
  //     let hodlerRect = "";
  //     if (holder?.parentElement.classList.contains("containerInput")) {
  //       holderParentHolder = holder?.parentElement?.parentElement;
  //     }
  //     if (holderParentHolder) {
  //       holderParentHolderRect = holderParentHolder.getBoundingClientRect();
  //     }
  //     hodlerRect = holder.getBoundingClientRect();
  //     // code for container element move end
  //     // console.log("finding moveable element", holderPos);

  //     window.addEventListener("mousemove", moveObject);
  //     function moveObject(ev) {
  //       //console.log(ev);
  //       ev.preventDefault();
  //       const el = document.getElementById("midSection_container");
  //       const midsectionRect = el.getBoundingClientRect();
  //       //console.log(
  //       //   midsectionRect.left,
  //       //   midsectionRect.top,
  //       //   midsectionRect.right
  //       // );
  //       //  screenX: 531, screenY: 175, clientX: 531, Top-left
  //       //  screenX: 1061, screenY: 154, Top right

  //       // console.log("midsectionRect", midsectionRect);
  //       // const eventClientX = ev.clientX;
  //       const elemtnMeasureX =
  //         ev.screenX + holderPos.left + hodlerRect.width - initX;
  //       const elmentMeasureY =
  //         ev.screenY + holderPos.top + hodlerRect.height - initY;
  //       // if (
  //       //   ev.screenX > holderParentHolderRect.left &&
  //       //   ev.screenY > holderParentHolderRect.top &&
  //       //   ev.screenX < holderParentHolderRect.right
  //       // ) {
  //       if (holder?.parentElement.classList.contains("containerInput")) {
  //         if (
  //           holderParentHolderRect.width > elemtnMeasureX + 5 &&
  //           // holderParentHolderRect.left + 20 < elemtnMeasureX &&
  //           ev.screenX + holderPos.left - initX > 0 &&
  //           holderParentHolderRect.height > elmentMeasureY + 5 &&
  //           // holderParentHolderRect.top - 50 < elmentMeasureY
  //           ev.screenY + holderPos.top - initY > 0
  //         ) {
  //           //console.log("checking motion");
  //           const diffX = ev.screenX - initX;
  //           const diffY = ev.screenY - initY;
  //           holder.style.top = holderPos.top + diffY + "px";
  //           holder.style.left = holderPos.left + diffX + "px";
  //         } else {
  //           holder.style.top = holderPos.top + "px";
  //           holder.style.left = holderPos.left + "px";
  //         }
  //       } else {
  //         // if (
  //         //   ev.screenX > midsectionRect.left &&
  //         //   ev.screenY > midsectionRect.top &&
  //         //   ev.screenX < midsectionRect.right
  //         // ) {

  //         if (
  //           midsectionRect.width > elemtnMeasureX + 5 &&
  //           ev.screenX + holderPos.left - initX > 0 &&
  //           midsectionRect.height > elmentMeasureY + 5 &&
  //           // midsectionRect.top - 50 < elmentMeasureY
  //           ev.screenY + holderPos.top - initY > 0
  //         ) {
  //           //console.log("checking motion");
  //           const diffX = ev.screenX - initX;
  //           const diffY = ev.screenY - initY;
  //           holder.style.top = holderPos.top + diffY + "px";
  //           holder.style.left = holderPos.left + diffX + "px";
  //         } else {
  //           holder.style.top = holderPos.top + "px";
  //           holder.style.left = holderPos.left + "px";
  //         }
  //       }
  //     }

  //     window.addEventListener("mouseup", stopMove);
  //     function stopMove(ev) {
  //       window.removeEventListener("mousemove", moveObject);
  //       window.removeEventListener("mouseup", stopMove);
  //     }
  //   }
  // };

  // function getResizer(attr1, attr2) {
  //   const resizer = document.createElement("span");
  //   resizer.style.width = "5px";
  //   resizer.style.height = "5px";
  //   resizer.style.display = "block";
  //   resizer.className = "resizeBtn";
  //   resizer.style.position = "absolute";
  //   resizer.style.backgroundColor = "#00aaff";

  //   if (attr1 === "top") {
  //     resizer.style.top = "-5px";
  //   } else {
  //     resizer.style.bottom = "-5px";
  //   }

  //   if (attr2 === "left") {
  //     resizer.style.left = "-5px";
  //   } else {
  //     resizer.style.right = "-5px";
  //   }

  //   if (
  //     (attr1 == "top" && attr2 === "right") ||
  //     (attr1 == "bottom" && attr2 === "left")
  //   ) {
  //     resizer.onmouseover = (event) => {
  //       event.target.style.cursor = "nesw-resize";
  //     };
  //   } else {
  //     resizer.onmouseover = (event) => {
  //       event.target.style.cursor = "nwse-resize";
  //     };
  //   }

  //   resizer.onmousedown = (event) => {
  //     let initX = event.screenX;
  //     let initY = event.screenY;
  //     resizing = true;
  //     event.preventDefault();

  //     const holder = event.target.parentNode;

  //     const holderSize = (function () {
  //       const holderSize = {
  //         width:
  //           decoded.details.flag === "editing" ? holder.offsetWidth : undefined,
  //         height:
  //           decoded.details.flag === "editing"
  //             ? holder.offsetHeight
  //             : undefined,
  //         top:
  //           decoded.details.flag === "editing" ? holder.offsetTop : undefined,
  //         left:
  //           decoded.details.flag === "editing" ? holder.offsetLeft : undefined,

  //         // width: parseInt(holder.style.width.slice(0, -2)),
  //         // height: parseInt(holder.style.height.slice(0, -2)),
  //         // top: parseInt(holder.style.top.slice(0, -2)),
  //         // left: parseInt(holder.style.left.slice(0, -2))//elemLeft : 0
  //       };
  //       return Object.seal(holderSize);
  //     })();

  //     window.addEventListener("mousemove", resizeElement);
  //     function resizeElement(ev) {
  //       const el = document.getElementById("midSection_container");
  //       const midsectionRect = el.getBoundingClientRect();
  //       if (
  //         ev.screenX > midsectionRect.left &&
  //         ev.screenY > midsectionRect.top &&
  //         ev.screenX < midsectionRect.right
  //       ) {
  //         if (attr1 == "bottom" && attr2 == "right") {
  //           holder.style.width = ev.screenX - initX + holderSize.width + "px";
  //           holder.style.height = ev.screenY - initY + holderSize.height + "px";
  //         } else if (attr1 == "bottom" && attr2 == "left") {
  //           holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
  //           holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
  //           holder.style.height = ev.screenY - initY + holderSize.height + "px";
  //         } else if (attr1 == "top" && attr2 == "left") {
  //           holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
  //           holder.style.left = holderSize.left + (ev.screenX - initX) + "px";
  //           holder.style.width = holderSize.width - (ev.screenX - initX) + "px";
  //           holder.style.height =
  //             holderSize.height - (ev.screenY - initY) + "px";
  //         } else if (attr1 == "top" && attr2 == "right") {
  //           holder.style.top = holderSize.top + (ev.screenY - initY) + "px";
  //           holder.style.width = holderSize.width + (ev.screenX - initX) + "px";
  //           holder.style.height =
  //             holderSize.height - (ev.screenY - initY) + "px";
  //         }
  //       }
  //     }

  //     window.addEventListener("mouseup", stopResizing);
  //     function stopResizing(ev) {
  //       window.removeEventListener("mousemove", resizeElement);
  //       window.removeEventListener("mouseup", stopResizing);
  //       resizing = false;
  //     }
  //   };

  //   return resizer;
  // }

  // const copyInput = (clickHandler) => {
  //   // if (typeOfOperation === "IMAGE_INPUT") {
  //   const element = document.querySelector(".focussedd");
  //   // console.log(element);
  //   let counter = 1;
  //   const copyEle = element.cloneNode(true);
  //   const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";

  //   // parseInt(holder.style.top.slice(0, -2))
  //   copyEle.classList.remove("focussedd");
  //   copyEle.firstChild.classList.remove("focussed");
  //   // copyEle.classList.add("imageInput")
  //   // console.log(copyEleTop)
  //   copyEle.onfocus = () => {
  //     copyEle.style.border = "3px solid rgb(255 191 0)";
  //   };
  //   copyEle.onblur = () => {
  //     copyEle.style.border = "3px dotted gray";
  //   };
  //   if (copyEle) {
  //     copyEle.style.top = copyEleTop;
  //     copyEle.style.border = "3px dotted black";

  //     copyEle.onmousedown = copyEle.addEventListener(
  //       "mousedown",
  //       (event) => {
  //         dragElementOverPage(event);
  //       },
  //       false
  //     );

  //     const resizerTL = getResizer("top", "left");
  //     const resizerTR = getResizer("top", "right");
  //     const resizerBL = getResizer("bottom", "left");
  //     const resizerBR = getResizer("bottom", "right");
  //     // parseInt(holder.style.top.slice(0, -2))

  //     copyEle.addEventListener("focus", function (e) {
  //       // holderDIV.classList.add("focussedd");
  //       copyEle.classList.add("zIndex-two");
  //       copyEle.style.border = "2px solid orange";
  //       // holderDIV.append(holderMenu);

  //       copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
  //     });
  //     copyEle.addEventListener("click", (e) => {
  //       e.stopPropagation();
  //       focuseddClassMaintain(e);
  //       // imageField.classList.add("focussed");
  //       // const targetEle = document.getElementById("focussed")
  //       // const list = copyEle.classList;
  //       // list.add("focussedd")
  //       handleClicked(clickHandler, "container2");
  //       // copyImage()
  //       // resizing = true;
  //       setSidebar(true);
  //       if (e.ctrlKey) {
  //         copyInput(clickHandler);
  //         console.log("did u call me inside");
  //       }
  //       if (!midSec) {
  //         let targetParent = element;
  //         while (1) {
  //           if (targetParent.classList.contains("midSection_container")) {
  //             targetParent = targetParent;
  //             break;
  //           } else {
  //             targetParent = targetParent.parentElement;
  //             midSec = targetParent;
  //           }
  //         }
  //       }
  //       copyEle.id += counter;
  //       midSec.appendChild(copyEle);
  //     });
  //   }

  //   // copyEle.onclick = (clickHandler) => {
  //   //   if (clickHandler.ctrlKey) {
  //   //     const element = document.querySelector(".focussedd");
  //   //     // console.log(element);
  //   //     let counter = 1;
  //   //     const copyEle = element.cloneNode(true);
  //   //     const copyEleTop =
  //   //       parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";

  //   //     // parseInt(holder.style.top.slice(0, -2))
  //   //     copyEle.classList.remove("focussedd");
  //   //     copyEle.firstChild.classList.remove("focussed");
  //   //     // copyEle.classList.add("imageInput")
  //   //     // console.log(copyEleTop)
  //   //     copyEle.onfocus = () => {
  //   //       copyEle.style.border = "3px solid rgb(255 191 0)";
  //   //     };
  //   //     copyEle.onblur = () => {
  //   //       copyEle.style.border = "3px dotted gray";
  //   //     };
  //   //     if (copyEle) {
  //   //       copyEle.style.top = copyEleTop;
  //   //       copyEle.style.border = "3px dotted black";

  //   //       copyEle.onmousedown = copyEle.addEventListener(
  //   //         "mousedown",
  //   //         (event) => {
  //   //           dragElementOverPage(event);
  //   //         },
  //   //         false
  //   //       );

  //   //       const resizerTL = getResizer("top", "left");
  //   //       const resizerTR = getResizer("top", "right");
  //   //       const resizerBL = getResizer("bottom", "left");
  //   //       const resizerBR = getResizer("bottom", "right");
  //   //       // parseInt(holder.style.top.slice(0, -2))

  //   //       copyEle.addEventListener("focus", function (e) {
  //   //         // holderDIV.classList.add("focussedd");
  //   //         copyEle.classList.add("zIndex-two");
  //   //         copyEle.style.border = "2px solid orange";
  //   //         // holderDIV.append(holderMenu);

  //   //         copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
  //   //       });
  //   //       copyEle.addEventListener("click", (e) => {
  //   //         e.stopPropagation();
  //   //         focuseddClassMaintain(e);
  //   //         // imageField.classList.add("focussed");
  //   //         handleClicked(clickHandler, "container2");
  //   //         // copyImage()
  //   //         // resizing = true;
  //   //         setSidebar(true);
  //   //       });
  //   //     }

  //   //     let midSec = document.querySelector(".drop_zone");

  //   //     if (!midSec) {
  //   //       let targetParent = element;
  //   //       while (1) {
  //   //         if (targetParent.classList.contains("midSection_container")) {
  //   //           targetParent = targetParent;
  //   //           break;
  //   //         } else {
  //   //           targetParent = targetParent.parentElement;
  //   //           midSec = targetParent;
  //   //         }
  //   //       }
  //   //     }
  //   //     copyEle.id += counter;
  //   //     midSec.appendChild(copyEle);
  //   //     console.log("copy ele", copyEle);
  //   //   }

  //   //   // const element = document.querySelector(".focussedd");
  //   //   // // console.log(element);
  //   //   // let counter = 1;
  //   //   // const copyEle = element.cloneNode(true);
  //   //   // const copyEleTop = parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";

  //   //   // // parseInt(holder.style.top.slice(0, -2))
  //   //   // copyEle.classList.remove("focussedd")
  //   //   // copyEle.firstChild.classList.remove("focussed")
  //   //   // // copyEle.classList.add("imageInput")
  //   //   // // console.log(copyEleTop)
  //   //   // copyEle.onfocus = () => {
  //   //   //   copyEle.style.border = "1px solid rgb(255 191 0)";
  //   //   // }
  //   //   // copyEle.onblur = () => {
  //   //   //   copyEle.style.border = "2px dotted gray";
  //   //   // }
  //   //   // if (copyEle) {
  //   //   //   copyEle.style.top = copyEleTop;
  //   //   //   copyEle.style.border = "1px dotted black";

  //   //   //   copyEle.onmousedown = copyEle.addEventListener(
  //   //   //     "mousedown",
  //   //   //     (event) => {
  //   //   //       dragElementOverPage(event);
  //   //   //     },
  //   //   //     false
  //   //   //   );

  //   //   //   const resizerTL = getResizer("top", "left");
  //   //   //   const resizerTR = getResizer("top", "right");
  //   //   //   const resizerBL = getResizer("bottom", "left");
  //   //   //   const resizerBR = getResizer("bottom", "right");
  //   //   //   // parseInt(holder.style.top.slice(0, -2))

  //   //   //   copyEle.addEventListener("focus", function (e) {
  //   //   //     // holderDIV.classList.add("focussedd");
  //   //   //     copyEle.classList.add("zIndex-two");
  //   //   //     copyEle.style.border = "2px solid orange";
  //   //   //     // holderDIV.append(holderMenu);

  //   //   //     copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
  //   //   //   });
  //   //   //   copyEle.addEventListener("click", (e) => {
  //   //   //     e.stopPropagation();
  //   //   //     focuseddClassMaintain(e);
  //   //   //     // imageField.classList.add("focussed");
  //   //   //     handleClicked(clickHandler, "container2");
  //   //   //     // copyImage()
  //   //   //     // resizing = true;
  //   //   //     setSidebar(true);
  //   //   //   })
  //   //   // }

  //   //   // let midSec = document.querySelector(".drop_zone")

  //   //   // if (!midSec) {
  //   //   //   let targetParent = element;
  //   //   //   while (1) {
  //   //   //     if (targetParent.classList.contains("midSection_container")) {
  //   //   //       targetParent = targetParent;
  //   //   //       break;
  //   //   //     } else {
  //   //   //       targetParent = targetParent.parentElement;
  //   //   //       midSec = targetParent
  //   //   //     }
  //   //   //   }
  //   //   // }
  //   //   // console.log("mid sec", midSec)
  //   //   // copyEle.id += counter;
  //   //   // midSec.appendChild(copyEle);
  //   //   // console.log("copy ele", copyEle);
  //   // };
  //   // console.log(copyEle)
  //   let midSec = document.querySelector(".drop_zone");

  //   if (!midSec) {
  //     let targetParent = element;
  //     const list = copyEle.classList;
  //     list.add("focussedd")
  //     while (1) {
  //       if (targetParent.classList.contains("midSection_container")) {
  //         targetParent = targetParent;
  //         break;
  //       } else {
  //         targetParent = targetParent.parentElement;
  //         midSec = targetParent;
  //       }
  //     }
  //   }
  //   console.log("mid sec", midSec);
  //   copyEle.id += counter;
  //   midSec.appendChild(copyEle);
  //   console.log("copy ele", copyEle);
  //   // midSec.forEeach((e) => {
  //   //   e.appendChild(copyEle);
  //   // });

  //   // console.log("coping", copyEle)
  //   // }
  // };

  return (
    <StateContext.Provider
      value={{
        isDropped,
        handleDrop,
        setIsDropped,
        isResizing,
        setIsResizing,
        isClicked,
        handleClicked,
        setIsClicked,
        sidebar,
        setSidebar,
        signState,
        setSignState,
        startDate,
        setStartDate,
        fontPlus,
        setFontPlus,
        fontMinus,
        setFontMinus,
        bold,
        setBold,
        italic,
        setItalic,
        underline,
        setUnderline,
        strikethrough,
        setStrikethrough,
        dropdownName,
        setDropdownName,
        dropdownLabel,
        setDropdownLabel,
        dropdownItems,
        setDropdownItems,
        dropdownOptions,
        setDropdownOptions,
        item,
        setItem,
        isLoading,
        setIsLoading,
        isFlipClicked,
        setIsFlipClicked,
        fetchedData,
        setFetchedData,
        rightSideDatemenu,
        setRightSideDateMenu,
        rightSideDropDown,
        setRightSideDropDown,
        method,
        setMethod,
        deletePages,
        setDeletepages,
        isFinializeDisabled,
        setIsFinializeDisabled,
        newToken,
        setNewToken,
        data,
        setData,
        title,
        setTitle,
        isDataRetrieved,
        setIsDataRetrieved,
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
        handleDropp,
        focuseddClassMaintain,
        buttonLink,
        setButtonLink,
        buttonPurpose,
        setButtonPurpose,
        customId,
        setCustomId,
        iframek,
        setIframek,
        iframeKey,
        setIframeKey,
        borderSize,
        setBorderSize,
        borderColor,
        setBorderColor,
        inputBorderColor,
        setInputBorderColor,
        inputBorderSize,
        setInputBorderSize,
        calendarBorderSize,
        setCalendarBorderSize,
        calendarBorderColor,
        setCalendarBorderColor,
        buttonBorderSize,
        setButtonBorderSize,
        dropdownBorderColor,
        setDropdownBorderColor,
        dropdownBorderSize,
        setDropdownBorderSize,
        buttonBorderColor,
        setButtonBorderColor,
        signBorderSize,
        setSignBorderSize,
        signBorderColor,
        setSignBorderColor,
        tableBorderSize,
        setTableBorderSize,
        tableBorderColor,
        setTableBorderColor,
        iframeBorderSize,
        setIframeBorderSize,
        iframeBorderColor,
        setIframeBorderColor,
        scaleBorderSize,
        setScaleBorderSize,
        scaleBorderColor,
        setScaleBorderColor,
        containerBorderSize,
        setContainerBorderSize,
        containerBorderColor,
        setContainerBorderColor,
        formBorderSize,
        setFormBorderSize,
        formBorderColor,
        setFormBorderColor,
        questionAndAnswerGroupedData,
        setQuestionAndAnsGroupedData,
        confirmRemove, setConfirmRemove
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
