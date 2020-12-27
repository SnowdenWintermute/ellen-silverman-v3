import React, { useState, useEffect } from "react";
import PaintingCategoryCard from "../paintings/PaintingCategoryCard";
import { getSeriesListWithThumbnails } from '../../apiCalls/series'
import createImgSrcStringFromBinary from '../utils/createImgSrcStringFromBinary'

const SeriesList = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const newCards = []
    const asyncFunc = async () => {
      console.log("fetching series...")
      try {
        const seriesListWithThumbnails = await getSeriesListWithThumbnails()
        console.log(seriesListWithThumbnails)
        seriesListWithThumbnails.forEach((item, i) => {
          newCards.push(
            <PaintingCategoryCard
              img={createImgSrcStringFromBinary(item.thumbnail.contentType, item.thumbnail.data)}
              series={item.name}
              linkTo={`/artworks/${item.slug}`}
              key={i}
            />
          );
        });
        setCards(newCards)
      } catch (error) {
        console.log(error)
      }
    }
    asyncFunc()
  }, [])

  return <div className="page-frame">
    <div className="galleryHolder">{cards}</div>;
    </div>

}
export default SeriesList
