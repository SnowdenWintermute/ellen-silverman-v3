import React from "react";
import { Link } from "react-router-dom";

export default function PaintingCard(props) {
  let { category, linkTo, picTitle, imgSrc, picSize, price } = props;
  return (
    <div>
      <div className="galleryPicHolder">
        <Link to={linkTo ? linkTo : `/artworks/${category}/${picTitle}/`}>
          <img src={imgSrc.uri} alt={picTitle} />
        </Link>
        <div>
          <div>{picTitle}</div>
          <div>{picSize}</div>
          <div>{price} </div>
        </div>
      </div>
    </div>
  );
}
