import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import emailjs from '@emailjs/browser';
class ContactDetailsModal extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      emailid: '',
      message: '',
      submittext: "Submit"
    };

    // this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  render() {
    let submitform = (name, email, message) => {
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      if (name != '' && email != '' && message != '' && validateEmail(email)) {
        this.setState({ submittext: "Submitting..." })
        const templateParams = {
          from_name: name,
          email: email,
          message: message
        }

        emailjs.sendForm('service_hcw727g', 'template_k8l5i6u', '#contactform', '3fXltY2jNa8Qk91be')
          .then((result) => {
            if (result.text = "OK") {
              this.setState({ fullname: "", emailid: '', message: '', submittext: "Submit" })
            }
          }, (error) => {
            // console.log(error.text);
          });
      }
    };
    let updateval = (e) => {
      if (e.name == 'from_name')
        this.setState({ fullname: e.value })
      if (e.name == 'email')
        this.setState({ emailid: e.value })
      if (e.name == 'message')
        this.setState({ message: e.value })
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          <div className="parentdiv">
            <div className="col-md-5">
              <h4>SO DO YOU LIKE MY STUFF?</h4>
              <div className="addressbar">
                {/* <i className="fas fa-home"></i> */}
                Seen something you like or got some comments or feedback? Let's talk.
              </div>
              {/* <div className="addressbar mno">
                <a href="tel:+918882787575"><i className="fas fa-phone-alt"></i>+918882787575</a>
                <a href="https://wa.me/+919455701513" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i>+919455701513</a>
              </div>
              <div className="addressbar">
                <a href="mailto:as88425@gmail.com?subject=Enquiry Email From Profile" target="_blank" rel="noopener noreferrer"><i className="far fa-envelope"></i>as88425@gmail.com</a>
              </div> */}
            </div>
            <div className="col-md-7 formbox">
              <h4>Fill the details</h4>
              <form action="#" id="contactform" onSubmit={e => e.preventDefault()}>
                <input id="name" type="text" value={this.state.fullname} name="from_name" onChange={(e) => updateval(e.target)} required placeholder="Enter Your Name" />
                <input id="email" type="email" value={this.state.emailid} name="email" onChange={(e) => updateval(e.target)}  required placeholder="Enter Your Email" />
                <textarea id="message" value={this.state.message} name="message" onChange={(e) => updateval(e.target)} required placeholder="Enter Your Message"></textarea>
                <input type="submit" value={this.state.submittext} onClick={() => submitform(this.state.fullname, this.state.emailid, this.state.message)} />
              </form>
            </div>
          </div>

        </div>

      </Modal>
    );
  }
}

export default ContactDetailsModal;
