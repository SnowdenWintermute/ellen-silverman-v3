import React, { useEffect, useState } from "react";
import { getPaintingWithFullImage } from '../../apiCalls/paintings'
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";

const FullResolutionImage = ({ match }) => {
  const [imgUrl, setImgUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const painting = await getPaintingWithFullImage(match.params.paintingSlug)
        if (painting.data.image) setImgUrl(createImgSrcStringFromBinary(painting.data.image.contentType, painting.data.image.data))
      } catch (error) {
        console.log(error)
        setError(JSON.stringify(error))
      }
    }
    asyncFunc()
  }, [match.params.paintingSlug])

  return (
    <React.Fragment>
      {error && error}
      {imgUrl && <img
        style={{ display: "block" }}
        src={imgUrl}
        alt={match.params.paintingSlug}
      />}
    </React.Fragment>
  );
}

export default FullResolutionImage;
