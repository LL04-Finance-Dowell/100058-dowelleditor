import React, { useRef } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import {
  BiFont,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
} from "react-icons/bi";
import { MdBorderColor, MdFormatColorFill } from "react-icons/md";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineFontColors,
} from "react-icons/ai";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaOutdent,
  FaIndent,
  FaListUl,
  FaListOl,
} from "react-icons/fa";
import { useStateContext } from "../../contexts/contextProvider";

const AlignRightSide = () => {
  const {
    bold,
    setBold,
    italic,
    setItalic,
    underline,
    setUnderline,
    strikethrough,
    setStrikethrough,
  } = useStateContext();

  // function boldCommand() {
  //   const strongElement = document.createElement("em");
  //   const userSelection = window.getSelection();
  //   const selectedTextRange = userSelection.getRangeAt(0);
  //   selectedTextRange.surroundContents(strongElement);
  // }

  var changeFontFamily = (ev) => {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);

    console.log(selectedTextRange);
    selectedTextRange.style.fontFamily = `${ev.target.value}`;
  };

  const handleBold = () => {
    setBold(!bold);
    document.execCommand("bold");
  };
  const handleItalic = () => {
    setItalic(!italic);
    document.execCommand("italic");
  };
  const handleUnderline = () => {
    setUnderline(!underline);
    document.execCommand("underline");
  };
  const handleStrikethrough = () => {
    setStrikethrough(!strikethrough);
    document.execCommand("strikeThrough");
  };
  const handleFontColor = () => {
    document.execCommand("forecolor", false);
  };
  const handleRightAlign = () => {
    document.execCommand("justifyRight");
  };
  const handleLeftAlign = () => {
    document.execCommand("justifyLeft");
  };
  const handleMiddleAlign = () => {
    document.execCommand("justifyCenter");
  };
  const handleOrderedList = () => {
    document.execCommand("insertOrderedList");
  };
  const handleUnorderedList = () => {
    document.execCommand("insertUnorderedList");
  };
  const handleOutdent = () => {
    document.execCommand("outdent");
  };
  const handleIndent = () => {
    document.execCommand("indent");
  };

  const handleIncreaseSize = () => {
    document.execCommand("increaseFontSize");
  };
  const handleDecreaseSize = () => {
    document.execCommand("decreaseFontSize");
  };

  function handleSizing(event) {
    var sel = document.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "font-size:" + event.target.value + "pt" + ";";
      e.innerHTML = sel.toString();

      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  }

  function changeFont(font) {
    var sel = document.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "font-family:" + font.target.value + ";";
      e.innerHTML = sel.toString();

      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  }

  function changeFontColor(font) {
    var sel = document.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "color:" + font.target.value + ";";
      e.innerHTML = sel.toString();

      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  }

  function changeBgColor(font) {
    const textDiv = document.getElementsByClassName("textInput").item(0);

    textDiv.style = "background-color:" + font.target.value + ";";
  }

  function changeFontTBgColor(font) {
    var sel = document.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "background-color:" + font.target.value + ";";
      e.innerHTML = sel.toString();

      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  }

  //

  // selectElement.addEventListener('change', (event) => {
  //   const userSelection = window.getSelection();
  //   const selectedTextRange = userSelection.getRangeAt(0);
  //   selectedTextRange.style.size = `${event.target.value} pt`;
  // });

  function showColorInput() {
    const fontColor = document.getElementById("colorInputColor");
    console.log(fontColor);
    if (fontColor.style.diplay === "none") {
      fontColor.style.display = "block";
    } else {
      fontColor.style.display = "block";
    }
  }
  function showBgColorInput() {
    const BgColor = document.getElementById("colorBgInputColor");
    if (BgColor.style.diplay === "none") {
      BgColor.style.display = "block";
    } else {
      BgColor.style.display = "block";
    }
  }
  function showTBgColorInput() {
    const tBgColor = document.getElementById("colorTBgInputColor");
    if (tBgColor.style.diplay === "none") {
      tBgColor.style.display = "block";
    } else {
      tBgColor.style.display = "block";
    }
  }

  function removeTextBox() {
    document.querySelector(".focussedd").remove();
  }

  return (
    <div className="align" style={{ overflowY: "scroll", height: "450px" }}>
      <Container fluid className="m-0 p-0">
        <Row className="pt-0">
          <Col>
            <h6>Font Style</h6>
            <select
              id="select_font"
              className="shadow bg-white rounded w-100 h-50"
              onChange={changeFont}
            >
              <option value="Arial">Arial</option>
              <option value="Sans Serif" selected>
                Sans Serif
              </option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Impact">Impact</option>
              <option value="Bookman">Bookman</option>
              <option value="Garamond">Garamond</option>
              <option value="Palatino">Palatino</option>
              <option value="Georgia">Georgia</option>
            </select>
          </Col>
        </Row>

        <Row className="pt-4">
          <h6>Font Size</h6>
          <Col>
            <select
              onChange={handleSizing}
              className="shadow bg-white rounded w-100 h-75 "
              id="font-sizing"
              style={{ marginTop: "8px" }}
            >
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12" selected="selected">
                12
              </option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
          </Col>
          <Col>
            <Button
              variant="white"
              onClick={handleIncreaseSize}
              className="shadow bg-white rounded"
            >
              <BiFont onClick={handleIncreaseSize} color="gray" size={16} />{" "}
              <AiOutlineArrowUp color="gray" size={20} />
            </Button>
          </Col>
          <Col>
            <Button
              variant="white"
              onClick={handleDecreaseSize}
              className="shadow bg-white rounded"
            >
              <BiFont color="gray" size={16} />{" "}
              <AiOutlineArrowDown color="gray" size={16} />
            </Button>
          </Col>
        </Row>

        <hr />
        {/* Text formatting row */}
        <Row className="pt-0">
          <h6>Text Formatting</h6>
          <Col>
            <Button onClick={handleBold} variant="white">
              <FaBold color="gray" size={20} />
            </Button>
          </Col>

          <Col>
            <Button onClick={handleItalic} variant="white">
              <FaItalic color="gray" size={20} />
            </Button>
          </Col>

          <Col>
            <Button onClick={handleUnderline} variant="white">
              <FaUnderline color="gray" size={20} />
            </Button>
          </Col>

          <Col>
            <Button onClick={handleStrikethrough} variant="white">
              <FaStrikethrough color="gray" size={20} />
            </Button>
          </Col>
        </Row>
        {/* <hr /> */}

        {/* Text color */}
        <Row className="pt-0">
          {/* <h6>Text Color</h6> */}
          <Col className="col-lg-4">
            <Button variant="white" onClick={showColorInput}>
              <AiOutlineFontColors color="purple" size={30} />
            </Button>
            <input
              type="color"
              id="colorInputColor"
              onChange={changeFontColor}
              style={{ display: "none" }}
            />
          </Col>

          <Col className="col-lg-4">
            <Button variant="white" onClick={showTBgColorInput}>
              <MdBorderColor color="green" size={30} />
            </Button>
            <input
              type="color"
              id="colorTBgInputColor"
              onChange={changeFontTBgColor}
              style={{ display: "none" }}
            />
          </Col>

          <Col className="col-lg-4">
            <Button variant="white" onClick={showBgColorInput}>
              <MdFormatColorFill color="blue" size={30} />
            </Button>
            <input
              type="color"
              id="colorBgInputColor"
              onChange={changeBgColor}
              style={{ display: "none" }}
            />
          </Col>
        </Row>

        <hr />

        {/* Text alignment */}
        <Row className="pt-0">
          <h6>Text Alignment</h6>
          <Row className="pt-0 ms-1">
            <Col className="mx-0 p-0 ">
              <Button onClick={handleLeftAlign} variant="white">
                <BiAlignLeft color="gray" size={20} />
              </Button>
            </Col>

            <Col className="mx-0 p-0">
              <Button onClick={handleMiddleAlign} variant="white">
                <BiAlignMiddle color="gray" size={20} />
              </Button>
            </Col>

            <Col className="mx-0 p-0">
              <Button onClick={handleRightAlign} variant="white">
                <BiAlignRight color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={handleOutdent} variant="white">
                <FaOutdent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={handleIndent} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={handleUnorderedList} variant="white">
                <FaListUl color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={handleOrderedList} variant="white">
                <FaListOl color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => {}} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => {}} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => {}} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => {}} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
          </Row>
        </Row>

        <hr />

        <Row className="pt-0">
          {/* <div className='dropdown'>
            <h6>User permissions</h6>
            <select className='shadow bg-white rounded w-100 h-50'>
              <option value="Nothing Selected" selected="selected">Nothing Selected</option>
              <option value="Action">Action</option>
              <option value="Another action">Another action</option>
              <option value="Something else">Something else</option>
            </select>
          </div> */}

          <div className="mt-3 text-center">
            <Button variant="primary" onClick={removeTextBox}>
              Remove TextBox
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default AlignRightSide;
