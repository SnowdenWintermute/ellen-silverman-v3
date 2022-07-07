import React from "react";
import { Link } from "react-router-dom";
import "./paintingCard.css"

export default function PaintingCard({ img, painting, seriesSlug }) {
  const { slug, title, price, sold } = painting
  return (
    <div className="painting-card-body">
      <div className={`painting-card-price-holder ${sold && "painting-card-price-holder-sold"}`}>
        <span className="painting-card-price">{sold ? "SOLD" : `$${price}`}</span>
      </div>
      <Link
        className="painting-card-img-link"
        to={`/artworks/${seriesSlug}/${slug}/`}
      >
        <img src={img} alt={img} />
        <div className="painting-card-info-text">
          <div className="galleryPicTitle">{title}</div>
          {price && <div className="painting-price"><span style={{ textDecoration: sold ? "line-through" : "" }}>${price}</span>{(sold ? " (sold)" : "")}</div>}
        </div>
      </Link>
    </div>
  );
}
