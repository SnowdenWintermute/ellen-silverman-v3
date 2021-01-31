import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, makeStyles } from "@material-ui/core"
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import "./landing.css"

const useStyles = makeStyles(theme => ({
  icon: {
    height: 40,
    width: 40,
    textAlign: "center",
    display: "block",
    color: "white",
    '& svg': {
      fontSize: 40
    },
    [theme.breakpoints.down('sm')]: {
      height: 25,
      width: 25,
      '& svg': {
        fontSize: 25
      }
    },
  },
}))

const AnimatedLandingLinks = () => {
  const [landingHeaderHiddenClass, setLandingHeaderHiddenClass] = useState(" hidden-left")
  const [browsePortfolioHiddenClass, setBrowsePortfolioHiddenClass] = useState(" hidden-left")
  const [bunStoryHiddenClass, setBunStoryHiddenClass] = useState(" hidden-left")
  const classes = useStyles()

  useEffect(() => {
    const landingHeaderTimeout = setTimeout(() => setLandingHeaderHiddenClass(""), 500)
    const browsePortfolioTimeout = setTimeout(() => setBrowsePortfolioHiddenClass(""), 1000)
    const bunStoryTimeout = setTimeout(() => setBunStoryHiddenClass(""), 1500)
    return () => {
      clearTimeout(landingHeaderTimeout)
      clearTimeout(browsePortfolioTimeout)
      clearTimeout(bunStoryTimeout)
    }
  }, [])

  return (
    <div className={`landing-links`}>
      <Link to="/about" className={`landing-header${landingHeaderHiddenClass}`}>
        L. E. McGuff-Silverman
        <p className="landing-header-sub-text">Fine Art</p>
      </Link>
      <Link to="/artworks" className={`landing-link${browsePortfolioHiddenClass}`}>
        <Icon className={classes.icon}>
          <PermMediaIcon />
        </Icon>
        Browse Portfolio
      </Link>
      <Link to="/the-professor" className={`landing-link${bunStoryHiddenClass}`}>
        <Icon className={classes.icon}>
          <MenuBookIcon />
        </Icon>
        <div className="landing-info-stacked-text">
          <div>
            "The Professor"
            <div>
              Painted Novel
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default AnimatedLandingLinks