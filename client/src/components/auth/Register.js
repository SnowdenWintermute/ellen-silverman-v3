import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../apiCalls/auth";
import { toast } from "react-toastify";
import { ReactComponent as GoogleIcon } from "../../icons/googleIcon.svg";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("michael.p.silverman@gmail.com");
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user)

  useEffect(() => { if (user && user.token) history.push("/") }, [user, history]);

  const roleBasedRedirect = useCallback((role) => {
    let intended = history.location.state;
    if (intended) history.push(intended.from)
    else if (role === "admin") history.push("/admin/dashboard");
    else history.push("/user/history");
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
    setLoading(false)
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res.data.role);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div
        className="log-in-with-google"
        onClick={googleLogin}
        disabled={loading}
      >
        <GoogleIcon className="google-svg" />
        <div className="google-login-text">
          Login with Google
          </div>
      </div>
      <div className="or-holder">
        <span>or</span>
      </div>
      <input
        type="email"
        className="simple-text-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />
      <div className="auth-bottom-links">
        <Link className="auth-link" to="/login">Have account? Log in here</Link>
        <button type="submit" className="button button-standard-size button-basic" disabled={loading || !email}>
          Register
      </button>
      </div>
    </form>
  );

  return (
    <div className="auth-page-body">
      <div className="auth-frame">
        <h1 className="auth-brand-header">Register</h1>
        {registerForm()}
      </div>
    </div>
  );
};

export default Register;