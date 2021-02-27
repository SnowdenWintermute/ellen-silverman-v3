import React from "react";
import { Link } from "react-router-dom";
import './seriesCard.css'
import '../paintings/PaintingCard/paintingCard.css'

export default function SeriesCard({ series, img }) {
  return (
    <div className="series-card-body">
      <Link
        className="painting-card-img-link"
        to={`/artworks/${series.slug}`}
      >
        <img src={img} alt={series.name} />
        <div className="series-card-info-text">
          <div className="series-card-title">{series.name} {`(${series.numberOfPaintings})`}</div>
          {
            series.years.earliest === series.years.latest
              ?
              <span>{series.years.earliest}</span>
              :
              <span>{series.years.earliest} to {series.years.latest} </span>
          }
        </div>
      </Link>
    </div>
  );
}
