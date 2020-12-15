import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { getSeriesList, removeSeries } from '../../apiCalls/series'
import { addSeries, deleteSeries, fetchOneSeriesPaintingsNames } from '../../apiCalls/series'
// components
import { TextField, Icon, Button, Grid, Typography, Table, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import MaterialPaperNarrow from '../layout/MaterialPaperNarrow'
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '../common/accordion/Accordion'
import AccordionSummary from '../common/accordion/AccordionSummary'
import AccordionDetails from '../common/accordion/AccordionDetails'
import StandardModal from '../common/modal/StandardModal'

const useStyles = makeStyles((theme) => ({
  header: {
    color: "black",
    marginBottom: "10px"
  },
  input: {
    width: "100%",
    marginBottom: "10px"
  },
  addButton: {
    marginBottom: "10px"
  },
  deleteButton: {
    background: 'red',
    color: "white",
    "&:hover": {
      background: 'red',
      filter: "brightness(85%)"
    }
  },
}));

const AddSeries = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [paintingLists, setPaintingLists] = useState({})
  const [seriesName, setSeriesName] = useState("")
  const [expanded, setExpanded] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [seriesToBeDeleted, setSeriesToBeDeleted] = useState(null)

  const user = useSelector(state => state.user);

  const loadSeries = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList()
      console.log(fetchedSeriesList[0].numberOfPaintings)
      setSeriesList(fetchedSeriesList)
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }, []);

  useEffect(() => {
    loadSeries();
  }, [loadSeries]);

  const handleChange = e => {
    setSeriesName(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await addSeries({ name: seriesName }, user.token)
      console.log({ ...res })
      if (res.response && res.response.data.errors) Object.keys(res.response.data.errors).forEach(key => toast.error(res.response.data.errors[key].message))
      else if (res.response && res.response.data.name === "MongoError") toast.error("Database error (duplicate name?)")
      else if (res.response && res.response.data.err) toast.error(res.response.data.err)
      else toast.success(`${res.name} added`)
      loadSeries()
      setLoading(false)
      setSeriesName("")
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };

  const deleteSeries = async (seriesName) => {
    try {
      const res = await removeSeries(seriesName, user.token)
      if (res.response.data.err) toast.error(res.response.data.err)
      loadSeries()
    } catch (error) {
      toast.error(error)
      loadSeries()
    }
  }

  const loadOneSeriesPaintings = async (seriesId) => {
    // TODO set the loading for each painting list
    try {
      const res = await fetchOneSeriesPaintingsNames(seriesId)
      console.log(res)
      setPaintingLists({ ...paintingLists, [seriesId]: [...res] })
    } catch (error) {
      toast.error(error)
    }
  }

  const handlePanelChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (!paintingLists[seriesList[panel]._id]) loadOneSeriesPaintings(seriesList[panel]._id)
  }

  const confirmSeriesDelete = (seriesName, seriesId) => {
    setSeriesToBeDeleted({ name: seriesName, _id: seriesId })
    setModalOpen(true)
  }

  return (
    <div className="page-frame">
      <form onSubmit={handleSubmit}>
        <MaterialPaperNarrow>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.header}>Add New Series</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.input} label="Title" variant="filled" width="75px" onChange={handleChange} value={seriesName} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" className={classes.addButton} disabled={loading} variant="contained" color="primary">{loading ? <CircularProgress /> : "ADD SERIES"}</Button>
            </Grid>
            <Grid item xs={12}>
              {seriesList.map((series, i) =>
                <Accordion square expanded={expanded === i} key={`series-${i}`} onChange={handlePanelChange(i)}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      {series.name} {`(${series.numberOfPaintings})`}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table size="small" aria-label="a dense table">
                      <TableBody>
                        {paintingLists[series._id] && paintingLists[series._id].map((painting, i) => (
                          <TableRow key={`error-${i}`}>
                            <TableCell align="left" style={{ width: '200px' }}>{painting.title}</TableCell>
                            <TableCell align="right">
                              <IconButton>
                                <Icon>
                                  <DeleteForeverIcon />
                                </Icon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell align="left" />
                          <TableCell align="right">
                            <Button variant="contained" className={classes.deleteButton} onClick={() => confirmSeriesDelete(series.name, series._id)}>
                              DELETE SERIES
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>)}
            </Grid>
          </Grid>
        </MaterialPaperNarrow>
      </form>
      <StandardModal open={modalOpen} handleClose={() => { setModalOpen(false) }}>
        <Typography variant="h4">
          DANGER!
          </Typography>
        <Typography variant="body1">
          Deleting a series will also delete all paintings in that series. This action can not be undone.
          </Typography>

        <Typography variant="body1">
          Really delete {seriesToBeDeleted && seriesToBeDeleted.name}?
          </Typography>
      </StandardModal>
    </div>
  )
}

export default AddSeries;
