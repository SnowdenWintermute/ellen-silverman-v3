import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCartItems } from "../../../store/actions/cart-actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from 'lodash'
import PrimaryButton from '../../common/button/PrimaryButton'

const PaintingDetailsTextBox = ({ painting, seriesSlug }) => {
  const dispatch = useDispatch()

  const [paintingIsInCart, setPaintingIsInCart] = useState(false)

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
      dispatch(updateCartItems(cart))
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
  if (painting.price && !painting.sold) paintingCost = `Cost unframed: $${painting.price}`;
  else if (painting.price && painting.sold) paintingCost = `Sold ($${painting.price})`;
  else if (!painting.price) paintingCost = "Price not listed"

  return (
    <div className="painting-details-text-box">
      <div className="painting-title">{painting.title}</div>
      <div className="painting-detail-text">Original Painting</div>
      <div className="painting-detail-text">
        Size, unframed: {painting.height}" x {painting.width}"
            </div>
      {painting.year ? (
        <div className="painting-detail-text">
          Painted {painting.year}
        </div>
      ) : null}
      {painting.drawingMaterial && painting.support ? <div className="painting-detail-text">
        {`${painting.drawingMaterial} on ${painting.support}`}
      </div> : null}
      <div className="painting-detail-text">{paintingCost}</div>
      <Link
        className="standard-link underlined"
        to={`/full-res/${seriesSlug}/${painting.slug}`}
      >
        View Full Resolution
      </Link>
      <br></br>
      <Link
        to={`/artworks/${seriesSlug}`}
        className="standard-link underlined"
      >
        View other paintings in this series
            </Link>
      {(!painting.sold && painting.price) &&
        <>
          <br />
          <br />
          {paintingIsInCart ?
            <PrimaryButton title="Remove from Cart" onClick={handleRemoveFromCart} isGrey /> :
            <PrimaryButton title="Add to Cart" onClick={handleAddToCart} />}
        </>
      }
    </div>
  )
}
export default PaintingDetailsTextBox