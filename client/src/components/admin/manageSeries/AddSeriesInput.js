import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Grid, makeStyles } from '@material-ui/core'
import { toast } from 'react-toastify';
import PrimaryButton from '../../common/button/PrimaryButton';
import { addSeries } from '../../../apiCalls/series'

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: "10px"
  },
  marginBottom: {
    marginBottom: "10px"
  },
}));

const AddSeriesInput = ({ loadSeries, setExpanded }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [seriesName, setSeriesName] = useState("")
  const user = useSelector(state => state.user);

  const handleNewSeriesInputChange = e => setSeriesName(e.target.value)

  const handleSubmitNewSeries = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await addSeries({ name: seriesName }, user.token)
      toast.success(`${res.data.name} added`)
      setLoading(false)
      setSeriesName("")
      setExpanded("")
      loadSeries()
    } catch (error) {
      setLoading(false)
      console.log({ ...error })
      if (error.response && error.response.hasOwnProperty("data")) toast.error(error.response.data.message)
      else toast.error(error.message)
    }
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmitNewSeries}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            className={classes.input}
            label="Title"
            variant="filled"
            onChange={handleNewSeriesInputChange}
            value={seriesName}
          />
        </Grid>
        <Grid item xs={12}>
          <PrimaryButton
            title="ADD SERIES"
            customClasses={classes.marginBottom}
            fullWidth disabled={loading}
            isSubmit
          />
        </Grid>
      </form>
    </Grid>
  )
}
export default AddSeriesInput