import React, { useState, useEffect, useRef } from "react";

const ImageFader = ({ imageSourceArray, delayInMiliseconds }) => {
  const [incomingImageIndex, setIncomingImageIndex] = useState(
    imageSourceArray.length - 1
  );
  const indexHolder = useRef(0);
  const slideTimeout = useRef(null);

  const changeSlides = () => {
    if (indexHolder.current >= imageSourceArray.length - 1)
      indexHolder.current = 0;
    else indexHolder.current += 1;
    setIncomingImageIndex(indexHolder.current);
    slideTimeout.current = setTimeout(changeSlides, delayInMiliseconds);
  };

  useEffect(() => {
    setTimeout(changeSlides, delayInMiliseconds);
    return () => {
      clearTimeout(slideTimeout.current);
    };
  }, []);

  return imageSourceArray.map((image, i) => (
    <img
      src={image}
      alt={image}
      key={i}
      className={`fader-slide ${
        i === incomingImageIndex ? "fader-slide-show" : "fader-slide-hidden"
      }`}
    />
  ));
};
export default ImageFader;
