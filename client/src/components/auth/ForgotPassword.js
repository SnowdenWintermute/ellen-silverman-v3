import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => { if (user && user.token) history.push("/"); }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then((res) => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="auth-page-body">
      <div className="auth-frame">
        {loading ? (
          <h4 className="auth-brand-header">Loading</h4>
        ) : (
            <h4 className="auth-brand-header">Forgot Password</h4>
          )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="simple-text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoFocus
          />
          <div className="auth-bottom-links">
            <Link className="auth-link" to="/login">Back to Login</Link>
            <button className="button button-standard-size button-basic" disabled={!email}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
