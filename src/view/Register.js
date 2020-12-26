import React, {Component} from "react";
import {Col, Container} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Logo from "../assets/img/logo.svg";

import Row from "react-bootstrap/esm/Row";
import headerBg from "../assets/img/page-header-bg.jpg";
import Button from "react-bootstrap/cjs/Button";
import GoogleMaps from "../component/GoogleMaps";
import ImageUploader from "react-images-upload";
import {ToastContainer, toast} from "react-toastify";

import { Alert } from 'reactstrap';
import myAPI from "../Api";

import "../assets/scss/sign-up.scss";
import '../admin/assets/css/mystyle.css';


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.user_id = props.match.params.user_id;

    this.state = {
      nameEn: '',
      nameHb: '',
      descriptionEn: '',
      descriptionHb: '',
      addressEn: '',
      addressHb: '',
      location: {
        position: 'Soroka Sorting / Wingate, Be\'er Sheva, Israel',
        latitude: 31.255693,
        longitude: 34.79998
      },
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      loading: false,
      signup_error: '',
      signup_ok: false,
      restaurant_images: [],
    }

  }

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
    let send_data = {
      user_id: this.user_id,
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
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    try {
        await myAPI.addUser(send_data).then(response => {
            if (response.data.success === false)
                this.setState({ signup_error: response.data.result });
            else
                this.setState({signup_ok: true});
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

          {!this.state.signup_ok ?
            <Container>
                <div className="row mb-5">
                    <div className="col-lg-10 mx-auto">
                        <h2 className="text-center" style={{color: `#0454a4`}}>We sent a verification email to your account.<br/>Please check your email inbox.</h2>
                        <p></p>
                        <p className="text-center" style={{marginTop: 100}}>
                            <button type="button" className="btn btn-success text-center" onClick={() => { this.props.history.push('/') }}>Go to Home page
                            </button>
                        </p>
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
                                           placeholder="Restaurant Name in English" value={this.state.nameEn}
                                           onChange={e => this.setState({nameEn: e.target.value})} required/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label htmlFor="restaurantNameHebrew" className="sr-only">Restaurant Name in Hebrew</label>
                                    <input type="text" id="restaurantNameHebrew" className="form-control" placeholder="Restaurant Name in Hebrew" value={this.state.nameHb}
                                           onChange={e => this.setState({nameHb: e.target.value})}/>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label htmlFor="descInEnglish" className="sr-only">Description in English</label>
                                    <textarea id="descInEnglish" className="form-control" placeholder="Description in English" value={this.state.descriptionEn}
                                              onChange={e => this.setState({descriptionEn: e.target.value})}/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label htmlFor="descInHebrew" className="sr-only">Description in Hebrew</label>
                                    <textarea id="descInHebrew" className="form-control" placeholder="Description in Hebrew" value={this.state.descriptionHb}
                                              onChange={e => this.setState({descriptionHb: e.target.value})}/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label htmlFor="addressEnglish" className="sr-only">Address in English</label>
                                    <input type="text" id="addressEnglish" className="form-control" placeholder="Address in English" value={this.state.addressEn}
                                           onChange={e => this.setState({addressEn: e.target.value})}/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label htmlFor="addressHebrew" className="sr-only">Address in Hebrew</label>
                                    <input type="text" id="addressHebrew" className="form-control" placeholder="Address in Hebrew" value={this.state.addressHb}
                                           onChange={e => this.setState({addressHb: e.target.value})}/>
                                </div>
                            </Col>
                        </Row>

                        <div className="form-group">
                            <GoogleMaps locationValue={this.state.location}
                                        onChangeLocation={this.handleChangeLocation}/>
                        </div>

                        <div className="form-group">
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                singleImage={false}
                                buttonText='Choose images'
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                onChange={this.handleImageUpload}
                            />
                        </div>

                        {this.state.signup_error !== '' && <Alert color="danger" isOpen={true} toggle={this.onDismiss}>{this.state.signup_error}</Alert>}

                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" className="form-control" placeholder="Email"
                                   value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNo" className="sr-only">Phone</label>
                            <input type="text" id="phoneNo" className="form-control" placeholder="Phone no."
                                   value={this.state.phone_number} onChange={e => this.setState({phone_number: e.target.value})}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Password"
                                   value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Confirm Password</label>
                            <input type="password" id="password_confirmation" className="form-control"
                                   placeholder="Confirm Password" value={this.state.password_confirmation}
                                   onChange={e => this.setState({password_confirmation: e.target.value})}/>
                        </div>
                        <Row className="mt-4">
                            <Col sm={12}>
                                <Button variant="success" block onClick={this.onSignUp}>SignUp</Button>
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
        <ToastContainer />
      </div>
    );
  }
}

export default Register;