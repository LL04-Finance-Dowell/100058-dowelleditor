import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

const Calender = ({showSidebar}) => {
  const calenderRef = useRef(null);
  useDraggable(calenderRef);
  return (
    <div className='dropped' ref={calenderRef} onClick={showSidebar}>
      Calender
    </div>
  )
}

export default Calender