import { useStateContext } from "../contexts/contextProvider";

function getOffset(el) {
  const parent = document.getElementById("midSection_container");
  const parentPos = parent.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top - parentPos.top,
    left: rect.left - parentPos.left,
    bottom: rect.bottom - parentPos.top,
    right: rect.right - parentPos.left,
    // left: rect.left + window.scrollX,
    // top: rect.top + window.scrollY
  };
}

function useDateElement() {
  const {
    setSidebar,
    handleClicked,
    setRightSideDateMenu,
    setStartDate,
    setMethod,
    focuseddClassMaintain,
  } = useStateContext();
  // const [postData, setPostData] = useState({});

  let dateFieldContainer = document.createElement("div");
  dateFieldContainer.className = "dateInput";
  dateFieldContainer.style.width = "100%";
  dateFieldContainer.style.height = "100%";
  dateFieldContainer.style.backgroundColor = "#0000";
  dateFieldContainer.style.borderRadius = "0px";
  dateFieldContainer.style.outline = "0px";
  dateFieldContainer.style.overflow = "overlay";
  // dateFieldContainer.innerText = `${postData.calenderField.value}`
  dateFieldContainer.style.position = "relative";

  // dateFieldContainer.onchange = (event) => {
  //   event.preventDefault();
  //   setPostData({
  //     ...postData,
  //     calenderField: {
  //       value: event.target.value,
  //       xcoordinate: getOffset(holderDIVContainer).left,
  //       ycoordinate: getOffset(holderDIVContainer).top,
  //     },
  //   });
  // };
  setStartDate(new Date());
  setMethod("select");
  function dateClick() {
    document.getElementById("date_picker").click();
    setRightSideDateMenu(false);
  }
  dateFieldContainer.onclick = (e) => {
    focuseddClassMaintain(e);
    handleClicked("calendar2");
    setRightSideDateMenu(false);
    if (e.target.innerText != "mm/dd/yyyy") {
      if (e.target.innerText.includes("/")) {
        const setDate = new Date(e.target.innerText);
        setMethod("first");
        setStartDate(setDate);
      } else {
        if (e.target.innerText.includes("-")) {
          setMethod("fourth");
        } else {
          setMethod("second");
        }
        const setDate = new Date(e.target.innerText);
        setStartDate(setDate);
      }
    }
    setSidebar(true);
    setTimeout(dateClick, 0);
  };
  dateFieldContainer.innerText = "mm/dd/yyyy";

  return dateFieldContainer;
}

export default useDateElement;
