import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'

const CancelOrderModal = ({ open, handleClose, cancelOrder, order }) => {
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Cancel order {order._id}?</Typography>
        </Grid>
        <Grid item container justify={'space-between'} xs={12}>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            DO NOT CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={() => cancelOrder(order._id)}>
            CONFIRM CANCEL ORDER
          </Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default CancelOrderModal