import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Icon, ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import firebase from "firebase";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './userMenu.css'

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
    padding: '0 4px',
  },
})

const UserMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const [showMenu, setShowMenu] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const escapeOutOfMenu = e => {
      const { code } = e;
      if (code === "Escape") {
        setShowMenu(false);
      }
    }
    window.addEventListener('keydown', escapeOutOfMenu)
    return () => window.removeEventListener('keydown', escapeOutOfMenu)
  }, [showMenu])

  const menuLinks = (<ul className={`user-menu-links-holder`}>
    {user && user.role === "admin" &&
      <Link to="/admin" onClick={() => setShowMenu(false)}>Admin Dashboard</Link>}
    {user &&
      <Link to="/user/history" onClick={() => setShowMenu(false)}>Order History</Link>}
    {!user &&
      <Link to="/register" onClick={() => setShowMenu(false)}>Register</Link>}
    {!user &&
      <Link to="/login" onClick={() => setShowMenu(false)}>Login</Link>}
    {user &&
      <Link to="/login" onClick={() => {
        setShowMenu(false)
        firebase.auth().signOut();
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
      }}>Logout</Link>}
  </ul>)

  return (
    <ClickAwayListener onClickAway={() => { setShowMenu(false) }}>
      <div>
        <div className="cart-icon-holder">
          <Link to="/cart">
            <Icon className={classes.icon}>
              <Badge className={classes.badge} badgeContent={cart.items && cart.items.length} color="primary">
              </Badge>
              <ShoppingCartIcon />
            </Icon>
          </Link>
        </div>

        <div className={"user-menu-icon-holder"} name="user-menu" onClick={() => {
          setShowMenu(!showMenu)
        }}>
          <Icon className={classes.icon}>
            <AccountCircleIcon />
          </Icon>
        </div>
        {showMenu && menuLinks}
      </div>
    </ClickAwayListener>
  )
}

export default UserMenu