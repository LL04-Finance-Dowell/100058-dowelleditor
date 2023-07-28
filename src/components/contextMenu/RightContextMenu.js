import React, { useState } from 'react';
import './RightContextMenu.css'
import { BiCopyAlt, BiCut } from 'react-icons/bi';
import { ImPaste } from 'react-icons/im';
import { CgPlayListRemove } from 'react-icons/cg';

const RightContextMenu = ({ x, y, closeContextMenu, cutInput, pasteInput,handlePrint, removeInput }) => {


    return (
        <div onClick={() => closeContextMenu()} className='positioning' style={{ top: `${y}px`, left: `${x}px` }}>
            <ul className='menuStyle'>
                <li onClick={cutInput}><BiCut /> Cut</li>
                <li onClick={pasteInput}><ImPaste />Paste</li>
                <li onClick={removeInput}><CgPlayListRemove />Remove</li>
                {/* <li onClick={handlePrint}>Print</li> */}
            </ul>
        </div>
    );
};

export default RightContextMenu;