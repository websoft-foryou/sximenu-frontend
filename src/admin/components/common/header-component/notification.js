import React,{Fragment} from 'react';
import { AlertCircle } from 'react-feather';

const Notification = props => {
    return (
        <Fragment>
            <div>
                <ul className="notification-dropdown onhover-show-div p-0">
                    <li>Notification <span className="badge badge-pill badge-primary pull-right">1</span></li>

                    <li>
                        <div className="media">
                            <div className="media-body">
                                <h6 className="mt-0 txt-danger"><span><AlertCircle className="font-danger"/></span>News</h6>
                                <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                            </div>
                        </div>
                    </li>
                    <li className="txt-dark"><a href="#javascript">All</a> notification</li>
                </ul>
            </div>
        </Fragment>
    );
};

export default Notification;