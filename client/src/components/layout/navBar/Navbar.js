import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import Swipe from "react-easy-swipe";
import UserMenu from './UserMenu'
import './nav.css'

const Navbar = () => {
  const [hamburgerMenuShowing, setHamburgerMenuShowing] = useState(false);
  const [logoShowClass, setLogoShowClass] = useState("hidden")

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  });

  function updateWindowDimensions() {
    if (window.innerWidth > 800) {
      setHamburgerMenuShowing(false);
    }
  }

  function showOrHideMenu() { setHamburgerMenuShowing(!hamburgerMenuShowing) }

  function hideMenu() { setHamburgerMenuShowing(false) }

  let navClass;

  if (!hamburgerMenuShowing) navClass = "menu";
  else navClass = "menu-show";

  return (
    <div>
      <Swipe onSwipeUp={hideMenu} onSwipeDown={showOrHideMenu}>
        <div className="nav" id="topMenu">
          <div id="top-bar"></div>
          <div id="hamburger">
            <HamburgerMenu
              isOpen={hamburgerMenuShowing}
              menuClicked={showOrHideMenu}
              width={50}
              height={35}
              strokeWidth={4}
              rotate={0}
              color="black"
              borderRadius={5}
              animationDuration={0.3}
            ></HamburgerMenu>
          </div>
          <div className={navClass}>
            <Link id="home-button-link" to="/" onClick={hideMenu}>
              {/* {homeButtonContent} */}
              <span className="home-button-text">Home</span>
              <img className={logoShowClass} onLoad={() => setLogoShowClass("home-button-icon")} src="/mcguffsilverman-sunset-logo-small.png" alt="home" />
            </Link>
            <Link to="/artworks" onClick={hideMenu}>
              Artworks
            </Link>
            <Link to="/exhibitions" onClick={hideMenu}>
              Exhibitions
            </Link>
            <Link to="/About" onClick={hideMenu}>
              About
            </Link>
            <Link to="/contact" onClick={hideMenu}>
              Contact
            </Link>
          </div>
          <UserMenu hideMenu={hideMenu} />
        </div>
      </Swipe>
    </div>
  );
};

export default Navbar;
