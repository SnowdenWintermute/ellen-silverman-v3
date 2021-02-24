import React from 'react'
import { Grid, Typography, Card, FormControlLabel, Radio, IconButton, Icon, makeStyles } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import PrimaryButton from '../../../../common/button/PrimaryButton'
import RedButton from '../../../../common/button/RedButton'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 10, border: "1px solid", width: "210px", height: "100%",
  },
  marginBottom: {
    marginBottom: 10
  }
}))

const ConfirmedAddressCard = ({ address, handleRemoveAddress, setDeleteFlagOfSpecifiedAddress }) => {
  const classes = useStyles()
  return (
    <Grid item>
      <Card className={classes.card}>
        {address.flaggedForRemoval ?
          (<>
            <Typography variant="body2"><strong>Really delete this address?</strong></Typography>
            <div style={{ display: "flex", flexDirection: "column", height: "80%", justifyContent: "flex-end" }}>
              <RedButton
                title="CONFIRM"
                onClick={() => handleRemoveAddress(address._id)}
                outlined
                customClasses={classes.marginBottom}
              />
              <PrimaryButton
                title="CANCEL"
                onClick={() => setDeleteFlagOfSpecifiedAddress(address._id, false)}
                outlined
              />
            </div>
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
                <IconButton onClick={() => setDeleteFlagOfSpecifiedAddress(address._id, true)}>
                  <Icon>
                    <DeleteForever />
                  </Icon>
                </IconButton>
              </div>
            </>)}
      </Card>
    </Grid>
  )
}
export default ConfirmedAddressCard