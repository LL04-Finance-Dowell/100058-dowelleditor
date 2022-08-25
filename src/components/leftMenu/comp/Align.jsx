import React, {useRef} from 'react'
import './Align.css'

import useDraggable from '../../../useDraggable'

import { useStateContext } from '../../../contexts/contextProvider'

import MakeResizableDiv from '../../../Resizable'

// const Align = ({showSidebar}) => {
const Align = () => {
  const {handleClicked, setSidebar} = useStateContext()

  const textAlignRef = useRef(null);
  useDraggable(textAlignRef);


MakeResizableDiv('.dropped1')
  return (
    <div className='dropped1' ref={textAlignRef} 
    onClick={() => {handleClicked('align2')
    setSidebar(true)}}>
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