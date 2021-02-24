import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateCartItems } from "../../../../store/actions/cart-actions";
import classnames from 'classnames'
import { Icon, IconButton, Table, TableBody, TableCell, TableRow, makeStyles } from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import createImgSrcStringFromBinary from '../../../utils/createImgSrcStringFromBinary'
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'

const useStyles = makeStyles((theme) => ({
  cartItemRow: {
    [theme.breakpoints.down('xs')]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderBottom: "1px solid grey",
      // boxShadow: "0px 1px 2px black",
      // marginBottom: 10
    }
  },
  cartItemCell: {
    [theme.breakpoints.down('xs')]: {
      border: "none",
      padding: 10
    }
  },
  discardIconButton: {

  }
}))

const CartItems = ({ cartItemsWithThumbnails }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const removeItemFromCart = (id) => {
    let newCartItems = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'))
        localStorageCart.forEach(item => {
          if (item._id !== id) newCartItems.push({ ...item })
        })
        localStorage.setItem('cart', JSON.stringify(newCartItems))
        dispatch(updateCartItems(newCartItems))
      }
    }
  }
  return (
    <Table>
      <TableBody>
        {cartItemsWithThumbnails && cartItemsWithThumbnails.length ?
          cartItemsWithThumbnails.map(item => <TableRow key={item._id} className={classes.cartItemRow}>
            <TableCell className={classes.cartItemCell}>
              {item.thumbnail ?
                <img
                  className="cart-item-thumbnail"
                  alt={item.title}
                  src={createImgSrcStringFromBinary(item.thumbnail.contentType, item.thumbnail.data)}
                /> :
                <ProgressIndicator />}
            </TableCell>
            <TableCell className={classes.cartItemCell}>
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
            <TableCell className={classnames(classes.cartItemCell)}>
              ${item.price}
            </TableCell>
            <TableCell className={classnames(classes.cartItemCell)}>
              <IconButton onClick={() => removeItemFromCart(item._id)} className={classes.discardIconButton}>
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