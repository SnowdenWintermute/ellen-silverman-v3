import React from 'react'
import StandardModal from '../../../../common/modal/StandardModal'
import { Grid, Typography, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  modalHeader: {
    marginBottom: 10,
  },
}));

const ConfirmAddressModal = ({ open, handleClose, addressToConfirm, handleConfirmAddress, handleRejectAddress }) => {
  const classes = useStyles()
  const { fullName, firstLine, secondLine, deliveryLastLine, phone, country } = addressToConfirm
  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.modalHeader}>
            Confirm this shipping address?
        </Typography>
        </Grid>
        <Grid style={{ marginTop: 10, marginBottom: 10 }} item xs={12}>
          <ul style={{ listStyle: "none" }}>
            <li><strong>{fullName}</strong></li>
            <li>{firstLine}</li>
            {secondLine && <li>{secondLine}</li>}
            <li>{deliveryLastLine}</li>
            <li>{country}</li>
            <li>℡ {phone}</li>
          </ul>
        </Grid>
        <Grid item container xs={12} justify={"space-between"}>
          <Button onClick={handleRejectAddress}
            variant="contained"
            className={classes.cancelButton}>EDIT ADDRESS</Button>
          <Button onClick={handleConfirmAddress} variant="contained" color="primary">CONFIRM ADDRESS</Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default ConfirmAddressModal