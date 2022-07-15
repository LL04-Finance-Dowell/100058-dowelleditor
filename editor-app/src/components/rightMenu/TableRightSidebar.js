import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TableRightSidebar = () => {
  return (
    <>
      <div>
        <h3>Add Table</h3>
        <Form.Label>Enter Number of rows</Form.Label>
        <Form.Control type='number' placeholder="" min="1" />
        <Form.Label>Enter Number of columns</Form.Label>
        <Form.Control type='number' placeholder="" min="1" />
      </div>

      <div className='dropdown'>
        <h5>User permissions</h5>
        <DropdownButton id="" title="Nothing Selected">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  )
}

export default TableRightSidebar