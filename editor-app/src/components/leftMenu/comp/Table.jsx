import React, {useRef} from 'react'
import { useStateContext } from '../../../contexts/ContextProvider';

import useDraggable from '../../../useDraggable';

const Table = ({showSidebar}) => {
  const { handleClick } = useStateContext();
  const tableRef = useRef(null);
  useDraggable(tableRef);
  return (
    <div className='dropped' ref={tableRef} 
    onClick={() => {(showSidebar());
     (handleClick()); }}>
      Table
    </div>
  )
}

export default Table