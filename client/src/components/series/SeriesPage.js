import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaintingCard from "../paintings/PaintingCard/PaintingCard";
import { getPaintingsInSeriesWithThumbnails } from "../../apiCalls/series";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";
import { CircularProgress } from "@material-ui/core";
import { getSeries } from "../../apiCalls/series";
import { toast } from "react-toastify";
import camelCase from "lodash.camelcase";
import { SeriesPaintingsSortBar } from "./SeriesPaintingsSortBar";
import { updateCachedPaintings } from "../../store/actions/artworks-actions";
const SeriesPage = ({ match }) => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortParameter, setSortParameter] = useState("newest");
  const { cachedPaintingsBySeries } = useSelector((state) => state.artworks);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        let withThumbnails = true;

        if (
          cachedPaintingsBySeries[camelCase(match.params.seriesSlug)]?.length >
          0
        )
          withThumbnails = false;

        const paintingsInSeries = await getPaintingsInSeriesWithThumbnails({
          slug: match.params.seriesSlug,
          withThumbnails,
        });

        dispatch(
          updateCachedPaintings({
            seriesName: camelCase(match.params.seriesSlug),
            paintings: paintingsInSeries.data,
          })
        );
        const series = await getSeries(match.params.seriesSlug);
        setSeries(series.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(JSON.stringify(error));
        setLoading(false);
      }
    };
    asyncFunc();
  }, [match.params.seriesSlug]);

  useEffect(() => {
    const newCards = [];
    cachedPaintingsBySeries[camelCase(match.params.seriesSlug)]?.forEach(
      (painting, i) => {
        if (painting.thumbnail) {
          newCards.push({
            painting,
            element: (
              <PaintingCard
                img={createImgSrcStringFromBinary(
                  painting.thumbnail.contentType,
                  painting.thumbnail.data
                )}
                painting={painting}
                seriesSlug={match.params.seriesSlug}
                key={i}
              />
            ),
          });
        }
      }
    );
    newCards.sort(
      (a, b) =>
        b.painting.year.latest - a.painting.year.latest ||
        b.painting.year.earliest - a.painting.year.earliest
    );
    setCards(newCards);
  }, [cachedPaintingsBySeries[camelCase(match.params.seriesSlug)]]);

  const onSelectSortParameter = (e) => {
    setSortParameter(e.target.value);
    const newCards = [...cards];
    if (e.target.value === "newest")
      newCards.sort((a, b) => b.painting.year - a.painting.year);
    if (e.target.value === "oldest")
      newCards.sort((a, b) => a.painting.year - b.painting.year);
    if (e.target.value === "sold first")
      newCards.sort((a, b) =>
        a.painting.sold === b.painting.sold ? 0 : a.painting.sold ? -1 : 1
      );
    if (e.target.value === "not sold first")
      newCards.sort((a, b) =>
        a.painting.sold === b.painting.sold ? 0 : a.painting.sold ? 1 : -1
      );
    if (e.target.value === "alphabetical")
      newCards.sort((a, b) => a.painting.title.localeCompare(b.painting.title)
      );
    setCards(newCards);
  };

  return (
    <div className="page-frame">
      <div className="gallery-holder">
        {!loading && series && (
          <SeriesPaintingsSortBar
            series={series}
            sortParameter={sortParameter}
            onSelectSortParameter={onSelectSortParameter}
          />
        )}
        {loading ? (
          <div className="flex-center">
            <CircularProgress />
          </div>
        ) : cards.length > 0 ? (
          cards.map((card) => card.element)
        ) : (
          "No paintings found in this series, or no such series exists."
        )}
      </div>
    </div>
  );
};
export default SeriesPage;
