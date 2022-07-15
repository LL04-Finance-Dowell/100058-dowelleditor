import React, { useRef } from 'react'

import useDraggable from '../../../useDraggable';

import { useStateContext } from '../../../contexts/ContextProvider';

import MakeResizableDiv from '../../../Resizable';

const Image = ({ showSidebar }) => {

    const { handleClicked } = useStateContext();

    const imageRef = useRef(null);
    useDraggable(imageRef);

    
    MakeResizableDiv('.dropped')
    return (

        <div className='dropped' ref={imageRef} 
        onClick={() => {handleClicked('image2')
        showSidebar()}}>
            Image
            <div className='resizers'>
                <div className="resizer ne"></div>
                <div className="resizer nw"></div>
                <div className="resizer sw"></div>
                <div className="resizer se"></div>
            </div>
        </div>


    )


}

export default Image