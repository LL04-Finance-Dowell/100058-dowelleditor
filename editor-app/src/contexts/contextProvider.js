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

    const handleDrop = (dropped) => {
        setIsDropped({ ...isDropped, [dropped]: true});
    }

    const handleClicked = () => setIsClicked(!isClicked);

    return (
        <StateContext.Provider
            value={{  isDropped, handleDrop, setIsDropped, handleClicked }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

