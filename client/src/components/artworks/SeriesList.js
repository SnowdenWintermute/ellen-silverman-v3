import React, { useState, useEffect } from "react";
import SeriesCard from "../series/SeriesCard";
import { getSeriesListWithThumbnails } from '../../apiCalls/series'
import createImgSrcStringFromBinary from '../utils/createImgSrcStringFromBinary'
import { CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, Card, Grid, makeStyles } from "@material-ui/core";
import { toast } from 'react-toastify'

const useStyles = makeStyles({
  topBar: {
    width: "100%",
    marginLeft: 10,
    marginRight: 10
  },
  sortFilter: {
    width: 200,
    maxWidth: "100%"
  }
})

const SeriesList = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortParameter, setSortParameter] = useState("newest")
  const classes = useStyles()

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
    <div className="galleryHolder">
      {!loading && (
        <Card className={classes.topBar}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5" style={{ marginLeft: "20px" }}>Select a Series</Typography>
            </Grid>
            <Grid item>
              <FormControl variant="filled" className={classes.sortFilter}>
                <InputLabel>Sort</InputLabel>
                <Select labelId="select-sort" onChange={(e) => onSelectSortParameter(e)} value={sortParameter}>
                  <MenuItem value={"newest"}>Newest</MenuItem>
                  <MenuItem value={"oldest"}>Oldest</MenuItem>
                  <MenuItem value={"most sold"}>Most Sold</MenuItem>
                  <MenuItem value={"most paintings"}>Most Paintings</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      )}
      {loading ? <div className="flex-center"><CircularProgress /></div> : cards.map(card => card.cardElement)}
    </div>
  </div>

}
export default SeriesList
