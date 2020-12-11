import React from 'react';
import {closeNavigation} from "./redux";
import {connect} from "react-redux";
import {utils} from "./helper/utils";

function App(props) {
  return (
    <div className="app" dir={utils.siteLanguage() === 'il' ? 'rtl' : ''}>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.util.lang
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavigation: () => dispatch(closeNavigation())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
