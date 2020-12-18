import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';

import {Provider} from "react-redux";
import store from "../redux/store";

import App from './components/app';
import configDB from './config'

import Signin from './auth/signin';
import UserDashboard from './components/dashboard/user-dashboard';
import Category from './components/basedata/category';
import Product from './components/basedata/product';
import Restaurant from './components/basedata/restaurant';
import UserHistory from "./components/other/history";
import UserAnalytics from "./components/analytics/user_analytics";
import IncomeAanalytics from "./components/analytics/income_analytics";
import Pricing from "./components/other/pricing";
import EmailSetting from "./components/setting/email_setting";
import PasswordSetting from "./components/setting/password_setting";
import PaymentSetting from "./components/setting/payment_setting";
import AuthService from "./auth/auth_service";

import './index.scss';


const Auth = new AuthService();

const Admin = () => {
    const abortController = new AbortController();
    // const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version
        // app.auth().onAuthStateChanged(setCurrentUser);

        document.body.classList.add(layout);

        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;

        return function cleanup() {
            abortController.abort();
        }

    }, [abortController]);

    const isLoggedIn = () => {
        return Auth.isAuthenticated();
    };

    const isAdmin = () => {
        //return Auth.isAdmin();
        return false;
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            isLoggedIn() ? <App><Component {...props} /></App>  : <Redirect to='/admin/login' />
        )} />
    );

    const PublicRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) =>
            <Component {...props} />
        } />
    );

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                    <ScrollContext>
                        <Switch>
                            <Route path="/admin/login" render={ () => isLoggedIn() ? <Redirect to='/admin/dashboard' /> : <Signin /> } />

                            {!isAdmin() ?
                                <>
                                    <PrivateRoute path="/admin/dashboard" component={UserDashboard}/>
                                    <PrivateRoute path="/admin/category" component={() => <Category auth={Auth} />} />
                                    <PrivateRoute path="/admin/product" component={() => <Product auth={Auth} />}/>
                                    <PrivateRoute path="/admin/restuarant" component={() => <Restaurant auth={Auth} />}/>

                                    <PrivateRoute path="/admin/history" component={UserHistory}/>
                                    <PrivateRoute path="/admin/user_analytics" component={UserAnalytics}/>
                                    <PrivateRoute path="/admin/income_analytics" component={IncomeAanalytics}/>

                                    <PrivateRoute path="/admin/membership" component={Pricing}/>
                                    <PrivateRoute path="/admin/email_setting" component={EmailSetting}/>
                                    <PrivateRoute path="/admin/password_setting" component={PasswordSetting}/>
                                    <PrivateRoute path="/admin/payment_setting" component={PaymentSetting}/>
                                </>
                                :
                                <PrivateRoute path="/admin/dashboard" component={UserDashboard}/>
                            }

                            <PublicRoute path="/admin/*">404 | Not found</PublicRoute>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default Admin;
