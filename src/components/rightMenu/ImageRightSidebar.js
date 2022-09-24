import React from 'react'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ImageRightSidebar = () => {
  return (
    <>
      <div className='dropdown pt-4'>
        <p><h6>User permissions</h6></p>
        <DropdownButton variant="" id="" title="Nothing Selected" className='shadow bg-white rounded '>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className='mt-5 text-center pt-5'>
        <Button variant="primary"  >Remove Image</Button>
      </div>
    </>
  )
}

export default ImageRightSidebar