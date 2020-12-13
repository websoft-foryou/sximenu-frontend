import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";

import headerBackground from "../assets/img/page-header-bg.jpg";
import logoImage from "../assets/img/logo.svg";
import myAPI from "../Api";

const EmailVerification = () => {
    const [verifyResult, setVerifyResult] = useState('');
    const { token } = useParams();
    const getVerifyResult = () => {
        myAPI.verifyEmail({
            token : token
        }).then(response => {
            if (response.data.success)
                setVerifyResult(response.data.result);
            else
                setVerifyResult(response.data.result);
        })
    };

    useEffect(() => {
        getVerifyResult();
    }, []);

    const renderVerifyResult = () => {
        return verifyResult;
    };

    return (
        <div className="auth-page">
            <div
                style={{backgroundImage: `url(${headerBackground})`}}
                className="auth-page-header text-center">
                <div className="auth-page-header-inner">
                    <Container>
                        <Link to="/" className="site-logo">
                            <img src={logoImage} alt=""/>
                        </Link>
                        <h4 className="moto-tag">Restaurant in Israel</h4>
                    </Container>
                </div>
            </div>
            <div className="auth-content">
                <Container>
                    <div className="row mb-5">
                        <div className="col-lg-10 mx-auto">
                            <h2 className="text-center" style={{color: `#0454a4`}}>{ renderVerifyResult() }</h2>
                            <p></p>
                            <p className="text-center" style={{marginTop: 100}}>
                                <Link to="/" className="btn btn-success text-center">Go to Home Page</Link>
                            </p>
                        </div>
                    </div>
                </Container>


            </div>

            <hr/>

            <div className="text-center pb-3">
                &copy; 2020 <Link to="/">Sixmenu</Link>. All right reserved.
            </div>
        </div>

    );



};

export default EmailVerification;
