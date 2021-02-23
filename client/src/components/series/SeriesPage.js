import React, { useState, useEffect } from "react";
import PaintingCard from "../paintings/PaintingCard/PaintingCard";
import { getPaintingsInSeriesWithThumbnails } from "../../apiCalls/series";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";
import { CircularProgress } from "@material-ui/core";
import { getSeries } from '../../apiCalls/series'
import { toast } from "react-toastify";
import { SeriesPaintingsSortBar } from "./SeriesPaintingsSortBar";

const SeriesPage = ({ match }) => {
  const [cards, setCards] = useState([]);
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sortParameter, setSortParameter] = useState("newest")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const newCards = [];
        const paintingsInSeries = await getPaintingsInSeriesWithThumbnails(match.params.series);
        const series = await getSeries(paintingsInSeries.data[0].series._id)
        setSeries(series.data)
        paintingsInSeries.data.forEach((painting, i) => {
          if (painting.thumbnail) {
            newCards.push({
              painting,
              element: <PaintingCard
                img={createImgSrcStringFromBinary(
                  painting.thumbnail.contentType,
                  painting.thumbnail.data
                )}
                painting={painting}
                key={i}
              />
            });
          }
        });
        setCards(newCards);
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(JSON.stringify(error))
        setLoading(false)
      }
    };
    asyncFunc();
  }, [match.params.series]);

  const onSelectSortParameter = (e) => {
    setSortParameter(e.target.value)
    const newCards = [...cards]
    if (e.target.value === "newest") newCards.sort((a, b) => b.painting.year - a.painting.year)
    if (e.target.value === "oldest") newCards.sort((a, b) => a.painting.year - b.painting.year)
    if (e.target.value === "sold first") newCards.sort((a, b) => a.painting.sold === b.painting.sold ? 0 : a.painting.sold ? -1 : 1)
    if (e.target.value === "not sold first") newCards.sort((a, b) => a.painting.sold === b.painting.sold ? 0 : a.painting.sold ? 1 : -1)
    setCards(newCards)
  }

  return (
    <div className="page-frame">
      <div className="gallery-holder">
        {!loading && series &&
          <SeriesPaintingsSortBar
            series={series}
            sortParameter={sortParameter}
            onSelectSortParameter={onSelectSortParameter}
          />
        }
        {loading ?
          <div className="flex-center"><CircularProgress /></div> :
          cards.length > 0 ? cards.map(card => card.element) :
            "No paintings found in this series, or no such series exists."}
      </div>
    </div>
  );
};
export default SeriesPage;
