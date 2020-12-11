import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Alert } from 'reactstrap';

const Pricing = () => {
    return (
        <Fragment>
            <Breadcrumb title="" parent="Membership" />
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Membership</h5>
                            </div>
                            <div className="card-body pricing-card-design-3">
                                <div className="row pricing-content-ribbons justify-content-center">
                                    <div className="col-12 col-lg-4">
                                        <div className="pricing-block card text-center">
                                            <svg x="0" y="0" viewBox="0 0 360 220">
                                                <g>
                                                    <path d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                          c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                          s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                          L0.732,193.75z"></path>
                                                </g>
                                                <text transform="matrix(1 0 0 1 100.7256 116.2686)" fill="#fff" fontSize="78.4489">$0</text>
                                                <text transform="matrix(1 0 0 1 200.9629 115.5303)" fill="#fff" fontSize="15.4128">/Month</text>
                                            </svg>
                                            <div className="pricing-inner">
                                                <h3 className="font-primary">Freemium</h3>
                                                <ul className="pricing-inner">
                                                    <li><h6><b>Limit access</b> in Dashboard</h6></li>
                                                    <li><h6><b>Limit control</b> in Category Management</h6></li>
                                                    <li><h6><b>Limit control</b> in Product Management</h6></li>
                                                    <li><h6><b>Full access</b> in Restaurant Information</h6></li>
                                                    <li><h6><b>No access</b> in User History</h6></li>
                                                    <li><h6><b>No access</b> in User Analytics</h6></li>
                                                    <li><h6><b>No access</b> in Income Analytics</h6></li>
                                                    <li><h6><b>Full access</b> in Membership</h6></li>
                                                </ul>
                                                <Alert color="warning" className="dark">
                                                    You are Freemium now.
                                                </Alert>
                                                {/*<button className="btn btn-success" type="button">Subscribe</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <div className="pricing-block card text-center">
                                            <div className="ribbon ribbon-clip-right ribbon-right ribbon-danger">Popular</div>
                                            <svg x="0" y="0" viewBox="0 0 360 220">
                                                <g>
                                                    <path d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                          c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                          s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                          L0.732,193.75z"></path>
                                                </g>
                                                <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" fontSize="78.4489">$99</text>
                                                <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" fontSize="29.0829">.99</text>
                                                <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" fontSize="15.4128">/Month</text>
                                            </svg>
                                            <div className="pricing-inner">
                                                <h3 className="font-primary">Premium</h3>
                                                <ul className="pricing-inner">
                                                    <li><h6><b>Full access</b> in Dashboard</h6></li>
                                                    <li><h6><b>Full control</b> in Category Management</h6></li>
                                                    <li><h6><b>Full control</b> in Product Management</h6></li>
                                                    <li><h6><b>Full access</b> in Restaurant Information</h6></li>
                                                    <li><h6><b>Full access</b> in User History</h6></li>
                                                    <li><h6><b>Full access</b> in User Analytics</h6></li>
                                                    <li><h6><b>Full access</b> in Income Analytics</h6></li>
                                                    <li><h6><b>Full access</b> in Membership</h6></li>
                                                </ul>
                                                <button className="btn btn-success" type="button"> UPGRADE </button>
                                            </div>
                                        </div>
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

export default Pricing;