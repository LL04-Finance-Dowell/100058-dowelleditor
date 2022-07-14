import React, {useRef} from 'react'
import './Align.css'

import useDraggable from '../../../useDraggable'

import MakeResizableDiv from '../../../Resizable'

const Align = ({showSidebar}) => {

  const textAlignRef = useRef(null);
  useDraggable(textAlignRef);


MakeResizableDiv('.dropped')
  return (
    <div className='dropped' ref={textAlignRef} 
    onClick={showSidebar}>
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>
    </div>
  )
}

export default Align