import React, { Fragment } from 'react';
import man from '../../../assets/images/dashboard/avatar.png';
import { LogOut } from 'react-feather';
import { withRouter } from 'react-router';

const UserMenu = ({ history }) => {

    const logOut = () => {
        localStorage.removeItem('profileURL')
        //app.auth().signOut()
        history.push('/admin/login');
    }

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><a onClick={logOut} href="#!" ><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default withRouter(UserMenu);
