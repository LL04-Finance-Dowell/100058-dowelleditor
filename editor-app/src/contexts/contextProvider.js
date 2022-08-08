import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    align: true,
    textfill: false,
    image: false,
    table: false,
    signs: false,
    calendar: false,
    dropdown: false,
}
const initialState2 = {
    align2: false,
    textfill2: false,
    image2: false,
    table2: false,
    signs2: false,
    calendar2: false,
    dropdown2: false,
}

export const ContextProvider = ({ children }) => {

    const [isClicked, setIsClicked] = useState(initialState2);

    const [isDropped, setIsDropped] = useState(initialState);

    const [isResizing, setIsResizing] = useState(false);

    //Right Sidebar context
    const [signState, setSignState] = React.useState({ trimmedDataURL: null });  // Signature

    const [startDate, setStartDate] = useState(''); // Calendar

    const handleDrop = (dropped) => {
        setIsDropped({ ...isDropped, [dropped]: true });
    }

    const handleClicked = (clicked) => {
        setIsClicked({ ...isClicked, [clicked]: true });
    }

    const [sidebar, setSidebar] = useState(false);
    // const showSidebar = () => setSidebar(!sidebar);



    return (
        <StateContext.Provider
            value={{
                isDropped, handleDrop,
                setIsDropped,
                isResizing, setIsResizing,
                isClicked, handleClicked,
                setIsClicked,
                sidebar, setSidebar,
                signState, setSignState,
                startDate, setStartDate,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

