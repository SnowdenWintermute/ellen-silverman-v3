import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../home.svg";

import HamburgerMenu from "react-hamburger-menu";
import Swipe from "react-easy-swipe";

const Navbar = (props) => {
  const [width, setWidth] = useState(null);
  // const [height, setHeight] = useState(null);
  const [hamburgerMenuShowing, setHamburgerMenuShowing] = useState(false);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  });

  function updateWindowDimensions() {
    if (window.innerWidth > 700) {
      setHamburgerMenuShowing(false);
    }
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  }

  function showOrHideMenu() {
    setHamburgerMenuShowing(!hamburgerMenuShowing);
  }

  function hideMenu() {
    console.log("hideMenu");
    setHamburgerMenuShowing(false);
  }

  let homeButtonContent, navClass;

  if (width < 700) {
    homeButtonContent = "Home";
  } else {
    homeButtonContent = <HomeIcon className="home-button-icon"></HomeIcon>;
  }

  if (!hamburgerMenuShowing) navClass = "menu";
  else navClass = "menu-show";

  return (
    <div>
      <Swipe onSwipeUp={hideMenu} onSwipeDown={showOrHideMenu}>
        <div id="nav-spacer"></div>
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
              {homeButtonContent}
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
        </div>
      </Swipe>
    </div>
  );
};

export default Navbar;
