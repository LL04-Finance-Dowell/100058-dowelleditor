/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./AlignRightSide.css";

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

import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import SelectAnsAndQuestion from "../selectAnsAndQuestion";
import RemoveElmentModal from "../RemoveElementModal";

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
    borderSize,
    setBorderSize,
    inputBorderColor,
    setInputBorderColor,
    inputBorderSize,
    setInputBorderSize
  } = useStateContext();
  const [selectedType, setSelectedType] = useState("")
  const [addedAns, setAddedAns] = useState([])
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  const [isWindowHightSmall, setIsWindowHightSmall] = useState(false);
  // const [borderSize, setBorderSize] = useState(
  //   // Number(localStorage.getItem("alignSize")) ||
  //    0
  // );
  // const [borderColor, setBorderColor] = useState(
  //   "gray"
  // );
  // const [borderColor, setBorderColor] = useState("#000000");
  const [showSlider, setShowSlider] = useState(false);

  const { confirmRemove, setConfirmRemove } = useStateContext()


  // function boldCommand() {
  //   const strongElement = document.createElement("em");
  //   const userSelection = window.getSelection();
  //   const selectedTextRange = userSelection.getRangeAt(0);
  //   selectedTextRange.surroundContents(strongElement);
  // }

  var changeFontFamily = (ev) => {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);

    //console.log(selectedTextRange);
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


  let currentFontSize = 16;
  const handleIncreaseSize = (size) => {
    // document.execCommand("increaseFontSize");
//  console.log("increasing Font Size")
    var sel = document.getElementsByClassName("focussed")[0];
    // console.log("selection", sel)

    // selectBtn.addEventListener("click", () => {
      currentFontSize += 2;
      sel.style.fontSize = currentFontSize + "px";
    // })



    // let selection = document.getSelection();

    // let selectedHtml = "";
    // if(selection.rangeCount) {
    //   let textContainer = document.querySelector(".focussedd")
    //   for (let i = 0; i < selection.rangeCount; i++) {
    //     textContainer.appendChild(selection.getRangeAt(i).cloneContents())
    //   }

    //   const children = textContainer.getElementsByClassName("textInput")
    //   for (let child of children) {
    //     if(child.style.fontSize) {
    //       child.style.fontSize = `${size}px`
    //     }
        
    //   }

    //   selectedHtml = textContainer.innerHTML;

    
    //   console.log("getting text Input", children);
    //   console.log("getting text container", textContainer)
    // }

    // let html = `<div style="font-size: ${size}px">${selectedHtml}</div>`
    // document.execCommand('insertHTML', false, html)

  };


  const handleDecreaseSize = () => {
    // document.execCommand("decreaseFontSize");

    var sel = document.getElementsByClassName("focussed")[0];
    currentFontSize -= 2;
    sel.style.fontSize = currentFontSize + "px";

    
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
    //console.log(fontColor);
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
    // document.querySelector('.focussedd').remove();
    if (document.querySelector(".focussedd").classList.contains("dropp")) {
      if (document.querySelector(".focussedd").hasChildNodes()) {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++) {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else {
      document.querySelector(".focussedd").remove();
    }
  }

  const handleBorderSizeChange = (e) => {
    setInputBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${e.target.value}px`;
    console.log("border Slide", e.target.value)

  };
  // const handleBorderColorBlur = () => {
  //   document.getElementById("box").style.borderColor = borderColor;
  // };

  // const handleSliderChange = (event) => {
  //   setBorderWidth(event.target.value);
  //   document.getElementById("box").style.borderWidth = event.target.value + 'px';
  // };

  const handleRangeBlur = (e) => {
    e.target.focus();
  };
  const handleBorderColorChange = (e) => {
    setInputBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${e.target.value}`;
  };

  // console.log("handling color", inputBorderColor);

  // const handleCheckedBorder = (e) => {
  //   if()
  // }


  useEffect(() => {
    const windowHeight = window.innerHeight;
    const elementHight = document.querySelector(".align");
    if (elementHight) {
      if (elementHight.offsetHeight > windowHeight) {
        setIsWindowHightSmall(true);
      }
    }
  }, []);
  return (
    <div
      className="align"
      style={{
        height: isWindowHightSmall && `${window.innerHeight - 100}px`,
        overflowY: isWindowHightSmall && `auto`,
        overflowX: "hidden",
      }}
    >
      <Container fluid className="px-2 p-0">
        <Row className="pt-0">
          <Col>
            <h6>Font Style</h6>
            <select
              id="select_font"
              className="bg-white border-0 rounded w-100 h-75 select"
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
              <option value="Calibri">Calibri</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Century Gothic">Century Gothic</option>
              <option value="Futura">Futura</option>
              <option value="Myriad Pro">Myriad Pro</option>
              <option value="Proxima Nova">Proxima Nova</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Baskerville">Baskerville</option>
              <option value="Rockwell">Rockwell</option>
              <option value="Franklin Gothic">Franklin Gothic</option>
              <option value="Trade Gothic">Trade Gothic</option>
              <option value="Gotham">Gotham</option>
              <option value="Univers">Univers</option>
              <option value="Copperplate Gothic">Copperplate Gothic</option>
              <option value="Optima">Optima</option>
              <option value="Didot">Didot</option>
            </select>
          </Col>
        </Row>

        <Row className="pt-4">
          <h6 className="my-3">Font Size</h6>
          <Col className="">
            <select
              onChange={handleSizing}
              className="select border-0 bg-white rounded font-sizing"
              id="font-sizing"
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
              <option value="22">22</option>
              <option value="24">24</option>
              <option value="26">26</option>
              <option value="28">28</option>
              <option value="30">30</option>
              <option value="32">32</option>
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
              <option value="40">40</option>
              <option value="42">42</option>
              <option value="44">44</option>
              <option value="46">46</option>
              <option value="48">48</option>
              <option value="50">50</option>
              <option value="52">52</option>
              <option value="54">54</option>
              <option value="56">56</option>
              <option value="58">58</option>
              <option value="60">60</option>
              <option value="62">62</option>
              <option value="64">64</option>
              <option value="66">66</option>
              <option value="68">68</option>
              <option value="70">70</option>
              <option value="72">72</option>
              <option value="74">74</option>
              <option value="76">76</option>
              <option value="78">78</option>
              <option value="80">80</option>
              <option value="82">82</option>
              <option value="84">84</option>
              <option value="86">86</option>
              <option value="88">88</option>
              <option value="90">90</option>
              <option value="92">92</option>
              <option value="94">94</option>
              <option value="96">96</option>
              <option value="98">98</option>
              <option value="100">100</option>
              <option value="102">102</option>
              <option value="104">104</option>
              <option value="106">106</option>
              <option value="108">108</option>
              <option value="110">110</option>
              <option value="112">112</option>
              <option value="114">114</option>
              <option value="116">116</option>
              <option value="118">118</option>
              <option value="120">120</option>
              <option value="122">122</option>
              <option value="124">124</option>
              <option value="126">126</option>
              <option value="128">128</option>
              <option value="130">130</option>
              <option value="132">132</option>
              <option value="134">134</option>
              <option value="136">136</option>
              <option value="138">138</option>
              <option value="140">140</option>
              <option value="142">142</option>
              <option value="144">144</option>
              <option value="146">146</option>
              <option value="148">148</option>
              <option value="150">150</option>
              <option value="152">152</option>
              <option value="154">154</option>
              <option value="156">156</option>
              <option value="158">158</option>
              <option value="160">160</option>
              <option value="162">162</option>
              <option value="164">164</option>
              <option value="166">166</option>
              <option value="168">168</option>
              <option value="170">170</option>
              <option value="172">172</option>
              <option value="174">174</option>
              <option value="176">176</option>
              <option value="178">178</option>
              <option value="180">180</option>
              <option value="182">182</option>
              <option value="184">184</option>
              <option value="186">186</option>
              <option value="188">188</option>
              <option value="190">190</option>
              <option value="192">192</option>
              <option value="194">194</option>
              <option value="196">196</option>
              <option value="198">198</option>
              <option value="200">200</option>
              <option value="202">202</option>
              <option value="204">204</option>
              <option value="206">206</option>
              <option value="208">208</option>
              <option value="210">210</option>
              <option value="212">212</option>
              <option value="214">214</option>
              <option value="216">216</option>
              <option value="218">218</option>
              <option value="220">220</option>
              <option value="222">222</option>
              <option value="224">224</option>
              <option value="226">226</option>
              <option value="228">228</option>
              <option value="230">230</option>
              <option value="232">232</option>
              <option value="234">234</option>
              <option value="236">236</option>
              <option value="238">238</option>
              <option value="240">240</option>
              <option value="242">242</option>
              <option value="244">244</option>
              <option value="246">246</option>
              <option value="248">248</option>
              <option value="250">250</option>
              <option value="252">252</option>
              <option value="254">254</option>
              <option value="256">256</option>
              <option value="258">258</option>
              <option value="260">260</option>
              <option value="262">262</option>
              <option value="264">264</option>
              <option value="266">266</option>
              <option value="268">268</option>
              <option value="270">270</option>
              <option value="272">272</option>
              <option value="274">274</option>
              <option value="276">276</option>
              <option value="278">278</option>
              <option value="280">280</option>
              <option value="282">282</option>
              <option value="284">284</option>
              <option value="286">286</option>
              <option value="288">288</option>
              <option value="290">290</option>
              <option value="292">292</option>
              <option value="294">294</option>
              <option value="296">296</option>
              <option value="298">298</option>
              <option value="300">300</option>

            </select>
          </Col>
          <Col>
            <Button
              variant="white"
              onClick={handleIncreaseSize}
              className="d-flex select bg-white rounded size-btn selectionBtn"
            >
              <BiFont color="gray" />
              <AiOutlineArrowUp color="gray" />
            </Button>
          </Col>
          <Col>
            <Button
              variant="white"
              onClick={handleDecreaseSize}
              className="d-flex select bg-white rounded size-btn"
            >
              <BiFont color="gray" size={16} />{" "}
              <AiOutlineArrowDown color="gray" size={16} />
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="pt-4">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h6 style={{ marginRight: "10rem" }}>Border</h6>
            <label className="switch">
              <input type="checkbox" onClick={() => setShowSlider(!showSlider)} checked={!showSlider?false:true}/>
              <span className="slider round"></span>
            </label>
          </div>
          {showSlider && (
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#abab", gap: "10px", height: "40px", width: "90%" }}>
              <input
                type="color"
                value={inputBorderColor}
                onChange={handleBorderColorChange}
                id="color"
                style={{ border: "none", width: "10%", height: "15px" }}
              />
              <input
                type="range"
                min="0"
                max="20"
                value={inputBorderSize}
                onChange={handleBorderSizeChange}
                onBlur={handleRangeBlur}
                id="range"
                className="form-range"
              />

            </div>
          )}
        </Row>

        <hr />
        {/* Text formatting row */}
        <Row className="pt-0">
          <h6>Text Formatting</h6>
          <Col>
            <Button onClick={handleBold} variant="white">
              <FaBold color="gray" />
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
              <AiOutlineFontColors color="purple" size={40} />
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
              <Button onClick={() => { }} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => { }} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => { }} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
            <Col className="mx-0 p-0">
              <Button onClick={() => { }} variant="white">
                <FaIndent color="gray" size={20} />
              </Button>
            </Col>
          </Row>
        </Row>

        <hr />

        <SelectAnsAndQuestion
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          setAddedAns={setAddedAns}
          addedAns={addedAns}
        />
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
            <Button
              variant="primary"
              // onClick={removeTextBox}
              onClick={() => setConfirmRemove(!confirmRemove)}
              className={decoded.details.action === "template" ? "remove_button" : "remove_button disable_button"}
            >
              Remove TextBox
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default AlignRightSide;
