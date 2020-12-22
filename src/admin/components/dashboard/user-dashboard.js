import React ,{useEffect, useState, Fragment} from 'react';
import Breadcrumb from '../common/breadcrumb';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';
import { Chart } from "react-google-charts"; // reference url: https://github.com/rakannimer/react-google-charts/blob/master/src/docs/Charts/GeoChart.mdx
import { Navigation, Box, Users } from 'react-feather';
import { MessageCircle } from 'react-feather';

import configDB from '../../config';
import myAPI from "../../../Api";
import {toast} from "react-toastify";
import UnlockButton from "../common/unlockButton";

var primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;

const UserDashboard = (props) => {

    const [loading, setLoading] = useState(false);
    const [todayVisitors, setTodayVisitors] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [lastActivies, setLastActivities] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [recentVisitors, setRecentVisitors] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [deviceLabel, setDeviceLabel] = useState([]);
    const [deviceData, setDeviceData] = useState([]);
    const [browserLabel, setBrowserLabel] = useState([]);
    const [browserData, setBrowserData] = useState([]);
    const [platformLabel, setPlatformLabel] = useState([]);
    const [platformData, setPlatformData] = useState([]);

    const getRecentData = () => {
        setLoading(true);

        try {
            myAPI.getRecentData(props.auth.getToken()).then(response => {
                if (response.data.success) {

                    setTodayVisitors(response.data.result.today_visitors);
                    setTotalVisitors(response.data.result.total_visitors);
                    setTotalIncomes(response.data.result.total_incomes);
                    setLastActivities(response.data.result.last_activies);
                    setRecentVisitors(response.data.result.recent_visitors);
                    setBrowserData(response.data.result.browser_data);
                    setPlatformData(response.data.result.platform_data);

                    // income data
                    let arr = [];
                    let result = response.data.result.income_data;
                    for(const key in result) {
                        arr.push(result[key]);
                    }
                    setIncomeData( arr );

                    // country data
                    arr = [['Country', 'Popularity']];
                    result = response.data.result.country_data;
                    for(const key in result) {
                        let country = [result[key]['country'], parseInt(result[key]['visitor_nums'])];
                        arr.push(country);
                    }
                    setCountryData( arr );


                    // platform data
                    let arr_label = [];
                    let arr_data = [];
                    result = response.data.result.platform_data;
                    for(const key in result) {
                        arr_label.push(result[key]['platform']);
                        arr_data.push(result[key]['visitor_nums']);
                    }
                    setPlatformLabel(arr_label);
                    setPlatformData(arr_data);

                    // browser data
                    arr_label = [];
                    arr_data = [];
                    result = response.data.result.browser_data;
                    for(const key in result) {
                        arr_label.push(result[key]['browser']);
                        arr_data.push(result[key]['visitor_nums']);
                    }
                    setBrowserLabel(arr_label);
                    setBrowserData(arr_data);

                    // device data
                    arr_label = [];
                    arr_data = [];
                    result = response.data.result.device_data;
                    for(const key in result) {
                        arr_label.push(result[key]['device']);
                        arr_data.push(result[key]['visitor_nums']);
                    }
                    setDeviceLabel(arr_label);
                    setDeviceData(arr_data);
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

    useEffect(() => {
        if (props.auth.isPremium()) getRecentData();
    }, []);

    const incomeChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                lagend: 'none',
                data: incomeData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const platformChartData = {
        labels: platformLabel,
        datasets: [
            {
                lagend: 'none',
                data: platformData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const browserChartData = {
        labels: browserLabel,
        datasets: [
            {
                lagend: 'none',
                data: browserData,
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const deviceChartData = {
        labels: deviceLabel,
        datasets: [
            {
                lagend: 'none',
                data: deviceData,
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
        legend: { display: false, },
        scales: {
            xAxes: [{
                gridLines: { color: "rgba(0, 0, 0, 0)",},
                display: true
            }]
        },
        plugins: {
            datalabels: { display: false, }
        }
    }

    return (
        <Fragment>
            <Breadcrumb   parent = "" title="Dashboard" />
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
                    <div className="col-12 col-lg-8 xl-100">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <div className="card o-hidden">
                                    <div className="bg-primary b-r-4 card-body">
                                        <div className="media static-top-widget">
                                            <div className="align-self-center text-center">
                                                <Navigation />
                                            </div>
                                            <div className="media-body">
                                                <span className="m-0">Today Visitors</span>
                                                <h4 className="mb-0 counter">
                                                    <CountUp className="counter" end={todayVisitors} />
                                                </h4>
                                                <Navigation className="icon-bg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="card o-hidden">
                                    <div className="bg-info b-r-4 card-body">
                                        <div className="media static-top-widget">
                                            <div className="align-self-center text-center">
                                                <Box />
                                            </div>
                                            <div className="media-body">
                                                <span className="m-0">Total Visitors</span>
                                                <h4 className="mb-0 counter">
                                                    <CountUp className="counter" end={totalVisitors} />
                                                </h4>
                                                <Box className="icon-bg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="card o-hidden">
                                    <div className="bg-primary b-r-4 card-body">
                                        <div className="media static-top-widget">
                                            <div className="align-self-center text-center">
                                                <Users />
                                            </div>
                                            <div className="media-body">
                                                <span className="m-0">Total Income</span>
                                                <h4 className="mb-0 counter">
                                                    <CountUp className="counter" end={totalIncomes} />
                                                </h4>
                                                <Users className="icon-bg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>2020 Incoming </h5>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock graph"/>
                                    }
                                    <div className={`card-body charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        <div className="flot-chart-container">
                                            <div className="flot-chart-placeholder" id="graph123">
                                                <Line data={incomeChartData} options={chartOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>2020 Platform </h5>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock graph"/>
                                    }
                                    <div className={`card-body charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        <div className="flot-chart-container">
                                            <div className="flot-chart-placeholder" id="graph123">
                                                <Line data={platformChartData} options={chartOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>2020 Browser </h5>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock graph"/>
                                    }
                                    <div className={`card-body charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        <div className="flot-chart-container">
                                            <div className="flot-chart-placeholder" id="graph123">
                                                <Line data={browserChartData} options={chartOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>2020 Device </h5>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock graph"/>
                                    }
                                    <div className={`card-body charts-box ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        <div className="flot-chart-container">
                                            <div className="flot-chart-placeholder" id="graph123">
                                                <Line data={deviceChartData} options={chartOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Visitors Distribution </h5>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock map"/>
                                    }
                                    <div className={`card-body activity-scroll ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        <Chart
                                            width={'100%'}
                                            height={'300px'}
                                            chartType="GeoChart"
                                            // data={[
                                            //     ['Country', 'Popularity'],
                                            //     ['RU', 1],
                                            // ]}
                                            data={ countryData }
                                            // Note: you will need to get a mapsApiKey for your project.
                                            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                                            mapsApiKey="YOUR_KEY_HERE"
                                            rootProps={{ 'data-testid': '1' }}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>LAST 5 Activities</h5>
                                    </div>
                                    <div className="card-body activity-scroll">
                                        <div className="activity">
                                            {
                                                lastActivies.map((activity, index) => {

                                                    return (
                                                        <div className="media" key={`last-activity-${activity.id}`}>
                                                            <div className="gradient-round m-r-30 gradient-line-1">
                                                                <MessageCircle />
                                                            </div>
                                                            <div className="media-body">
                                                                <h6>{activity.user_action} <span className="pull-right f-14">{activity.when}</span></h6>
                                                                <p>{activity.description}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card height-equal">
                                    <div className="card-header card-header-border">
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <h5>Recent 5 Visitors</h5>
                                            </div>
                                            {props.auth.isPremium() &&
                                            <div className="col-sm-5">
                                                <div className="pull-right right-header">
                                                    <div className="onhover-dropdown">
                                                        <button className="btn btn-default" type="button">Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    {props.auth.isFreemium() &&
                                    <UnlockButton title="unlock report"/>
                                    }
                                    <div className={`card-body  recent-notification ${props.auth.isFreemium() ? `freemium_status` : `` }` }>
                                        {
                                            recentVisitors.map((visitor, index) => {
                                                return (
                                                    <div className="media" key={`last-activity-${visitor.id}`}>
                                                        <h6>{visitor.activity_date}</h6>
                                                        <div className="media-body"><span>{visitor.description}</span>
                                                            {/*<p className="f-12">By Kan</p>*/}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default UserDashboard;