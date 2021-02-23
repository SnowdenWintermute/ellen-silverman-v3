import React from "react";
import './contact.css'

const Contact = () => {

  return (
    <div className="page-frame">
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
  )
}
export default Contact