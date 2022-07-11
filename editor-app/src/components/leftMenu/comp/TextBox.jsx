import React,{ useRef} from 'react'

import useDraggable from '../../../useDraggable'
const TextBox = () => {

    
    const textAreaRef = useRef(null);
  useDraggable(textAreaRef);
  return (
    <div >
        <textarea className='dropped' ref={textAreaRef} name="" id="" ></textarea>
    </div>
  )
}

export default TextBox