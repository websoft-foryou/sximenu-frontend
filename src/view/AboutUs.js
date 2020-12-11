import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FiChevronLeft} from "react-icons/fi";
import Logo from "../assets/img/logo.svg";

const AboutUs = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <Container>
          <Row className="justify-content-lg-center">
            <Col lg="9">
              <div className="site-logo">
                <Link to="/"><img src={Logo} alt=""/></Link>
              </div>

              <h3 className="page-title">About Us</h3>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="page-content">
        <Link to="/" className="back-to-home"><FiChevronLeft/></Link>

        <Container>
          <Row className="justify-content-lg-center">
            <Col lg={9}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, aliquam aliquid eligendi excepturi facere incidunt minima nostrum obcaecati officia omnis, optio, porro provident quisquam rem sed sunt tempora vitae? Aspernatur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus distinctio, est ipsam laborum modi nihil odio repudiandae sapiente tempora unde! Aperiam dolores mollitia officia quo, temporibus voluptatem? Fuga, omnis, quisquam.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum quas reiciendis?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum cupiditate dolor explicabo incidunt qui quo ratione vitae? Amet animi hic maxime molestias, mollitia placeat possimus quasi qui, sunt suscipit ut?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, aliquam aliquid eligendi excepturi facere incidunt minima nostrum obcaecati officia omnis, optio, porro provident quisquam rem sed sunt tempora vitae? Aspernatur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus distinctio, est ipsam laborum modi nihil odio repudiandae sapiente tempora unde! Aperiam dolores mollitia officia quo, temporibus voluptatem? Fuga, omnis, quisquam.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum quas reiciendis?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum cupiditate dolor explicabo incidunt qui quo ratione vitae? Amet animi hic maxime molestias, mollitia placeat possimus quasi qui, sunt suscipit ut?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, aliquam aliquid eligendi excepturi facere incidunt minima nostrum obcaecati officia omnis, optio, porro provident quisquam rem sed sunt tempora vitae? Aspernatur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus distinctio, est ipsam laborum modi nihil odio repudiandae sapiente tempora unde! Aperiam dolores mollitia officia quo, temporibus voluptatem? Fuga, omnis, quisquam.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum quas reiciendis?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, cum cupiditate dolor explicabo incidunt qui quo ratione vitae? Amet animi hic maxime molestias, mollitia placeat possimus quasi qui, sunt suscipit ut?</p>
            </Col>
          </Row>

          <div className="mt-4 text-center">
            © 2020 <strong>Six Menu</strong>. All right reserved.
          </div>
        </Container>
      </div>
    </div>
  )
};

export default AboutUs;