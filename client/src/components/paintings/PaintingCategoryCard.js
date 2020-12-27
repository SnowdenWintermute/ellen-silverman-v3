import React from "react";
import { Link } from "react-router-dom";

export default function PaintingCategoryCard({ linkTo, series, img }) {
  return (
    <div className="painting-card-body">
      <Link
        className="painting-card-img-link"
        to={linkTo}
      >
        <img src={img} alt={series} />
        <div className="painting-card-info-text">
          <div className="galleryPicTitle">{series}</div>
        </div>
      </Link>
    </div>
  );
}
