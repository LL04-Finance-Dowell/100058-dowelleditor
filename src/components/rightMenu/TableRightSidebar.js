import React, { useEffect, useState } from "react";

import $ from "jquery";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStateContext } from "../../contexts/contextProvider";
import { CgMenuCheese } from "react-icons/cg";
import { table_dropdown_focuseddClassMaintain } from "../../utils/spinner/focusClassMaintain/focusClass";

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
    } else {
      setIsCreateTableBtnDisabled(false);
    }
    // if (
    //   focusseddDiv?.firstChild?.hasChildNodes() &&
    //   focusseddDiv?.firstChild?.firstChild?.classList?.contains(
    //     "row_col_add_div"
    //   )
    // ) {
    //   setIsDisableTableRightMenu(true);
    // }
  }, [isCreateTableBtnDisabled]);
  //
  function habdleTableUpdateBtn(e) {
    // let allDiv = document.getElementsByClassName("focussedd");
    // for (let i = 0; i < allDiv.length; i++) {
    //   allDiv[i].classList.remove("focussedd");
    // }
    // e.target.parentElement.parentElement.classList.add("focussedd");
    table_dropdown_focuseddClassMaintain(e);

    const focussedDiv = document.querySelector(".focussedd");
    const icon_div = document.querySelector(".icon_div");
    // console.log("child nodes", icon_div.childNodes);
    if (focussedDiv.firstChild.childNodes.length == 1) {
      const tableMenuParentDiv = document.createElement("div");

      const insertRabove = document.createElement("div");
      insertRabove.innerHTML = "<strong> + </strong> Insert Row Above";
      insertRabove.onclick = handleAddRowAbove;
      const insertRbelow = document.createElement("div");
      insertRbelow.innerHTML = "<strong> + </strong> Insert Row Below";
      insertRbelow.onclick = handleAddRowBelow;
      const insertColToLeft = document.createElement("div");
      insertColToLeft.innerHTML = "<strong> + </strong> Insert Col to Left";
      insertColToLeft.onclick = handleAddColumnLeft;
      const insertColToRight = document.createElement("div");
      insertColToRight.innerHTML = "<strong> + </strong> Insert Col to Right";
      insertColToRight.onclick = handleAddColumnRight;

      const hrParentDiv = document.createElement("div");
      const hrElement = document.createElement("hr");
      hrParentDiv.appendChild(hrElement);

      const hrParentDivMid = document.createElement("div");
      const hrElementMid = document.createElement("hr");
      hrParentDivMid.appendChild(hrElementMid);

      const deleteRow = document.createElement("div");
      deleteRow.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Row</span>';
      deleteRow.onclick = handleAddRowAbove;

      const deleteColumn = document.createElement("div");
      deleteColumn.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Column</span>';
      deleteColumn.onclick = handleAddRowAbove;

      const deleteTable = document.createElement("div");
      deleteTable.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Table</span>';
      deleteTable.onclick = removeTable;

      const hrParentDivBottom = document.createElement("div");
      const hrElementBottom = document.createElement("hr");
      hrParentDivBottom.appendChild(hrElementBottom);

      tableMenuParentDiv.prepend(
        hrParentDiv,
        insertRabove,
        insertRbelow,
        insertColToLeft,
        insertColToRight,
        hrParentDivMid,
        deleteRow,
        deleteColumn,
        deleteTable,
        hrParentDivBottom
      );

      // tableMenuParentDiv.appendChild(hrParentDivMid);
      tableMenuParentDiv.className = "table_menu_update";
      tableMenuParentDiv.style.backgroundColor = "#fff";
      tableMenuParentDiv.style.borderRadius = "10px";
      tableMenuParentDiv.style.boxShadow = "-6px 7px 10px";
      tableMenuParentDiv.style.width = "185px";
      tableMenuParentDiv.style.position = "absolute";
      tableMenuParentDiv.style.right = "7px";
      tableMenuParentDiv.style.top = "30px";
      tableMenuParentDiv.style.padding = "10px 15px";
      tableMenuParentDiv.style.textAlign = "left";
      tableMenuParentDiv.style.zIndex = 2;
      focussedDiv.firstChild.appendChild(tableMenuParentDiv);
    } else {
      focussedDiv?.firstChild?.childNodes[1]?.remove();
    }
  }

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

        // console.log("cells[i]", cells[i].classList.contains("dropp"));
        cells[i].ondrop = handleDropp;
        document.getElementById("rows").value = "";
        document.getElementById("cols").value = "";
      }
    }
    const iconDiv = document.createElement("div");

    // iconDiv.style.width = `${(cells?.length / 2) * 100}px`;
    iconDiv.className = "icon_div";
    iconDiv.style.textAlign = "right";
    iconDiv.style.position = "absolute";
    iconDiv.style.top = "-5px";
    iconDiv.style.right = "-20px";
    iconDiv.style.zIndex = "2";
    // iconDiv.style.padding = "5px 10px";
    iconDiv.innerHTML =
      '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6Z" fill="currentColor"></path><path d="M3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" fill="currentColor"></path><path d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H10.2625L7.61456 15.6479L4.96662 13H4C3.44772 13 3 12.5523 3 12Z" fill="currentColor"></path></svg>';
    iconDiv.style.cursor = "pointer";
    iconDiv.onclick = habdleTableUpdateBtn;
    // iconDiv.appendChild(<CgMenuCheese />);
    // tableDiv.style.top = "30px";
    tableDiv?.parentElement?.prepend(iconDiv);
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
      addRowBtn.onclick = handleAddRowBelow;

      var addColBtn = document.createElement("BUTTON");
      addColBtn.onclick = handleAddColumnRight;
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

  const handleAddRowBelow = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");

    let findTArgetElement = focusseddDiv;

    while (1) {
      if (findTArgetElement.classList.contains("tableInput")) {
        // findTArgetElement.classList.add("focussedd");
        break;
      } else {
        findTArgetElement = findTArgetElement.children[1];
      }
    }

    // if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
    const editableTable = findTArgetElement?.children[0];
    console.log("findTArgetElement", findTArgetElement, editableTable);
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = numOfTd / numOfTr;
    for (var rowIndex = 0; rowIndex < 1; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < numOfCol; colIndex++) {
        console.log("numOfCol", numOfTr, numOfTd, numOfCol);
        var td = document.createElement("td");
        td.className = "dropp";
        // td.style.height = "50px";
        // if (colIndex == numOfCol - 1) {
        //   const rowDeleteBtn = document.createElement("button");
        //   rowDeleteBtn.className = "btn btn-warning";
        //   rowDeleteBtn.style.marginLeft = "5px";
        //   rowDeleteBtn.innerText = "Del Row";
        //   rowDeleteBtn.onclick = (e) => {
        //     e.target?.parentElement?.parentElement?.remove();
        //     e.stopPropagation();
        //   };
        //   td.style.border = "none";
        //   // td.style.background = "#fff";
        //   td.appendChild(rowDeleteBtn);
        // }
        td.ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        td.ondragleave = (e) => {
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

        // console.log("td", td.classList.contains("dropp"));
        td.ondrop = handleDropp;
        tr.appendChild(td);
      }
      editableTable.appendChild(tr);
    }
    e.stopPropagation();
    // }
  };

  const handleAddRowAbove = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");

    let findTArgetElement = focusseddDiv;

    while (1) {
      if (findTArgetElement.classList.contains("tableInput")) {
        // findTArgetElement.classList.add("focussedd");
        break;
      } else {
        findTArgetElement = findTArgetElement.children[1];
      }
    }

    // if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
    const editableTable = findTArgetElement?.children[0];
    console.log("findTArgetElement", findTArgetElement, editableTable);
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = numOfTd / numOfTr;
    for (var rowIndex = 0; rowIndex < 1; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < numOfCol; colIndex++) {
        console.log("numOfCol", numOfTr, numOfTd, numOfCol);
        var td = document.createElement("td");
        td.className = "dropp";
        // td.style.height = "50px";
        // if (colIndex == numOfCol - 1) {
        //   const rowDeleteBtn = document.createElement("button");
        //   rowDeleteBtn.className = "btn btn-warning";
        //   rowDeleteBtn.style.marginLeft = "5px";
        //   rowDeleteBtn.innerText = "Del Row";
        //   rowDeleteBtn.onclick = (e) => {
        //     e.target?.parentElement?.parentElement?.remove();
        //     e.stopPropagation();
        //   };
        //   td.style.border = "none";
        //   // td.style.background = "#fff";
        //   td.appendChild(rowDeleteBtn);
        // }
        td.ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        td.ondragleave = (e) => {
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

        // console.log("td", td.classList.contains("dropp"));
        td.ondrop = handleDropp;
        tr.prepend(td);
      }
      editableTable.prepend(tr);
    }
    e.stopPropagation();
    // }
  };
  const handleAddColumnRight = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    let findTArgetElement = focusseddDiv;

    while (1) {
      if (findTArgetElement.classList.contains("tableInput")) {
        // findTArgetElement.classList.add("focussedd");
        break;
      } else {
        findTArgetElement = findTArgetElement.children[1];
      }
    }
    // if (focusseddDiv?.children[1]?.classList.contains("tableInput")) {
    const editableTable = findTArgetElement?.children[0];
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = (numOfTd + 1) / numOfTr;
    for (var rowIndex = 0; rowIndex < numOfTr; rowIndex++) {
      var td = document.createElement("td");
      td.className = "dropp";
      td.style.height = "50px";
      // if (rowIndex == 0) {
      //   const colDeleteBtn = document.createElement("button");
      //   colDeleteBtn.className = "btn btn-warning";
      //   colDeleteBtn.style.marginLeft = "5px";
      //   colDeleteBtn.innerText = "Del Col";
      //   colDeleteBtn.onclick = (e) => {
      //     const index = Array.from(
      //       e.target.parentElement.parentElement.children
      //     ).indexOf(e.target.parentElement);
      //     const allTableTr = editableTable.querySelectorAll("tr");
      //     for (let i = 0; i < allTableTr.length; i++) {
      //       editableTable.querySelectorAll("tr")[i].childNodes[index].remove();
      //     }
      //     e.stopPropagation();
      //   };
      //   td.style.border = "none";
      //   td.appendChild(colDeleteBtn);
      // }
      td.ondragover = function (e) {
        e.preventDefault();
        e.target.classList.add("table_drag");
        if (!e.target.hasChildNodes()) {
          e.target.style.border = "3px solid blue";
        }
        if (e.target.classList.contains("imageInput")) {
          e.target.style.border = "none";
        }
      };
      td.ondragleave = (e) => {
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

      // console.log("cells", cells.classList.contains("dropp"));
      td.ondrop = handleDropp;
      const allTrs = editableTable.querySelectorAll("tr");
      allTrs[rowIndex].appendChild(td);

      // allTrs[rowIndex].insertBefore(td, allTrs[rowIndex].lastChild);
    }
    e.stopPropagation();
    // }
  };

  const handleAddColumnLeft = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    let findTArgetElement = focusseddDiv;

    while (1) {
      if (findTArgetElement.classList.contains("tableInput")) {
        // findTArgetElement.classList.add("focussedd");
        break;
      } else {
        findTArgetElement = findTArgetElement.children[1];
      }
    }
    // if (focusseddDiv?.children[1]?.classList.contains("tableInput")) {
    const editableTable = findTArgetElement?.children[0];
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = (numOfTd + 1) / numOfTr;
    for (var rowIndex = 0; rowIndex < numOfTr; rowIndex++) {
      var td = document.createElement("td");
      td.className = "dropp";
      td.style.height = "50px";
      // if (rowIndex == 0) {
      //   const colDeleteBtn = document.createElement("button");
      //   colDeleteBtn.className = "btn btn-warning";
      //   colDeleteBtn.style.marginLeft = "5px";
      //   colDeleteBtn.innerText = "Del Col";
      //   colDeleteBtn.onclick = (e) => {
      //     const index = Array.from(
      //       e.target.parentElement.parentElement.children
      //     ).indexOf(e.target.parentElement);
      //     const allTableTr = editableTable.querySelectorAll("tr");
      //     for (let i = 0; i < allTableTr.length; i++) {
      //       editableTable.querySelectorAll("tr")[i].childNodes[index].remove();
      //     }
      //     e.stopPropagation();
      //   };
      //   td.style.border = "none";
      //   td.appendChild(colDeleteBtn);
      // }
      td.ondragover = function (e) {
        e.preventDefault();
        e.target.classList.add("table_drag");
        if (!e.target.hasChildNodes()) {
          e.target.style.border = "3px solid blue";
        }
        if (e.target.classList.contains("imageInput")) {
          e.target.style.border = "none";
        }
      };
      td.ondragleave = (e) => {
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

      // console.log("cells", cells.classList.contains("dropp"));
      td.ondrop = handleDropp;
      const allTrs = editableTable.querySelectorAll("tr");
      allTrs[rowIndex].prepend(td);

      // allTrs[rowIndex].insertBefore(td, allTrs[rowIndex].lastChild);
    }
    e.stopPropagation();
    // }
  };
  function removeTable() {
    const focusseddElmnt = document.querySelector(".focussedd");

    var child = focusseddElmnt.lastElementChild;
    while (child) {
      if (focusseddElmnt.classList.contains("holderDIV")) {
        focusseddElmnt.removeChild(child);
        child = focusseddElmnt.lastElementChild;
      }
    }

    // if (focusseddElmnt.classList.contains("dropp")) {
    //   document.querySelector(".focussedd").remove();
    // }
    // if (focusseddElmnt.classList.contains("holderDIV")) {
    //   document.querySelector(".focussedd").remove();
    // }
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
