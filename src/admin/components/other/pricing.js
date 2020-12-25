import React, {useState, Fragment, useEffect} from 'react';
import Breadcrumb from '../common/breadcrumb';
import {toast} from "react-toastify";
import PricingTable from "../../../component/PricingTable";

import myAPI from "../../../Api";
import '../../assets/css/mystyle.css';
import MasterIcon from "../../../assets/img/mastercard.svg";
import VisaIcon from "../../../assets/img/visa.svg";
import PayPalIcon from "../../../assets/img/PayPal.svg";
import Bootbox from "bootbox-react";

const Pricing = (props) => {

    const freemiumPlan = [ { isActive: true, text: 'Lorem ipsum dolor sit.'},
            { isActive: true, text: 'Lorem ipsum dolor sit.'},
            { isActive: false, text: 'Lorem ipsum dolor sit.' },
            { isActive: false, text: 'Lorem ipsum dolor sit.' } ];
    const premiumPlan = [ { isActive: true, text: 'Lorem ipsum dolor sit.'},
        { isActive: true, text: 'Lorem ipsum dolor sit.'},
        { isActive: true, text: 'Lorem ipsum dolor sit.' },
        { isActive: true, text: 'Lorem ipsum dolor sit.' } ];



    const [planValue, setPlanValue] = useState('');
    const [isFreemium, setIsFreemium] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [visaType, setVisaType] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const amount = 69.00;
    const this_year = new Date().getFullYear();
    const this_month = new Date().getMonth() + 1;
    const countryList = [ { name: 'ISRAEL', code: 'IL'}, { name: 'RUSSIA', code: 'RU'}, {name: 'ALBANIA', code: 'AL'}] // https://developer.paypal.com/docs/api/reference/country-codes/

    const [expireYear, setExpireYear] = useState(this_year);
    const [expireMonth, setExpireMonth] = useState(this_month);
    const [billingCountry, setBillingCountry] = useState(countryList[0]['code']);
    const [holderName, setHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvcNumber, setCvcNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');

    const auth = props.auth;

    let year_array = [];
    for (let i = this_year; i < this_year + 10; i ++) {
        year_array.push(i);
    }

    useEffect(() => {
        getMembership();
    },[]);

    const getMembership = () => {
        setLoading(true);

        try {
            myAPI.getMembership(auth.getToken()).then(response => {
                if (response.data.success) {
                    if (response.data.result === 'freemium') {
                        setIsFreemium(true);
                        setIsPremium(false);
                    }
                    else {
                        setIsFreemium(false);
                        setIsPremium(true);
                    }
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

    const handleSelectPlan = value => {
        setPlanValue(value);
        if (value === 0) {
            setShowConfirm(true);
        }
    };

    const downgradeFreemium = async() => {
        await myAPI.handleDowngrade(auth.getToken()).then(response => {
            setShowConfirm(false);
            if (response.data.success) {
                setIsPremium(false);
                setIsFreemium(true);
                let token = auth.getToken();
                auth.destroyAuthentication();
                auth.finishAuthentication(token, "0");
                window.location.reload();
            }
            else
                toast.error(response.data.result);
        });
    };
    
    const upgradePremium = async() => {
        setLoading(true);
        try {
            if (visaType) {
                // Card
                await myAPI.handleCardPayment({
                    amount: amount,
                    holder_name: holderName,
                    card_number: cardNumber,
                    cvc_number: cvcNumber,
                    expire_year: expireYear,
                    expire_month: expireMonth,
                    billing_country: billingCountry,
                    address: address,
                    city: city,
                    post_code: postCode,

                }, auth.getToken()).then(response => {
                    if (response.data.success) {
                        setIsPremium(true);
                        setIsFreemium(false);
                        let token = auth.getToken();
                        auth.destroyAuthentication();
                        auth.finishAuthentication(token, "1");
                        window.location.reload();
                    }
                    else
                        toast.error(response.data.result);
                });
            }
            else {
                // Paypal
                await myAPI.handlePaypalPayment({
                    amount: amount
                }, auth.getToken()).then(response => {
                    if (response.data.success) {
                        window.location.href = response.data.result; //http://serverip/payment_success?....
                    }
                    else
                        toast.error(response.data.result);
                });
            }


        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Breadcrumb title="" parent="Membership" />
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
                                <h5>Membership</h5>
                            </div>
                            <div className="card-body pricing-card-design-3">
                                <div className="row pricing-content-ribbons ">
                                    <div className="col-6 col-lg-3">
                                        <PricingTable
                                            plan="Freemium"
                                            price={0}
                                            planPeriod="Month"
                                            handleSelectPlan={handleSelectPlan}
                                            isFeatured={false}
                                            isPurchased={isFreemium}
                                            featureList={freemiumPlan} />
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <PricingTable
                                            plan="Premium"
                                            price={amount}
                                            planPeriod="Month"
                                            handleSelectPlan={handleSelectPlan}
                                            isFeatured={true}
                                            isPurchased={isPremium}
                                            featureList={premiumPlan}/>
                                    </div>
                                    {(planValue > 0 && isFreemium) &&
                                    <div className="col-12 col-lg-6">
                                        <div className="form-row">
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group">
                                                    <span className={`payment_type visa ${visaType ? 'selected' : ''}`} onClick={() => setVisaType(true)}>
                                                        <img src={MasterIcon} alt="Mastercard"/>
                                                        <img src={VisaIcon} alt="Visa"/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group">
                                                    <span className={`payment_type paypal ${visaType ? '' : 'selected'}`} onClick={() => setVisaType(false)}>
                                                        <img src={PayPalIcon} alt="Paypal"/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {visaType &&
                                        <>
                                            <div className="form-row">
                                                <div className="col-12 col-lg-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="holder_name">Holder Name: </label>
                                                        <input className="form-control" type="text" required value={holderName} onChange={e =>setHolderName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="card_number">Card Number:</label>
                                                        <input className="form-control" type="number" required value={cardNumber} onChange={e => setCardNumber(e.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="col-12 col-lg-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="expire_month">Expire Month: </label>
                                                        <select className="form-control " placeholder={`Month`} defaultValue={this_month} onChange={e => setExpireMonth(e.target.value)}>
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
                                                </div>
                                                <div className="col-12 col-lg-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="expire_year">Expire Year:</label>
                                                        <select className="form-control " placeholder={`Year`} defaultValue={this_year} onChange={e => setExpireYear(e.target.value)}>
                                                            {
                                                                year_array.map((year) => {
                                                                    return <option value={year} key={`expire_${year}`}>{year}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="cvc_number">CVC Number:</label>
                                                        <input className="form-control" type="number" required value={cvcNumber} onChange={e => setCvcNumber(e.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-6 col-lg-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="coutnry">Country: </label>
                                                        <select className="form-control " placeholder={`Country`} defaultValue={countryList[0]['code']} onChange={e => setBillingCountry(e.target.value)}>
                                                            {
                                                                countryList.map((country) => {
                                                                    return <option value={country['code']} key={`country_${country['code']}`}>{country['name']}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="billing_address">Address:</label>
                                                        <input className="form-control" type="text" required value={address} onChange={e => setAddress(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="col-6 col-lg-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="billing_city">City: </label>
                                                        <input className="form-control" type="text" required value={city} onChange={e => setCity(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6 col-lg-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="billing_postcode">Post Code:</label>
                                                        <input className="form-control" type="number" required value={postCode} onChange={e => setPostCode(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        }

                                        <div className="form-row">
                                            <div className="col-12 m-t-20">
                                                <button type="button" className="btn btn-default float-right" onClick={() => upgradePremium()}>Submit</button>
                                            </div>
                                        </div>


                                    </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Bootbox show={showConfirm}
                     type={"confirm"}
                     message={"If you have freemium, your permission will be limited. Are you sure?"}
                     onSuccess={() => downgradeFreemium() }
                     onCancel={() => setShowConfirm(false)}
            />

        </Fragment>
    );
};

export default Pricing;