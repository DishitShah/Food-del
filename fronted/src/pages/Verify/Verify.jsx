import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Verify.css';
import { StoreContext } from '../../contact/StoreContext'; // Make sure this path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const { url } = React.useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate('/myorders');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Verification error:", error);
            navigate('/');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
