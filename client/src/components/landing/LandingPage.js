import React, { Component } from "react";
import AnimatedLandingLinks from "./AnimatedLandingLinks";
import ImageFader from "./ImageFader";

export default class LandingPage extends Component {
  render() {
    // let timer = 7000;
    return (
      <div>
        <ImageFader delayInMiliseconds={8000} images={["./img/Salt Marsh/Salt Marsh, Birds.jpg",
          "./img/South Dakota Trip/Devil's Tower.jpg",
          "./img/The Professor's Interiors/Director's Office.jpg",
          "./img/Forest Path/A Walk in the Woods.jpg",
          "./img/Cold River Camp/Cold River Vatican City.jpg"]} />
        <AnimatedLandingLinks />
      </div>
    );
  }
}
