import React from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'

const EditSeriesModal = ({ editSeriesModalOpen, setEditSeriesModalOpen, confirmEditSeries, seriesToBeEdited, classes, handleEditSeriesInputChange }) => {
  return (
    <StandardModal open={editSeriesModalOpen} handleClose={() => { setEditSeriesModalOpen(false) }}>
      <form onSubmit={(e) => confirmEditSeries(e, seriesToBeEdited._id, seriesToBeEdited.newName)}>
        <Typography variant="h6">
          Edit Series: {seriesToBeEdited && seriesToBeEdited.currentName}
        </Typography>
        <TextField autoFocus className={classes.input} label="Title" variant="filled" width="75px" onChange={handleEditSeriesInputChange} value={seriesToBeEdited && seriesToBeEdited.newName} />
        <Button variant="contained" color="primary" type="submit">
          CONFIRM EDIT
    </Button>
      </form>
    </StandardModal>
  )
}
export default EditSeriesModal