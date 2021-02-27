import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { currentUser } from "./apiCalls/auth";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressIndicator from "./components/common/progressIndicator/ProgressIndicator";
// layout
const Navbar = lazy(() => import("./components/layout/navBar/Navbar"));
const LocationBar = lazy(() => import("./components/layout/locationBar/LocationBar"))
const Footer = lazy(() => import("./components/layout/footer/Footer"))
// pages
const SeriesList = lazy(() => import("./components/series/SeriesList"))
const SeriesPage = lazy(() => import("./components/series/SeriesPage"))
const PaintingDetailedPage = lazy(() => import('./components/paintings/paintingDetailedPage/PaintingDetailedPage'))
const LandingPage = lazy(() => import("./components/landing/LandingPage"))
const FullResolutionImage = lazy(() => import("./components/paintings/FullResolutionImage"))
const Cv = lazy(() => import("./components/cv/Cv"))
const Exhibitions = lazy(() => import("./components/Exhibitions/Exhibitions"))
const Contact = lazy(() => import("./components/contact/Contact"))
const BunStory = lazy(() => import("./components/bunStory/BunStory"))
// auth
const Register = lazy(() => import("./components/auth/Register"))
const RegisterComplete = lazy(() => import("./components/auth/RegisterComplete"))
const Login = lazy(() => import("./components/auth/Login"))
const UserHistory = lazy(() => import("./components/user/history/UserHistory"))
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"))
// ecommerce user
const UserRoute = lazy(() => import("./components/routes/UserRoute"))
const Cart = lazy(() => import("./components/user/shopFlow/cart/Cart"))
const Checkout = lazy(() => import("./components/user/shopFlow/checkout/Checkout"))
const Payment = lazy(() => import("./components/user/shopFlow/Payment"))
// site admin
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"))
const AddOrEditPainting = lazy(() => import("./components/admin/AddOrEditPainting"))
const AddPaintingsFromCSV = lazy(() => import("./components/admin/addPaintingsFromCSV/AddPaintingsFromCSV"))
const ManageSeries = lazy(() => import("./components/admin/manageSeries/ManageSeries"))
const AddMultiplePaintingPhotos = lazy(() => import("./components/admin/addMultiplePaintingPhotos/AddMultiplePaintingPhotos"))
const AdminDashboard = lazy(() => import("./components/admin/adminDashboard/AdminDashboard"))
const ManageOrders = lazy(() => import("./components/admin/manageOrders/ManageOrders"))
const AddPage = lazy(() => import("./components/admin/AddPage"))

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
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={"..."}>
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
    </Suspense>
  );
};

export default App;
