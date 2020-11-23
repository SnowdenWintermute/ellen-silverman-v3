import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import navReducer from "./store/reducers/nav-reducer";
import storyReducer from "./store/reducers/story-reducer";

import Navbar from "./components/layout/Navbar";
import PageLabel from "./components/layout/PageLabel";
import Footer from "./components/layout/Footer";
import Artworks from "./components/artworks/Artworks";
import LandingPage from "./components/landing/LandingPage";
import FullResolutionImage from "./components/artworks/FullResolutionImage";
import Cv from "./components/cv/Cv";
import Exhibitions from "./components/Exhibitions/Exhibitions";
import Contact from "./components/contact/Contact";
import BunStory from "./components/bunStory/BunStory";

const rootReducer = combineReducers({
  nav: navReducer,
  story: storyReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>{"L. E. Silverman"}</title>
        </Helmet>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/img/:category/:painting"
              component={FullResolutionImage}
            ></Route>
            <Route exact path="/the-professor" component={""}></Route>
            <Navbar />
          </Switch>
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route exact path="/img/:category/:painting" component={""}></Route>
            <Route exact path="/the-professor" component={""}></Route>
            <Route
              exact
              path="/:page/:category?/:painting?/"
              component={PageLabel}
            />
          </Switch>
          <Route exact path="/about" component={Cv}></Route>
          <Route exact path="/exhibitions" component={Exhibitions}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Route exact path="/the-professor" component={BunStory}></Route>
          <Route
            exact
            path="/artworks/:category?/:painting?"
            component={Artworks}
          />
          <Switch>
            <Route exact path="/img/:category/:painting" component={""}></Route>
            <Route exact path="/the-professor" component={""}></Route>
            <Route path="/:page" component={Footer}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
