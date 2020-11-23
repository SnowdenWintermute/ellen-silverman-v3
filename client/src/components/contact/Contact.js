import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="contact-form-holder">
          If you are interested in purchasing artwork, please email us at
          <a
            className="contact-form-email-address"
            href="mailto:mcguffsilverman@gmail.com"
          >
            {" "}
            mcguffsilverman@gmail.com
          </a>
        </div>
      </div>
    );
  }
}
