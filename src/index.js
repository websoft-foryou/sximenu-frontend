import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./redux/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // browserHistory
} from "react-router-dom";

import Home from "./view/Home";
import MenuResult from "./view/MenuResult";
import ProductListing from "./view/ProductListing";
import AboutUs from "./view/AboutUs";
import SignUp from "./view/SignUp";
import Admin from "./admin/index";
import EmailVerification from "./view/EmailVerificatoin";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';


ReactDOM.render(<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about-us/" component={AboutUs} />

      <Route path="/restaurant/:id" exact children={<MenuResult/>} />
      <Route path="/restaurant/:id/:id" children={<ProductListing/>} />

      <Route path="/signup" component={SignUp} />
      <Route path="/admin" component={Admin} />
      <Route path="/email-activate/:token" children={<EmailVerification />} />

      <Route path="*">404 | Not found</Route>
    </Switch>
  </Router>
</Provider>, document.getElementById('root'));

serviceWorker.register();
