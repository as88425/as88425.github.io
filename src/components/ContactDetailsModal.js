import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
class ContactDetailsModal extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      emailid: '',
      message: '',
      submittext:"Submit"
    };

    // this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  render() {
    let submitform = (name, email, message) => {
      let body = {
        "personalizations": [
          {
            "to": [
              {
                "email": 'abhay@23byt.es',
                "name": name
              }
            ],
            "dynamic_template_data": {
              "first_name": name,
              "email": '',
              "message": message
            }
          }
        ],
        "from": {
          "email": "development@glicrx.com",
          "name": "GlicRx"
        },
        "template_id": "d-81161b55115745c6a4e23f8c0c92bba2"
      }
      if (name != '' && email != '' && message != '') {
        this.setState({submittext:"Submitting..."})
        fetch("https://pacific-mesa-92770.herokuapp.com/https://api.sendgrid.com/v3/mail/send", {
          "method": "POST",
          "headers": {
            "authorization": "Bearer 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",
            "content-type": "application/json",
            "accept": "application/json"
          },
          "body": JSON.stringify(
            {
              "personalizations": [
                {
                  "to": [
                    {
                      "email": 'as88425@gmail.com',
                      "name": "Abhay Singh"
                    }
                  ],
                  "dynamic_template_data": {
                    "name": name,
                    "email": email,
                    "message": message
                  }
                }
              ],
              "from": {
                "email": "as88425@gmail.com",
                "name": name
              },
              "template_id": "d-4b92a565207f4a239bf61e1e04d12174"
            }
          )
        })
          .then(response => {
            if(response.status == 202) {
              this.setState({ fullname:"",  emailid:'', message:'', submittext:"Submit"})
            }
           
          })
          .catch(err => {
            debugger;
            
          });
      }
    };
    let updateval = (e) => {
      if (e.name == 'fullname')
        this.setState({ fullname: e.value })
      if (e.name == 'emailid')
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
              <h4>Contact Details</h4>
              <div className="addressbar">
                <i className="fas fa-home"></i>
                Katariya, Basti, U.P (272128)
              </div>
              <div className="addressbar mno">
                <a href="tel:+918882787575"><i className="fas fa-phone-alt"></i>+918882787575</a>
                <a href="https://wa.me/+919455701513" target="_blank"  rel="noopener noreferrer"><i className="fab fa-whatsapp"></i>+919455701513</a>
              </div>
              <div className="addressbar">
                <a href="mailto:as88425@gmail.com" target="_blank"  rel="noopener noreferrer"><i className="far fa-envelope"></i>as88425@gmail.com</a>
              </div>
            </div>
            <div className="col-md-7 formbox">
              <h4>Enquire Now</h4>
              <form action="#" onSubmit={e => e.preventDefault()}>
                <input type="text" value={this.state.fullname} name="fullname" onChange={(e) => updateval(e.target)} required placeholder="Enter Your Name" />
                <input type="email" value={this.state.emailid} name="emailid" onChange={(e) => updateval(e.target)} id="" required placeholder="Enter Your Email" />
                <textarea value={this.state.message} name="message" onChange={(e) => updateval(e.target)} required placeholder="Enter Your Message"></textarea>
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
