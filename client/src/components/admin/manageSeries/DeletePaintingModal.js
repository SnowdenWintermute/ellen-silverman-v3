import React from 'react'
import classnames from 'classnames'
import { Button, Typography } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'

const DeletePaintingModal = ({ confirmDeletePaintingModalOpen, setConfirmDeletePaintingModalOpen, paintingToBeDeleted, classes, deletePainting }) => {
  return (
    <StandardModal open={confirmDeletePaintingModalOpen} handleClose={() => { setConfirmDeletePaintingModalOpen(false) }}>
      <Typography variant="body1">
        Delete {paintingToBeDeleted && paintingToBeDeleted.title}?
      </Typography>
      <Button variant="contained" className={classnames(classes.deleteButton, classes.fullWidth)} onClick={() => deletePainting(paintingToBeDeleted)}>CONFIRM DELETE</Button>
    </StandardModal>
  )
}
export default DeletePaintingModal