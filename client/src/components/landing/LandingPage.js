import React, { Component } from "react";
import { Link } from "react-router-dom";

import ImageFadeSlideshow from "./ImageFadeSlideshow";
import ElementSlider from "./ElementSlider";

export default class LandingPage extends Component {
  render() {
    let timer = 7000;
    return (
      <div>
        <ImageFadeSlideshow
          slideTimer={timer}
          slides={[
            "/img/The Professor's Interiors/Director's Office.jpg",
            "./img/Salt Marsh/Salt Marsh, Birds.jpg",
            "./img/South Dakota Trip/Devil's Tower.jpg",
            "./img/Forest Path/A Walk in the Woods.jpg",
            "./img/Cold River Camp/Cold River Vatican City.jpg",
          ]}
        />
        <ElementSlider
          slideTimer={timer}
          slides={[
            {
              element: (
                <React.Fragment>
                  <Link to="/artworks">
                    <h1 className="slide-text slide-button">Browse Artworks</h1>
                  </Link>
                </React.Fragment>
              ),
              showClass: "element-slider-show",
              hiddenClass: "element-slider-hidden-top",
            },
            {
              element: (
                <React.Fragment>
                  <h1 className="slide-text">Lucretia E. McGuff-Silverman</h1>
                  <p className="slide-text">Professional Artist</p>
                </React.Fragment>
              ),
              showClass: "element-slider-show",
              hiddenClass: "element-slider-hidden-top",
            },
          ]}
        />
      </div>
    );
  }
}
