import React from 'react';
import successFulPayment from './../../assets/paymentSuccessful.svg';
import { useNavigate } from 'react-router-dom';


const ThanksPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // This will navigate back to the previous route
    };
    return (
        <div className='shadow-lg p-3'>
            <div className="vh-100 d-flex justify-content-center align-items-center">
            <div>
                <div className="mb-4 text-center">
                    <img src={successFulPayment} alt='payment successful'/>
                </div>
                <div className="text-center">
                    <h1>Thank You!</h1>
                    <p>Your payment was successful</p>
                    <button className="btn btn-primary" onClick={handleGoBack}>Back Home</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ThanksPage;