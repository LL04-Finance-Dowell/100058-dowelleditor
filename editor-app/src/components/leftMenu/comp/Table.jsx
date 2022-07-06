import React, {useRef} from 'react'

import useDraggable from '../../../useDraggable';

const Table = ({showSidebar}) => {
  const tableRef = useRef(null);
  useDraggable(tableRef);
  return (
    <div className='dropped' ref={tableRef} onClick={showSidebar}>
      Table
    </div>
  )
}

export default Table