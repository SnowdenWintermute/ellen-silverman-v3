import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'

const ConfirmOrderStatusChangeModal = ({ open, handleClose, order, orderStatus, onCancelStatusChange, onConfirmStatusChange }) => {
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Change status of order {order._id} to {orderStatus.toUpperCase()}?
        </Typography>
        </Grid>
        <Grid item xs={12} container justify="space-between">
          <Button variant="outlined" color="primary" onClick={onCancelStatusChange}>CANCEL</Button>
          <Button variant="contained" color="primary" onClick={onConfirmStatusChange}>CONFIRM</Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default ConfirmOrderStatusChangeModal