import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { getSeriesList, removeSeries, editSeries, fetchOneSeriesPaintingsNames } from '../../../apiCalls/series'
import { removePainting } from '../../../apiCalls/paintings'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import MaterialPaperNarrow from '../../common/paper/MaterialPaperNarrow'
import AddSeriesInput from './AddSeriesInput'
import SeriesAndPaintingList from './seriesAndPaintingList/SeriesAndPaintingList'
import DeleteSeriesModal from './DeleteSeriesModal'
import EditSeriesModal from './EditSeriesModal'
import DeletePaintingModal from './DeletePaintingModal'
import AdminFeatureHeader from '../subComponents/AdminFeatureHeader';


const useStyles = makeStyles(() => ({
  header: {
    color: "black",
    marginBottom: "10px"
  },
}));

const ManageSeries = () => {
  const classes = useStyles()
  const [seriesListLoading, setSeriesListLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [paintingLists, setPaintingLists] = useState({})
  const [expanded, setExpanded] = useState('')
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const [editSeriesModalOpen, setEditSeriesModalOpen] = useState(false)
  const [confirmDeletePaintingModalOpen, setConfirmDeletePaintingModalOpen] = useState(false)
  const [seriesToBeDeleted, setSeriesToBeDeleted] = useState(null)
  const [seriesToBeEdited, setSeriesToBeEdited] = useState(null)
  const [paintingToBeDeleted, setPaintingToBeDeleted] = useState(null)

  const user = useSelector(state => state.user);

  const loadSeries = useCallback(async () => {
    setSeriesListLoading(true)
    try {
      const fetchedSeriesList = await getSeriesList()
      setSeriesList(fetchedSeriesList.data)
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    setSeriesListLoading(false)
  }, []);

  useEffect(() => {
    loadSeries();
  }, [loadSeries]);

  const loadOneSeriesPaintings = async (seriesId) => {
    try {
      const res = await fetchOneSeriesPaintingsNames(seriesId)
      setPaintingLists({ ...paintingLists, [seriesId]: [...res.data] })
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
  }

  const handlePanelChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (!paintingLists[seriesList[panel]._id]) loadOneSeriesPaintings(seriesList[panel]._id)
  }

  const handleEditSeriesInputChange = e => setSeriesToBeEdited({ ...seriesToBeEdited, newName: e.target.value })

  const openSeriesEditModal = (seriesName, seriesId) => {
    setSeriesToBeEdited({ currentName: seriesName, newName: seriesName, _id: seriesId })
    setEditSeriesModalOpen(true)
  }

  const confirmEditSeries = async (e, seriesId, newSeriesName) => {
    e.preventDefault()
    try {
      const res = await editSeries(seriesId, newSeriesName, user.token)
      if (res.response && res.response.data && res.response.data.error) toast.error(res.response.data.error)
      else toast.success("Series name changed to " + newSeriesName)
      loadSeries()
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
      loadSeries()
    }
    setEditSeriesModalOpen(false)
  }

  const openDeleteSeriesModal = (seriesName, seriesId) => {
    setSeriesToBeDeleted({ name: seriesName, _id: seriesId })
    setConfirmDeleteModalOpen(true)
  }

  const deleteSeries = async (seriesName) => {
    try {
      const res = await removeSeries(seriesName, user.token)
      setExpanded("")
      setConfirmDeleteModalOpen(false)
      if (res.response && res.response.data && res.response.data.err) toast.error(res.response.data.err)
      else {
        toast.success(res.data)
        const newSeriesList = [...seriesList]
        let indexToRemove
        newSeriesList.forEach((series, i) => { if (series.name === seriesName) indexToRemove = i })
        newSeriesList.splice(indexToRemove, 1)
        setSeriesList(newSeriesList)
      }
    } catch (error) {
      toast.error(JSON.stringify(error))
      loadSeries()
    }
  }

  const openDeletePaintingModal = (painting) => {
    setPaintingToBeDeleted(painting)
    setConfirmDeletePaintingModalOpen(true)
  }

  const deletePainting = async (painting) => {
    try {
      const deletedPainting = await removePainting(painting._id, user.token)
      toast.success(deletedPainting.data.title + " removed from database")
      loadOneSeriesPaintings(deletedPainting.data.series)
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    setConfirmDeletePaintingModalOpen(false)
  }

  return (
    <div className="page-frame">
      <MaterialPaperNarrow>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText="Add New Series" />
          <AddSeriesInput loadSeries={loadSeries} setExpanded={setExpanded} />
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.header}>Edit Series and Paintings</Typography>
            <SeriesAndPaintingList
              seriesListLoading={seriesListLoading}
              seriesList={seriesList}
              expanded={expanded}
              handlePanelChange={handlePanelChange}
              paintingLists={paintingLists}
              openSeriesEditModal={openSeriesEditModal}
              openDeleteSeriesModal={openDeleteSeriesModal}
              openDeletePaintingModal={openDeletePaintingModal} />
          </Grid>
        </Grid>
      </MaterialPaperNarrow>
      <DeleteSeriesModal
        confirmDeleteModalOpen={confirmDeleteModalOpen}
        setConfirmDeleteModalOpen={setConfirmDeleteModalOpen}
        seriesToBeDeleted={seriesToBeDeleted}
        deleteSeries={deleteSeries} />
      <EditSeriesModal
        editSeriesModalOpen={editSeriesModalOpen}
        setEditSeriesModalOpen={setEditSeriesModalOpen}
        confirmEditSeries={confirmEditSeries}
        seriesToBeEdited={seriesToBeEdited}
        handleEditSeriesInputChange={handleEditSeriesInputChange} />
      <DeletePaintingModal
        confirmDeletePaintingModalOpen={confirmDeletePaintingModalOpen}
        setConfirmDeletePaintingModalOpen={setConfirmDeletePaintingModalOpen}
        paintingToBeDeleted={paintingToBeDeleted}
        deletePainting={deletePainting} />
    </div>
  )
}

export default ManageSeries;
