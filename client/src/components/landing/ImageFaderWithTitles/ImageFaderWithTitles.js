import React, { useState, useEffect, useCallback, useRef } from "react";
import ImageFader from "../ImageFader/ImageFader";
import './imageFaderWithTitles.css'

const ImageFaderWithTitles = ({
  imageSourceArray,
  titlesInfo,
  delayInMiliseconds,
}) => {
  const [incomingIndex, setIncomingIndex] = useState(0);
  const [componentShowClass, setComponentShowClass] = useState("fader-titles fader-titles-hidden")

  const indexHolder = useRef(0);
  const slideTimeout = useRef(null);

  const changeSlides = useCallback(() => {
    if (indexHolder.current >= titlesInfo.length - 1)
      indexHolder.current = 0;
    else indexHolder.current += 1;
    setIncomingIndex(indexHolder.current);
    slideTimeout.current = setTimeout(changeSlides, delayInMiliseconds);
  }, [delayInMiliseconds, titlesInfo.length]);

  useEffect(() => {
    slideTimeout.current = setTimeout(changeSlides, delayInMiliseconds);
    return () => {
      clearTimeout(slideTimeout.current);
    };
  }, [changeSlides, delayInMiliseconds]);

  useEffect(() => {
    const timeout = setTimeout(() => setComponentShowClass("fader-titles"), 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])


  const determineClassName = (i) => {
    if (i === incomingIndex) return "fader-title"
    if (i === incomingIndex - 1 || (incomingIndex === 0 && i === titlesInfo.length - 1)) return "fader-title fader-title-outgoing fader-title-hidden faster-transition"
    else return "fader-title fader-title-hidden"
  }

  return (
    <div className="image-fader-with-titles">
      <div className={componentShowClass}>
        {titlesInfo.map((titleInfo, i) => (
          <div
            key={i}
            className={determineClassName(i)}
          >
            {titleInfo.title} - {titleInfo.composition}
          </div>
        ))}
      </div>
      <ImageFader
        imageSourceArray={imageSourceArray}
        delayInMiliseconds={delayInMiliseconds}
      />
    </div>
  );
};
export default ImageFaderWithTitles;
