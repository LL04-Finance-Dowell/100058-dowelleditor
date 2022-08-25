import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable'

import { useStateContext } from '../../../contexts/contextProvider';

import MakeResizableDiv from '../../../Resizable';

const TextFill = () => {
  const { handleClicked, setSidebar } = useStateContext();

  const textAreaRef = useRef(null);
  useDraggable(textAreaRef);


  MakeResizableDiv('.dropped8')


  return (
    <div >
      <textarea className='dropped8' ref={textAreaRef}
        onClick={() => {

        }} name="" id="textarea" >
        
      </textarea>

    </div>
  )
}

export default TextFill