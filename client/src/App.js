import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import AddOrEditPainting from "./components/admin/AddOrEditPainting";

import Register from "./components/auth/Register";
import RegisterComplete from "./components/auth/RegisterComplete";
import Login from "./components/auth/Login";
import UserHistory from "./components/user/UserHistory";
import { auth } from "./firebase";
import { currentUser } from "./apiCalls/auth";
import ForgotPassword from "./components/auth/ForgotPassword";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AddPaintingsFromCSV from "./components/admin/AddPaintingsFromCSV";
import ManageSeries from "./components/admin/manageSeries/ManageSeries";
import AddMultiplePaintingPhotos from "./components/admin/AddMultiplePaintingPhotos";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer
        transition={Flip}
      />
      <Helmet>
        <title>{"L. E. Silverman"}</title>
      </Helmet>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/full-res/:category/:painting"
            component={FullResolutionImage}
          ></Route>
          <Route exact path="/the-professor" component={""}></Route>
          <Navbar />
        </Switch>
        <Route exact path="/" component={LandingPage} />
        <Switch>
          <Route exact path="/full-res/:category/:painting" component={""}></Route>
          <Route exact path="/the-professor" component={""}></Route>
          <Route
            exact
            path="/:page/:category?/:painting?/"
            component={PageLabel}
          />
        </Switch>
        <Switch>
          <Route exact path="/about" component={Cv}></Route>
          <Route exact path="/exhibitions" component={Exhibitions}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Route exact path="/the-professor" component={BunStory}></Route>
          <Route
            exact
            path="/artworks/:category?/:paintingSlug?"
            component={Artworks}
          />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/complete-registration"
            component={RegisterComplete}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/request-password-reset"
            component={ForgotPassword}
          />
          <UserRoute exact path="/user/history" component={UserHistory} />
          <AdminRoute
            exact
            path="/admin/add-painting"
            component={AddOrEditPainting}
          />
          <AdminRoute
            exact
            path="/admin/edit-painting/:paintingSlug"
            component={AddOrEditPainting}
          />
          <AdminRoute
            exact
            path="/admin/add-paintings-from-csv"
            component={AddPaintingsFromCSV}
          />
          <AdminRoute
            exact
            path="/admin/manage-series"
            component={ManageSeries}
          />
          <AdminRoute
            exact
            path="/admin/add-multiple-painting-photos"
            component={AddMultiplePaintingPhotos}
          />
          <AdminRoute exact path="/admin" component={AdminDashboard} />
        </Switch>
        <Switch>
          <Route exact path="/full-res/:category/:painting" component={""}></Route>
          <Route exact path="/the-professor" component={""}></Route>
          <Route path="/:page" component={Footer}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
