import React, { useState, useEffect } from "react";
import PaintingCard from "../paintings/PaintingCard/PaintingCard";
import { getPaintingsInSeriesWithThumbnails } from "../../apiCalls/series";
import createImgSrcStringFromBinary from "../utils/createImgSrcStringFromBinary";
import { CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, Card, Grid, makeStyles } from "@material-ui/core";
import { getSeries } from '../../apiCalls/series'
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  topBar: {
    width: "100%",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  sortFilter: {
    width: 200,
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      // width: "100%"
    }
  },
  infoGrid: {
  }
}))

const SeriesPage = (params) => {
  const classes = useStyles()
  const [cards, setCards] = useState([]);
  const [seriesName, setSeriesName] = useState([])
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sortParameter, setSortParameter] = useState("newest")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      const asyncFunc = async () => {
        const newCards = [];
        const paintingsInSeries = await getPaintingsInSeriesWithThumbnails(params.category);
        const series = await getSeries(paintingsInSeries[0].series._id)
        setSeries(series.data)
        if (series) setSeriesName(paintingsInSeries[0].series.name)
        paintingsInSeries.forEach((painting, i) => {
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

      };
      asyncFunc();
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
      setLoading(false)
    }

  }, [params.category]);

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
      <div className="galleryHolder">
        {!loading && series &&
          <Card className={classes.topBar}>
            <Grid container>
              <Grid container item xs={12} justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5">{seriesName}</Typography>
                </Grid>
                <Grid item>
                  <FormControl variant="filled" className={classes.sortFilter}>
                    <InputLabel>Sort</InputLabel>
                    <Select labelId="select-sort" onChange={(e) => onSelectSortParameter(e)} value={sortParameter}>
                      <MenuItem value={"newest"}>Newest</MenuItem>
                      <MenuItem value={"oldest"}>Oldest</MenuItem>
                      <MenuItem value={"sold first"}>Sold First</MenuItem>
                      <MenuItem value={"not sold first"}>Not Sold First</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} className={classes.infoGrid}>
                <Grid item sm={6} xs={12}>
                  <Typography variant="body2">

                    {series.numberSold}/{series.numberOfPaintings} paintings sold
                  </Typography>
                  <Typography variant="body2">
                    Painted {
                      series.years.earliest === series.years.latest
                        ?
                        <span>{series.years.earliest}</span>
                        :
                        <span>{series.years.earliest} to {series.years.latest} </span>
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        }

        {loading ? <div className="flex-center"><CircularProgress /></div> : cards.length > 0 ? cards.map(card => card.element) : "No paintings found in this series, or no such series exists."}
      </div>
    </div>
  );
};
export default SeriesPage;
