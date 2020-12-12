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
import "./css/userMenu.css";
import "./css/auth.css";
import "./css/forms.css";
import "./css/buttons.css";
import "./css/tables.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import navReducer from "./store/reducers/nav-reducer";
import storyReducer from "./store/reducers/story-reducer";
import userReducer from "./store/reducers/user-reducer";

const rootReducer = combineReducers({
  nav: navReducer,
  story: storyReducer,
  user: userReducer,
});

const reduxMiddleware = [thunk]

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...reduxMiddleware)));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>
  , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
