import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

const DropDown = ({showSidebar}) => {
  const dropDownRef = useRef(null);
  useDraggable(dropDownRef);
  return (
    <div className='dropped' ref={dropDownRef} onClick={showSidebar}>
      DropDown
    </div>
  )
}

export default DropDown