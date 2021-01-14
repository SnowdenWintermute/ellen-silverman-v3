import React, { useState, useEffect } from "react";
import PaintingCard from "../paintings/PaintingCard";
import { getPaintingsInSeriesWithThumbnails } from "../../apiCalls/series";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";
import { CircularProgress } from "@material-ui/core";

const SeriesPage = (params) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      const newCards = [];
      const paintingsInSeries = await getPaintingsInSeriesWithThumbnails(
        params.category
      );
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
      setLoading(false)
    };
    asyncFunc();
  }, [params.category]);

  return (
    <div className="page-frame">
      <div className="galleryHolder"> {loading ? <div className="flex-center"><CircularProgress /></div> : cards}</div>
    </div>
  );
};
export default SeriesPage;
