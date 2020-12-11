import React, { Fragment } from 'react';
import man from '../../../assets/images/dashboard/user.png'

const UserPanel = () => {
    const url = '';
    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : man} alt="#" />

                </div>
                <h6 className="mt-3 f-14">Administrator</h6>
                <p>homepage manager</p>
            </div>
        </Fragment>
    );
};

export default UserPanel;