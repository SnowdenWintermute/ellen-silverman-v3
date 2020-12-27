import React, { useState, useEffect } from "react";
import PaintingCategoryCard from "../paintings/PaintingCategoryCard";
import { getPaintingsInSeriesWithThumbnails } from '../../apiCalls/series'

const SeriesPage = (params) => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const asyncFunc = async () => {
      const newCards = []
      console.log(params)
      const paintingsInSeries = await getPaintingsInSeriesWithThumbnails(params.category)
      console.log(paintingsInSeries)
      paintingsInSeries.forEach((painting, i) => {
        newCards.push(
          <PaintingCategoryCard
            imgSrc={{
              uri: `../img/${painting["Category"]}/thumbs/${painting["Name"]}.jpg`,
            }}
            category={painting["Category"]}
            picTitle={painting["Name"]}
            picSize={painting["Size"]}
            year={painting["Year"]}
            price={painting["Cost unframed"]}
            key={i}
          />
        );
      });
      setCards(newCards)
    }
    asyncFunc()
  }, [])

  return (
    <div className="page-frame">
      <div className="galleryHolder"> {cards}</div>
    </div>
  );
}
export default SeriesPage