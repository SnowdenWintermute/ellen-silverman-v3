import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../apiCalls/auth";
import { ReactComponent as GoogleIcon } from "../../icons/googleIcon.svg";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "michael.p.silverman@gmail.com",
    password: "111111",
  });
  const [loading, setLoading] = useState(false);
  const [intendedRedirect, setIntendedRedirect] = useState()
  const { email, password } = formData;
  const user = useSelector(state => state.user);

  const roleBasedRedirect = useCallback((role) => {
    if (intendedRedirect) history.push(intendedRedirect);
    else if (role === "admin") history.push("/admin/");
    else history.push("/user/history");
  }, [history, intendedRedirect]);

  useEffect(() => {
    let intended = history.location.state;
    if (intended) setIntendedRedirect(intended.from)
    if (intended) return;
    else if (user && user.token) roleBasedRedirect(user.role);
  }, [user, history, roleBasedRedirect]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
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
      roleBasedRedirect(res.data.role);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
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

  return (
    <div className="page-frame">
      <div className="auth-frame">
        <h1 className="auth-brand-header">Welcome</h1>
        <h3 className="auth-header">Sign In</h3>
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
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
            className="simple-text-input"
            type="email"
            placeholder="Email"
            autoComplete={"email"}
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          ></input>
          <input
            className="simple-text-input"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete={"current-password"}
            value={password}
            onChange={(e) => onChange(e)}
          ></input>
          <div className="forgot-password">
            <Link className="auth-link" to="request-password-reset">Forgot password?</Link>
          </div>
          <div className="auth-bottom-links">
            <Link className="auth-link" to="/register">Create account</Link>
            <input
              type="submit"
              className="button button-standard-size button-basic"
              value="SIGN"
              disabled={loading || !email || !password}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
