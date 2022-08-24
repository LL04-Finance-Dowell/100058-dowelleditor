import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/contextProvider';

import MakeResizableDiv from '../../../Resizable';

// const DropDown = ({ showSidebar }) => {
const DropDown = () => {

  const { handleClicked, setSidebar } = useStateContext();

  const dropDownRef = useRef(null);
  useDraggable(dropDownRef);

 
MakeResizableDiv('.dropped3')

  return (
    <div className='dropped3' ref={dropDownRef}
    onClick={() => {handleClicked('dropdown2')
    setSidebar(true)}}>
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