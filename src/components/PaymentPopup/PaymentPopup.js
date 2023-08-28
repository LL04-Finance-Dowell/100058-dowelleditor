import React from 'react';
import './PaymentPopup.css';

const PaymentPopup = ({ url, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <iframe title="Popup" src={url} width="100%" height="600" frameBorder="0" />
                {/* <embed title="Popup" src={url} width="600" height="400"> </embed> */}
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaymentPopup;