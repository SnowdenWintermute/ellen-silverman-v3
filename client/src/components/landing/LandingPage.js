import React, { Component } from "react";
import AnimatedLandingLinks from "./AnimatedLandingLinks";
import ImageFaderWithTitles from "./ImageFaderWithTitles";

export default class LandingPage extends Component {
  render() {
    // let timer = 7000;
    return (
      <div>
        <ImageFaderWithTitles
          delayInMiliseconds={8000}
          titlesInfo={[
            {
              series: "Salt Marsh",
              title: "Salt Marsh, Birds",
            },
            {
              series: "South Dakota Trip",
              title: "Devil's Tower",
            },
            {
              series: "The Professor's Interiors",
              title: "Director's Office",
            },
            {
              series: "Forest Path",
              title: "A Walk in the Woods",
            },
            {
              series: "Cold River Camp",
              title: "Cold River Vatican City",
            },
          ]}
          imageSourceArray={[
            "./img/Salt Marsh/Salt Marsh, Birds.jpg",
            "./img/South Dakota Trip/Devil's Tower.jpg",
            "./img/The Professor's Interiors/Director's Office.jpg",
            "./img/Forest Path/A Walk in the Woods.jpg",
            "./img/Cold River Camp/Cold River Vatican City.jpg",
          ]}
        />
        <AnimatedLandingLinks />
      </div>
    );
  }
}
