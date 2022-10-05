import React from 'react'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ImageRightSidebar = () => {
  return (
    <>
      <div className='dropdown pt-4'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className='mt-5 text-center pt-5'>
        <Button variant="primary"  >Remove Image</Button>
      </div>
    </>
  )
}

export default ImageRightSidebar