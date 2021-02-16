import React, { useState, useEffect, useCallback, useRef } from "react";
import './imageFaderSlideshow.css'

const ImageFader = ({ imageSourceArray, delayInMiliseconds }) => {
  const [incomingImageIndex, setIncomingImageIndex] = useState(0);
  const indexHolder = useRef(0);
  const slideTimeout = useRef(null);
  const startShowTimeout = useRef(null)

  const changeSlides = useCallback(() => {
    if (indexHolder.current >= imageSourceArray.length - 1)
      indexHolder.current = 0;
    else indexHolder.current += 1;
    setIncomingImageIndex(indexHolder.current);
    slideTimeout.current = setTimeout(changeSlides, delayInMiliseconds);
  }, [delayInMiliseconds, imageSourceArray.length]);

  useEffect(() => {
    startShowTimeout.current = setTimeout(changeSlides, delayInMiliseconds);
    return () => {
      clearTimeout(slideTimeout.current);
      clearTimeout(startShowTimeout.current)
    };
  }, [changeSlides, delayInMiliseconds]);

  return imageSourceArray.map((image, i) => (
    <img
      src={image}
      alt={image}
      key={i}
      className={`fader-slide ${i === incomingImageIndex ? "fader-slide-show" : "fader-slide-hidden"
        }`}
    />
  ));
};
export default ImageFader;
