import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';

const Signs = ({showSidebar}) => {

  const {handleClicked} = useStateContext()

  const signsRef = useRef(null);
  useDraggable(signsRef);

  MakeResizableDiv('.dropped')

  return (
    <div className='dropped' ref={signsRef} 
    onClick={() => {handleClicked('signs2')
    showSidebar()}}>
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