export function table_dropdown_focuseddClassMaintain(e) {
  console.log("tabletargettest", e.target);

  if (
    !e.target?.classList?.contains("addImageButtonInput") &&
    !e.target?.classList?.contains("addSignButtonInput")
  ) {
    let allDiv = document.getElementsByClassName("focussedd");
    for (let i = 0; i < allDiv.length; i++) {
      allDiv[i].classList.remove("focussedd");
    }

    let findFocusElement = e.target.parentElement;

    while (1) {
      if (findFocusElement.classList.contains("holderDIV")) {
        findFocusElement.classList.add("focussedd");
        break;
      } else {
        findFocusElement = findFocusElement.parentElement;
      }
    }

    // if (e.target.parentElement.classList.contains("holderDIV")) {
    //   e.target.parentElement.classList.add("focussedd");
    // } else if (
    //   e.target.parentElement.parentElement.classList.contains("holderDIV")
    // ) {
    //   e.target.parentElement.parentElement.classList.add("focussedd");
    // } else if (
    //   e.target.parentElement.parentElement.parentElement.classList.contains(
    //     "holderDIV"
    //   )
    // ) {
    //   e.target.parentElement.parentElement.parentElement.classList.add(
    //     "focussedd"
    //   );
    // } else if (
    //   e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
    //     "holderDIV"
    //   )
    // ) {
    //   e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
    //     "focussedd"
    //   );
    // } else if (
    //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
    //     "holderDIV"
    //   )
    // ) {
    //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    //     "focussedd"
    //   );
    // } else if (
    //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
    //     "holderDIV"
    //   )
    // ) {
    //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    //     "focussedd"
    //   );
    // }
    let focussedDiv = document.getElementsByClassName("focussed");
    for (let i = 0; i < focussedDiv.length; i++) {
      focussedDiv[i].classList.remove("focussed");
    }
    if (e.target.classList.contains("dropdownInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("dropdownInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    if (e.target.classList.contains("tableInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("tableInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    if (e.target.classList.contains("iframeInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("iframeInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    if (e.target.classList.contains("scaleInput")) {
      e.target.classList.add("focussed");
    } else if (e.target.parentElement.classList.contains("scaleInput")) {
      e.target.parentElement.classList.add("focussed");
    }
    // e.target.classList.add("focussed");
  }
}
