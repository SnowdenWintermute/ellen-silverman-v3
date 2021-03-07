import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../apiCalls/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // const history = useHistory()
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", { ...err });
          // history.push('/login')
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
