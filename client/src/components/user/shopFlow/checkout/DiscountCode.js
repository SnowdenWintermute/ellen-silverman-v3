import React, { useState } from 'react'
import { TextField, Grid, Typography, Button, makeStyles, } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    maxWidth: 300,
    marginBottom: "10px",
    marginTop: "10px",
  },
}));

const DiscountCode = () => {
  const classes = useStyles()
  const [discountCode, setDiscountCode] = useState();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">Apply Discount Code</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            label="Code"
            variant="filled"
            width="75px"
            onChange={(e) => setDiscountCode(e.target.value)}
            value={discountCode}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="primary">
            APPLY
                  </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default DiscountCode