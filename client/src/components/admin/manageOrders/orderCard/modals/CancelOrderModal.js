import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import StandardModal from '../../../../common/modal/StandardModal'
import PrimaryButton from '../../../../common/button/PrimaryButton'

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  },
  doNotCancelButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 10
    }
  },
  confirmCancelButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  }
}))

const CancelOrderModal = ({ open, handleClose, cancelOrder, order }) => {
  const classes = useStyles()
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.header}>Cancel order {order._id}?</Typography>
        </Grid>
        <Grid item container justify={'space-between'} xs={12}>
          <PrimaryButton
            title="DO NOT CANCEL"
            customClasses={classes.doNotCancelButton}
            onClick={handleClose}
            outlined
          />
          <PrimaryButton
            title="CONFIRM CANCEL ORDER"
            customClasses={classes.confirmCancelButton}
            onClick={() => cancelOrder(order._id)}
          />
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default CancelOrderModal