import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropDownRightSide = () => {
  return (
    <div>
      <h3>Dropdown Settings</h3>
      <Form.Label>Email address</Form.Label>
      <Form.Control type='text' placeholder="Enter Name" />
      <Form.Label>Email Label</Form.Label>
      <Form.Control type='text' placeholder="Enter Label" />
      <Form.Label>List Items</Form.Label>
      <Form.Control type='text' placeholder="Add List Items" />
      <Button variant="primary" >+</Button>

      <div className='dropdown'>
        <h5>User permissions</h5>
        <DropdownButton id="" title="Nothing Selected">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>

<div/>
      <div>
      <Button variant="primary" >Remove Dropdown</Button>
      </div>
    </div>
  )
}

export default DropDownRightSide