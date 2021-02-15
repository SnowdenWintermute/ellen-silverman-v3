import React, { useState, useEffect } from "react";
import { MagnifierContainer, SideBySideMagnifier } from "react-image-magnifiers";
import { toast } from "react-toastify";
import { getPaintingWithFullImage } from "../../../apiCalls/paintings";
import PaintingDetailsTextBox from './PaintingDetailsTextBox'
import createImgSrcStringFromBinary from "../../utils/createImgSrcStringFromBinary";
import ProgressIndicator from '../../common/progressIndicator/ProgressIndicator'
import "./paintingDetailsPage.css"

const PaintingDetailedPage = (props) => {
  const [painting, setPainting] = useState({});
  const [loading, setLoading] = useState(false)
  const [showZoomFrame, setShowZoomFrame] = useState(false)
  const { paintingSlug } = props.match.params

  useEffect(() => {
    const asyncFunc = async () => {
      setLoading(true)
      try {
        const newPainting = await getPaintingWithFullImage(paintingSlug);
        setPainting({ ...newPainting.data });
      } catch (error) {
        console.log(error)
        toast.error(JSON.stringify(error))
      }
      setLoading(false)
    };
    asyncFunc();
  }, [paintingSlug]);

  useEffect(() => {
    // scroll top
    window.scrollTo(0, 0)
    // prevent context menu on long press
    // window.oncontextmenu = function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   return false;
    // };
    return function cleanup() {
      window.oncontextmenu = () => { };
    };
  }, []);

  if (loading) {
    return <div className="page-frame">
      <div className="flex-center">
        <ProgressIndicator />
      </div>
    </div>
  }
  else if (!Object.keys(painting).length > 0) {
    return <div className="flex-center">No painting by that name found</div>;
  } else
    return (
      <div className="page-frame">
        <div className="painting-details-content-holder">
          <MagnifierContainer className="painting-details-img">
            <div onMouseEnter={() => {
              setShowZoomFrame(true)
            }} onMouseOut={() => setShowZoomFrame(false)}>
              <SideBySideMagnifier
                imageSrc={painting.image && createImgSrcStringFromBinary(
                  painting.image.contentType,
                  painting.image.data
                )}
                // alwaysInPlace={true}
                touchActivation={"longTouch"}
                mouseActivation={"click"}
                style={{ zIndex: "2", position: "relative" }}
              ></SideBySideMagnifier>
            </div>
            {showZoomFrame && <div className="zoom-frame"><ProgressIndicator /></div>}
          </MagnifierContainer>
          {<PaintingDetailsTextBox painting={painting} />}
        </div>
      </div>
    );
};

export default (PaintingDetailedPage);
