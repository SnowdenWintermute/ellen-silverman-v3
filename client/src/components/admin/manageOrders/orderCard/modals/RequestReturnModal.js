import React, { useState, useEffect, Fragment } from 'react'
import { Grid, TextField, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core'
import StandardModal from '../../../../common/modal/StandardModal'
import PrimaryButton from '../../../../common/button/PrimaryButton'
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10
    }
  },
  smallScreenFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))

const RequestReturnModal = ({ open, handleClose, handleReturnRequest, order }) => {
  const classes = useStyles()
  const [selectedPaintings, setSelectedPaintings] = useState({})
  const [returnNotes, setReturnNotes] = useState({})

  useEffect(() => {
    const newSelectedPaintings = {}
    const newReturnNotes = {}
    for (const painting in order.paintings) {
      if (!order.paintings[painting].painting) continue
      newSelectedPaintings[order.paintings[painting].painting.title] = false
      newReturnNotes[order.paintings[painting].painting.title] = ""
    }
    if (Object.keys(newSelectedPaintings).length === 1) Object.keys(newSelectedPaintings).forEach(key => newSelectedPaintings[key] = true)
    setSelectedPaintings(newSelectedPaintings)
    setReturnNotes(newReturnNotes)
  }, [order, setSelectedPaintings])

  const handleChange = e => {
    const newSelectedPaintings = { ...selectedPaintings }
    newSelectedPaintings[e.target.name] = !selectedPaintings[e.target.name]
    setSelectedPaintings(newSelectedPaintings)
  }

  const checkIfAnyPaintingIsSelected = () => {
    let result = false
    Object.keys(selectedPaintings).forEach(key => {
      if (selectedPaintings[key]) result = true
    })
    return result
  }

  return (
    <StandardModal open={open} handleClose={handleClose}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Start a Return</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.smallScreenFullWidth}>
            <FormLabel component="legend">Choose an item to return</FormLabel>
            <FormGroup>
              {
                order.paintings.map(painting => painting.painting &&
                  <Fragment key={painting.painting.title}>
                    <FormControlLabel

                      control={<Checkbox color="primary" checked={selectedPaintings[painting.painting.title]} disabled={painting.returnRequested} onChange={handleChange} name={painting.painting.title} />}
                      label={painting.painting.title}
                    />
                    {
                      selectedPaintings[painting.painting.title] && <TextField variant="filled"
                        fullWidth
                        multiline
                        label="Reason for return"
                        value={returnNotes[painting.painting.title]}
                        onChange={(e) => setReturnNotes({ ...returnNotes, [painting.painting.title]: e.target.value })} />
                    }
                  </Fragment>
                )
              }
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item container justify={'space-between'} xs={12}>
          <PrimaryButton
            title="CANCEL"
            customClasses={classnames(classes.smallScreenFullWidth, classes.cancelButton)}
            onClick={handleClose}
            outlined
          />
          <PrimaryButton
            title="SEND REQUEST"
            customClasses={classes.smallScreenFullWidth}
            onClick={() => handleReturnRequest({ orderId: order._id, selectedPaintings, returnNotes })}
            disabled={!checkIfAnyPaintingIsSelected()}
          />
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default RequestReturnModal