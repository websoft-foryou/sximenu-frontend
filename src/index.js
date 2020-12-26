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
import Register from "./view/Register";
import EmailVerification from "./view/EmailVerificatoin";
import PaymentSuccess from "./view/PaymentSuccess";
import AuthService from "./admin/auth/auth_service";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

const Auth = new AuthService();

ReactDOM.render(<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about-us/" component={AboutUs} />

      <Route path="/restaurant/:id" exact children={<MenuResult/>} />
      <Route path="/restaurant/:id/:id" children={<ProductListing/>} />

      <Route path="/signup" component={SignUp} />
      <Route path="/register/:user_id" component={Register} />
      <Route path="/admin" component={Admin} />
      <Route path="/email-activate/:token" children={<EmailVerification verifyType="newverify" />} />
      <Route path="/email-reactivate/:token" children={<EmailVerification verifyType="reverify" />} />
      <Route path="/payment_success" children={<PaymentSuccess section="membership" success="true" auth={Auth}/>} />
      <Route path="/payment_error" children={<PaymentSuccess section="membership" success="error" auth={Auth}/>} />
      <Route path="/payment_success_signup" children={<PaymentSuccess section="signup" success="true" auth={null}/>} />
      <Route path="/payment_error_signup" children={<PaymentSuccess section="signup" success="error" auth={null}/>} />

      <Route path="*">404 | Not found123</Route>
    </Switch>
  </Router>
</Provider>, document.getElementById('root'));

serviceWorker.register();
