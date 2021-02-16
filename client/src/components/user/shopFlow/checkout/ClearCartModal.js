import React from 'react'
import StandardModal from '../../../common/modal/StandardModal'
import { Grid, Typography, Button, makeStyles } from '@material-ui/core'
import RedButton from '../../../common/button/RedButton'

const useStyles = makeStyles(() => ({
  modalHeader: {
    marginBottom: 10,
  },
}));

const ClearCartModal = ({ open, handleClose, handleCancelOrder, history }) => {
  const classes = useStyles()
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.modalHeader}>
            Confirm empty cart and cancel order?
        </Typography>
        </Grid>
        <Grid item xs={6}>
          <RedButton onClick={handleCancelOrder} title="CONFIRM CANCEL" />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => history.push("/cart")} variant="outlined" color="primary">EDIT CART</Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default ClearCartModal