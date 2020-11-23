import React from "react";
import { Link } from "react-router-dom";

export default function PaintingCategoryCard(props) {
  return (
    <div className="painting-card-body">
      <Link
        className="painting-card-img-link"
        to={
          props.linkTo
            ? props.linkTo
            : `/artworks/${props.category}/${props.picTitle}/`
        }
      >
        <img src={props.imgSrc.uri} alt={props.picTitle} />
        <div className="painting-card-info-text">
          <div className="galleryPicTitle">{props.picTitle}</div>
        </div>
      </Link>
    </div>
  );
}
