import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable';

import MakeResizableDiv from '../../../Resizable';

const DropDown = ({ showSidebar }) => {


  const dropDownRef = useRef(null);
  useDraggable(dropDownRef);

 
MakeResizableDiv('.dropped')

  return (
    <div className='dropped' ref={dropDownRef} onClick={showSidebar}>
      DropDown
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>
    </div>
  )
}

export default DropDown