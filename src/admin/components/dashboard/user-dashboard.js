import React ,{useEffect , Fragment} from 'react';
import Breadcrumb from '../common/breadcrumb';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';
import { Chart } from "react-google-charts"; // reference url: https://github.com/rakannimer/react-google-charts/blob/master/src/docs/Charts/GeoChart.mdx
import { Navigation, Box, Users } from 'react-feather';
import { Tag, ShoppingBag, MessageCircle, MinusCircle } from 'react-feather';
// import { DollarSign, Tag, ShoppingBag, MessageCircle, MinusCircle, ThumbsUp, MessageSquare, Briefcase, MoreHorizontal, Send, Activity, Anchor, Compass, Cpu, Slack, Umbrella, Box, Book } from 'react-feather';
 //import { calcultionOptions, calcultionData } from '../../../charts-data/default'
// import ChartistGraph from 'react-chartist';
// import EventCharts from './eventCharts';
import configDB from '../../config';

var Knob = require('knob')// browserify require
var primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;

const UserDashboard = () => {

    // useEffect(() => {
    //     var profit = Knob({
    //         value: 35,
    //         left: 1,
    //         angleOffset: 90,
    //         className: "review",
    //         thickness: 0.2,
    //         width: 270,
    //         height: 270,
    //         fgColor: primary,
    //         readOnly: false,
    //         dynamicDraw: false,
    //         tickColorizeValues: true,
    //         bgColor: '#f6f7fb',
    //         lineCap: 'round',
    //         displayPrevious:true
    //     })
    //     document.getElementById('profit').appendChild(profit);
    // },[]);

    const incomeChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                lagend: 'none',
                data: [0, 1000, 2000, 5000, 4500, 4800, 3000, 500, 6700, 5000, 3300, 4500],
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };
    const incomeChartOptions = {
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

    return (
        <Fragment>
            <Breadcrumb   parent = "Dashboard" title = "Default" />
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
                                                    <CountUp className="counter" end={6659} />
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
                                                    <CountUp className="counter" end={9856} />
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
                                                    <CountUp className="counter" end={45631} />
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
                                        <h5>2020 Incoming</h5>
                                    </div>
                                    <div className="card-body charts-box">
                                        <div className="flot-chart-container">
                                            <div className="flot-chart-placeholder" id="graph123">
                                                <Line data={incomeChartData} options={incomeChartOptions} />
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
                                    <div className="card-body activity-scroll">
                                        <Chart
                                            width={'100%'}
                                            height={'300px'}
                                            chartType="GeoChart"
                                            data={[
                                                ['Country', 'Popularity'],
                                                ['Germany', 200],
                                                ['United States', 300],
                                                ['Brazil', 400],
                                                ['Canada', 500],
                                                ['France', 600],
                                                ['RU', 700],
                                            ]}
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
                                            <div className="media">
                                                <div className="gradient-round m-r-30 gradient-line-1">
                                                    <ShoppingBag />
                                                </div>
                                                <div className="media-body">
                                                    <h6>New Sale <span className="pull-right f-14">New</span></h6>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="gradient-round m-r-30 gradient-line-1">
                                                    <MessageCircle />
                                                </div>
                                                <div className="media-body">
                                                    <h6>New Message <span className="pull-right f-14">14m Ago</span></h6>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="gradient-round m-r-30 small-line">
                                                    <MinusCircle />
                                                </div>
                                                <div className="media-body">
                                                    <h6>New Report <span className="pull-right f-14">14m Ago</span></h6>
                                                    <p className="activity-xl">Lorem Ipsum is simply dummy text.</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="gradient-round m-r-30 gradient-line-1">
                                                    <ShoppingBag />
                                                </div>
                                                <div className="media-body">
                                                    <h6>New Sale <span className="pull-right f-14">14m Ago</span></h6>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="gradient-round m-r-30 medium-line">
                                                    <Tag />
                                                </div>
                                                <div className="media-body">
                                                    <h6>New Visits <span className="pull-right f-14">14m Ago</span></h6>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p>
                                                </div>
                                            </div>
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
                                            <div className="col-sm-5">
                                                <div className="pull-right right-header">
                                                    <div className="onhover-dropdown">
                                                        <button className="btn btn-primary" type="button">Details </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body recent-notification">
                                        <div className="media">
                                            <h6>09:00</h6>
                                            <div className="media-body"><span>Lorem ipsum dolor sit amit,consectetur eiusmdd.</span>
                                                <p className="f-12">By Kan</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <h6>10:50</h6>
                                            <div className="media-body"><span>Lorem ipsum.</span>
                                                <p className="f-12">By Tailer</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <h6>01:00</h6>
                                            <div className="media-body"><span>Lorem ipsum dolor sit amit,consectetur eiusmdd.</span>
                                                <p className="f-12">By Kaint</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <h6>05:00</h6>
                                            <div className="media-body"><span>Lorem ipsum dolor sit amit.</span>
                                                <p className="f-12">By call</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <h6>12:00</h6>
                                            <div className="media-body"><span>Lorem ipsum dolor sit.</span>
                                                <p className="f-12">By Waiter</p>
                                            </div>
                                        </div>
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