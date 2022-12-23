import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  align: true,
  textfill: true,
  image: false,
  table: false,
  signs: false,
  calendar: false,
  dropdown: false,
  containerr: false,
};
const initialState2 = {
  align2: false,
  textfill2: false,
  image2: false,
  table2: false,
  signs2: false,
  calendar2: false,
  dropdown2: false,
};

export const ContextProvider = ({ children }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isClicked, setIsClicked] = useState(initialState2);

  const [isDropped, setIsDropped] = useState(initialState);

  const [isResizing, setIsResizing] = useState(false);

  //Right Sidebar context
  const [signState, setSignState] = React.useState({ trimmedDataURL: null }); // Signature

  const [startDate, setStartDate] = useState(new Date()); // Calendar

  // console.log("fetchedData", fetchedData);
  const [dropdownName, setDropdownName] = useState("Dropdown Name");
  const [dropdownLabel, setDropdownLabel] = useState("Dropdown Label");
  const [dropdownItems, setDropdownItems] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState(["Enter List Items"]);

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);

  const handleDrop = (dropped) => {
    setIsDropped({ ...isDropped, [dropped]: true });
  };

  const handleClicked = (clicked) => {
    setIsClicked({ ...isClicked, [clicked]: true });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipClicked, setIsFlipClicked] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [rightSideDatemenu, setRightSideDateMenu] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  //handling new pages

  const [item, setItem] = useState(["div"]);

  //   console.log("item check", item);

  return (
    <StateContext.Provider
      value={{
        isDropped,
        handleDrop,
        setIsDropped,
        isResizing,
        setIsResizing,
        isClicked,
        handleClicked,
        setIsClicked,
        sidebar,
        setSidebar,
        signState,
        setSignState,
        startDate,
        setStartDate,
        bold,
        setBold,
        italic,
        setItalic,
        underline,
        setUnderline,
        strikethrough,
        setStrikethrough,
        dropdownName,
        setDropdownName,
        dropdownLabel,
        setDropdownLabel,
        dropdownItems,
        setDropdownItems,
        dropdownOptions,
        setDropdownOptions,
        item,
        setItem,
        isLoading,
        setIsLoading,
        isFlipClicked,
        setIsFlipClicked,
        fetchedData,
        setFetchedData,
        rightSideDatemenu,
        setRightSideDateMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
