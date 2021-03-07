import React, { useState, useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import createImgSrcStringFromBinary from "../../../utils/createImgSrcStringFromBinary"
import PrimaryButton from '../../../common/button/PrimaryButton'
import { getSeriesById } from '../../../../apiCalls/series'
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'

const useStyles = makeStyles((theme) => ({
  viewButton: {
    marginTop: 10,
    width: "100px",
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
}))

const OrderPaintingCard = ({ paintingOrderObject }) => {
  const classes = useStyles()
  const { painting } = paintingOrderObject
  const [seriesSlug, setSeriesSlug] = useState("")

  useEffect(() => {
    const asyncFunc = async () => {
      const series = await getSeriesById(painting.seriesList[0])
      setSeriesSlug(series.data.slug)
    }
    asyncFunc()
  })

  if (seriesSlug) return (
    <div className="order-painting-card">
      <div className="order-painting-image-holder">
        <img
          className="order-painting-image"
          alt={painting.title}
          src={createImgSrcStringFromBinary(painting.thumbnail.contentType, painting.thumbnail.data)}
        />
        {paintingOrderObject.returnRequested &&
          <div className={"painting-return-request-stamp"}>
            <Typography variant="h5">
              <strong>Return Requested</strong>
            </Typography>
          </div>}
      </div>
      <ul style={{ listStyle: "none" }} className="order-painting-info-text-holder">
        <li>
          <Link className="cart-item-link" target="_blank" to={`/artworks/${seriesSlug}/${painting.slug}`}>
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
          <Link to={`/artworks/${seriesSlug}/${painting.slug}`}>
            <PrimaryButton
              title="VIEW"
              customClasses={classes.viewButton}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
  else return <ProgressIndicator />
}
export default OrderPaintingCard