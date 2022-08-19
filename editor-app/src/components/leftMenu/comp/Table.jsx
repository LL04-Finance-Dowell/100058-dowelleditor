import React, { useRef } from 'react'


import useDraggable from '../../../useDraggable';

import MakeResizableDiv from '../../../Resizable';
import { useStateContext } from '../../../contexts/contextProvider';

// const Table = ({ showSidebar }) => {
const Table = () => {
 const { handleClicked, showSidebar, setSidebar } = useStateContext();

  const tableRef = useRef(null);

  useDraggable(tableRef);

 
  MakeResizableDiv('.dropped6')

  return (
    <div className='dropped6' ref={tableRef}
      onClick={() => {handleClicked('table2')
      setSidebar(true)}}>
      Table
      <div className='resizers'>
        <div className="resizer ne"></div>
        <div className="resizer nw"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
      </div>

    </div>
  )
}

export default Table