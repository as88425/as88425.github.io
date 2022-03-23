import React, { Component } from "react";
import Typical from "react-typical";
import ContactDetailsModal from "./ContactDetailsModal";
// import Switch from "react-switch";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = {
      deps: {},
      detailsModalShow: false,
      checked: false
    };

    // this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  // onThemeSwitchChange(checked) {
  //   this.setState({ checked });
  //   this.setTheme();
  // }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat();
    }

    const HeaderTitleTypeAnimation = React.memo(() => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
        <div className="menuheader">
          <a href="tel:+918882787575"><i className="fas fa-phone-alt"></i>+918882787575</a>
          <a href="https://wa.me/+919455701513" target="_blank"  rel="noopener noreferrer"><i className="fab fa-whatsapp"></i>+919455701513</a>
          <div className="contactubutton" onClick={() => detailsModalShow('')}>Contact Us</div>
        </div>
        <div className="row aligner" style={{ height: '100%' }}>
          <div className="col-md-12">
            <div>
              {/* <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span> */}
              {/* <br/> */}
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <ContactDetailsModal
                show={this.state.detailsModalShow}
                onHide={detailsModalClose}
                data={this.state.deps}
              />
              {/* <Switch
                checked={this.state.checked}
                onChange={this.onThemeSwitchChange}
                offColor="#baaa80"
                onColor="#353535"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                  <span
                    className="iconify"
                    data-icon="twemoji:owl"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "20px",
                      color: "#353239",
                    }}
                  ></span>
                }
                checkedIcon={
                  <span
                    className="iconify"
                    data-icon="noto-v1:sun-with-face"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "10px",
                      color: "#353239",
                    }}
                  ></span>
                }
                id="icon-switch"
              /> */}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
