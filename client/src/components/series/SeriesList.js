import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { getSeriesListWithThumbnails } from '../../apiCalls/series'
import createImgSrcStringFromBinary from '../utils/createImgSrcStringFromBinary'
import ProgressIndicator from '../common/progressIndicator/ProgressIndicator'
import SeriesCard from "./SeriesCard";
import SortBarHeader from "./SortBarHeader";

const SeriesList = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortParameter, setSortParameter] = useState("newest")

  useEffect(() => {
    const newCards = []
    const asyncFunc = async () => {
      setLoading(true)
      try {
        const seriesListWithThumbnails = await getSeriesListWithThumbnails()
        seriesListWithThumbnails.data.forEach((series, i) => {
          newCards.push({
            series,
            cardElement: (<SeriesCard
              img={createImgSrcStringFromBinary(series.thumbnail.contentType, series.thumbnail.data)}
              series={series}
              key={i}
            />)
          });
        });
        setCards(newCards)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
      setLoading(false)
    }
    asyncFunc()
  }, [])

  const onSelectSortParameter = (e) => {
    setSortParameter(e.target.value)
    const newCards = [...cards]
    if (e.target.value === "oldest") newCards.sort((a, b) => a.series.years.earliest - b.series.years.earliest)
    if (e.target.value === "newest") newCards.sort((a, b) => b.series.years.latest - a.series.years.latest || b.series.years.earliest - a.series.years.earliest)
    if (e.target.value === "most sold") newCards.sort((a, b) => b.series.numberSold - a.series.numberSold)
    if (e.target.value === "most paintings") newCards.sort((a, b) => b.series.numberOfPaintings - a.series.numberOfPaintings)
    setCards(newCards)
  }

  return <div className="page-frame">
    <div className="gallery-holder">
      {!loading && (
        <SortBarHeader
          header={"Select a Series"}
          sortParameter={sortParameter}
          onSelectSortParameter={onSelectSortParameter}
          filterOptions={[
            "newest",
            "oldest",
            "most sold",
            "most paintings"
          ]}
        />
      )}
      {loading ? <div className="flex-center"><ProgressIndicator /></div> : cards.map(card => card.cardElement)}
    </div>
  </div>

}
export default SeriesList
