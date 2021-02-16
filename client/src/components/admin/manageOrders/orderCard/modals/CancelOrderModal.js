import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import StandardModal from '../../../../common/modal/StandardModal'
import PrimaryButton from '../../../../common/button/PrimaryButton'

const CancelOrderModal = ({ open, handleClose, cancelOrder, order }) => {
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Cancel order {order._id}?</Typography>
        </Grid>
        <Grid item container justify={'space-between'} xs={12}>
          <PrimaryButton
            title="DO NOT CANCEL"
            onClick={handleClose}
            outlined
          />
          <PrimaryButton
            title="CONFIRM CANCEL ORDER"
            onClick={() => cancelOrder(order._id)}
          />
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default CancelOrderModal