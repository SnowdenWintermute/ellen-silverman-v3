import React, { useState, useEffect } from "react";
import PaintingCategoryCard from "../paintings/PaintingCategoryCard";
import { getSeriesListWithThumbnails } from '../../apiCalls/series'
import createImgSrcStringFromBinary from '../utils/createImgSrcStringFromBinary'
import { CircularProgress, Typography } from "@material-ui/core";

const SeriesList = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const newCards = []
    const asyncFunc = async () => {
      setLoading(true)
      try {
        const seriesListWithThumbnails = await getSeriesListWithThumbnails()
        console.log(seriesListWithThumbnails)
        seriesListWithThumbnails.forEach((series, i) => {
          newCards.push(
            <PaintingCategoryCard
              img={createImgSrcStringFromBinary(series.thumbnail.contentType, series.thumbnail.data)}
              series={series.name}
              linkTo={`/artworks/${series.slug}`}
              key={i}
            />
          );
        });
        setCards(newCards)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    asyncFunc()
  }, [])

  return <div className="page-frame">
    {!loading && <Typography variant="h5" style={{ marginLeft: 20 }}>Select a Series</Typography>}
    <div className="galleryHolder">
      {loading ? <div className="flex-center"><CircularProgress /></div> : cards}
    </div>;
    </div>

}
export default SeriesList
