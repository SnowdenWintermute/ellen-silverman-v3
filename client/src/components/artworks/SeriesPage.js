import React, { useState, useEffect } from "react";
import PaintingCard from "../paintings/PaintingCard";
import { getPaintingsInSeriesWithThumbnails } from "../../apiCalls/series";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";

const SeriesPage = (params) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      const newCards = [];
      console.log(params);
      const paintingsInSeries = await getPaintingsInSeriesWithThumbnails(
        params.category
      );
      console.log(paintingsInSeries);
      paintingsInSeries.forEach((painting, i) => {
        if (painting.thumbnail) {
          newCards.push(
            <PaintingCard
              img={createImgSrcStringFromBinary(
                painting.thumbnail.contentType,
                painting.thumbnail.data
              )}
              series={painting.series}
              title={painting.title}
              slug={painting.slug}
              height={painting.height}
              width={painting.width}
              year={painting.year}
              price={painting.price}
              key={i}
            />
          );
        }
      });
      setCards(newCards);
    };
    asyncFunc();
  }, []);

  return (
    <div className="page-frame">
      <div className="galleryHolder"> {cards}</div>
    </div>
  );
};
export default SeriesPage;
