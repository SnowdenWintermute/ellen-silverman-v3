import React from "react";
import { Link } from "react-router-dom";
import './footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/index">Home</Link>&nbsp;|
        <Link to="/artworks">&nbsp;Artworks</Link>&nbsp;|
        <Link to="/exhibitions">&nbsp;Exhibitions</Link>&nbsp;|
        <Link to="/about">&nbsp;CV</Link>&nbsp;|
        <Link to="/contact">&nbsp;Contact</Link>
      </div>
      <p>L. E. McGuff-Silverman</p>
    </footer>
  );
}
