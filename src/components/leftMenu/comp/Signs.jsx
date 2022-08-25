import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/contextProvider';

import MakeResizableDiv from '../../../Resizable';

// const Signs = ({showSidebar }) => {
const Signs = () => {

  const {handleClicked, setSidebar, signState} = useStateContext()

  const signsRef = useRef(null);
  useDraggable(signsRef);

  MakeResizableDiv('.dropped5')
 

  return (
    <div className='dropped5' ref={signsRef} 
    onClick={() => {handleClicked('signs2')
    setSidebar(true)}}>
      {signState.trimmedDataURL ? <img src={signState.trimmedDataURL} alt="sig" />: 'Signs'}
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