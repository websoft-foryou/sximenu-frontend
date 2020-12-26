import React, { useState, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import {toast} from "react-toastify";
import myAPI from "../../../Api";


const PasswordSetting = (props) => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = props.auth;

    const submitData = async() => {
        if (curPassword === '') {
            toast.error('Please enter the current password.');
            return;
        }
        if (newPassword === '') {
            toast.error('Please enter the new password');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("The confirm password is not match to new password.");
            return;
        }

        setLoading(true);
        try {
            await myAPI.updatePassword({
                cur_password: curPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            }, auth.getToken()).then(response => {
                if (response.data.success === true) {
                    toast.info('Password updated succesfully.');
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
            <Breadcrumb title="Password Setting" parent="Setting" />
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
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Password Setting</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="cur_email">Current Password:</label>
                                            <input className="form-control" type="password" value={curPassword} onChange={e => setCurPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="new_password">New Password:</label>
                                            <input className="form-control" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}  />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">Confirm Password:</label>
                                            <input className="form-control" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  />
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

export default PasswordSetting;