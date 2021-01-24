import React, { useState, useEffect, useRef } from 'react'

const ImageFader = ({ images, delayInMiliseconds }) => {
  const [incomingImageIndex, setIncomingImageIndex] = useState(images.length - 1)
  const indexHolder = useRef(0)
  const slideTimeout = useRef(null)

  const changeSlides = () => {
    if (indexHolder.current >= images.length - 1) indexHolder.current = 0
    else indexHolder.current += 1
    setIncomingImageIndex(indexHolder.current)
    slideTimeout.current = setTimeout(changeSlides, delayInMiliseconds)
  }

  useEffect(() => {
    setTimeout(changeSlides, delayInMiliseconds)
    return () => {
      clearTimeout(slideTimeout.current)
    }
  }, [])

  return (
    images.map((image, i) => <img src={image} alt={image} key={i} className={`fader-slide ${i === incomingImageIndex ? "fader-slide-show" : "fader-slide-hidden"}`} />)
  )
}
export default ImageFader