import React, { useState, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';

import MasterIcon from "../../../assets/img/mastercard.svg";
import VisaIcon from "../../../assets/img/visa.svg";
import PayPalIcon from "../../../assets/img/PayPal.svg";

const PaymentSetting = () => {
    const [visaType, setVisaType] = useState(true);

    return (
        <Fragment>
            <Breadcrumb title="Payment Setting" parent="Setting" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Payment Setting</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <span className={`payment_type visa ${ visaType ? 'selected' : '' }`} onClick={() => setVisaType(true) }>
                                                <img src={MasterIcon} alt="Mastercard"/>
                                                <img src={VisaIcon} alt="Visa"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <span className={`payment_type paypal ${ visaType ? '' : 'selected' }`}  onClick={() => setVisaType(false)}>
                                                <img src={PayPalIcon} alt="Paypal"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>



                                {visaType &&
                                <>
                                <div className="form-row">
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">Card Holder
                                                Name: </label>
                                            <input className="form-control" type="text" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">Card
                                                Number:</label>
                                            <input className="form-control" type="text" placeholder=""/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">Expire Month: </label>
                                            <select className="form-control " id="cbo_weekly_month" placeholder={`Month`}>
                                                <option>Jan</option>
                                                <option>Feb</option>
                                                <option>Mar</option>
                                                <option>Apr</option>
                                                <option>May</option>
                                                <option>Jun</option>
                                                <option>July</option>
                                                <option>Aug</option>
                                                <option>Sep</option>
                                                <option>Oct</option>
                                                <option>Nov</option>
                                                <option>Dec</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">Expire Year:</label>
                                            <select className="form-control " id="cbo_year" placeholder={`Year`}>
                                                <option>2020</option>
                                                <option>2019</option>
                                                <option>2018</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="confirm_password">CVC Number:</label>
                                            <input className="form-control" type="text" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                </>
                                }

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

export default PaymentSetting;