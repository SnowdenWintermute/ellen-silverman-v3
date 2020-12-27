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
import { getPaintingWithFullImage } from "../../apiCalls/paintings";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";

const PaintingDetailedPage = ({ paintingSlug }, props) => {
  const [painting, setPainting] = useState({});

  useEffect(() => {
    const asyncFunc = async () => {
      console.log(paintingSlug);
      const newPainting = await getPaintingWithFullImage(paintingSlug);
      console.log({ ...newPainting.data });
      setPainting({ ...newPainting.data });
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    // prevent context menu on long press
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    return function cleanup() {
      window.oncontextmenu = () => {};
    };
  }, []);

  let paintingCost;
  if (painting.price && !painting.sold) {
    paintingCost = `Cost unframed: ${painting.price}`;
  } else {
    paintingCost = "Sold";
  }

  if (!Object.keys(painting).length > 0) {
    return <div>No painting by that name found</div>;
  } else
    return (
      <div className="painting-details-page">
        <div className="painting-details-content-holder">
          <MagnifierContainer className="painting-details-img">
            <SideBySideMagnifier
              imageSrc={createImgSrcStringFromBinary(
                painting.image.contentType,
                painting.image.data
              )}
              alwaysInPlace={true}
            ></SideBySideMagnifier>
          </MagnifierContainer>
          <div className="painting-details-text-box">
            <div className="painting-title">{painting["Name"]}</div>
            <div className="painting-detail-text">Original Painting</div>
            <div className="painting-detail-text">
              Size, unframed: {painting.height}" x {painting.width}"
            </div>
            {painting.year && (
              <div className="painting-detail-text">
                Painted {painting["Year"]}
              </div>
            )}
            <div className="painting-detail-text">{paintingCost}</div>
            <Link
              className="standard-link"
              to={`/img/${painting["Category"]}/${createImgSrcStringFromBinary(
                painting.image.contentType,
                painting.image.data
              )}`}
            >
              View Full Resolution
            </Link>
            <br></br>
            <Link
              to={`/artworks/${painting.series.slug}`}
              className="standard-link"
            >
              View other paintings in the {painting.series.name} series
            </Link>
          </div>
        </div>
      </div>
    );
};

export default withRouter(PaintingDetailedPage);
