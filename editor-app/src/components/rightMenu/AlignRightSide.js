import React, { useRef } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AlignRightSide = () => {

  return (
    <>
      <div>
      <Form.Label>Font Style</Form.Label>
        <DropdownButton variant="secondary" id="" title="Arial">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>

      <div>
      <Form.Label>Font Size</Form.Label>
        <DropdownButton variant="secondary" id="" title="12">
          <Dropdown.Item href="#/action-1">8</Dropdown.Item>
          <Dropdown.Item href="#/action-2">10</Dropdown.Item>
          <Dropdown.Item href="#/action-3">12</Dropdown.Item>
          <Dropdown.Item href="#/action-3">14</Dropdown.Item>
          <Dropdown.Item href="#/action-3">16</Dropdown.Item>
          <Dropdown.Item href="#/action-3">18</Dropdown.Item>
          <Dropdown.Item href="#/action-3">20</Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  )
}

export default AlignRightSide