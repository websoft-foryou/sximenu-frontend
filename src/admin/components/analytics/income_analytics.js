import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Line } from 'react-chartjs-2';

import configDB from '../../config';

var primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;
const IncomeAanalytics = () => {

    const dailyChartData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: [
            {
                lagend: 'none',
                data: [0, 1000, 2000, 5000, 4500, 4800, 3000, 500, 6700, 5000, 3300, 4500, 4500, 4800, 3000, 500, 6700, 5000, 3300, 4500, 4500, 4800, 3000, 500, 6700, 5000, 3300, 4500, 1000, 12000, 2400],
                borderColor: primary,
                pointBackgroundColor: primary,
                backgroundColor: "transparent",
                fill: 'origin',
            }
        ]
    };

    const weeklyChartData = {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
            {
                lagend: 'none',
                data: [6200, 7000, 8000, 9000, 9500],
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
                data: [16200, 17000, 18000, 19000, 19500, 19500, 18000, 17000, 19000, 21000, 6700, 6700],
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

    return (
        <Fragment>
            <Breadcrumb title="Income Analytics" parent="Analytics" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Income per daily</h5>

                                <div className="float-right">
                                    <select className="form-control " id="cbo_daily_month" placeholder={`Month`}>
                                        <option>Jan</option>
                                        <option>Feb</option>
                                        <option>Mar</option>
                                        <option>Apr</option>
                                        <option>May</option>
                                        <option>Jun</option>
                                        <option>July</option>
                                        <option>Aug</option>
                                        <option>Sep</option>
                                        <option>Oct</option>
                                        <option>Nov</option>
                                        <option>Dec</option>
                                    </select>
                                </div>
                                <div className="float-right m-r-10">
                                    <select className="form-control " id="cbo_daily_year" placeholder={`Year`}>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-body charts-box">
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
                                <h5 className="float-left">Income per weekly</h5>

                                <div className="float-right">
                                    <select className="form-control " id="cbo_weekly_month" placeholder={`Month`}>
                                        <option>Jan</option>
                                        <option>Feb</option>
                                        <option>Mar</option>
                                        <option>Apr</option>
                                        <option>May</option>
                                        <option>Jun</option>
                                        <option>July</option>
                                        <option>Aug</option>
                                        <option>Sep</option>
                                        <option>Oct</option>
                                        <option>Nov</option>
                                        <option>Dec</option>
                                    </select>
                                </div>
                                <div className="float-right m-r-10">
                                    <select className="form-control " id="cbo_weekly_year" placeholder={`Year`}>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-body charts-box">
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
                                <h5 className="float-left">Income per monthly</h5>

                                <div className="float-right m-r-10">
                                    <select className="form-control " id="cbo_monthly_year" placeholder={`Year`}>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-body charts-box">
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
        </Fragment>
    );
};

export default IncomeAanalytics;