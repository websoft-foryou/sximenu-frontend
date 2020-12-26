import React, {Fragment, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {toast} from "react-toastify";

import myAPI from "../Api";

const PaymentSuccess = (props) => {

    const query = new URLSearchParams(window.location.search);
    const paymentId = query.get('paymentId');
    const payment_token = query.get('token');
    const payerId = query.get('PayerID');
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const completePayment = async() => {
        setLoading(true);
        try {
            await myAPI.completePaypalPayment({
                paymentId: paymentId,
                payerId: payerId,
            }, payment_token, props.auth.getToken()).then(response => {
                if (response.data.success) {
                    let token = props.auth.getToken();
                    props.auth.destroyAuthentication();
                    props.auth.finishAuthentication(token, "1");
                    history.push('/admin/membership');
                }
                else
                    toast.error(response.data.result);
            })
        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const completeSignupPayment = async() => {
        setLoading(true);
        try {
            await myAPI.completeSignupPaypalPayment({
                paymentId: paymentId,
                payerId: payerId,
                userId: sessionStorage.getItem('user_id'),
            }, payment_token).then(response => {
                setLoading(false);
                if (response.data.success) {
                    history.push('/register/' + response.data.result);
                }
                else
                    toast.error(response.data.result);
            })
        } catch(e) {
            setLoading(false);
            toast.error(e.message);
        }
    };

    useEffect(() => {
        if (props.section === "membership") {
            if (props.success === 'error')
                history.push('/admin/membership');
            else
                completePayment();
        }

        if (props.section === "signup") {
            if (props.success === 'error')
                history.push('/signup');
            else
                completeSignupPayment();
        }
    },[]);


    return (
        <Fragment>
        {loading &&
        <div id="myOverlay" className="overlay">
            <div className="overlay-content">
                <div className="loader-box" style={{display: "block"}}>
                    <div className="loader">
                        <div className="line bg-warning"></div>
                        <div className="line bg-warning"></div>
                        <div className="line bg-warning"></div>
                        <div className="line bg-warning"></div>
                    </div>
                </div>
            </div>
        </div>
        }
        </Fragment>
    );



};

export default PaymentSuccess;
