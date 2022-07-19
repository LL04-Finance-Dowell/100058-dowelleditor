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


const AlignRightSide = () => {

  return (

    <div className='align'>
      <Container fluid>
        <Row>
          <Col>
            <Form.Label>Font Style</Form.Label>
            <DropdownButton variant="secondary" id="" title="Arial">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        <Row>
          <h6>Font Size</h6>
          <Col>
            <DropdownButton variant="secondary" id="" title="12">
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
            <Button variant="white" >
              <BiFont color='gray' size={20} /> <AiOutlineArrowUp color='gray' size={20} />
            </Button>
          </Col>
          <Col>
            <Button variant="white" >
              <BiFont color='gray' size={20} /> <AiOutlineArrowDown color='gray' size={20} />
            </Button>
          </Col>
        </Row>

        {/* Text formatting row */}
        <Row>
          <h6>Text Formatting</h6>
          <Col>
            <Button variant='white'><FaBold color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button variant='white'><FaItalic color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button variant='white'><FaUnderline color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button variant='white'><FaStrikethrough color='gray' size={20} /></Button>
          </Col>
        </Row>

        {/* Text color */}
        <Row>
          <h6>Text Color</h6>
          <Col>
            <Button variant='white'><AiOutlineFontColors color='purple' size={30} /></Button>
          </Col>

          <Col>
            <Button variant='white'><MdBorderColor color='green' size={25} /></Button>
          </Col>

          <Col>
            <Button variant='white'><MdFormatColorFill color='blue' size={25} /></Button>
          </Col>
        </Row>

        {/* Text alignment */}
        <Row>
          <h6>Text Alignment</h6>
          <Col className='mr-1'>
            <Button variant='white'><BiAlignLeft color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button variant='white'><BiAlignMiddle color='gray' size={20} /></Button>
          </Col>

          <Col>
            <Button variant='white'><BiAlignRight color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaOutdent color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaListUl color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaListOl color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>
          <Col>
            <Button variant='white'><FaIndent color='gray' size={20} /></Button>
          </Col>

        </Row>

        <Row>
          <div className='dropdown'>
            <p><strong>User permissions</strong></p>
            <DropdownButton variant="secondary" id="" title="Nothing Selected">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>

          <div />
          <div>
            <Button variant="primary" >Remove Dropdown</Button>
          </div>

        </Row>

      </Container>
    </div>

  )
}

export default AlignRightSide