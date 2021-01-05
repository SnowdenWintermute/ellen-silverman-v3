import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import firebase from "firebase";
import { ReactComponent as UserIcon } from "../../icons/userIcon.svg";
import { Badge, Icon, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
  icon: {
    height: 40,
    textAlign: "center",
    width: "100%",
    display: "block",
    '& svg': {
      color: "black",
      fontSize: 40,
      '&:hover': {
        color: "blue"
      }
    }
  },
  badge: {
    right: -20,
    top: -24,
    pointerEvents: "none",
    // border: `2px solid black`,
    padding: '0 4px',
  },
})

const UserMenu = ({ hideMenu }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const [showMenu, setShowMenu] = useState(false)
  const classes = useStyles()
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
    {user && user.role === "admin" && <Link to="/admin" onClick={hideMenu}>Admin Dashboard</Link>}
  </ul>)

  return (
    <>
      <div className="cart-icon-holder">
        <Link to="/cart">
          <Icon className={classes.icon}>
            <Badge className={classes.badge} badgeContent={cart && cart.length} color="primary">
            </Badge>
            <ShoppingCartIcon />
          </Icon>
        </Link>
      </div>

      <div className={"user-menu-icon-holder"} name="user-menu" onClick={() => {
        setShowMenu(!showMenu)
      }}>
        {showMenu && menuLinks}
        <UserIcon className="user-menu-icon" name="user-menu" />
      </div>
    </>
  )
}

export default UserMenu