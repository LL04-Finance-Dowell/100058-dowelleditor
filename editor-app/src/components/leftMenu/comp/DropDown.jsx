import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';

const DropDown = ({ showSidebar }) => {

  const { handleClicked } = useStateContext();

  const dropDownRef = useRef(null);
  useDraggable(dropDownRef);

 
MakeResizableDiv('.dropped')

  return (
    <div className='dropped' ref={dropDownRef}
    onClick={() => {handleClicked('dropdown2')
    showSidebar()}}>
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