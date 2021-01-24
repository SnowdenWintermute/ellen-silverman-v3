import { Button, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import createImgSrcStringFromBinary from "../../utils/createImgSrcStringFromBinary"

const useStyles = makeStyles({
  viewButton: {
    marginTop: 10,
    width: "100px"
  },
})
const OrderPaintingCard = ({ paintingOrderObject }) => {
  const classes = useStyles()
  const { painting } = paintingOrderObject
  return (
    <div className="order-painting-card">
      <div className="order-painting-image-holder">
        <img className="order-painting-image" alt={painting.title} src={createImgSrcStringFromBinary(painting.thumbnail.contentType, painting.thumbnail.data)} />
        {paintingOrderObject.returnRequested && <div className={"painting-return-request-stamp"}><Typography variant="h5"><strong>Return Requested</strong></Typography></div>}
      </div>
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