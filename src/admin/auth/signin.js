import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/endless-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from './auth_service';
import myAPI from "../../Api";

import '../../admin/assets/css/mystyle.css';

const Signin = () => {
    const history = useHistory();
    const Auth = new AuthService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginAuth = async () => {
        if (email === '') {
            toast.warn("Oppss.. Please enter the email.", {autoClose: 2000});
            return;
        }
        if (password === '') {
            toast.warn("Oppss.. Please enter the password.", {autoClose: 2000});
            return;
        }

        try {
            setLoading(true);
            await myAPI.loginUser({
                email: email,
                password: password,
            }).then(response => {

                if (response.data.success === true) {
                    Auth.finishAuthentication(response.data.result.token, response.data.result.membership);
                    sessionStorage.setItem('welcome', 'on');
                    history.push('/admin/dashboard');
                }
                else
                    toast.error(response.data.result, {autoClose: 3000});
            });

        } catch(err) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        } finally {
            setLoading(false);
        }

        try {

        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    }


    return (
        <div>
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
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center">
                                            <img src={logo} alt="" /></div>
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>LOGIN</h4>
                                                    <h6>Enter your Username and Password </h6>
                                                </div>
                                                <form className="theme-form" >
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">Your Email</label>
                                                        <input className="form-control" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
                                                        {/* {errors.email && 'Email is required'} */}
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                                                        {/* {errors.password && 'Email is required'} */}
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">Remember me</label>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="button" onClick={() => loginAuth()} >Login</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
    );
};

export default Signin;
