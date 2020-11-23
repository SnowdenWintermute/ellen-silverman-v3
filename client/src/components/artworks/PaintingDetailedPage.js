import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  // Magnifier,
  MagnifierContainer,
  // GlassMagnifier,
  SideBySideMagnifier,
  // PictureInPictureMagnifier,
  // MOUSE_ACTIVATION,
  // TOUCH_ACTIVATION
} from "react-image-magnifiers";

import paintingList from "./paintingList";

const PaintingDetailedPage = ({ paintingName, category }, props) => {
  const [painting, setPainting] = useState({});

  useEffect(() => {
    const newPainting = paintingList["Sheet1"].find(
      (ptng) => ptng["Name"] === paintingName
    );
    console.log(newPainting);
    setPainting(newPainting);

    // prevent context menu on long press
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    return function cleanup() {
      window.oncontextmenu = () => {};
    };
  }, [paintingName, category]);

  let paintingCost;
  if (painting["Cost unframed"] && painting["Cost unframed"] !== "sold") {
    paintingCost = `Cost unframed: ${painting["Cost unframed"]}`;
  } else if (painting["Cost unframed"]) {
    paintingCost = "Sold";
  } else {
    paintingCost = "";
  }

  return (
    <div className="painting-details-page">
      <div className="painting-details-content-holder">
        <MagnifierContainer className="painting-details-img">
          <SideBySideMagnifier
            imageSrc={`/img/${category}/${paintingName}.jpg`}
            alwaysInPlace={true}
          ></SideBySideMagnifier>
        </MagnifierContainer>
        <div className="painting-details-text-box">
          <div className="painting-title">{painting["Name"]}</div>
          <div className="painting-detail-text">Original Painting</div>
          <div className="painting-detail-text">
            Size, unframed: {painting["Size"]}
          </div>
          <div className="painting-detail-text">Painted {painting["Year"]}</div>
          <div className="painting-detail-text">{paintingCost}</div>
          <Link
            className="standard-link"
            to={`/img/${painting["Category"]}/${painting["Name"]}.jpg`}
          >
            View Full Resolution
          </Link>
          <br></br>
          <Link to={`/artworks/${category}`} className="standard-link">
            View other paintings in the {painting["Category"]} series
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PaintingDetailedPage);
