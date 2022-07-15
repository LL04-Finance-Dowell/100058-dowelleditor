import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable'

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';

const TextBox = ({showSidebar}) => {

  const { handleClicked } = useStateContext();
  
  const textAreaRef = useRef(null);
  useDraggable(textAreaRef);

 
MakeResizableDiv('.dropped')

  return (
    <div >
      <textarea className='dropped' ref={textAreaRef} 
      onClick={() => {handleClicked('align2')
      showSidebar()}} name="" id="" ></textarea>
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>

    </div>
  )
}

export default TextBox