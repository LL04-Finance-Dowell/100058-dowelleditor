import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    align: false,
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

    const [ isClicked, setIsClicked ] = useState(initialState2);

    const [isDropped, setIsDropped] = useState(initialState);

    const [isResizing, setIsResizing] = useState(false);

    const handleDrop = (dropped) => {
        setIsDropped({ ...isDropped, [dropped]: true});
    }

    const handleClicked = (clicked) => {
        setIsClicked({ ...isClicked, [clicked]: (isClicked[clicked] ? false : true)});
    }



    return (
        <StateContext.Provider
            value={{  isDropped, handleDrop, setIsDropped, isResizing, setIsResizing, isClicked, handleClicked }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

