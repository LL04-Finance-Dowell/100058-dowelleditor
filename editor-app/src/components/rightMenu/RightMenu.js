import React, {useEffect} from 'react'
import { useStateContext } from '../../contexts/contextProvider'

import AlignRightSide from './AlignRightSide'
import CalendarRightSidebar from './CalendarRightSidebar';
import ImageRightSidebar from './ImageRightSidebar';
import SignsRightSidebar from './SignsRightSidebar';
import TableRightSidebar from './TableRightSidebar';
import DropDownRightSide from './DropDownRightSide'

const RightMenu = () => {
  const { isClicked, setIsClicked } = useStateContext();

  useEffect(() => {

    if (isClicked.align2) {
      setIsClicked({ ...isClicked, textfill2: false, image2: false, table2: false, signs2: false, calendar2: false, dropdown2: false });
    } else if (isClicked.textfill2) {
      setIsClicked({ ...isClicked, align2: false, image2: false, table2: false, signs2: false, calendar2: false, dropdown2: false });
    } else if (isClicked.image2) {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, table2: false, signs2: false, calendar2: false, dropdown2: false });
    } else if (isClicked.table2) {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, image2: false, signs2: false, calendar2: false, dropdown2: false });
    } else if (isClicked.signs2) {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, image2: false, table2: false, calendar2: false, dropdown2: false });
    } else if (isClicked.calendar2) {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, image2: false, table2: false, signs2: false, dropdown2: false });
    } else if (isClicked.dropdown2) {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, image2: false, table2: false, signs2: false, calendar2: false });
    } else {
      setIsClicked({ ...isClicked, align2: false, textfill2: false, image2: false, table2: false, signs2: false, calendar2: false, dropdown2: false });
    }

  }, [])

  
  return (
    <div>
      { isClicked.align2 &&  <AlignRightSide />  } 
      { isClicked.textfill2 && <AlignRightSide />   }
      { isClicked.image2 && <ImageRightSidebar  />  }
      { isClicked.table2 && <TableRightSidebar  />  }
      { isClicked.signs2 && <SignsRightSidebar  />  }
      { isClicked.calendar2 && <CalendarRightSidebar  />  }
      { isClicked.dropdown2 && <DropDownRightSide  /> }

    </div>
  )
}

export default RightMenu