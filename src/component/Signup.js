import React, {Component} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import mastercard from "../assets/img/mastercard.svg";
import visa from "../assets/img/visa.svg";
import PayPal from "../assets/img/PayPal.svg";
import {FiArrowLeft} from "react-icons/fi";
import GoogleMaps from "./GoogleMaps";
import ImageUploader from "react-images-upload";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isPaymentMethodShown: false,
      restaurantType: null,
      isPaymentMethodPayPal: false
    }
  }

  componentDidMount() {
    // console.log(google);
  }

  handleShowModal = () => {
    this.setState({isShowModal: true})
  };

  handleHideModal = () => {
    this.setState({isShowModal: false})
  };

  handleChangeRestaurantType = (type) => {
    this.setState({restaurantType: type})
  };

  handleContinueToPayment = () => {
    this.setState({isPaymentMethodShown: true})
  };

  handleBackToPrevious = () => {
    this.setState({isPaymentMethodShown: false})
  };

  handleChangePaymentMethod = (method) => {
    this.setState({isPaymentMethodPayPal: method === 'PayPal'})
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.isShowModal}
               size="lg"
               centered
               onHide={() => this.handleHideModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Registration</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {!this.state.isPaymentMethodShown ? <div className="restaurant-info">
                <ul className="restaurant-type-list">
                  <li>
                    <label htmlFor="basicRestaurant" className="restaurant-type">
                      <input type="radio" name="restaurantType"
                             onChange={() => this.handleChangeRestaurantType('basic')}
                             className="sr-only" id="basicRestaurant"/>
                      <span>
                        <span className="plan-name">Basic</span>
                        <span className="plan-price">Free</span>
                        <span className="plan-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label htmlFor="premiumRestaurant" className="restaurant-type">
                      <input type="radio" name="restaurantType"
                             onChange={() => this.handleChangeRestaurantType('premium')}
                             className="restaurantType" id="premiumRestaurant"/>
                      <span>
                        <span className="plan-name">Premium</span>
                        <span className="plan-price">$ 29.00 <small>/ month</small></span>
                        <span className="plan-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label htmlFor="diamondRestaurant" className="restaurant-type">
                      <input type="radio" name="restaurantType"
                             value=""
                             onChange={() => this.handleChangeRestaurantType('diamond')}
                             className="restaurantType" id="diamondRestaurant"/>
                      <span>
                        <span className="plan-name">Diamond</span>
                        <span className="plan-price">$ 29.00 <small>/ month</small></span>
                        <span className="plan-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                      </span>
                    </label>
                  </li>
                </ul>

                <Row>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="restaurantNameEnglish" className="sr-only">Restaurant Name in English</label>
                      <input type="text" id="restaurantNameEnglish" className="form-control"
                             placeholder="Restaurant Name in English"/>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="restaurantNameHebrew" className="sr-only">Restaurant Name in Hebrew</label>
                      <input type="text" id="restaurantNameHebrew" className="form-control"
                             placeholder="Restaurant Name in Hebrew"/>
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="descInEnglish" className="sr-only">Description in English</label>
                      <textarea id="descInEnglish" className="form-control" placeholder="Description in English"/>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="descInHebrew" className="sr-only">Description in Hebrew</label>
                      <textarea id="descInHebrew" className="form-control" placeholder="Description in Hebrew"/>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="addressEnglish" className="sr-only">Address in English</label>
                      <input type="text" id="addressEnglish" className="form-control"
                             placeholder="Address in English"/>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label htmlFor="addressHebrew" className="sr-only">Address in Hebrew</label>
                      <input type="text" id="addressHebrew" className="form-control"
                             placeholder="Address in Hebrew"/>
                    </div>
                  </Col>
                </Row>

                <div className="form-group">
                  <GoogleMaps/>
                </div>

                <div className="form-group">
                  <ImageUploader
                    withIcon={true}
                    singleImage={true}
                    buttonText='Choose images'
                    // onChange={(pic) => this.handleOnDrop(pic)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" className="form-control" placeholder="Email"/>
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNo" className="sr-only">Phone</label>
                  <input type="text" id="phoneNo" className="form-control" placeholder="Phone no."/>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input type="password" id="password" className="form-control" placeholder="Password"/>
                </div>

                <div className="mt-3">
                  {this.state.restaurantType === 'basic' ?
                    <Button variant="primary" block>Sign Up</Button>
                    :
                    <Button variant="primary" onClick={() => this.handleContinueToPayment()} block>Continue</Button>
                  }
                </div>
              </div>
              :
              <div className="payment-info">
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

                <Row>
                  <Col sm={6}>
                    <Button variant="default"
                            onClick={() => this.handleBackToPrevious()}
                            block><FiArrowLeft/> Back</Button>
                  </Col>
                  <Col sm={6}>
                    <Button variant="primary" block>Pay Now</Button>
                  </Col>
                </Row>

              </div>
            }
          </Modal.Body>
        </Modal>

        <span onClick={() => this.handleShowModal()}>Sign Up</span>
      </React.Fragment>
    )
  }
}

export default Signup;