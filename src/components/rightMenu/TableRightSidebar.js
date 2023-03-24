import React, { useEffect, useState } from "react";

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
    handleDropp,
  } = useStateContext();

  const [isDisableTableRightMenu, setIsDisableTableRightMenu] = useState(false);
  const [isCreateTableBtnDisabled, setIsCreateTableBtnDisabled] =
    useState(false);

  useEffect(() => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstChild?.hasChildNodes()) {
      setIsCreateTableBtnDisabled(true);
    }
    if (
      focusseddDiv?.firstChild?.hasChildNodes() &&
      focusseddDiv?.firstChild?.firstChild?.classList?.contains(
        "row_col_add_div"
      )
    ) {
      setIsDisableTableRightMenu(true);
    }
  }, [isDisableTableRightMenu, isCreateTableBtnDisabled]);
  //

  //
  function makeTable() {
    var table = document.createElement("table");
    table.style.border = "2";
    table.id = "table";
    table.className = "droppable";
    var row = document.getElementById("rows").value;
    var col = document.getElementById("cols").value;

    var tableDiv = document.querySelector(".focussed");

    for (var rowIndex = 0; rowIndex < row; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < col; colIndex++) {
        var td = document.createElement("td");
        td.className = "dropp";

        tr.appendChild(td);
      }

      table.appendChild(tr);

      tableDiv.appendChild(table);

      var tablee = document.querySelector(".focussed").firstElementChild;
      var cells = tablee.getElementsByTagName("td");

      for (var i = 0; i < cells.length; i++) {
        cells[i].ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        cells[i].ondragleave = (e) => {
          e.preventDefault();
          if (
            !e.target.hasChildNodes() &&
            !e.target.classList.contains("imageInput")
          ) {
            e.target.style.border = "1px solid black";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };

        console.log("cells[i]", cells[i].classList.contains("dropp"));
        cells[i].ondrop = handleDropp;
        document.getElementById("rows").value = "";
        document.getElementById("cols").value = "";
      }
    }
    setIsCreateTableBtnDisabled(true);
  }

  const hadleTableUpdateSave = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      focusseddDiv?.firstElementChild?.firstElementChild?.remove();
      focusseddDiv?.firstElementChild?.firstElementChild?.firstElementChild?.remove();
      const trNum =
        focusseddDiv?.firstElementChild?.firstElementChild?.children;
      for (let i = 0; i < trNum.length; i++) {
        trNum[i].lastChild.remove();
      }
      var tablee = focusseddDiv?.firstElementChild?.firstElementChild;
      var cells = tablee.getElementsByTagName("td");
      console.log("cells", tablee, cells);
      for (let i = 0; i < cells.length; i++) {
        cells[i].ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        cells[i].ondragleave = (e) => {
          e.preventDefault();
          if (
            !e.target.hasChildNodes() &&
            !e.target.classList.contains("imageInput")
          ) {
            e.target.style.border = "1px solid black";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        cells[i].ondrop = handleDropp;
      }
      e.target?.parentElement.remove();
      setIsDisableTableRightMenu(false);
      e.stopPropagation();
    }
  };
  const updateTable = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      var editDiv = document.createElement("div");
      editDiv.className = "row_col_add_div";
      var addRowBtn = document.createElement("BUTTON");
      addRowBtn.onclick = handleAddRow;

      var addColBtn = document.createElement("BUTTON");
      addColBtn.onclick = handleAddColumn;
      addRowBtn.className = "btn btn-primary me-3 my-3";
      addRowBtn.innerText = "Add Row";
      addColBtn.innerText = "Add Col";
      addColBtn.className = "btn btn-primary my-3";
      editDiv.appendChild(addRowBtn);
      editDiv.appendChild(addColBtn);
      editDiv.style.display = "flex";
      // editDiv.style.justifyContent = ""
      focusseddDiv?.firstElementChild?.prepend(editDiv);
      if (focusseddDiv?.firstElementChild?.children[1]) {
        const numOfTr =
          focusseddDiv?.firstElementChild?.children[1]?.rows?.length;
        const numOfTd =
          focusseddDiv?.firstElementChild?.children[1].querySelectorAll(
            "td"
          ).length;
        // const numOfROW = numOfTr;
        const numOfCol = numOfTd / numOfTr;
        var tr = document.createElement("tr");

        for (let i = 0; i < numOfCol; i++) {
          var td = document.createElement("td");
          td.className = "dropp";
          td.style.height = "50px";
          // if (rowIndex == 0 && colIndex != numOfCol) {
          const colDeleteBtn = document.createElement("button");
          colDeleteBtn.className = "btn btn-warning";
          colDeleteBtn.style.marginLeft = "5px";
          colDeleteBtn.innerText = "Del Col";
          colDeleteBtn.onclick = (e) => {
            const index = Array.from(
              e.target.parentElement.parentElement.children
            ).indexOf(e.target.parentElement);
            const allTableTr =
              focusseddDiv?.firstElementChild?.children[1].querySelectorAll(
                "tr"
              );
            for (let i = 0; i < allTableTr.length; i++) {
              focusseddDiv?.firstElementChild?.children[1]
                .querySelectorAll("tr")
                [i].childNodes[index].remove();
            }
            e.stopPropagation();
          };
          td.style.border = "none";
          td.appendChild(colDeleteBtn);
          tr.appendChild(td);
        }
        focusseddDiv?.firstElementChild?.children[1].prepend(tr);

        for (let rowIndex = 1; rowIndex < numOfTr + 1; rowIndex++) {
          for (let colIndex = 0; colIndex < numOfCol + 2; colIndex++) {
            // if (colIndex == numOfCol && rowIndex != 0) {
            var td = document.createElement("td");
            const rowDeleteBtn = document.createElement("button");
            rowDeleteBtn.className = "btn btn-warning";
            rowDeleteBtn.style.marginLeft = "5px";
            rowDeleteBtn.innerText = "Del Row";
            rowDeleteBtn.onclick = (e) => {
              e.target?.parentElement?.parentElement?.remove();
              e.stopPropagation();
            };
            td.style.border = "none";
            // td.style.background = "#fff";
            td.appendChild(rowDeleteBtn);
            // }
          }
          // console.log("child element check", focusseddDiv?.firstElementChild);
          focusseddDiv?.firstElementChild?.children[1].childNodes[
            rowIndex
          ].appendChild(td);
        }
        // focusseddDiv?.firstElementChild?.firstElementChild.appendChild(tr);
      }
      var saveDiv = document.createElement("div");
      saveDiv.className = "table_update_save_div";
      var saveBtn = document.createElement("BUTTON");
      saveBtn.className = "btn btn-primary my-3";
      saveBtn.innerText = "Save Changes";
      saveBtn.onclick = hadleTableUpdateSave;
      saveDiv.appendChild(saveBtn);
      focusseddDiv?.firstElementChild?.appendChild(saveDiv);
    }
    setIsDisableTableRightMenu(true);
  };

  const handleAddRow = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      const editableTable = focusseddDiv?.firstElementChild?.children[1];
      const numOfTr = editableTable?.rows?.length;
      const numOfTd = editableTable.querySelectorAll("td").length;
      const numOfCol = (numOfTd + 1) / numOfTr;
      for (var rowIndex = 0; rowIndex < 1; rowIndex++) {
        var tr = document.createElement("tr");

        for (var colIndex = 0; colIndex < numOfCol; colIndex++) {
          console.log("numOfCol", numOfTr, numOfTd, numOfCol);
          var td = document.createElement("td");
          td.className = "dropp";
          // td.style.height = "50px";
          if (colIndex == numOfCol - 1) {
            const rowDeleteBtn = document.createElement("button");
            rowDeleteBtn.className = "btn btn-warning";
            rowDeleteBtn.style.marginLeft = "5px";
            rowDeleteBtn.innerText = "Del Row";
            rowDeleteBtn.onclick = (e) => {
              e.target?.parentElement?.parentElement?.remove();
              e.stopPropagation();
            };
            td.style.border = "none";
            // td.style.background = "#fff";
            td.appendChild(rowDeleteBtn);
          }
          tr.appendChild(td);
        }
        editableTable.appendChild(tr);
      }
    }
  };
  const handleAddColumn = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      const editableTable = focusseddDiv?.firstElementChild?.children[1];
      const numOfTr = editableTable?.rows?.length;
      const numOfTd = editableTable.querySelectorAll("td").length;
      const numOfCol = (numOfTd + 1) / numOfTr;
      for (var rowIndex = 0; rowIndex < numOfTr; rowIndex++) {
        var td = document.createElement("td");
        td.className = "dropp";
        td.style.height = "50px";
        if (rowIndex == 0) {
          const colDeleteBtn = document.createElement("button");
          colDeleteBtn.className = "btn btn-warning";
          colDeleteBtn.style.marginLeft = "5px";
          colDeleteBtn.innerText = "Del Col";
          colDeleteBtn.onclick = (e) => {
            const index = Array.from(
              e.target.parentElement.parentElement.children
            ).indexOf(e.target.parentElement);
            const allTableTr = editableTable.querySelectorAll("tr");
            for (let i = 0; i < allTableTr.length; i++) {
              editableTable
                .querySelectorAll("tr")
                [i].childNodes[index].remove();
            }
            e.stopPropagation();
          };
          td.style.border = "none";
          td.appendChild(colDeleteBtn);
        }
        const allTrs = editableTable.querySelectorAll("tr");
        allTrs[rowIndex].insertBefore(td, allTrs[rowIndex].lastChild);
      }
    }
  };
  function removeTable() {
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("dropp")) {
      document.querySelector(".focussedd").remove();
    }
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
  }
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
          // defaultValue={numOfRow}
          disabled={isDisableTableRightMenu}
        />

        <Form.Label>Enter Number of columns</Form.Label>

        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="cols"
          className="shadow bg-white rounded mb-4"
          // defaultValue={numOfColumn}
          disabled={isDisableTableRightMenu}
        />
      </div>

      <div className="d-flex mt-2 text-center pt-5">
        {/* {!numOfColumn && !numOfRow ? ( */}

        <Button
          variant="secondary"
          className="px-5 me-3"
          onClick={makeTable}
          disabled={isDisableTableRightMenu || isCreateTableBtnDisabled}
        >
          Create Table
        </Button>
        <Button
          variant="success"
          className="px-5"
          // data-bs-toggle="modal"
          // data-bs-target="#tableUpdateModal"
          onClick={updateTable}
          disabled={isDisableTableRightMenu}
        >
          Update Table
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
