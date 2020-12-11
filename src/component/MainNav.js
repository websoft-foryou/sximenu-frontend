import React from "react";
import {FiMenu, FiUser, FiInfo} from "react-icons/fi";
import {MdClose, MdHome} from "react-icons/md";
import "../assets/scss/main-nav.scss";
import {Link} from "react-router-dom";
import logo from "../assets/img/logo.svg";
import {closeNavigation, toggleNavigation} from "../redux";
import {connect} from "react-redux";

const MainNav = ({isShowingNavbar, toggleNavigation, closeNavigation}) => {
  return (
    <React.Fragment>
      <div
        onClick={closeNavigation}
        className={isShowingNavbar ? 'nav-overlay is-nav-showing' : 'nav-overlay'}>&nbsp;</div>
      <button
        onClick={toggleNavigation}
        className={isShowingNavbar ? 'nav-toggle-btn is-nav-showing' : 'nav-toggle-btn is-nav-hide'}><FiMenu className="nav-menu"/><MdClose className="nav-close"/></button>

      <div className={isShowingNavbar ? 'navigation-bar is-nav-showing': 'navigation-bar'}>
        <div className="navigation-bar-inner">
          <ul className="navigation">
            <li><Link to="/"><MdHome className="nav-icon"/> <span className="nav-text">Home</span></Link></li>
            <li><Link to="/"><FiInfo className="nav-icon"/> <span className="nav-text">About Us</span></Link></li>
            <li><Link to="/"><FiUser className="nav-icon"/> <span className="nav-text">Login</span></Link></li>
          </ul>

          <div className="navigation-bar-footer">
            <img src={logo} alt="" className="navigation-bar-logo"/>
            <p className='navigation-bar-copyright'><small>Copyright © 2019 SixMenu.com</small></p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

const mapStateToProps = state => {
  return {
    isShowingNavbar: state.navigation.isShowingNavbar
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNavigation: () => dispatch(toggleNavigation()),
    closeNavigation: () => dispatch(closeNavigation())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);