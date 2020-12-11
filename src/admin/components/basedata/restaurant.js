import React, { useState, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import TimePickerMonFrom from '../common/timepicker-four';
import TimePickerMonTo from '../common/timepicker-four';
import TimePickerTueFrom from '../common/timepicker-four';
import TimePickerTueTo from '../common/timepicker-four';
import TimePickerWedFrom from '../common/timepicker-four';
import TimePickerWedTo from '../common/timepicker-four';
import TimePickerThuFrom from '../common/timepicker-four';
import TimePickerThuTo from '../common/timepicker-four';
import TimePickerFriFrom from '../common/timepicker-four';
import TimePickerFriTo from '../common/timepicker-four';
import TimePickerSatFrom from '../common/timepicker-four';
import TimePickerSatTo from '../common/timepicker-four';
import TimePickerSunFrom from '../common/timepicker-four';
import TimePickerSunTo from '../common/timepicker-four';

import '../../assets/css/mystyle.css';


const Restaurant = (props) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState();
    const [selectedPlace, setSelectedPlace] = useState();
    const [openSun, setOpenSun] = useState(false);
    const [openMon, setOpenMon] = useState(false);
    const [openTue, setOpenTue] = useState(false);
    const [openWed, setOpenWed] = useState(false);
    const [openThu, setOpenThu] = useState(false);
    const [openFri, setOpenFri] = useState(false);
    const [openSat, setOpenSat] = useState(false);

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace({
            selectedPlace: props
        });
        setActiveMarker({
            activeMarker: marker
        });
        setShowingInfoWindow({
            showingInfoWindow: true
        })
    };

    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow({
                showingInfoWindow: false
            });
            setActiveMarker({
                activeMarker: null
            })
        }
    };

    const handleCheckSun = () => { setOpenSun( ! openSun); };
    const handleCheckMon = () => { setOpenMon( ! openMon); };
    const handleCheckTue = () => { setOpenTue( ! openTue); };
    const handleCheckWed = () => { setOpenWed( ! openWed); };
    const handleCheckThu = () => { setOpenThu( ! openThu); };
    const handleCheckFri = () => { setOpenFri( ! openFri); };
    const handleCheckSat = () => { setOpenSat( ! openSat); };

    return (
        <Fragment>
            <Breadcrumb title="Restaurant Info" parent="Data" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Hours Opening</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkSunday" type="checkbox" onChange={() => handleCheckSun() } />
                                            <label className="float-left" htmlFor="chkSunday" style={{lineHeight: 1.2}}>SUN: </label>
                                            <TimePickerSunFrom isDisabled={ ! openSun} /> <TimePickerSunTo  isDisabled={ ! openSun} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkMonday" type="checkbox" onChange={() => handleCheckMon() } />
                                            <label className="float-left" htmlFor="chkMonday" style={{lineHeight: 1.2}}>MON: </label>
                                            <TimePickerMonFrom isDisabled={ ! openMon} /> <TimePickerMonTo isDisabled={ ! openMon} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkTuesday" type="checkbox" onChange={() => handleCheckTue() } />
                                            <label className="float-left" htmlFor="chkTuesday" style={{lineHeight: 1.2}}>TUE: </label>
                                            <TimePickerTueFrom isDisabled={ ! openTue} /> <TimePickerTueTo isDisabled={ ! openTue} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkWednesday" type="checkbox" onChange={() => handleCheckWed() } />
                                            <label className="float-left" htmlFor="chkWednesday" style={{lineHeight: 1.2}}>WED: </label>
                                            <TimePickerWedFrom isDisabled={ ! openWed} /> <TimePickerWedTo isDisabled={ ! openWed} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkThursday" type="checkbox" onChange={() => handleCheckThu() } />
                                            <label className="float-left" htmlFor="chkThursday" style={{lineHeight: 1.2}}>THU: </label>
                                            <TimePickerThuFrom isDisabled={ ! openThu} /> <TimePickerThuTo isDisabled={ ! openThu} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkFriday" type="checkbox" onChange={() => handleCheckFri() } />
                                            <label className="float-left" htmlFor="chkFriday" style={{lineHeight: 1.2}}>FRI: </label>
                                            <TimePickerFriFrom isDisabled={ ! openFri} /> <TimePickerFriTo isDisabled={ ! openFri} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkSaturday" type="checkbox" onChange={() => handleCheckSat() } />
                                            <label className="float-left" htmlFor="chkSaturday" style={{lineHeight: 1.2}}>SAT: </label>
                                            <TimePickerSatFrom isDisabled={ ! openSat} /> <TimePickerSatTo isDisabled={ ! openSat} />
                                        </div>
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
                                <h5 className="float-left">Address</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-12">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Restaurant Location</h5>
                            </div>
                            <div className="card-body">
                                <div className="map-js-height">
                                    <div id="gmap-simple" className="map-block">
                                        <Map google={props.google} onClick={onMapClicked} zoom={14}>
                                            <Marker onClick={onMarkerClick}
                                                    name={'Current location'} />
                                            <InfoWindow
                                                marker={activeMarker}
                                                visible={showingInfoWindow}>
                                                <div>
                                                    <h1>{selectedPlace}</h1>
                                                </div>
                                            </InfoWindow>
                                        </Map>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">Social Links</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Facebook</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Twitter</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">LinkedIn</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Telegram</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Youtube</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-success float-right" style={{marginBottom: '80px'}}>Submit</button>
                    </div>
                </div>
            </div>


            />
        </Fragment>

    );
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCdXpLSJ3Ibdu-Phs9QOvpqb9d1DtPf7wQ")
})(Restaurant);