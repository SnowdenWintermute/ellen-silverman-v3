import React, { Fragment, useState, useEffect } from "react";
import ImageFader from "./ImageFader";

const ImageFaderWithTitles = ({
  imageSourceArray,
  titlesInfo,
  delayInMiliseconds,
}) => {
  const [incomingIndex, setIncomingIndex] = useState(0);

  return (
    <Fragment>
      {titlesInfo.map((titleInfo, i) => (
        <div
          key={i}
          className={`${
            i === incomingIndex ? "fader-title" : "fader-title-hidden"
          }`}
        >
          {titleInfo.title}
        </div>
      ))}
      <ImageFader
        imageSourceArray={imageSourceArray}
        delayInMiliseconds={delayInMiliseconds}
      />
    </Fragment>
  );
};
export default ImageFaderWithTitles;
