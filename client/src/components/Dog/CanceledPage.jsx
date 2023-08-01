import React from 'react';
import "./Canc-Succ.css";


const CanceledPage = () => {
    return (
        <div className='background-wrapper'>
            <h1 id="title" style={{marginBottom: "1em"}}>Order Canceled</h1>
            <p className="text">Your payment was canceled or unsuccessful. Please, try again.</p>
        </div>
    );
};

export default CanceledPage;
