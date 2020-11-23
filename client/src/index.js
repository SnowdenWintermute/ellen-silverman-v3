import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import "./css/nav.css";
import "./css/landing.css";
import "./css/imageFaderSlideshow.css";
import "./css/elementSlider.css";
import "./css/paintingDetailsPage.css";
import "./css/paintingCards.css";
import "./css/cv.css";
import "./css/exhibitions.css";
import "./css/contact.css";
import "./css/storyCarousel.css";
import "./css/bunStory.css";
import "./css/bunStoryText.css";
import "./css/footer.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
