import React, { Component } from "react";

export default class ImageFadeSlideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideClasses: [],
      slides: [],
      currentIndex: 1,
      slideTimer: null
    };
  }

  componentDidMount() {
    let { slides } = this.props;
    let slideTimer = this.props.slideTimer ? this.props.slideTimer : 3000;
    let slideClasses = [];
    slides.forEach((slide, i) => {
      if (i === 0) slideClasses.push("fader-slide fader-slide-show");
      else slideClasses.push("fader-slide fader-slide-hidden");
    });
    this.setState({ slides, slideClasses, slideTimer });
    this.changeOpacity();
  }

  changeOpacity = () => {
    let { slideClasses, slideTimer, currentIndex } = this.state;
    let newCurrentIndex = currentIndex;
    this.state.slideClasses[currentIndex] = "fader-slide fader-slide-show";

    if (currentIndex === slideClasses.length - 1) {
      newCurrentIndex = 0;
      this.state.slideClasses[slideClasses.length - 2] =
        "fader-slide fader-slide-hidden";
    } else if (currentIndex < slideClasses.length - 1) {
      if (currentIndex === 0) {
        this.state.slideClasses[slideClasses.length - 1] =
          "fader-slide fader-slide-hidden";
      } else {
        this.state.slideClasses[currentIndex - 1] =
          "fader-slide fader-slide-hidden";
      }
      newCurrentIndex++;
    }
    this.setState({ currentIndex: newCurrentIndex });

    setTimeout(this.changeOpacity, slideTimer);
  };

  render() {
    let { slides, slideClasses } = this.state;
    let slideElements = [];
    slides.forEach((slide, i) => {
      slideElements.push(
        <img
          id={`fader-slide-${i}`}
          alt={`fader-slide-${i}`}
          className={slideClasses[i]}
          key={`fader-slide-${i}`}
          src={slides[i]}
        />
      );
    });
    return <div>{slideElements}</div>;
  }
}
