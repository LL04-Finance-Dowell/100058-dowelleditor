import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import MakeResizableDiv from '../../../Resizable';

const Signs = ({showSidebar}) => {

  const signsRef = useRef(null);
  useDraggable(signsRef);

  MakeResizableDiv('.dropped')

  return (
    <div className='dropped' ref={signsRef} onClick={showSidebar}>
      Signs
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>
    </div>
  )
}

export default Signs