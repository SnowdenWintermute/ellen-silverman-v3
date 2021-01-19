import React, { useState, useEffect, Fragment } from 'react'
import { Grid, TextField, Typography, Button, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'

const RequestReturnModal = ({ open, handleClose, handleReturnRequest, order }) => {
  const [selectedPaintings, setSelectedPaintings] = useState({})
  const [returnNotes, setReturnNotes] = useState({})
  useEffect(() => {
    const newSelectedPaintings = {}
    const newReturnNotes = {}
    for (const painting in order.paintings) {
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose an item to return</FormLabel>
            <FormGroup>
              {
                order.paintings.map(painting => <Fragment key={painting.painting.title}>
                  <FormControlLabel

                    control={<Checkbox color="primary" checked={selectedPaintings[painting.painting.title]} onChange={handleChange} name={painting.painting.title} />}
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
          <Button variant="outlined" color="primary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button disabled={!checkIfAnyPaintingIsSelected()} variant="contained" color="primary" onClick={() => handleReturnRequest({ orderId: order._id, selectedPaintings, returnNotes })}>
            SEND REQUEST
          </Button>
        </Grid>
      </Grid>
    </StandardModal>
  )
}
export default RequestReturnModal