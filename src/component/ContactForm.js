import React from "react";
import {Button} from "react-bootstrap";

const ContactForm = () => {
  return (
    <div className="review-form">
      <div className="form-group">
        <label className="sr-only" htmlFor="contactName">Name</label>
        <input type="text" id="contactName" className="form-control" placeholder="Name"/>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="contactEmail">Email</label>
        <input type="text" id="contactEmail" className="form-control" placeholder="Email"/>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="contactPhoneNo">Phone No.</label>
        <input type="text" id="contactPhoneNo" className="form-control" placeholder="Phone no."/>
      </div>

      <div className="form-group">
        <label htmlFor="contactMessage" className="sr-only">Message</label>
        <textarea id="contactMessage" placeholder="Your message" className="form-control" rows="4"/>
      </div>

      <div className="text-right">
        <Button variant="primary">Send Message</Button>
      </div>
    </div>
  )
};

export default ContactForm;