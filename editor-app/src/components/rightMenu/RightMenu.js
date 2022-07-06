import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

import AlignRightSide from './AlignRightSide'
import CalendarRightSidebar from './CalendarRightSidebar';
import ImageRightSidebar from './ImageRightSidebar';
import SignsRightSidebar from './SignsRightSidebar';
import TableRightSidebar from './TableRightSidebar';
import DropDownRightSide from './DropDownRightSide'

const RightMenu = ({ showSidebar }) => {
  const { isDropped } = useStateContext();
  return (
    <div>
      { isDropped.align && <AlignRightSide />}
      { isDropped.textfill && <AlignRightSide />}
      { isDropped.image && <ImageRightSidebar />}
      { isDropped.table && <TableRightSidebar />}
      { isDropped.signs && <SignsRightSidebar />}
      { isDropped.calendar && <CalendarRightSidebar />}
      { isDropped.dropdown && <DropDownRightSide />}

    </div>
  )
}

export default RightMenu