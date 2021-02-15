import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateCart } from "../../../../store/actions/cart-actions";
import { Icon, IconButton, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import createImgSrcStringFromBinary from '../../../utils/createImgSrcStringFromBinary'
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'

const CartItems = ({ cart, setCartItems }) => {
  const dispatch = useDispatch()

  const removeItemFromCart = (id) => {
    let newCart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(item => {
          if (item._id !== id) newCart.push({ ...item })
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch(updateCart(newCart))
        setCartItems(newCart)
      }
    }
  }
  return (
    <Table>
      <TableBody>
        {cart.length ?
          cart.map(item => <TableRow key={item._id}>
            <TableCell>
              {item.thumbnail ?
                <img
                  className="cart-item-thumbnail"
                  alt={item.title}
                  src={createImgSrcStringFromBinary(item.thumbnail.contentType, item.thumbnail.data)}
                /> :
                <ProgressIndicator />}
            </TableCell>
            <TableCell>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link className="cart-item-link" target="_blank" to={`/artworks/${item.series.slug}/${item.slug}`}>{item.title}</Link>
                </li>
                <li>
                  {`${item.height}" x ${item.width}"`}
                </li>
                <li>
                  {`${item.drawingMaterial} on ${item.support}`}
                </li>
              </ul>
            </TableCell>
            <TableCell>
              ${item.price}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => removeItemFromCart(item._id)}>
                <Icon>
                  <RemoveShoppingCartIcon />
                </Icon>
              </IconButton>
            </TableCell>
          </TableRow>) :
          <>
            <TableRow>
              <TableCell>
                No items in cart
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link className="standard-link underlined" to="/artworks">Browse Artworks</Link>
              </TableCell>
            </TableRow>
          </>
        }
      </TableBody>
    </Table>
  )
}
export default CartItems