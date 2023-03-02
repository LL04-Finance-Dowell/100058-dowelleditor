import React from "react";

import $ from "jquery";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";

const TableRightSidebar = () => {
  const {
    isDropped,
    setIsClicked,
    setSidebar,
    handleClicked,
    startDate,
    signState,
    bold,
    italic,
    underline,
    strikethrough,
    setStartDate,
    setMethod,
    setRightSideDateMenu,
  } = useStateContext();

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

  const handleDropp = (e) => {
    e.preventDefault();
    const typeOfOperation = e.dataTransfer.getData("text/plain");
    //console.log("cell has been dropped on " + typeOfOperation);
    if (!e.target.hasChildNodes()) {
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
        imageField.style.minHeight = "100px";
        imageField.style.minWidth = "100px";
        imageField.style.backgroundColor = "#0000";
        imageField.style.borderRadius = "0px";
        imageField.style.outline = "0px";
        imageField.style.overflow = "overlay";
        // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
        imageField.style.position = "relative";
        imageField.innerHTML = "Choose Image";
        imageField.onclick = (e) => {
          focuseddClassMaintain(e);
          e.target.innerHTML = null;
          // imageField.classList.add("focussed");
          handleClicked("image2", "table2");
          // handleClicked("image2");
          setSidebar(true);
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
            ).parentElement.style.backgroundImage = `url(${uploadedImage})`;
          });
          reader.readAsDataURL(imgBtn.files[0]);
        });

        // imgBtn.style.width = "100%";
        imageButton.append(imgBtn);
        e.target.append(imageField);
        e.target.append(imageButton);
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
        signField.style.width = "100px";
        signField.style.height = "inherit";
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

        // dateField.onchange = (event) => {
        //   event.preventDefault();
        //   setPostData({
        //     ...postData,
        //     calenderField: {
        //       value: event.target.value,
        //       xcoordinate: getOffset(holderDIV).left,
        //       ycoordinate: getOffset(holderDIV).top,
        //     },
        //   });
        // };
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

  function makeTable() {
    var table = document.createElement("table");
    table.style.border = "2";
    table.id = "table";
    table.className = "droppable";
    var row = document.getElementById("rows").value;
    var col = document.getElementById("cols").value;

    var tableDiv = document.querySelector(".focussed");

    //console.log(table);
    for (var rowIndex = 0; rowIndex < row; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < col; colIndex++) {
        var td = document.createElement("td");
        td.className = "dropp";
        // td.ondragover = function (e) {
        //   e.preventDefault();
        //   // e.target.style.border = "2px solid green";
        // };
        // td.ondragleave = (e) => {
        //   e.preventDefault();
        //   e.target.style.border = "1px solid black";
        // };
        // td.ondrop = function (e) {
        //   e.preventDefault();
        //   e.target.style.border = "1px solid black";
        //   alert("drag has been ended");
        // };
        // var text = document.createTextNode("Canel "+colIndex)
        // td.innerHTML = "Canel " + `${colIndex}`
        tr.appendChild(td);
      }

      table.appendChild(tr);

      tableDiv.appendChild(table);

      var tablee = document.querySelector(".focussed").firstElementChild;
      var cells = tablee.getElementsByTagName("td");

      // for (var i = 0; i < cells.length; i++) {
      //   cells[i].ondragover = function (e) {
      //     e.preventDefault();
      //     e.target.classList.add("table_drag");
      //     // const afterElement = getDragAfterElement(cells[i], e.clientY);
      //     //console.log(afterElement);
      //     const draggable = document.querySelector(".dragging");
      //     cells[i].appendChild(draggable);
      //   };
      for (var i = 0; i < cells.length; i++) {
        cells[i].ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          e.target.style.border = "2px solid green";
          // const afterElement = getDragAfterElement(cells[i], e.clientY);
          //console.log(afterElement);
          const draggable = document.querySelector(".dragging");
          cells[i].appendChild(draggable);
        };
        cells[i].ondragleave = (e) => {
          e.preventDefault();
          e.target.style.border = "1px solid black";
        };
        // cells[i].ondragover = function (e) {
        //   e.preventDefault();
        //   e.target.style.border = "2px solid green";
        //   alert("drag has been ended");
        // };
        cells[i].ondrop = function (e) {
          e.preventDefault();
          e.target.style.border = "1px solid black";
          // alert("drag has been ended");
        };
        cells[i].addEventListener("focusout", function (e) {
          e.target.style.border = "1px solid black";
          console.log("focus out from", e.target);
        });
        // cells[i].ondragleave = (e) => {
        //   e.target.style = "2px solid black";
        // };

        // function getDragAfterElement(container, y) {
        //   const droppableCells = [...document.querySelectorAll(".dropp")];

        //   return droppableCells.reduce(
        //     (closest, child) => {
        //       const box = td.getBoundingClientRect();
        //       const offset = y - box.top - box.height / 2;
        //       //console.log(box);
        //       //console.log(offset);
        //       if (offset < 0 && offset > closest.offset) {
        //         return { offset: offset, element: child };
        //       } else {
        //         return closest;
        //       }
        //     },
        //     { offset: Number.NEGATIVE_INFINITY }
        //   ).element;
        // }
        // cells[i].onclick = function () {
        //   if (this.hasAttribute("data-clicked")) {
        //     return;
        //   }
        //   this.setAttribute("data-clicked", "yes");
        //   this.setAttribute("data-text", this.innerHtml);

        //   var input = document.createElement("input");
        //   input.setAttribute("type", "text");
        //   // input.value = this.innerHtml;
        //   input.style.width = this.offsetWidth - this.clientLeft * 2 + "px";
        //   input.style.height = this.offsetHeight - this.clientTop * 2 + "px";
        //   input.style.border = "0px";
        //   input.style.fontFamily = "inherit";
        //   input.style.fontSize = "inherit";
        //   input.style.textAlign = "inherit";
        //   input.style.backgroundColor = "LightGoldenRodYellow";

        //   // var org_text = input.parentElement.getAttribute("data-text");
        //   // //console.log("orginal text form on click", org_text);

        //   input.onblur = function () {
        //     var td = input.parentElement;
        //     var org_text = input.parentElement.getAttribute("data-text");
        //     var current_text = this.value;

        //     if (org_text != current_text && current_text !== "") {
        //       td.removeAttribute("data-clicked");
        //       td.removeAttribute("data-text");
        //       td.innerHTML = current_text;
        //       td.style.cssText = "padding: 5px";
        //     } else {
        //       td.removeAttribute("data-clicked");
        //       td.removeAttribute("data-text");
        //       td.style.cssText = "padding: 5px";
        //       input.remove()
        //     }
        //   };

        //   input.onkeydown = function (event) {
        //     if (event.keyCode == 13) {
        //       this.onblur();
        //     }
        //   };
        //   this.innerHtml = "";
        //   this.style.cssText = "padding: 0px 0px";
        //   this.append(input);
        //   this.firstElementChild.select();
        // };

        cells[i].ondrop = handleDropp;
      }
    }
  }

  function removeTable() {
    // const div = document.getElementById("holderId")
    // const tab = document.getElementsByClassName("tableInput")
    // const tabData = document.getElementsByClassName("droppable")
    // document.querySelector(".focussedd").remove();
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
    // if (tab[0].parentElement.classList.contains("holderDIV")) {
    //   tabData[0].remove();
    // }

    // if (div.childNodes[0].classList.contains("tableInput")) {
    //   div.focus()
    // }

    // if(div.focus){
    //   document.activeElement.remove()
    // }
  }
  //console.log("table", document.getElementById("table"));
  // document.getElementById('make').addEventListener("click", makeTable)
  return (
    <>
      <div>
        <h6 className="pt-4">Table Size</h6>
        <Form.Label>Enter Number of rows</Form.Label>
        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="rows"
          className="shadow bg-white rounded mb-4"
        />

        <Form.Label>Enter Number of columns</Form.Label>

        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="cols"
          className="shadow bg-white rounded mb-4"
        />
      </div>

      <div className="mt-2 text-center pt-5">
        <Button variant="secondary" className="px-5" onClick={makeTable}>
          Create Table
        </Button>
      </div>

      {/* <div className='dropdown pt-4'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}

      <div className="mt-2 text-center pt-5">
        <Button
          variant="primary"
          className="px-5 remove_button"
          onClick={removeTable}
        >
          Remove Table
        </Button>
      </div>
    </>
  );
};

export default TableRightSidebar;
