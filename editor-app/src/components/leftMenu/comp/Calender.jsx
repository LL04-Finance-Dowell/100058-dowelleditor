import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';


const Calender = ({showSidebar}) => {
  const {handleClicked} = useStateContext()

  const calenderRef = useRef(null);
  useDraggable(calenderRef);


MakeResizableDiv('.dropped')
  
  return (
    <div className='dropped' ref={calenderRef} 
    onClick={() => {handleClicked('calendar2')
    showSidebar()}}>
      Calender
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>
    </div>
  )
}

export default Calender