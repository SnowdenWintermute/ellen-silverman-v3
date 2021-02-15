import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import LocationBar from "./components/layout/locationBar/LocationBar";
import Footer from "./components/layout/Footer";
import SeriesList from "./components/series/SeriesList";
import SeriesPage from "./components/series/SeriesPage";
import PaintingDetailedPage from './components/paintings/PaintingDetailedPage'
import LandingPage from "./components/landing/LandingPage";
import FullResolutionImage from "./components/paintings/FullResolutionImage";
import Cv from "./components/cv/Cv";
import Exhibitions from "./components/Exhibitions/Exhibitions";
import Contact from "./components/contact/Contact";
import BunStory from "./components/bunStory/BunStory";
import AddOrEditPainting from "./components/admin/AddOrEditPainting";

import Register from "./components/auth/Register";
import RegisterComplete from "./components/auth/RegisterComplete";
import Login from "./components/auth/Login";
import UserHistory from "./components/user/history/UserHistory";
import { auth } from "./firebase";
import { currentUser } from "./apiCalls/auth";
import ForgotPassword from "./components/auth/ForgotPassword";

import UserRoute from "./components/routes/UserRoute";
import Cart from "./components/user/cart/Cart";
import Checkout from "./components/user/cart/Checkout";
import Payment from "./components/user/cart/Payment";

import AdminRoute from "./components/routes/AdminRoute";
import AddPaintingsFromCSV from "./components/admin/addPaintingsFromCSV/AddPaintingsFromCSV";
import ManageSeries from "./components/admin/manageSeries/ManageSeries";
import AddMultiplePaintingPhotos from "./components/admin/addMultiplePaintingPhotos/AddMultiplePaintingPhotos";
import AdminDashboard from "./components/admin/adminDashboard/AdminDashboard";
import ManageOrders from "./components/admin/manageOrders/ManageOrders";
import AddPage from "./components/admin/AddPage";

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
          <Route exact path="/full-res/:category/:painting" component={FullResolutionImage} />
          <Route exact path="/the-professor" component={""} />
          <Navbar />
        </Switch>
        <Route exact path="/" component={LandingPage} />
        <Switch>
          <Route exact path="/full-res/:category/:painting" component={""} />
          <Route exact path="/the-professor" component={""} />
          <Route exact path="/:page/:series?/:painting?/" component={LocationBar} />
        </Switch>
        <Switch>
          <Route exact path="/about" component={Cv} />
          <Route exact path="/exhibitions" component={Exhibitions} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/the-professor" component={BunStory} />
          <Route exact path="/artworks/" component={SeriesList} />
          <Route exact path="/artworks/:series?" component={SeriesPage} />
          <Route exact path="/artworks/:series?/:paintingSlug?" component={PaintingDetailedPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/complete-registration" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/request-password-reset" component={ForgotPassword} />
          <Route exact path="/cart" component={Cart} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <UserRoute exact path="/payment" component={Payment} />
          <UserRoute exact path="/user/history" component={UserHistory} />
          <AdminRoute exact path="/admin/add-painting" component={AddOrEditPainting} />
          <AdminRoute exact path="/admin/edit-painting/:paintingSlug" component={AddOrEditPainting} />
          <AdminRoute exact path="/admin/add-paintings-from-csv" component={AddPaintingsFromCSV} />
          <AdminRoute exact path="/admin/manage-series" component={ManageSeries} />
          <AdminRoute exact path="/admin/add-multiple-painting-photos" component={AddMultiplePaintingPhotos} />
          <AdminRoute exact path="/admin/add-page" component={AddPage} />
          <AdminRoute exact path="/admin/orders" render={() => <ManageOrders isAdmin={true} />} />
          <AdminRoute exact path="/admin" component={AdminDashboard} />
        </Switch>
        <Switch>
          <Route exact path="/full-res/:category/:painting" component={""} />
          <Route exact path="/the-professor" component={""} />
          <Route path="/:page" component={Footer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
