import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { addSeries, getSeriesList, removeSeries, editSeries, fetchOneSeriesPaintingsNames } from '../../../apiCalls/series'
// components
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MaterialPaperNarrow from '../../layout/MaterialPaperNarrow'
import AddSeriesInput from './AddSeriesInput'
import SeriesAndPaintingList from './SeriesAndPaintingList'
import DeleteSeriesModal from './DeleteSeriesModal'
import EditSeriesModal from './EditSeriesModal'


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

const ManageSeries = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [seriesListLoading, setSeriesListLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [paintingLists, setPaintingLists] = useState({})
  const [seriesName, setSeriesName] = useState("")
  const [expanded, setExpanded] = useState('')
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const [seriesToBeDeleted, setSeriesToBeDeleted] = useState(null)
  const [editSeriesModalOpen, setEditSeriesModalOpen] = useState(false)
  const [seriesToBeEdited, setSeriesToBeEdited] = useState(null)

  const user = useSelector(state => state.user);

  const loadSeries = useCallback(async () => {
    setSeriesListLoading(true)
    try {
      const fetchedSeriesList = await getSeriesList()
      setSeriesList(fetchedSeriesList)
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
    setSeriesListLoading(false)
  }, []);

  useEffect(() => {
    loadSeries();
  }, [loadSeries]);

  const handleNewSeriesInputChange = e => {
    setSeriesName(e.target.value)
  };
  const handleEditSeriesInputChange = e => {
    setSeriesToBeEdited({ ...seriesToBeEdited, newName: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await addSeries({ name: seriesName }, user.token)
      if (res.response && res.response.data.errors) Object.keys(res.response.data.errors).forEach(key => toast.error(res.response.data.errors[key].message))
      else if (res.response && res.response.data.name === "MongoError") toast.error("Database error (duplicate name?)")
      else if (res.response && res.response.data.err) toast.error(res.response.data.err)
      else toast.success(`${res.name} added`)
      loadSeries()
      setLoading(false)
      setExpanded("")
      setSeriesName("")
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };

  const confirmEditSeries = async (e, seriesId, newSeriesName) => {
    e.preventDefault()
    try {
      const res = await editSeries(seriesId, newSeriesName, user.token)
      console.log({ ...res })
      if (res.response && res.response.data && res.response.data.error) toast.error(res.response.data.error)
      else toast.success("Series name changed to " + newSeriesName)
      loadSeries()
    } catch (error) {
      toast.error(error)
      loadSeries()
    }
    setEditSeriesModalOpen(false)
  }

  const deleteSeries = async (seriesName) => {
    try {
      const res = await removeSeries(seriesName, user.token)
      setExpanded("")
      setConfirmDeleteModalOpen(false)
      if (res.response && res.response.data && res.response.data.err) toast.error(res.response.data.err)
      else {
        toast.success(res.data)
        loadSeries()
      }
    } catch (error) {
      toast.error(error)
      loadSeries()
    }
  }

  const loadOneSeriesPaintings = async (seriesId) => {
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
    console.log("delete modal opened for " + seriesName)
    setSeriesToBeDeleted({ name: seriesName, _id: seriesId })
    setConfirmDeleteModalOpen(true)
  }

  const openSeriesEditModal = (seriesName, seriesId) => {
    setSeriesToBeEdited({ currentName: seriesName, newName: seriesName, _id: seriesId })
    setEditSeriesModalOpen(true)
  }

  return (
    <div className="page-frame">
      <form onSubmit={handleSubmit}>
        <MaterialPaperNarrow>
          <Grid container item xs={12}>
            <AddSeriesInput handleNewSeriesInputChange={handleNewSeriesInputChange} seriesName={seriesName} loading={loading} classes={classes} />
            <Grid item xs={12}>
              <SeriesAndPaintingList seriesListLoading={seriesListLoading} seriesList={seriesList} expanded={expanded} handlePanelChange={handlePanelChange} paintingLists={paintingLists} classes={classes} openSeriesEditModal={openSeriesEditModal} confirmSeriesDelete={confirmSeriesDelete} />
            </Grid>
          </Grid>
        </MaterialPaperNarrow>
      </form>
      <DeleteSeriesModal confirmDeleteModalOpen={confirmDeleteModalOpen} setConfirmDeleteModalOpen={setConfirmDeleteModalOpen} seriesToBeDeleted={seriesToBeDeleted} classes={classes} deleteSeries={deleteSeries} />
      <EditSeriesModal editSeriesModalOpen={editSeriesModalOpen} setEditSeriesModalOpen={setEditSeriesModalOpen} confirmEditSeries={confirmEditSeries} seriesToBeEdited={seriesToBeEdited} classes={classes} handleEditSeriesInputChange={handleEditSeriesInputChange} />
    </div>
  )
}

export default ManageSeries;
