import { Button, Grid, makeStyles, Table, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import createImgSrcStringFromBinary from "../../utils/createImgSrcStringFromBinary"

const useStyles = makeStyles({
  viewButton: {
    marginTop: 10,
    width: "100%"
  }
})
const OrderPaintingCard = ({ painting }) => {
  const classes = useStyles()
  return (
    <div className="order-painting-card">
      <img className="order-painting-image" alt={painting.title} src={createImgSrcStringFromBinary(painting.thumbnail.contentType, painting.thumbnail.data)} />
      <ul style={{ listStyle: "none" }} className="order-painting-info-text-holder">
        <li>
          <Link className="cart-item-link" target="_blank" to={`/artworks/${painting.series.slug}/${painting.slug}`}>
            <Typography variant="body1">
              {painting.title}
            </Typography>
          </Link>
        </li>
        <li>
          <Typography variant="body1">
            {`${painting.height}" x ${painting.width}"`}
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            {`${painting.drawingMaterial} on ${painting.support}`}
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            {`cost: $${painting.price}`}
          </Typography>
        </li>
        <li>
          <Link to={`/artworks/${painting.series.slug}/${painting.slug}`}>
            <Button variant="contained" color="primary" className={classes.viewButton}>VIEW</Button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default OrderPaintingCard