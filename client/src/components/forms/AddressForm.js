import React, { useEffect } from 'react'
import classnames from 'classnames'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import countryList from '../../consts/countryList'
import PrimaryButton from '../common/button/PrimaryButton'

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    maxWidth: 500,
    marginBottom: "10px"
  },
  select: {
    textAlign: "left"
  },
  addAddressButton: {
    marginRight: 10,
  },
  bottomButton: {
    [theme.breakpoints.down("xs")]: {
      width: '100%',
      margin: 0,
      marginBottom: 10
    }
  }
}));

const AddressForm = ({ addressLoading, handleSubmit, handleChange, values, confirmedAddresses, setAddingNewAddress, formFieldErrors }) => {
  const classes = useStyles()
  const {
    fullName,
    firstLine,
    secondLine,
    country,
    city,
    state,
    zip,
    phone
  } = values;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginRight: 10, padding: "10px 10px 10px 0px" }}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextField className={classes.input}
              label="Full Name"
              variant="filled"
              width="75px"
              onChange={handleChange('fullName')}
              value={fullName}
              error={formFieldErrors.fullName && true}
              helperText={formFieldErrors.fullName ? formFieldErrors.fullName.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Street"
              variant="filled"
              onChange={handleChange('firstLine')}
              value={firstLine}
              error={formFieldErrors.firstLine && true}
              helperText={formFieldErrors.firstLine ? formFieldErrors.firstLine.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Appartment / POB / Etc"
              variant="filled"
              onChange={handleChange('secondLine')}
              value={secondLine}
              error={formFieldErrors.secondLine && true}
              helperText={formFieldErrors.secondLine ? formFieldErrors.secondLine.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.input} variant="filled" error={formFieldErrors.country && true}>
              <InputLabel id="select-country">Country</InputLabel>
              {Object.keys(countryList).length > 0 &&
                <Select className={classes.select}
                  labelId="select-country"
                  onChange={handleChange('country')}
                  value={country}>
                  {countryList.length &&
                    countryList.map((country, i) => (
                      <MenuItem key={i} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>}
              {formFieldErrors.country && <FormHelperText>{formFieldErrors.country.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="City" variant="filled"
              onChange={handleChange('city')}
              value={city}
              error={formFieldErrors.city && true}
              helperText={formFieldErrors.city ? formFieldErrors.city.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="State"
              variant="filled"
              onChange={handleChange('state')}
              value={state}
              error={formFieldErrors.state && true}
              helperText={formFieldErrors.state ? formFieldErrors.state.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Zip Code"
              variant="filled"
              onChange={handleChange('zip')}
              value={zip}
              error={formFieldErrors.zip && true}
              helperText={formFieldErrors.zip ? formFieldErrors.state.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Phone Number"
              variant="filled"
              onChange={handleChange('phone')}
              value={phone}
              error={formFieldErrors.phone && true}
              helperText={formFieldErrors.phone ? formFieldErrors.state.message : ""}
            />
          </Grid>
          <Grid item container xs={12}>
            <PrimaryButton
              title="ADD ADDRESS"
              customClasses={classnames(classes.addAddressButton, classes.bottomButton)}
              disabled={addressLoading}
              isSubmit
            />
            {confirmedAddresses.length > 0 &&
              <PrimaryButton
                title="USE A SAVED ADDRESS"
                customClasses={classes.bottomButton}
                onClick={() => setAddingNewAddress(false)}
                outlined
              />}
          </Grid>
        </Grid>
      </div>
    </form>
  )
}
export default AddressForm