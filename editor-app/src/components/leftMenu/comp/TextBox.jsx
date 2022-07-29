import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable'

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';
import { isCursorAtEnd } from '@testing-library/user-event/dist/utils';

// const TextBox = ({showSidebar}) => {
const TextBox = () => {

  const { handleClicked, setSidebar } = useStateContext();

  const textAreaRef = useRef(null);
 
  useDraggable(textAreaRef);

  MakeResizableDiv('.dropped7');

  return (
    <div >
      <textarea id='txt' className='dropped7' ref={textAreaRef}
        onClick={() => {
          handleClicked('align2')
          setSidebar(true)
        }} name=""  >
        
      </textarea>
      {/* <div className='resizers'>
          <div className="resizer ne"></div>
          <div className="resizer nw"></div>
          <div className="resizer sw"></div>
          <div className="resizer se"></div>
        </div> */}
    </div>
  )
}

export default TextBox