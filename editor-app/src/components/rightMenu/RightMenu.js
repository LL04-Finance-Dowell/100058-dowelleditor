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

  console.log(typeof isClicked.table2);
  return (
    <div>
      { isClicked.align2 && <AlignRightSide />  } 
      { isClicked.textfill2 && <AlignRightSide />  }
      { isClicked.image2 && <ImageRightSidebar />  }
      { isClicked.table2 && <TableRightSidebar />  }
      { isClicked.signs2 && <SignsRightSidebar />  }
      { isClicked.calendar2 && <CalendarRightSidebar />  }
      { isClicked.dropdown2 && <DropDownRightSide />  }

    </div>
  )
}

export default RightMenu