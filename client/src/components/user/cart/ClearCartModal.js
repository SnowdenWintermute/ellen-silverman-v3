import React from 'react'
import StandardModal from '../../common/modal/StandardModal'
import { Grid, Typography, Button } from '@material-ui/core'

const ClearCartModal = ({ open, handleClose, handleCancelOrder, history, classes }) => {
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.modalHeader}>
            Confirm empty cart and cancel order?
        </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleCancelOrder}
            variant="contained"
            className={classes.cancelButton}>CONFIRM CANCEL</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => history.push("/cart")} variant="outlined" color="primary">EDIT CART</Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default ClearCartModal