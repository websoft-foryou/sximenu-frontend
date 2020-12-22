import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';

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
import GoogleMaps from "../../../component/GoogleMaps";

import myAPI from "../../../Api";
import '../../assets/css/mystyle.css';


const Restaurant = (props) => {

    const [openDay, setOpenDay] = useState({Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false});
    const [openHourFrom, setOpenHourFrom] = useState({Mon: "00:00", Tue: "00:00", Wed: "00:00", Thu: "00:00", Fri: "00:00", Sat: "00:00", Sun: "00:00"});
    const [openHourTo, setOpenHourTo] = useState({Mon: "00:00", Tue: "00:00", Wed: "00:00", Thu: "00:00", Fri: "00:00", Sat: "00:00", Sun: "00:00"});
    const [nameEn, setNameEn] = useState('');
    const [nameHb, setNameHb] = useState('');
    const [addressEn, setAddressEn] = useState('');
    const [addressHb, setAddressHb] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [telegram, setTelegram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [loading, setLoading] = useState(false);

    const [mapLocation, setMapLocation] = useState({
            position: 'Soroka Sorting / Wingate, Be\'er Sheva, Israel',
            latitude: 31.255693,
            longitude: 34.79998
        });

    const auth = props.auth;

    useEffect(() => {
        getRestaurantData();
    },[]);

    const handleCheckDay = (day, value) => {
        setOpenDay((prev) => ({
            ...prev, [day]: value
        }));
        if (openDay[day]) {
            handleOpenHourFrom(day, '00:00');
            handleOpenHourTo(day, '00:00');
        }
    };

    const handleTimeChange = (day, fromOrTo, hour, minute) => {
        if (fromOrTo === 'from') {
            handleOpenHourFrom(day, hour + ':' + minute);
        }
        if (fromOrTo === 'to') {
            handleOpenHourTo(day, hour + ':' + minute);
        }
    };

    const handleOpenHourFrom = (day, value) => {
        setOpenHourFrom((prev) => ({
            ...prev, [day]: value
        }));
    };
    const handleOpenHourTo = (day, value) => {
        setOpenHourTo((prev) => ({
            ...prev, [day]: value
        }));
    };

    const handleChangeLocation = (cur_location) => {
        //console.log('cur location = ');
        //console.log(cur_location);
        setMapLocation({
            position: cur_location.addr,
            latitude: cur_location.lat,
            longitude: cur_location.lng
        } );
    };

    const getRestaurantData = async() => {
        setLoading(true)
        try {
            await myAPI.getRestaurantInformation(auth.getToken()).then(response => {
                if (response.data.success) {
                    let result = response.data.result;

                    setOpenDay({
                        Mon: result.mon_from === '' || result.mon_from === null ? false : true, Tue: result.tue_from === '' || result.tue_from === null ? false : true,
                        Wed: result.wed_from === '' || result.wed_from === null ? false : true, Thu: result.thu_from === '' || result.thu_from === null ? false : true,
                        Fri: result.fri_from === '' || result.wed_from === null ? false : true, Sat: result.sat_from === '' || result.sat_from === null ? false : true,
                        Sun: result.sun_from === '' || result.wed_from === null ? false : true,
                    });
                    setOpenHourFrom({
                        Mon: result.mon_from === ''  || result.mon_from === null ? '00:00' : result.mon_from, Tue: result.tue_from === '' || result.tue_from === null ? '00:00' : result.tue_from,
                        Wed: result.wed_from === '' || result.wed_from === null ? '00:00' : result.wed_from, Thu: result.thu_from === '' || result.thu_from === null ? '00:00' : result.thu_from,
                        Fri: result.fri_from === '' || result.fri_from === null ? '00:00' : result.fri_from, Sat: result.sat_from === '' || result.sat_from === null ? '00:00' : result.sat_from,
                        Sun: result.sun_from === '' || result.sun_from === null ? '00:00' : result.sun_from,
                    });
                    setOpenHourTo({
                        Mon: result.mon_to === '' || result.mon_to === null ? '00:00' : result.mon_to, Tue: result.tue_to === '' || result.tue_to === null ? '00:00' : result.tue_to,
                        Wed: result.wed_to === '' || result.wed_to === null ? '00:00' : result.wed_to, Thu: result.thu_to === '' || result.thu_to === null ? '00:00' : result.thu_to,
                        Fri: result.fri_to === '' || result.fri_to === null ? '00:00' : result.fri_to, Sat: result.sat_to === '' || result.sat_to === null ? '00:00' : result.sat_to,
                        Sun: result.sun_to === '' || result.sun_to === null ? '00:00' : result.sun_to,
                    });

                    setNameEn(result.name_en);
                    setNameHb(result.name_hb);
                    setAddressEn(result.address_en);
                    setAddressHb(result.address_hb);
                    setFacebook(result.facebook == null ? '' : result.facebook);
                    setTwitter(result.twitter === null ? '' : result.twitter);
                    setLinkedin(result.linkedin === null ? '' : result.linkedin);
                    setTelegram(result.telegram === null ? '' : result.telegram);
                    setYoutube(result.youtube === null ? '' : result.youtube);

                    let location = {
                        position: result.location,
                        latitude: result.latitude,
                        longitude: result.longitude
                    };

                    setMapLocation(location);
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

    const saveRestaurantData = async() => {

        let exist_open_hours = false;
        for(const key in openDay) {
            if (openDay[key]) exist_open_hours = true;
            if (openDay[key] && openHourFrom[key] >= openHourTo[key]) {
                toast.error('Please select time for ' + key + ' correctly.' );
                return;
            }
        }

        if (! exist_open_hours) {
            toast.error('You have to specify at least one time for opening.');
            return;
        }


        if ( mapLocation.position === '' || mapLocation.latitude === '' || mapLocation.longitude === '') {
            toast.error('You have to specify address of restaurant.');
            return;
        }

        setLoading(true);
        try {
            await myAPI.saveRestaurantInformation({
                open_day: openDay,
                open_from: openHourFrom,
                open_to: openHourTo,
                name_en: nameEn,
                name_hb: nameHb,
                address_en: addressEn,
                address_hb: addressHb,
                location: mapLocation,
                facebook: facebook,
                twitter: twitter,
                linkedin: linkedin,
                telegram: telegram,
                youtube: youtube,
            }, auth.getToken()).then(response => {
                if (response.data.success)
                    toast.info('Saved successfully.');
                else
                    toast.error(response.data.result);
            })
        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Breadcrumb title="Restaurant Info" parent="Data" />
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
                                <h5 className="float-left">Hours Opening</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkSunday" type="checkbox" checked={openDay['Sun']} onChange={() => handleCheckDay('Sun', !openDay['Sun']) } />
                                            <label className="float-left" htmlFor="chkSunday" style={{lineHeight: 1.2}}>SUN: </label>
                                            <TimePickerSunFrom isDisabled={ ! openDay['Sun']} timeValue={openHourFrom['Sun']} onValueChange={ (h, m) => handleTimeChange('Sun', 'from', h, m) } />
                                            <TimePickerSunTo  isDisabled={ ! openDay['Sun']} timeValue={openHourTo['Sun']} onValueChange={ (h, m) => handleTimeChange('Sun', 'to', h, m) } />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkMonday" type="checkbox" checked={openDay['Mon']} onChange={() => handleCheckDay('Mon', !openDay['Mon']) } />
                                            <label className="float-left" htmlFor="chkMonday" style={{lineHeight: 1.2}}>MON: </label>
                                            <TimePickerMonFrom isDisabled={ ! openDay['Mon']} timeValue={openHourFrom['Mon']} onValueChange={ (h, m) => handleTimeChange('Mon', 'from', h, m) } />
                                            <TimePickerMonTo isDisabled={ ! openDay['Mon']} timeValue={openHourTo['Mon']} onValueChange={ (h, m) => handleTimeChange('Mon', 'to', h, m) } />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkTuesday" type="checkbox" checked={openDay['Tue']} onChange={() => handleCheckDay('Tue', !openDay['Tue']) } />
                                            <label className="float-left" htmlFor="chkTuesday" style={{lineHeight: 1.2}}>TUE: </label>
                                            <TimePickerTueFrom isDisabled={ ! openDay['Tue']} timeValue={openHourFrom['Tue']} onValueChange={ (h, m) => handleTimeChange('Tue', 'from', h, m) } />
                                            <TimePickerTueTo isDisabled={ ! openDay['Tue']} timeValue={openHourTo['Tue']} onValueChange={ (h, m) => handleTimeChange('Tue', 'to', h, m) } />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkWednesday" type="checkbox" checked={openDay['Wed']} onChange={() => handleCheckDay('Wed', !openDay['Wed']) } />
                                            <label className="float-left" htmlFor="chkWednesday" style={{lineHeight: 1.2}}>WED: </label>
                                            <TimePickerWedFrom isDisabled={ ! openDay['Wed']} timeValue={openHourFrom['Wed']} onValueChange={ (h, m) => handleTimeChange('Wed', 'from', h, m) } />
                                            <TimePickerWedTo isDisabled={ ! openDay['Wed']} timeValue={openHourTo['Wed']} onValueChange={ (h, m) => handleTimeChange('Wed', 'to', h, m) } />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkThursday" type="checkbox" checked={openDay['Thu']} onChange={() => handleCheckDay('Thu', !openDay['Thu']) } />
                                            <label className="float-left" htmlFor="chkThursday" style={{lineHeight: 1.2}}>THU: </label>
                                            <TimePickerThuFrom isDisabled={ ! openDay['Thu']} timeValue={openHourFrom['Thu']} onValueChange={ (h, m) => handleTimeChange('Thu', 'from', h, m) } />
                                            <TimePickerThuTo isDisabled={ ! openDay['Thu']} timeValue={openHourTo['Thu']} onValueChange={ (h, m) => handleTimeChange('Thu', 'to', h, m) } />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkFriday" type="checkbox" checked={openDay['Fri']} onChange={() => handleCheckDay('Fri', !openDay['Fri']) } />
                                            <label className="float-left" htmlFor="chkFriday" style={{lineHeight: 1.2}}>FRI: </label>
                                            <TimePickerFriFrom isDisabled={ ! openDay['Fri']} timeValue={openHourFrom['Fri']} onValueChange={ (h, m) => handleTimeChange('Fri', 'from', h, m) } />
                                            <TimePickerFriTo isDisabled={ ! openDay['Fri']} timeValue={openHourTo['Fri']} onValueChange={ (h, m) => handleTimeChange('Fri', 'to', h, m) } />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="hours_opening checkbox checkbox-dark">
                                            <input className="float-left" id="chkSaturday" type="checkbox" checked={openDay['Sat']} onChange={() => handleCheckDay('Sat', !openDay['Sat']) } />
                                            <label className="float-left" htmlFor="chkSaturday" style={{lineHeight: 1.2}}>SAT: </label>
                                            <TimePickerSatFrom isDisabled={ ! openDay['Sat']} timeValue={openHourFrom['Sat']} onValueChange={ (h, m) => handleTimeChange('Sat', 'from', h, m) } />
                                            <TimePickerSatTo isDisabled={ ! openDay['Sat']} timeValue={openHourTo['Sat']} onValueChange={ (h, m) => handleTimeChange('Sat', 'to', h, m) } />
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
                                <h5 className="float-left">Name & Address</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-12 col-lg-6">
                                        <input className="form-control" type="text" placeholder="Name in English" value={nameEn} onChange={e=> setNameEn(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <input className="form-control" type="text" placeholder="Name in Hebrew" value={nameHb} onChange={e=> setNameHb(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-lg-6">
                                        <input className="form-control" type="text" placeholder="Address in English" value={addressEn} onChange={e=> setAddressEn(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <input className="form-control" type="text" placeholder="Address in Hebrew" value={addressHb} onChange={e=> setAddressHb(e.target.value)} />
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
                                <GoogleMaps locationValue={mapLocation} onChangeLocation={ handleChangeLocation }/>
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
                                        <input className="form-control" type="text" placeholder="" value={facebook} onChange={e => setFacebook(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Twitter</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" value={twitter} onChange={e=>setTwitter(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">LinkedIn</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Telegram</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" value={telegram} onChange={e => setTelegram(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="inputPassword3">Youtube</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="" value={youtube} onChange={e => setYoutube(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-default float-right" style={{marginBottom: '80px'}} onClick={()=>saveRestaurantData()}>Submit</button>
                    </div>
                </div>


            </div>

            <ToastContainer />

        </Fragment>

    );
};

export default Restaurant;