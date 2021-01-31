import React, { useEffect, useState } from "react";
import { getPaintingWithFullImage } from '../../apiCalls/paintings'
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";

const FullResolutionImage = ({ match }) => {
  const [imgUrl, setImgUrl] = useState("")
  useEffect(() => {
    const asyncFunc = async () => {
      const painting = await getPaintingWithFullImage(match.params.painting)
      console.log(painting.data)
      if (painting.data.image) setImgUrl(createImgSrcStringFromBinary(painting.data.image.contentType, painting.data.image.data))
    }
    asyncFunc()
  }, [])
  return (
    <React.Fragment>
      <img
        src={imgUrl}
        alt={match.params.painting}
      />
    </React.Fragment>
  );

}

export default FullResolutionImage;
