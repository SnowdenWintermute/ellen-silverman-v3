import React, { Component } from "react";

export default class ElementSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideClasses: [],
      slides: [],
      currentIndex: 1,
      slideTimer: null,
    };
  }

  componentDidMount() {
    let { slides } = this.props;
    let slideTimer = this.props.slideTimer ? this.props.slideTimer : 3000;
    let newSlideClasses = [];
    console.log(slides);
    slides.forEach((slide, i) => {
      console.log(slide.showClass);
      console.log(i);
      if (i === 0) newSlideClasses.push(slide.showClass);
      else newSlideClasses.push(slide.hiddenClass);
    });
    this.setState(
      { slides, slideClasses: newSlideClasses, slideTimer },
      console.log(this.state.slideClasses)
    );

    this.changeSlide();
  }

  changeSlide = () => {
    let { slides, slideClasses, currentIndex, slideTimer } = this.state;
    if (slideClasses[0]) {
      let newCurrentIndex = currentIndex;
      this.state.slideClasses[currentIndex] = slides[currentIndex].showClass;
      if (currentIndex === slideClasses.length - 1) {
        newCurrentIndex = 0;
        this.state.slideClasses[slideClasses.length - 2] =
          slides[slides.length - 2].hiddenClass;
      } else if (currentIndex < slideClasses.length - 1) {
        if (currentIndex === 0) {
          this.state.slideClasses[slideClasses.length - 1] =
            slides[slides.length - 1].hiddenClass;
        } else {
          this.state.slideClasses[currentIndex - 1] =
            slides[currentIndex - 1].hiddenClass;
        }
        newCurrentIndex++;
      }
      this.setState({ currentIndex: newCurrentIndex });
    }
    setTimeout(this.changeSlide, slideTimer);
  };

  render() {
    let { slides, slideClasses } = this.state;
    let slideElements = [];

    slides.forEach((slide, i) => {
      slideElements.push(
        <div key={i} className={slideClasses[i]}>
          {slide.element}
        </div>
      );
    });
    return <div>{slideElements}</div>;
  }
}
