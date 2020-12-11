import React, {Component} from "react";
import {Col, Container} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import "../assets/scss/sign-up.scss";
import Row from "react-bootstrap/esm/Row";
import PricingTable from "../component/PricingTable";
import {FiPhone, FiMapPin, FiSkipForward} from "react-icons/fi";
import headerBg from "../assets/img/page-header-bg.jpg";
import Button from "react-bootstrap/cjs/Button";
import GoogleMaps from "../component/GoogleMaps";
import ImageUploader from "react-images-upload";
import mastercard from "../assets/img/mastercard.svg";
import visa from "../assets/img/visa.svg";
import PayPal from "../assets/img/PayPal.svg";
import {FiArrowLeft} from "react-icons/fi";

import { Alert } from 'reactstrap';
import myAPI from "../Api";

import '../admin/assets/css/mystyle.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);


    this.state = {
      basicPlan: [
        {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: false,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: false,
          text: 'Lorem ipsum dolor sit.'
        }
      ],
      premiumPlan: [
        {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: false,
          text: 'Lorem ipsum dolor sit.'
        }
      ],
      diamondPlan: [
        {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }, {
          isActive: true,
          text: 'Lorem ipsum dolor sit.'
        }
      ],
      planValue: null,
      isPlanSelected: false,
      isPaymentMethodPayPal: false,
      redirect_url: null,

      nameEn: '',
      nameHb: '',
      descriptionEn: '',
      descriptionHb: '',
      addressEn: '',
      addressHb: '',
      location: {
        position: '',
        latitude: '',
        longitude: ''
      },
      email: '',
      phone_number: '',
      password: '',
      loading: false,
      signup_error: '',
      signup_ok: false,
      restaurant_images: [],
    }

  }

  handleSelectPlan = value => {
    this.setState({planValue: value}, () => {
      this.setState({isPlanSelected: true})
    })
  };

  handleGoBack = () => {
    this.setState({isPlanSelected: false})
  };

  handleChangePaymentMethod = (method) => {
    this.setState({isPaymentMethodPayPal: method === 'PayPal'})
  };

  handleChangeLocation = (cur_location) => {
    this.setState( { location: {
        position: cur_location.addr,
        latitude: cur_location.lat,
        longitude: cur_location.lng
      }} );
  };

  handleImageUpload(pictureFiles, pictureDataURLs) {
    this.setState({restaurant_images: pictureDataURLs});
  }

  onSignUp = async () => {
    this.setState({ loading: true});
    try {
      await myAPI.addUser({
        restaurant_name_en: this.state.nameEn,
        restaurant_name_hb: this.state.nameHb,
        restaurant_description_en: this.state.descriptionEn,
        restaurant_description_hb: this.state.descriptionHb,
        restaurant_address_en: this.state.addressEn,
        restaurant_address_hb: this.state.addressHb,
        restaurant_position: this.state.location.position,
        restaurant_latitude: this.state.location.latitude,
        restaurant_longitude: this.state.location.longitude,
        restaurant_images: this.state.restaurant_images,
        email: this.state.email,
        phone_number: this.state.phone_number,
        password: this.state.password
      }).then(response => {

        if (response.data.success === false)
          this.setState({ signup_error: response.data.result });
        else
          this.setState({signup_ok: true});
        //history.push('/');
      });

    } catch(err) {
      alert(err.message);
    } finally {
      this.setState({ loading: false});
    }
  };

  onDismiss = () => {
    this.setState( { signup_error: '' });
  }

  render() {

    if (this.state.redirect_url != null) {
      return <Redirect to={this.state.redirect_url} />
    }

    return (
      <div className="auth-page">
        <div
          style={{backgroundImage: `url(${headerBg})`}}
          className="auth-page-header text-center">
          <div className="auth-page-header-inner">
            <Container>
              <Link to="/" className="site-logo">
                <img src={Logo} alt=""/>
              </Link>
              <h4 className="moto-tag">Restaurant in Israel</h4>
            </Container>
          </div>
        </div>

        <div className="auth-content">
          {this.state.loading &&
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

          {this.state.signup_ok ?
          <Container>
            <div className="row mb-5">
              <div className="col-lg-10 mx-auto">
                <h2 className="text-center" style={{color: `#0454a4`}}>We sent a verification email to your
                  account.<br/>Please check your email inbox.</h2>
                <p></p>
                <p className="text-center" style={{marginTop: 100}}>
                  <button type="button" className="btn btn-success text-center" onClick={() => {this.setState({redirect_url: '/'})}}>Go to Home page</button>
                </p>
              </div>
            </div>
          </Container>
          :
          !this.state.isPlanSelected ?
            <Container>
              <div className="row mb-5">
                <div className="col-lg-10 mx-auto">
                  <Row>
                    <Col md={4}>
                      <PricingTable
                        plan="Basic"
                        price={0}
                        planPeriod="Month"
                        handleSelectPlan={this.handleSelectPlan}
                        featureList={this.state.basicPlan}/>
                    </Col>
                    <Col md={4}>
                      <PricingTable
                        plan="Premium"
                        price={49.00}
                        planPeriod="Month"
                        handleSelectPlan={this.handleSelectPlan}
                        isFeatured={true}
                        featureList={this.state.premiumPlan}/>
                    </Col>
                    <Col md={4}>
                      <PricingTable
                        plan="Diamond"
                        price={69.00}
                        planPeriod="Month"
                        handleSelectPlan={this.handleSelectPlan}
                        featureList={this.state.diamondPlan}/>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="mb-5">
                <div className="row">
                  <div className="col-lg-5 col-md-6 mx-auto">
                    <h3 className="mb-4">All plans also include these benefits:</h3>

                    <ul className="info-item">
                      <li>Lorem ipsum dolor sit amet, consectetur.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="text-box-with-icon has-hover-effect">
                    <span className="fp__icon"><FiPhone/></span>
                    <div className="box-texts">
                      <h4 className="box-title">Fully Responsive</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Aut iusto</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="text-box-with-icon has-hover-effect">
                    <span className="fp__icon"><FiSkipForward/></span>
                    <div className="box-texts">
                      <h4 className="box-title">Fully Responsive</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Aut iusto</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="text-box-with-icon has-hover-effect">
                    <span className="fp__icon"><FiMapPin/></span>
                    <div className="box-texts">
                      <h4 className="box-title">Fully Responsive</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Aut iusto</p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            :
            <Container>
              <div className="row mb-4">
                <div className="col-lg-8 mx-auto">
                  <h4>Restaurant Details</h4>
                  <Row>
                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="restaurantNameEnglish" className="sr-only">Restaurant Name in English</label>
                        <input type="text" id="restaurantNameEnglish" className="form-control"
                               placeholder="Restaurant Name in English" value={this.state.nameEn} onChange={e => this.setState({nameEn: e.target.value})} />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="restaurantNameHebrew" className="sr-only">Restaurant Name in Hebrew</label>
                        <input type="text" id="restaurantNameHebrew" className="form-control"
                               placeholder="Restaurant Name in Hebrew" value={this.state.nameHb} onChange={e => this.setState({nameHb: e.target.value})}/>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="descInEnglish" className="sr-only">Description in English</label>
                        <textarea id="descInEnglish" className="form-control" placeholder="Description in English" value={this.state.descriptionEn}
                                  onChange={e => this.setState({descriptionEn: e.target.value})} />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="descInHebrew" className="sr-only">Description in Hebrew</label>
                        <textarea id="descInHebrew" className="form-control" placeholder="Description in Hebrew" value={this.state.descriptionHb}
                                  onChange={e => this.setState({descriptionHb: e.target.value})} />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="addressEnglish" className="sr-only">Address in English</label>
                        <input type="text" id="addressEnglish" className="form-control"
                               placeholder="Address in English" value={this.state.addressEn} onChange={e => this.setState({addressEn: e.target.value})}/>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label htmlFor="addressHebrew" className="sr-only">Address in Hebrew</label>
                        <input type="text" id="addressHebrew" className="form-control"
                               placeholder="Address in Hebrew" value={this.state.addressHb} onChange={e => this.setState({addressHb: e.target.value})}/>
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group">
                    <GoogleMaps onChangeLocation={ this.handleChangeLocation }/>
                  </div>

                  <div className="form-group">
                    <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      singleImage={false}
                      buttonText='Choose images'
                      // onChange={(pic) => this.handleOnDrop(pic)}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                      onChange={this.handleImageUpload}
                    />
                  </div>

                  {this.state.signup_error !== '' && <Alert color="danger" isOpen={true} toggle={this.onDismiss}>{this.state.signup_error}</Alert> }

                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNo" className="sr-only">Phone</label>
                    <input type="text" id="phoneNo" className="form-control" placeholder="Phone no." value={this.state.phone_number} onChange={e => this.setState({phone_number: e.target.value})}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})}/>
                  </div>

                  {this.state.planValue > 0 &&
                  <div className="payment-info mt-4">
                    <h4>Payment</h4>
                    <p>Choose payment method below</p>

                    <div className="payment-types">
                      <label htmlFor="paymentStripe" className="payment-type">
                        <input type="radio" name="paymentType"
                               defaultChecked
                               onChange={() => this.handleChangePaymentMethod('stripe')}
                               id="paymentStripe"/>
                        <span className="payment-type-text">
                          <span>
                            <img src={mastercard} alt="Mastercard"/>
                            <img src={visa} alt="Visa"/>
                          </span>
                        </span>
                      </label>

                      <label htmlFor="paymentPayment" className="payment-type">
                        <input type="radio" name="paymentType"
                               onChange={() => this.handleChangePaymentMethod('PayPal')}
                               id="paymentPayment"/>
                        <span className="payment-type-text">
                          <span>
                            <img src={PayPal} alt="PayPal"/>
                          </span>
                        </span>
                      </label>
                    </div>

                    {!this.state.isPaymentMethodPayPal &&
                    <div className="mb-3">
                      <Row>
                        <Col md="6">
                          <div className="form-group">
                            <label htmlFor="cardholderName" className="sr-only">Cardholder Name</label>
                            <input type="text" id="cardholderName"
                                   className="form-control" placeholder="Cardholder Name"/>
                          </div>
                        </Col>

                        <Col md="6">
                          <div className="form-group">
                            <label htmlFor="cardNumber" className="sr-only">Card Number</label>
                            <input type="text" id="cardNumber" className="form-control" placeholder="Card Number"/>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <div className="form-group">
                            <label htmlFor="expireMonth" className="sr-only">Expire Month</label>
                            <select name="expire_Month" id="expireMonth" className="form-control">
                              <option value="">--Expire Month--</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                        </Col>

                        <Col md="4">
                          <div className="form-group">
                            <label htmlFor="expireYear" className="sr-only">Expire Year</label>
                            <select name="expire_year" id="expireYear" className="form-control">
                              <option value="">--Expire Year--</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                            </select>
                          </div>
                        </Col>

                        <Col md="4">
                          <div className="form-group">
                            <label htmlFor="cvcNumber" className="sr-only">CVC Number</label>
                            <input type="number" minLength={3} maxLength={3} id="cvcNumber" className="form-control"
                                   placeholder="CVC Number"/>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    }
                  </div>
                  }

                  <Row className="mt-4">
                    <Col sm={6}>
                      <Button variant="default"
                              onClick={() => this.handleGoBack()}
                              block><FiArrowLeft/> Back</Button>
                    </Col>
                    <Col sm={6}>
                      <Button variant="primary" block onClick={this.onSignUp}>Sign Up</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          }

        </div>

        <hr/>

        <div className="text-center pb-3">
          &copy; 2020 <Link to="/">Sixmenu</Link>. All right reserved.
        </div>
      </div>
    );
  }
}

export default SignUp;