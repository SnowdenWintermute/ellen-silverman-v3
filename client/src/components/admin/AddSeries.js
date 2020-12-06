import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { getSeriesList } from '../../apiCalls/series'
import { addSeries } from '../../apiCalls/series'
// components
import { TextField, List, ListItem } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

const AddSeries = () => {
  const [loading, setLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [formFieldErrors, setFormFieldErrors] = useState({})
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
      toast.success(`${res.name} added`)
      loadSeries()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };


  return (
    <div className="page-frame">
      {loading ? <CircularProgress /> :
        <form className="standard-form" onSubmit={handleSubmit}>
          <TextField label="Title" variant="filled" width="75px" onChange={handleChange} value={seriesName} />
          <button style={{ height: "40px", cursor: "pointer" }} disabled={loading} variant="contained" color="primary">ADD SERIES</button>
        </form>
      }
      <div style={{ margin: "0 auto", width: "408px" }}>
        <List>
          {seriesList.map((series, i) =>
            <ListItem key={i}>{series.name}</ListItem>
          )}
        </List>
      </div>
    </div>
  )
}

export default AddSeries;
