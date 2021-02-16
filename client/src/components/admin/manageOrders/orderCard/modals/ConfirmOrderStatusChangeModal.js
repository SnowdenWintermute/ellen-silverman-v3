import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import StandardModal from '../../../../common/modal/StandardModal'
import PrimaryButton from '../../../../common/button/PrimaryButton'

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
          <PrimaryButton
            title="CANCEL"
            onClick={onCancelStatusChange}
            outlined
          />
          <PrimaryButton
            title="CONFIRM"
            onClick={onConfirmStatusChange}
          />
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default ConfirmOrderStatusChangeModal