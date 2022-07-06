import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

const Image = ({ showSidebar}) => {
  const imageRef = useRef(null);
  useDraggable(imageRef);
  return (
    <div className='dropped' ref={imageRef} onClick={showSidebar}>
      Image
    </div>
  )
}

export default Image