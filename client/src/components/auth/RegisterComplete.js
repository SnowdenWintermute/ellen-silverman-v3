import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../store/actions/auth-actions";
// import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) return toast.error("Email and password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long");
    if (password !== passwordConfirm) return toast.error("Passwords must match");

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        await dispatch(createOrUpdateUser(idTokenResult.token))
        // createOrUpdateUser(idTokenResult.token)
        //   .then((res) => {
        //     dispatch({
        //       type: "LOGGED_IN_USER",
        //       payload: {
        //         name: res.data.name,
        //         email: res.data.email,
        //         token: idTokenResult.token,
        //         role: res.data.role,
        //         _id: res.data._id,
        //       },
        //     });
        //   })
        //   .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div>{email}</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
