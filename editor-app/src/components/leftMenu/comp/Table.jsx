import React, { useRef } from 'react'


import useDraggable from '../../../useDraggable';

import MakeResizableDiv from '../../../Resizable';
import { useStateContext } from '../../../contexts/ContextProvider';

const Table = ({ showSidebar }) => {
 const { handleClicked } = useStateContext();

  const tableRef = useRef(null);

  useDraggable(tableRef);

 
  MakeResizableDiv('.dropped')

  return (
    <div className='dropped' ref={tableRef}
      onClick={() => {handleClicked('table2')
      showSidebar()}}>
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