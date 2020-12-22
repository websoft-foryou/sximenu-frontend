import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Line } from 'react-chartjs-2';

import configDB from '../../config';
import myAPI from "../../../Api";
import {toast, ToastContainer} from "react-toastify";
import UnlockButton from "../common/unlockButton";

var primary = configDB.data.color.primary_color;
const UserAnalytics = (props) => {

    const this_year = new Date().getFullYear();
    const this_month = new Date().getMonth() + 1;
    const [dailyData, setDailyData] = useState([]);
    const [dailyYear, setDailyYear] = useState(this_year);
    const [dailyMonth, setDailyMonth] = useState(this_month);

    const [weeklyData, setWeeklyData] = useState([]);
    const [weeklyYear, setWeeklyYear] = useState(this_year);
    const [weeklyMonth, setWeeklyMonth] = useState(this_month);

    const [monthlyData, setMonthlyData] = useState([]);

    const [loading, setLoading] = useState(false);
    const auth = props.auth;

    const daysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const weeksInMonth = (year, month) => {
        let now = new Date();
        let onejan = new Date(now.getFullYear(), 0, 1);
        let first_date = new Date(now.getFullYear(), month - 1, 1);
        let week_start = Math.ceil( (((first_date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );

        let last_date = new Date(now.getFullYear(), month-1, daysInMonth(year, month));
        let week_end = Math.ceil( (((last_date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );

        return week_end - week_start + 1;
    };

    let year_array = [];
    for (let i = this_year - 3; i <= this_year + 3; i ++) {
        year_array.push(i);
    }

    let dailyDataLabels = [];
    for (let i = 1; i <= daysInMonth(dailyYear, dailyMonth); i ++) {
        dailyDataLabels.push(i);
    }

    let weeklyDataLabels = [];
    for (let i = 1; i <= weeksInMonth(weeklyYear, weeklyMonth); i ++) {
        weeklyDataLabels.push(i);
    }

    useEffect(() => {
        if (auth.isPremium()) {
            getDailyAnalyticsData(this_year, this_month);
            getWeeklyAnalyticsData(this_year, this_month);
            getMonthlyAnalyticsData(this_year);
        }
    },[]);



    const dailyChartData = {
        labels: dailyDataLabels,
        datasets: [
            {
                lagend: 'none',
                data: dailyData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const weeklyChartData = {
        labels: weeklyDataLabels,
        datasets: [
            {
                lagend: 'none',
                data: weeklyData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const monthlyChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                lagend: 'none',
                data: monthlyData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        height: 45,
        width: 500,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                display: true
            }]
        },
        plugins: {
            datalabels: {
                display: false,
            }
        }
    }

    const getDailyAnalyticsData = (year, month) => {
        if (auth.isFreemium()) {
            toast.warn('Only premium members can see graph.')
            return;
        }
        setLoading(true);
        try {
            myAPI.getUserDailyAnalyticsData(auth.getToken(), year, month).then(response => {
                if (response.data.success) {
                    let arr = [];
                    let result = response.data.result;
                    for(const key in result) {
                        arr.push(result[key]);
                    }
                    setDailyData( arr);
                }
                else
                    toast.error(response.data.result);
            });

        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const getWeeklyAnalyticsData = (year, month) => {
        if (auth.isFreemium()) {
            toast.warn('Only premium members can see graph.')
            return;
        }

        setLoading(true);
        try {
            myAPI.getUserWeeklyAnalyticsData(auth.getToken(), year, month).then(response => {
                if (response.data.success) {
                    let arr = [];
                    let result = response.data.result;
                    for(const key in result) {
                        arr.push(result[key]);
                    }
                    setWeeklyData( arr );
                }
                else
                    toast.error(response.data.result);
            });

        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const getMonthlyAnalyticsData = (year) => {
        if (auth.isFreemium()) {
            toast.warn('Only premium members can see graph.')
            return;
        }

        setLoading(true);
        try {
            myAPI.getUserMonthlyAnalyticsData(auth.getToken(), year).then(response => {
                if (response.data.success) {
                    let arr = [];
                    let result = response.data.result;
                    for(const key in result) {
                        arr.push(result[key]);
                    }
                    setMonthlyData( arr );
                }
                else
                    toast.error(response.data.result);
            });

        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Breadcrumb title="User Analytics" parent="Analytics" />
            {loading &&
            <div id="myOverlay" className="overlay">
                <div className="overlay-content">
                    <div className="loader-box" style={{display: "block"}}>
                        <div className="loader">
                            <div className="line bg-warning"></div>
                            <div className="line bg-warning"></div>
                            <div className="line bg-warning"></div>
                            <div className="line bg-warning"></div>
                        </div>
                    </div>
                </div>
            </div>
            }
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Visitory per daily</h5>

                                <div className="float-right">
                                    <select className="form-control " placeholder={`Month`} defaultValue={this_month}  onChange={ e => { setDailyMonth(e.target.value); getDailyAnalyticsData(dailyYear, e.target.value)} }>
                                        <option value="01">Jan</option>
                                        <option value="02">Feb</option>
                                        <option value="03">Mar</option>
                                        <option value="04">Apr</option>
                                        <option value="05">May</option>
                                        <option value="06">Jun</option>
                                        <option value="07">July</option>
                                        <option value="08">Aug</option>
                                        <option value="09">Sep</option>
                                        <option value="10">Oct</option>
                                        <option value="11">Nov</option>
                                        <option value="12">Dec</option>
                                    </select>
                                </div>
                                <div className="float-right m-r-10">
                                    <select className="form-control " placeholder={`Year`} defaultValue={this_year} onChange={e => { setDailyYear(e.target.value); getDailyAnalyticsData(e.target.value, dailyMonth)} }>
                                        {
                                            year_array.map((year) => {
                                                return <option key={`daily_${year}`} >{year}</option>
                                            })
                                        }

                                    </select>
                                </div>
                            </div>
                            { auth.isFreemium() &&
                            <UnlockButton title="unlock graph"/>
                            }
                            <div className={`card-body  charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                <div className="flot-chart-container">
                                    <div className="flot-chart-placeholder" id="graph_daily">
                                        <Line data={dailyChartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Visitory per weekly</h5>

                                <div className="float-right">
                                    <select className="form-control " placeholder={`Month`} defaultValue={this_month}  onChange={ e => { setWeeklyMonth(e.target.value); getWeeklyAnalyticsData(weeklyYear, e.target.value)} }>
                                        <option value="01">Jan</option>
                                        <option value="02">Feb</option>
                                        <option value="03">Mar</option>
                                        <option value="04">Apr</option>
                                        <option value="05">May</option>
                                        <option value="06">Jun</option>
                                        <option value="07">July</option>
                                        <option value="08">Aug</option>
                                        <option value="09">Sep</option>
                                        <option value="10">Oct</option>
                                        <option value="11">Nov</option>
                                        <option value="12">Dec</option>
                                    </select>
                                </div>
                                <div className="float-right m-r-10">
                                    <select className="form-control " placeholder={`Year`} defaultValue={this_year} onChange={e => { setWeeklyYear(e.target.value); getWeeklyAnalyticsData(e.target.value, weeklyMonth)} }>
                                        {
                                            year_array.map((year) => {
                                                return <option key={`weekly_${year}`} >{year}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            { auth.isFreemium() &&
                            <UnlockButton title="unlock graph"/>
                            }
                            <div className={`card-body  charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                <div className="flot-chart-container">
                                    <div className="flot-chart-placeholder" id="graph_weekly">
                                        <Line data={weeklyChartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row m-b-50">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Visitory per monthly</h5>

                                <div className="float-right m-r-10">
                                    <select className="form-control " placeholder={`Year`} defaultValue={this_year} onChange={e => { getMonthlyAnalyticsData(e.target.value)} }>
                                        {
                                            year_array.map((year) => {
                                                return <option key={`weekly_${year}`} >{year}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            { auth.isFreemium() &&
                            <UnlockButton title="unlock graph"/>
                            }
                            <div className={`card-body  charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                <div className="flot-chart-container">
                                    <div className="flot-chart-placeholder" id="graph_weekly">
                                        <Line data={monthlyChartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default UserAnalytics;