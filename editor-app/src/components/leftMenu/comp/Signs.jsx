import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

const Signs = ({showSidebar}) => {
  const signsRef = useRef(null);
  useDraggable(signsRef);
  return (
    <div className='dropped' ref={signsRef} onClick={showSidebar}>
      Signs
    </div>
  )
}

export default Signs