import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../apiCalls/auth.js"
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let dispatch = useDispatch();

  useEffect(() => { setEmail(window.localStorage.getItem("emailForRegistration")) }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) return toast.error("Email and password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long");
    if (password !== passwordConfirm) return toast.error("Passwords must match");
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        const res = await createOrUpdateUser(idTokenResult.token)
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
      }
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input className="simple-text-input" disabled={true} value={email} onChange={() => { }} />
      <input
        className="simple-text-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <input
        className="simple-text-input"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm password"
        autoFocus
      />
      <div className="auth-bottom-links">
        <div></div>
        <button type="submit" className="button button-standard-size button-basic" disabled={!password || !passwordConfirm}>
          Complete Registration
      </button>
      </div>
    </form>
  );

  return (
    <div className="auth-page-body">
      <div className="auth-frame">
        <h1 className="auth-brand-header">Complete Registration</h1>
        {completeRegistrationForm()}
      </div>
    </div>
  );
};

export default RegisterComplete;
