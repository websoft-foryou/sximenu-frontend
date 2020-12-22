import React, { useState, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';

import myAPI from "../../../Api";
import {toast} from "react-toastify";

const EmailSetting = (props) => {
    const [curUserEmail, setCurUserEmail] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = props.auth;

    const submitData = async() => {
        if (curUserEmail === '') {
            toast.error('Please enter the current email');
            return;
        }
        if (newUserEmail === '') {
            toast.error('Please enter the new email');
            return;
        }
        if (curUserEmail === newUserEmail) {
            toast.error("The new email should not be the same as the current email.");
            return;
        }

        setLoading(true);
        try {
            await myAPI.updateEmail({
                cur_email: curUserEmail,
                new_email: newUserEmail
            }, auth.getToken()).then(response => {
                if (response.data.success === true) {
                    toast.info('We sent a verification email to your account. Please check your email inbox.');
                }
                else
                    toast.warn(response.data.result);
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Fragment>
            <Breadcrumb title="Email Setting" parent="Setting" />
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Email Setting</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="cur_email">Current Email:</label>
                                            <input className="form-control" type="email" placeholder="" value={curUserEmail} onChange={e => setCurUserEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="new_email">New Email:</label>
                                            <input className="form-control" type="email" placeholder="" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12 m-t-20">
                                        <button type="button" className="btn btn-default float-right" onClick={() => submitData() }>Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </Fragment>

    );
};

export default EmailSetting;