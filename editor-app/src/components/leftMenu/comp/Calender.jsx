import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';


// const Calender = ({showSidebar}) => {
const Calender = () => {
  const {handleClicked, setSidebar} = useStateContext()

  const calenderRef = useRef(null);
  useDraggable(calenderRef);


MakeResizableDiv('.dropped')
  
  return (
    <div className='dropped' ref={calenderRef} 
    onClick={() => {handleClicked('calendar2')
    setSidebar(true)}}>
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