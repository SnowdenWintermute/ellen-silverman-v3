import axios from "axios";

export const createOrUpdateUser = async (authtoken) => await axios.post(
  `${process.env.REACT_APP_API}/auth/create-or-update-user`,
  {},
  {
    headers: {
      authtoken,
    },
  }
);

export const currentUser = async (authtoken) => await axios.post(
  `${process.env.REACT_APP_API}/auth/current-user`,
  {},
  {
    headers: {
      authtoken,
    },
  }
);

export const currentAdmin = async (authtoken) => await axios.post(
  `${process.env.REACT_APP_API}/auth/current-admin`,
  {},
  {
    headers: {
      authtoken,
    },
  }
);
