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

export const ContextProvider = ({ children }) => {

    const [ isClicked, setIsClicked ] = useState(false);

    const [isDropped, setIsDropped] = useState(initialState);

    const [isResizing, setIsResizing] = useState(false);

    const handleDrop = (dropped) => {
        setIsDropped({ ...isDropped, [dropped]: true});
    }

    const handleClicked = (clicked) => {
        setIsClicked({ ...isClicked, [clicked]: !isClicked[clicked]});
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

