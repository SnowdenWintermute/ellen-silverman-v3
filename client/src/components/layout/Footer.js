import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div id="footerLinks">
        <Link to="/index">Home</Link>&nbsp;|
        <Link to="/artworks">Artworks</Link>&nbsp;|
        <Link to="/exhibitions">Exhibitions</Link>&nbsp;|
        <Link to="/cv">CV</Link>&nbsp;|
        <Link to="/contact">Contact</Link>
      </div>
      <p>Ellen Silverman</p>
    </footer>
  );
}
