import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './viewCollectionButton.css'

const ViewCollectionButton = () => {
  const [viewCollectionButtonHolderClass, setViewCollectionButtonHolderClass] = useState(`view-collection-button-holder-initial`)
  const buttonAppearTimeout = useRef(null)

  useEffect(() => {
    if (buttonAppearTimeout.current) clearTimeout(buttonAppearTimeout.current)
    // setViewCollectionButtonHolderClass('view-collection-button-holder-initial')
    const appear = () => {
      console.log(viewCollectionButtonHolderClass)
      setViewCollectionButtonHolderClass("")
    }
    buttonAppearTimeout.current = setTimeout(appear, 100)
    return () => clearTimeout(buttonAppearTimeout.current)
  }, [setViewCollectionButtonHolderClass])

  useEffect(() => {
    console.log(viewCollectionButtonHolderClass)
  }, [viewCollectionButtonHolderClass])

  return (
    <div className={`view-collection-button-holder ${viewCollectionButtonHolderClass}`}>
      <Link to="/artworks" className={`view-collection-button`}>View Collection</Link>
    </div>
  )
}

export default ViewCollectionButton