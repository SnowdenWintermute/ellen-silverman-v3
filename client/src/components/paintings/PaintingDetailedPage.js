import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
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
import { updateCart } from "../../store/actions/cart-actions";
import "./paintingDetailsPage.css"

const PaintingDetailedPage = ({ paintingSlug }, props) => {
  const [painting, setPainting] = useState({});
  const [paintingIsInCart, setPaintingIsInCart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showZoomFrame, setShowZoomFrame] = useState(false)

  // redux
  const { user, cart } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncFunc = async () => {
      setLoading(true)
      const newPainting = await getPaintingWithFullImage(paintingSlug);
      setLoading(false)
      setPainting({ ...newPainting.data });
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    // scroll top
    window.scrollTo(0, 0)
    // prevent context menu on long press
    // window.oncontextmenu = function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   return false;
    // };
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
      toast.success(`Added ${painting.title} to cart`)
      setPaintingIsInCart(true)
      dispatch(updateCart(cart))
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
    paintingCost = `Cost unframed: $${painting.price}`;
  } else {
    paintingCost = "Sold";
  }
  if (loading) {
    return <div className="page-frame">
      <div className="flex-center">
        <CircularProgress />
      </div>
    </div>
  }
  else if (!Object.keys(painting).length > 0) {
    return <div className="flex-center">No painting by that name found</div>;
  } else
    return (
      <div className="page-frame">
        <div className="painting-details-content-holder">
          <MagnifierContainer className="painting-details-img">
            <div onMouseEnter={() => {
              setShowZoomFrame(true)
              console.log("enter")
            }} onMouseOut={() => setShowZoomFrame(false)}>
              <SideBySideMagnifier
                imageSrc={painting.image && createImgSrcStringFromBinary(
                  painting.image.contentType,
                  painting.image.data
                )}
                // alwaysInPlace={true}
                touchActivation={"longTouch"}
                mouseActivation={"click"}
                style={{ zIndex: "2", position: "relative" }}
              ></SideBySideMagnifier>
            </div>
            {showZoomFrame && <div className="zoom-frame">Loading zoom...</div>}
          </MagnifierContainer>
          {<div className="painting-details-text-box">
            <div className="painting-title">{painting.title}</div>
            <div className="painting-detail-text">Original Painting</div>
            <div className="painting-detail-text">
              Size, unframed: {painting.height}" x {painting.width}"
            </div>
            {painting.year && (
              <div className="painting-detail-text">
                Painted {painting.year}
              </div>
            )}
            <div className="painting-detail-text">
              {`${painting.drawingMaterial} on ${painting.support}`}
            </div>
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
            {(!painting.sold && painting.price) &&
              <>
                <br />
                <br />
                {paintingIsInCart ?
                  <Button variant="contained" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                  : <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>}
              </>}
          </div>}
        </div>
      </div>
    );
};

export default (PaintingDetailedPage);
