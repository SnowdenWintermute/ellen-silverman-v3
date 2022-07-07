import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './seriesCard.css'
import '../paintings/PaintingCard/paintingCard.css'

export default function SeriesCard({ series, img }) {

  const [opacity, setOpacity] = useState(.5)
  const [textClass, setTextClass] = useState("")
  const [hovering, setHovering] = useState(false)
  const opacityInterval = useRef(null)
  const opacityChangeIncrement = .05
  const opacityChangeIntervalTime = 22

  const handleMouseEnter = useCallback(() => {
    setTextClass("hovered-text")
    clearInterval(opacityInterval.current)
    const newOpacity = opacity - opacityChangeIncrement
    const increaseOpacity = () => {
      if (opacity > 0) setOpacity(newOpacity)
      else clearInterval(opacityInterval.current)
    }
    opacityInterval.current = setInterval(increaseOpacity, opacityChangeIntervalTime)
  }, [opacity])

  const handleMouseLeave = useCallback(() => {
    setTextClass("")
    clearInterval(opacityInterval.current)
    const newOpacity = opacity + opacityChangeIncrement
    const decreaseOpacity = () => {
      if (opacity < .5) setOpacity(newOpacity)
      else clearInterval(opacityInterval.current)
    }
    opacityInterval.current = setInterval(decreaseOpacity, opacityChangeIntervalTime)
  }, [opacity])

  useEffect(() => {
    if (hovering) handleMouseEnter()
    if (!hovering) handleMouseLeave()
    return function cleanup() {
      clearInterval(opacityInterval.current)
    }
  }, [hovering, handleMouseEnter, handleMouseLeave])

  return (
    <div className="series-card-body" onMouseEnter={() => { setHovering(true) }} onMouseLeave={() => { setHovering(false) }}>
      <Link
        className="painting-card-img-link"
        to={`/artworks/${series.slug}`}
      >
        <div className="series-card-image-and-title">
          <img src={img} alt={series.name} className="series-card-image-bg" />
          <div className="image-darkener" style={{ opacity: opacity }} />
          <div className={`series-card-title ${textClass}`}>{series.name}</div>
        </div>
        <div className="series-card-info-text">
          {`${series.numberOfPaintings} work${series.numberOfPaintings > 1 ? "s" : ""} created `}
          {
            series.years.earliest === series.years.latest
              ?
              <span>{series.years.earliest}</span>
              :
              <span>{series.years.earliest} to {series.years.latest} </span>
          }
        </div>
      </Link>
    </div >
  );
}
