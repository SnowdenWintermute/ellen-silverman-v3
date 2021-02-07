import React from 'react'
import { TextField, Typography, makeStyles } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'
import PrimaryButton from '../../common/button/PrimaryButton'

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: "10px"
  },
}))

const EditSeriesModal = ({
  editSeriesModalOpen,
  setEditSeriesModalOpen,
  confirmEditSeries,
  seriesToBeEdited,
  handleEditSeriesInputChange
}) => {
  const classes = useStyles()
  return (
    <StandardModal open={editSeriesModalOpen} handleClose={() => { setEditSeriesModalOpen(false) }}>
      <form onSubmit={(e) => confirmEditSeries(e, seriesToBeEdited._id, seriesToBeEdited.newName)}>
        <Typography variant="h6">
          Edit Series: {seriesToBeEdited && seriesToBeEdited.currentName}
        </Typography>
        <TextField
          autoFocus
          className={classes.input}
          label="Title"
          variant="filled"
          onChange={handleEditSeriesInputChange}
          value={seriesToBeEdited && seriesToBeEdited.newName}
        />
        <PrimaryButton
          title="CONFIRM EDIT"
          isSubmit
          fullWidth
        />
      </form>
    </StandardModal>
  )
}
export default EditSeriesModal