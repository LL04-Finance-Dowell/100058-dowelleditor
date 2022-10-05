import React, { useRef } from 'react'

import { Container, Row, Col } from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { BiFont, BiAlignLeft, BiAlignMiddle, BiAlignRight } from 'react-icons/bi';
import { MdBorderColor, MdFormatColorFill } from 'react-icons/md';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineFontColors } from 'react-icons/ai';
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
import { useStateContext } from '../../contexts/contextProvider';


const AlignRightSide = () => {
  const { bold, setBold, italic, setItalic, underline, setUnderline, strikethrough, setStrikethrough } = useStateContext();


  // function boldCommand() {
  //   const strongElement = document.createElement("em");
  //   const userSelection = window.getSelection();
  //   const selectedTextRange = userSelection.getRangeAt(0);
  //   selectedTextRange.surroundContents(strongElement);
  // }

  var changeFontFamily = (font) => {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);

    console.log(selectedTextRange);
    selectedTextRange.style.fontFamily= font.value;
  }

  const handleBold = () => {
    setBold(!bold)
    document.execCommand("bold")
  }
  const handleItalic = () => {
    setItalic(!italic)
    document.execCommand("italic")
  }
  const handleUnderline = () => {
    setUnderline(!underline)
    document.execCommand("underline")
  }
  const handleStrikethrough = () => {
    setStrikethrough(!strikethrough)
    document.execCommand("strikeThrough")
  }
  const handleFontColor = () => {
    document.execCommand("forecolor", false)
  }
  const handleRightAlign = () => {
    document.execCommand("justifyRight")
  }
  const handleLeftAlign = () => {
    document.execCommand("justifyLeft")
  }
  const handleMiddleAlign = () => {
    document.execCommand("justifyCenter")
  }
  const handleOrderedList = () => {
    document.execCommand("insertOrderedList")
  }
  const handleUnorderedList = () => {
    document.execCommand("insertUnorderedList")
  }
  const handleOutdent = () => {
    document.execCommand("outdent")
  }
  const handleIndent = () => {
    document.execCommand("indent")
  }

  const handleIncreaseSize = () => {
    document.execCommand("increaseFontSize")
  }
  const handleDecreaseSize = () => {
    document.execCommand("decreaseFontSize")
  }

  



  return (

    <div className='align'>
      <Container fluid className='m-0 p-0' >
        <Row className='pt-2'>
          <Col >
            <h6>Font Style</h6>
            <select onChange="changeFontFamily (this);"  className ='shadow bg-white rounded w-100 h-75'>
              <option value="Times New Roman" selected="selected">Times New Roman</option>
              <option value="Arial">Arial</option>
              <option value="fantasy">fantasy</option>
              <option value="cursive">cursive</option>
            </select>
           
          </Col>
        </Row>

        <Row className='pt-4'>
          <h6>Font Size</h6>
          <Col>
            <DropdownButton variant="" id="" title="12" className ='shadow bg-white rounded'>
              <Dropdown.Item href="#/action-1">8</Dropdown.Item>
              <Dropdown.Item href="#/action-2">10</Dropdown.Item>
              <Dropdown.Item href="#/action-3">12</Dropdown.Item>
              <Dropdown.Item href="#/action-3">14</Dropdown.Item>
              <Dropdown.Item href="#/action-3">16</Dropdown.Item>
              <Dropdown.Item href="#/action-3">18</Dropdown.Item>
              <Dropdown.Item href="#/action-3">20</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <Button variant="white" onClick={handleIncreaseSize} className ='shadow bg-white rounded'>
              <BiFont onClick={handleIncreaseSize} color='gray' size={16} /> <AiOutlineArrowUp color='gray' size={20} />
            </Button>
          </Col>
          <Col>
            <Button variant="white" onClick={handleDecreaseSize} className ='shadow bg-white rounded'>
              <BiFont color='gray' size={20} /> <AiOutlineArrowDown color='gray' size={16} />
            </Button>
          </Col>
        </Row>

    <hr />
        {/* Text formatting row */}
        <Row className='pt-4' >
          <h6>Text Formatting</h6>
          <Col>
            <Button onClick={handleBold} variant='white'><FaBold color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button onClick={handleItalic} variant='white'><FaItalic color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button onClick={handleUnderline} variant='white'><FaUnderline color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button onClick={handleStrikethrough} variant='white'><FaStrikethrough color='gray' size={20} /></Button>
          </Col>
        </Row>
        <hr />

        {/* Text color */}
        <Row className='pt-4'>
          <h6>Text Color</h6>
          <Col>
            <Button onInput={handleFontColor} variant='white'><AiOutlineFontColors color='purple' size={30} /></Button>
          </Col>

          <Col>
            <Button variant='white'><MdBorderColor color='green' size={25} /></Button>
          </Col>

          <Col>
            <Button variant='white'><MdFormatColorFill color='blue' size={25} /></Button>
          </Col>
        </Row>

        <hr />

        {/* Text alignment */}
        <Row className='pt-4'>
          <h6>Text Alignment</h6>
          <Col className='mx-0 p-0' >
            <Button onClick={handleLeftAlign} variant='white'><BiAlignLeft color='gray' size={20} /></Button>
          </Col>

          <Col className='mx-0 p-0'>
            <Button onClick={handleMiddleAlign} variant='white'><BiAlignMiddle color='gray' size={20} /></Button>
          </Col>

          <Col className='mx-0 p-0'>
            <Button onClick={handleRightAlign} variant='white'><BiAlignRight color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={handleOutdent} variant='white'><FaOutdent color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={handleIndent} variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={handleUnorderedList} variant='white'><FaListUl color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={handleOrderedList} variant='white'><FaListOl color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={() => { }} variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={() => { }} variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={() => { }} variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col className='mx-0 p-0'>
            <Button onClick={() => { }} variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>

        </Row>

        <hr />

        <Row className='pt-4'>
          <div className='dropdown'>
            <h6>User permissions</h6>
            <select  className ='shadow bg-white rounded w-100 h-75'>
              <option value="Nothing Selected" selected="selected">Nothing Selected</option>
              <option value="Action">Action</option>
              <option value="Another action">Another action</option>
              <option value="Something else">Something else</option>
            </select>
          </div>

          
          <div className='mt-5 text-center'>
            <Button variant="primary"  >Remove Formatting</Button>
          </div>

        </Row>

      </Container>
    </div>

  )
}

export default AlignRightSide