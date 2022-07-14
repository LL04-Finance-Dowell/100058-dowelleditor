import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

import AlignRightSide from './AlignRightSide'
import CalendarRightSidebar from './CalendarRightSidebar';
import ImageRightSidebar from './ImageRightSidebar';
import SignsRightSidebar from './SignsRightSidebar';
import TableRightSidebar from './TableRightSidebar';
import DropDownRightSide from './DropDownRightSide'

const RightMenu = () => {
  const { isClicked } = useStateContext();

  console.log(isClicked);
  return (
    <div>
      { isClicked.align && <AlignRightSide />  } 
      { isClicked.textfill && <AlignRightSide />  }
      { isClicked.image && <ImageRightSidebar />  }
      { isClicked.table && <TableRightSidebar />  }
      { isClicked.signs && <SignsRightSidebar />  }
      { isClicked.calendar && <CalendarRightSidebar />  }
      { isClicked.dropdown && <DropDownRightSide />  }

    </div>
  )
}

export default RightMenu