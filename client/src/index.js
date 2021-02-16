import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import "./css/elementSlider.css";
import "./css/exhibitions.css";
import "./css/bunStory.css";
import "./css/bunStoryText.css";
import "./css/auth.css";
import "./css/forms.css";
import "./css/buttons.css";
import "./css/tables.css";
import "./css/toastify.css";
import "./css/stripe.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import storyReducer from "./store/reducers/story-reducer";
import userReducer from "./store/reducers/user-reducer";
import cartReducer from "./store/reducers/cart-reducer";

const rootReducer = combineReducers({
  story: storyReducer,
  user: userReducer,
  cart: cartReducer
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
