import React from "react";
import { Link } from "react-router-dom";

export default function PaintingCard({
  img,
  series,
  title,
  slug,
  height,
  width,
  price,
}) {
  return (
    <div className="painting-card-body">
      <Link
        className="painting-card-img-link"
        to={`/artworks/${series}/${slug}/`}
      >
        <img src={img} alt={img} />
        <div className="painting-card-info-text">
          <div className="galleryPicTitle">{title}</div>
        </div>
      </Link>
    </div>
  );
}
