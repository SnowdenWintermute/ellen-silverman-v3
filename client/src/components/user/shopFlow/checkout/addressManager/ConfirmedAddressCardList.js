import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, FormControl, FormLabel, RadioGroup, makeStyles } from "@material-ui/core";
import ConfirmedAddressCard from './ConfirmedAddressCard';
import PrimaryButton from '../../../../common/button/PrimaryButton'

const useStyles = makeStyles(() => ({
  addressCardGrid: { marginBottom: 10, paddingRight: 10 },
  card: { padding: 10, border: "1px solid", width: "210px", height: "100%" },
  marginBottom: {
    marginBottom: 10
  }
}))


const ConfirmedAddressCardList = ({
  confirmedAddresses,
  handleRemoveAddress,
  handleSelectAddressChange,
  setDeleteFlagOfSpecifiedAddress,
  setAddingNewAddress }) => {
  const classes = useStyles()
  const selectedAddress = useSelector(state => state.cart.selectedShippingAddress)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (<FormControl component="fieldset">
    <FormLabel component="legend">Select from saved addresses</FormLabel>
    <br />
    <RadioGroup row aria-label="selected address" name="selected address" value={selectedAddress} onChange={handleSelectAddressChange}>
      <Grid container spacing={1} className={classes.addressCardGrid}>
        {confirmedAddresses[0] !== null &&
          confirmedAddresses.length &&
          confirmedAddresses.map((address) =>
            <ConfirmedAddressCard
              key={address._id}
              address={address}
              handleRemoveAddress={handleRemoveAddress}
              setDeleteFlagOfSpecifiedAddress={setDeleteFlagOfSpecifiedAddress}
            />
          ).reverse()}
      </Grid>
    </RadioGroup>
    <PrimaryButton
      title="ADD NEW ADDRESS"
      onClick={() => setAddingNewAddress(true)}
      outlined
      fullWidth
    />
  </FormControl>)
}

export default ConfirmedAddressCardList