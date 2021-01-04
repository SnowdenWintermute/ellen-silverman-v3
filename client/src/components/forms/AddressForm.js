import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import { Paper, TextField, Select, MenuItem, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import ImageInput from './ImageInput'
import AdminFeatureHeader from '../admin/subComponents/AdminFeatureHeader';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    maxWidth: 500,
    marginBottom: "10px"
  },
  select: {
    textAlign: "left"
  }
}));

const AddressForm = ({ addressLoading, handleSubmit, handleChange, values, seriesList, formFieldErrors }) => {
  const classes = useStyles()
  const {
    fullName,
    firstLine,
    secondLine,
    city,
    state,
    zip,
    phone
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginRight: 10, padding: "10px 10px 10px 0px" }}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Full Name" variant="filled" width="75px" onChange={handleChange('fullName')} value={fullName} error={formFieldErrors.fullName && true} helperText={formFieldErrors.fullName ? formFieldErrors.fullName.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="First Line" variant="filled" onChange={handleChange('firstLine')} value={firstLine} error={formFieldErrors.firstLine && true} helperText={formFieldErrors.firstLine ? formFieldErrors.firstLine.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Second Line" variant="filled" onChange={handleChange('secondLine')} value={secondLine} error={formFieldErrors.secondLine && true} helperText={formFieldErrors.secondLine ? formFieldErrors.secondLine.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="City" variant="filled" onChange={handleChange('city')} value={city} error={formFieldErrors.city && true} helperText={formFieldErrors.city ? formFieldErrors.city.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="State" variant="filled" onChange={handleChange('state')} value={state} error={formFieldErrors.state && true} helperText={formFieldErrors.state ? formFieldErrors.state.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Zip Code" variant="filled" onChange={handleChange('zip')} value={zip} error={formFieldErrors.zip && true} helperText={formFieldErrors.zip ? formFieldErrors.state.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Phone Number" variant="filled" onChange={handleChange('phone')} value={phone} error={formFieldErrors.phone && true} helperText={formFieldErrors.phone ? formFieldErrors.state.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={addressLoading} variant="contained" color="primary" type="submit">ADD ADDRESS</Button>
          </Grid>
        </Grid>
      </div>
    </form>
  )
}
export default AddressForm