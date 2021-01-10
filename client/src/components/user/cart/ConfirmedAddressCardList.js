import React from 'react'
import {
  Grid,
  Typography,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
  Icon,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const ConfirmedAddressCardList = ({ classes, confirmedAddresses, selectedAddress, handleRemoveAddress, handleSelectAddressChange, handleClickDeleteAddress, setAddingNewAddress }) =>
  <FormControl component="fieldset">
    <FormLabel component="legend">Select from saved addresses</FormLabel>
    <br />
    <RadioGroup row aria-label="selected address" name="selected address" value={selectedAddress} onChange={handleSelectAddressChange}>
      <Grid container spacing={1} style={{ marginBottom: 10, paddingRight: 10 }}>
        {confirmedAddresses[0] !== null && confirmedAddresses.length && confirmedAddresses.map(address =>
          <Grid item key={address._id}>
            <Card style={{ padding: 10, border: "1px solid", width: "210px" }}>
              {address.flaggedForRemoval ?
                (<>
                  <Typography variant="body2">Really delete this address?</Typography>
                  <Button onClick={() => handleRemoveAddress(address._id)} variant="outlined" className={classes.outlinedRedButton}>CONFIRM</Button>
                </>)
                : (
                  <>
                    <ul style={{ listStyle: "none" }}>
                      <li><strong>{address.fullName}</strong></li>
                      <li>{address.firstLine}</li>
                      {address.secondLine && <li>{address.secondLine}</li>}
                      <li>{address.deliveryLastLine}</li>
                      <li>{address.country}</li>
                      <li>℡ {address.phone}</li>
                    </ul>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <FormControlLabel value={address._id} control={<Radio color="primary" />} label="Selected" />
                      <IconButton onClick={() => handleClickDeleteAddress(address._id)}>
                        <Icon>
                          <DeleteForever />
                        </Icon>
                      </IconButton>
                    </div>
                  </>)}
            </Card>
          </Grid>
        )}
      </Grid>
    </RadioGroup>
    <Button onClick={() => setAddingNewAddress(true)} variant="outlined" color="primary">ADD NEW ADDRESS</Button>
  </FormControl>
export default ConfirmedAddressCardList