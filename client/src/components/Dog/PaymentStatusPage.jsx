import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SuccessPage from './SuccessPage';
import CanceledPage from './CanceledPage';

const PaymentStatusPage = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const success = searchParams.get('success');

        setPaymentStatus(success === 'true' ? 'success' : 'canceled');
    }, [location.search]);

    return (
        <div>
            {paymentStatus === 'success' && <SuccessPage />}
            {paymentStatus === 'canceled' && <CanceledPage />}
        </div>
    );
};

export default PaymentStatusPage;
