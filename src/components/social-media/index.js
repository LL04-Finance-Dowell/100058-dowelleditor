import React from 'react';
import "./styles.css";

function SocialMedia(props) {
    return (
        <div className="sm-container">
            <input placeholder="Title" className='text-input' />
            {/* <br /> */}
            <input placeholder="Description" className='text-input' />
            {/* <br /> */}
            <label>Image</label>
            <input type="file" accept=".jpg, .jpeg, .png" />

        </div>
    );
}

export default SocialMedia;