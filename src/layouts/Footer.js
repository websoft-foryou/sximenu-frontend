import React, {useState} from "react";
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";
import "../assets/scss/footer.scss";
import {
  FiInfo,
  FiStar,
  FiChevronDown,
  FiMap,
  FiSend,
  FiShare2,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiClock,
  FiMapPin
} from "react-icons/fi";
import {FaPhone, FaFacebookMessenger, FaWhatsapp} from "react-icons/fa";
import Review from "../component/Review";
import ContactForm from "../component/ContactForm";
import il from "../assets/img/il.svg";
import us from "../assets/img/us.svg";
import {Link} from "react-router-dom";
import {langChange} from "../redux";
import {connect} from "react-redux";
import {utils} from "../helper/utils";

const Footer = ({utilData, langChange}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  return (
    <div className={isBottomSheetOpen ? 'footer show-bottom-sheet' : 'footer'}>
      <div className="bottom-sheet">
        <button
          onClick={handleBottomSheet}
          type="button" className="info-toggle-btn"><FiInfo/></button>

        <Container>
          <Row className="justify-content-md-center">
            <Col md="8">
              <div className="bottom-sheet-content">
                <div className="bottom-sheet-content-inner">
                  <p className="text-center top-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi deserunt fugit tenetur.</p>
                  <Accordion
                    // defaultActiveKey="0"
                  >

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="5">
                        <div className="title-inner">
                          <span className="title-icon"><FiClock/></span>
                          <span className="title-text">Hours Opening</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body>
                          <table className="info-table">
                            <tbody>
                            <tr>
                              <td>Sunday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            <tr>
                              <td>Monday</td>
                              <td>:</td>
                              <td><span className="text-warning">Close</span></td>
                            </tr>
                            <tr>
                              <td>Tuesday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            <tr>
                              <td>Wednesday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            <tr>
                              <td>Thursday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            <tr>
                              <td>Friday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            <tr>
                              <td>Saturday</td>
                              <td>:</td>
                              <td><strong>8AM–12AM</strong></td>
                            </tr>
                            </tbody>
                          </table>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="6">
                        <div className="title-inner">
                          <span className="title-icon"><FiMapPin/></span>
                          <span className="title-text">Address</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="6">
                        <Card.Body>
                          7432 Harrison Road <br/>
                          Muskego, WI 53150
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <div className="title-inner">
                          <span className="title-icon"><FiMap/></span>
                          <span className="title-text">Restaurant Location</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="ratio ratio-16-9">
                            <div className="ratio-inner">
                              {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                              <iframe id="gmap_canvas"
                                      src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                      frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="3">
                        <div className="title-inner">
                          <span className="title-icon"><FiSend/></span>
                          <span className="title-text">Reservation</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <ContactForm/>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="4">
                        <div className="title-inner">
                          <span className="title-icon"><FiShare2/></span>
                          <span className="title-text">Share Menu</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body>
                          <ul className="social-share">
                            <li className="brand-facebook"><FiFacebook/></li>
                            <li className="brand-twitter"><FiTwitter/></li>
                            <li className="brand-messenger"><FaFacebookMessenger/></li>
                            <li className="brand-whatsapp"><FaWhatsapp/></li>
                            <li className="brand-mail"><FiMail/></li>
                          </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div className="title-inner">
                          <span className="title-icon"><FiStar/></span>
                          <span className="title-text">Reviews</span>
                        </div>
                        <div className="arrow-icon">
                          <FiChevronDown/>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Review/>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                  <p className="text-center mt-4">
                    <Button variant="primary"><FaPhone className="d-inline-block mr-2"
                                                       style={{marginTop: '-3px'}}/> Call Now</Button>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <div className="footer-inner">
          <div className="lang-list">
            <button onClick={() => langChange('en')} className={`lang-btn ${utils.siteLanguage() === 'en' ? 'active' : ''}`}><img src={us} alt=""/></button>
            <button onClick={() => langChange('il')} className={`lang-btn ${utils.siteLanguage() === 'il' ? 'active' : ''}`}><img src={il} alt=""/></button>
          </div>
          <div className="app-name"><Link to="/">Six Menu {utilData.lang}</Link></div>
        </div>
      </Container>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    utilData: state.util
  }
};

const mapDispatchToProps = dispatch => {
  return {
    langChange: (lang) => dispatch(langChange(lang))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);