import React, { useState, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';



const EmailSetting = () => {

    return (
        <Fragment>
            <Breadcrumb title="Email Setting" parent="Setting" />
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
                                            <input className="form-control" type="email" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="new_email">New Email:</label>
                                            <input className="form-control" type="email" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12 m-t-20">
                                        <button type="button" className="btn btn-success float-right">Submit</button>
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