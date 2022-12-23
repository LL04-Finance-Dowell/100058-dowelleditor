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
  } = useStateContext();

  const handleDropp = (e) => {
    e.preventDefault();
    const typeOfOperation = e.dataTransfer.getData("text/plain");
    console.log("cell has been dropped on " + typeOfOperation);

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

      document.getElementsByClassName("dropp").item(0).append(inputField);
    } else if (typeOfOperation === "IMAGE_INPUT") {
      let imageField = document.createElement("div");
      imageField.className = "imageInput";
      imageField.style.width = "100%";
      imageField.style.height = "50%";
      imageField.style.backgroundColor = "#0000";
      imageField.style.borderRadius = "0px";
      imageField.style.outline = "0px";
      imageField.style.overflow = "overlay";
      imageField.innerHTML = "hhhhhhhhhhhh";
      imageField.style.position = "relative";

      const imgBtn = document.createElement("input");
      imgBtn.type = "file";
      imgBtn.style.objectFit = "cover";
      var uploadedImage = "";

      imgBtn.addEventListener("input", () => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          uploadedImage = reader.result;
          imageField.style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(imgBtn.files[0]);
      });

      document.getElementsByClassName("dropp").item(0).append(imageField);
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

      document.getElementsByClassName("dropp").item(0).append(texttField);
    } else if (typeOfOperation === "SIGN_INPUT") {
      let signField = document.createElement("div");
      signField.className = "signInput";
      signField.style.width = "100%";
      signField.style.height = "100%";
      signField.style.backgroundColor = "#0000";
      signField.style.borderRadius = "0px";
      signField.style.outline = "0px";
      signField.style.overflow = "overlay";
      signField.innerHTML = "Sign input";
      signField.style.position = "absolute";

      document.getElementsByClassName("dropp").item(0).append(signField);
    } else if (typeOfOperation === "DATE_INPUT") {
      let dateField = document.createElement("div");
      dateField.className = "dateInput";
      dateField.style.width = "100%";
      dateField.style.height = "100%";
      dateField.style.backgroundColor = "#0000";
      dateField.style.borderRadius = "0px";
      dateField.style.outline = "0px";
      dateField.style.overflow = "overlay";
      dateField.innerText = "Date";
      dateField.style.position = "relative";
      dateField.style.zIndex = 2;

      dateField.onclick = () => {
        handleClicked("calendar2");
        setSidebar(true);
      };

      document.getElementsByClassName("focussedd").item(0).append(dateField);
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

    console.log(table);
    for (var rowIndex = 0; rowIndex < row; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < col; colIndex++) {
        var td = document.createElement("td");
        td.className = "dropp";
        // var text = document.createTextNode("Canel "+colIndex)
        // td.innerHTML = "Canel " + `${colIndex}`
        tr.appendChild(td);
      }

      table.appendChild(tr);

      tableDiv.appendChild(table);

      var tablee = document.getElementById("table");
      var cells = tablee.getElementsByTagName("td");

      for (var i = 0; i < cells.length; i++) {
        cells[i].ondragover = function (e) {
          e.preventDefault();
          const afterElement = getDragAfterElement(cells[i], e.clientY);
          console.log(afterElement);
          const draggable = document.querySelector(".dragging");
          cells[i].appendChild(draggable);
        };

        function getDragAfterElement(container, y) {
          const droppableCells = [...document.querySelectorAll(".dropp")];

          return droppableCells.reduce(
            (closest, child) => {
              const box = td.getBoundingClientRect();
              const offset = y - box.top - box.height / 2;
              console.log(box);
              console.log(offset);
              if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
              } else {
                return closest;
              }
            },
            { offset: Number.NEGATIVE_INFINITY }
          ).element;
        }
        cells[i].onclick = function () {
          if (this.hasAttribute("data-clicked")) {
            return;
          }
          this.setAttribute('data-clicked', 'yes')
          this.setAttribute('data-text', this.innerHtml);
          
          var input = document.createElement('input')
          input.setAttribute('type', 'text')
          // input.value = this.innerHtml;
          input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px"
          input.style.height = this.offsetHeight - (this.clientTop * 2) + "px"
          input.style.border = "0px";
          input.style.fontFamily = "inherit";
          input.style.fontSize = "inherit";
          input.style.textAlign = "inherit";
          input.style.backgroundColor = "LightGoldenRodYellow";

          // var org_text = input.parentElement.getAttribute("data-text");
          // console.log("orginal text form on click", org_text);

          input.onblur = function () {
            var td = input.parentElement;
            var org_text = input.parentElement.getAttribute("data-text");
            var current_text = this.value;

            if (org_text != current_text && current_text !== "") {
              td.removeAttribute("data-clicked");
              td.removeAttribute("data-text");
              td.innerHTML = current_text;
              td.style.cssText = "padding: 5px";
            }
            //  else if (current_text == "") {
            //   td.removeAttribute('data-clicked')
            //   td.removeAttribute('data-text')
            //   td.innerHTML = current_text;
            //   td.style.cssText = 'padding: 5px';
            // }
            else if (current_text == "") {
              td.removeAttribute("data-clicked");
              td.removeAttribute("data-text");
              td.innerHTML = org_text;
              td.style.cssText = "padding: 5px";
            }
            // else if (current_text == "") {
            //   td.removeAttribute("data-clicked");
            //   td.removeAttribute("data-text");
            //   td.innerHTML = current_text;
            //   td.style.cssText = "padding: 5px";
            // }
            else {
              td.removeAttribute("data-clicked");
              td.removeAttribute("data-text");
              td.innerHTML = org_text;
              td.style.cssText = "padding: 5px";
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

        cells[i].ondrop = handleDropp;
      }
    }
  }

  function removeTable() {
    // const div = document.getElementById("holderId")
    // const tab = document.getElementsByClassName("tableInput")
    // const tabData = document.getElementsByClassName("droppable")
    document.querySelector(".focussedd").remove();
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
        <Button variant="primary" className="px-5" onClick={removeTable}>
          Remove Table
        </Button>
      </div>
    </>
  );
};

export default TableRightSidebar;
