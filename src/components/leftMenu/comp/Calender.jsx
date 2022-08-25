import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/contextProvider';

import MakeResizableDiv from '../../../Resizable';


// const Calender = ({showSidebar}) => {
const Calender = () => {
  const {handleClicked, setSidebar, startDate} = useStateContext()

  const calenderRef = useRef(null);
  useDraggable(calenderRef);


MakeResizableDiv('.dropped2')

  
  return (
    <div className='dropped2' ref={calenderRef} 
    onClick={() => {handleClicked('calendar2')
    setSidebar(true)}}>
    {startDate ? <p>{startDate.toLocaleDateString()}</p> : 'Calender'}
      <div className='resizers'>
        <div className="resizer nw"></div>
        <div className="resizer ne"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>
    </div>
  )
}

export default Calender