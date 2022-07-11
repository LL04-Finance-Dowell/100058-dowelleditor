import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

import AlignRightSide from './AlignRightSide'
import CalendarRightSidebar from './CalendarRightSidebar';
import ImageRightSidebar from './ImageRightSidebar';
import SignsRightSidebar from './SignsRightSidebar';
import TableRightSidebar from './TableRightSidebar';
import DropDownRightSide from './DropDownRightSide'

const RightMenu = ({ showSidebar }) => {
  const { isDropped, isClicked } = useStateContext();

  return (
    <div>
      { isDropped.align && isClicked ? <AlignRightSide /> : null } 
      { isDropped.textfill && isClicked ? <AlignRightSide /> : null }
      { isDropped.image && isClicked ? <ImageRightSidebar /> : null }
      { isDropped.table && <TableRightSidebar />}
      { isDropped.signs && <SignsRightSidebar />}
      { isDropped.calendar && <CalendarRightSidebar />}
      { isDropped.dropdown && <DropDownRightSide />}

    </div>
  )
}

export default RightMenu