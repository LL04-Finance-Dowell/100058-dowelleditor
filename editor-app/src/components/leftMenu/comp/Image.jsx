import React, { useEffect, useRef } from 'react'

// import useDraggable from '../../../useDraggable';

// import dragResize from '../../../dradResize';


const Image = ({ showSidebar }) => {
const eleRef = useRef();
const resizerRef = useRef();

useEffect(() => {
    console.log(eleRef);
const el = eleRef.current;

    // let isResizing = false;
    console.log(el);

    el.addEventListener("mousedown", mousedown);

    function mousedown(e) {
        
        el.addEventListener("mousemove", mousemove);
        el.addEventListener("mouseup", mouseup);

        let prevX = e.clientX;
        let prevY = e.clientY;

        function mousemove(e) {
            // if (!isResizing) {
                let newX = prevX - e.clientX;
                let newY = prevY - e.clientY;

                const rect = el.getBoundingClientRect();

                el.style.left = rect.left - newX + "px";
                el.style.top = rect.top - newY + "px";

                prevX = e.clientX;
                prevY = e.clientY;
            // }
        }

        function mouseup() {
            el.removeEventListener("mousemove", mousemove);
            el.removeEventListener("mouseup", mouseup);
        }
    }

    // const resizers = resizerRef.current;
    // let currentResizer;

    // for (let resizer of resizers) {
    //     resizer.addEventListener("mousedown", mousedown);


    // const currentResizer = resizerRef.current;
    //     function mousedown(e) {
    //         currentResizer = e.target
    //         isResizing = true;

    //         let prevX = e.clientX;
    //         let prevY = e.clientY;

    //         window.addEventListener("mousemove", mousemove);
    //         window.addEventListener("mouseup", mouseup);

    //         function mousemove(e) {
    //             const rect = el.getBoundingClientRect();

    //             if (currentResizer.classList.contains("se")) {
    //                 el.style.width = rect.width - (prevX - e.clientX) + "px";
    //                 el.style.height = rect.height - (prevY - e.clientY) + "px";
    //             }

    //             prevX = e.clientX;
    //             prevY = e.clientY;
    //         }

    //         function mouseup() {
    //             window.removeEventListener("mousemove", mousemove);
    //             window.removeEventListener("mouseup", mouseup);
    //             isResizing = false;
    //         }
    //     }
    // }

}, [])



    // const imageRef = useRef(null);
    // useDraggable(imageRef);
    return (

            <div className='dropped' ref={eleRef} onClick={showSidebar}>
                Image
                <div className="resizer se" ref={resizerRef}></div>
            </div>


    )


}

export default Image