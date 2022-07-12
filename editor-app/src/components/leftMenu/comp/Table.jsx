import React, {useRef} from 'react'


import useDraggable from '../../../useDraggable';


const Table = ({showSidebar}) => {



  const tableRef = useRef(null);
  useDraggable(tableRef);

  let isResizing = false;

   const el = tableRef.current;
  const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      if (currentResizer.classList.contains("se")) {
        el.style.width = rect.width - (prevX - e.clientX ) + "px";
        el.style.height = rect.height - (prevY - e.clientY ) + "px";
      }
      // } else if (currentResizer.classList.contains("sw")) {
      //   el.style.width = rect.width + (prevX - e.clientX) + "px";
      //   el.style.height = rect.height - (prevY - e.clientY) + "px";
      //   el.style.left = rect.left - (prevX - e.clientX) + "px";
      // } else if (currentResizer.classList.contains("ne")) {
      //   el.style.width = rect.width - (prevX - e.clientX) + "px";
      //   el.style.height = rect.height + (prevY - e.clientY) + "px";
      //   el.style.top = rect.top - (prevY - e.clientY) + "px";
      // } else {
      //   el.style.width = rect.width + (prevX - e.clientX) + "px";
      //   el.style.height = rect.height + (prevY - e.clientY) + "px";
      //   el.style.top = rect.top - (prevY - e.clientY) + "px";
      //   el.style.left = rect.left - (prevX - e.clientX) + "px";
      // }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
    }
  }
}

  return (
    <div className='dropped' ref={tableRef} 
    onClick={showSidebar}>
      Table
      <div className = "resizer ne"></div>
      <div className = "resizer nw"></div>
      <div className = "resizer sw"></div>
      <div className = "resizer se"></div>
    </div>
  )
}

export default Table