import React, { useEffect, Fragment } from 'react';
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

import './index.scss';



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

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                    <ScrollContext>
                        <Switch>
                            <Route path="/admin/login" component={Signin} />
                            <Fragment>
                                <App>
                                    <Route exact path="/" render={() => {
                                        return (<Redirect to="admin/dashboard" />)
                                    }} />
                                    <Route path="/admin/dashboard" component={UserDashboard} />
                                    <Route path="/admin/category" component={Category} />
                                    <Route path="/admin/product" component={Product} />
                                    <Route path="/admin/restuarant" component={Restaurant} />

                                    <Route path="/admin/history" component={UserHistory} />
                                    <Route path="/admin/user_analytics" component={UserAnalytics} />
                                    <Route path="/admin/income_analytics" component={IncomeAanalytics} />

                                    <Route path="/admin/membership" component={Pricing} />
                                    <Route path="/admin/email_setting" component={EmailSetting} />
                                    <Route path="/admin/password_setting" component={PasswordSetting} />
                                    <Route path="/admin/payment_setting" component={PaymentSetting} />

                                </App>
                            </Fragment>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default Admin;
