import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress'
import _ from 'lodash'
import {
  // Magnifier,
  MagnifierContainer,
  // GlassMagnifier,
  SideBySideMagnifier,
  // PictureInPictureMagnifier,
  // MOUSE_ACTIVATION,
  // TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { getPaintingWithFullImage } from "../../apiCalls/paintings";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";

const PaintingDetailedPage = ({ paintingSlug }, props) => {
  const [painting, setPainting] = useState({});
  const [paintingIsInCart, setPaintingIsInCart] = useState(false)
  const [loading, setLoading] = useState(false)

  // redux
  const { user, cart } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncFunc = async () => {
      console.log(paintingSlug);
      setLoading(true)
      const newPainting = await getPaintingWithFullImage(paintingSlug);
      setLoading(false)
      console.log({ ...newPainting.data });
      setPainting({ ...newPainting.data });
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    // prevent context menu on long press
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    return function cleanup() {
      window.oncontextmenu = () => { };
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(item => {
          if (item.title === painting.title) setPaintingIsInCart(true)
        })
      }
    }
  }, [painting])

  const handleAddToCart = () => {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      const paintingWithNoImages = { ...painting, image: null, thumbnail: null }
      cart.push(paintingWithNoImages)
      let unique = _.uniqWith(cart, _.isEqual)
      localStorage.setItem('cart', JSON.stringify(unique))
      console.log(JSON.parse(localStorage.getItem('cart')))
      toast.success(`Added ${painting.title} to cart`)
      setPaintingIsInCart(true)
      dispatch({
        type: "UPDATE_CART",
        payload: cart
      })
    }
  }

  const handleRemoveFromCart = () => {
    let newCart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(item => {
          if (item.title !== painting.title) newCart.push({ ...item })
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        setPaintingIsInCart(false)
        dispatch({
          type: "UPDATE_CART",
          payload: newCart
        })
      }
    }
  }

  let paintingCost;
  if (painting.price && !painting.sold) {
    paintingCost = `Cost unframed: ${painting.price}`;
  } else {
    paintingCost = "Sold";
  }
  if (loading) {
    return <div className="page-frame">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    </div>
  }
  else if (!Object.keys(painting).length > 0) {
    return <div>No painting by that name found</div>;
  } else
    return (
      <div className="painting-details-page">
        <div className="painting-details-content-holder">
          <MagnifierContainer className="painting-details-img">
            <SideBySideMagnifier
              imageSrc={createImgSrcStringFromBinary(
                painting.image.contentType,
                painting.image.data
              )}
              alwaysInPlace={true}
            ></SideBySideMagnifier>
          </MagnifierContainer>
          <div className="painting-details-text-box">
            <div className="painting-title">{painting["Name"]}</div>
            <div className="painting-detail-text">Original Painting</div>
            <div className="painting-detail-text">
              Size, unframed: {painting.height}" x {painting.width}"
            </div>
            {painting.year && (
              <div className="painting-detail-text">
                Painted {painting["Year"]}
              </div>
            )}
            <div className="painting-detail-text">{paintingCost}</div>
            <Link
              className="standard-link underlined"
              to={`/full-res/${painting.series.slug}/${painting.slug}`}
            >
              View Full Resolution
            </Link>
            <br></br>
            <Link
              to={`/artworks/${painting.series.slug}`}
              className="standard-link underlined"
            >
              View other paintings in the {painting.series.name} series
            </Link>
            {!painting.sold &&
              <>
                <br />
                <br />
                {paintingIsInCart ?
                  <Button variant="contained" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                  : <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>}
              </>}
          </div>
        </div>
      </div>
    );
};

export default (PaintingDetailedPage);
