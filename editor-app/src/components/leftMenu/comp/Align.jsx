import React, {useRef} from 'react'
import './Align.css'

import useDraggable from '../../../useDraggable'

import { MenuBar } from './TextBox'

const Align = ({showSidebar}) => {

  const textAlignRef = useRef(null);
  useDraggable(textAlignRef);
  return (
    <div className='dropped' ref={textAlignRef} onClick={showSidebar}>
      
    </div>
  )
}

export default Align