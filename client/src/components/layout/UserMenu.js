import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import firebase from "firebase";
import { ReactComponent as UserIcon } from "../../icons/userIcon.svg";

const UserMenu = ({ hideMenu }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const clearUserDropdown = (e) => {
      if (e.target.getAttribute("name") !== "user-menu")
        setShowMenu(false);
    };
    window.addEventListener("click", (e) => clearUserDropdown(e));
    return () => window.removeEventListener("click", clearUserDropdown);
  }, [setShowMenu]);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      const { code } = e;
      if (code === "Escape") {
        setShowMenu(false);
      }
    })
  }, [showMenu])

  const menuLinks = (<ul className={`user-menu-links-holder`}>
    {!user && <Link to="/register" onClick={hideMenu}>
      Register
            </Link>}
    {!user && <Link to="/login" onClick={hideMenu}>
      Login
            </Link>}
    {user && <Link to="/login" onClick={() => {
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    }}>
      Logout
            </Link>}
    {user && user.role === "admin" && <Link to="/admin/add-painting" onClick={hideMenu}>Add Painting</Link>}
  </ul>)

  return (
    <div className={"user-menu-icon-holder"} name="user-menu" onClick={() => {
      setShowMenu(!showMenu)
      console.log(showMenu)
    }}>
      {showMenu && menuLinks}
      <UserIcon className="user-menu-icon" name="user-menu" />
    </div>
  )
}

export default UserMenu