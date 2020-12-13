import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { getSeriesList, removeSeries } from '../../apiCalls/series'
import { addSeries, deleteSeries } from '../../apiCalls/series'
// components
import { TextField, Icon, Button, Grid, Typography, Table, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import MaterialPaperNarrow from '../layout/MaterialPaperNarrow'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  header: {
    color: "black",
    marginBottom: "10px"
  },
  input: {
    width: "100%",
    marginBottom: "10px"
  },
}));

const AddSeries = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [seriesName, setSeriesName] = useState("")

  const user = useSelector(state => state.user);

  const loadSeries = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList()
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
              <Button type="submit" style={{ height: "40px", cursor: "pointer" }} disabled={loading} variant="contained" color="primary">{loading ? <CircularProgress /> : "ADD SERIES"}</Button>
            </Grid>
            <Grid item xs={12}>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {seriesList.map((series, i) => (
                    <TableRow key={`series-${i}`}>
                      <TableCell align="left">{series.name}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => deleteSeries(series.name.toString())}>
                          <Icon>
                            <DeleteForeverIcon />
                          </Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </MaterialPaperNarrow>
      </form>
    </div>
  )
}

export default AddSeries;
