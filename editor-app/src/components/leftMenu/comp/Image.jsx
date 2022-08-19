import React, { useRef } from 'react'


import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/contextProvider';

import MakeResizableDiv from '../../../Resizable';

// const Image = ({ showSidebar }) => {
const Image = () => {


    const { handleClicked, setSidebar } = useStateContext();

    const imageRef = useRef(null);
    useDraggable(imageRef);
    
    MakeResizableDiv('.dropped4')
    return (

        <div className='dropped4' ref={imageRef} 
        onClick={() => {handleClicked('image2')
        setSidebar(true)}}>
            Image
            <div className='resizers'>
                <div className="resizer nw"></div>
                <div className="resizer ne"></div>
                <div className="resizer sw"></div>
                <div className="resizer se"></div>
            </div>
        </div>

    )


}

export default Image