import React from 'react'
import { Typography } from '@material-ui/core'
import RedButton from '../../common/button/RedButton'
import StandardModal from '../../common/modal/StandardModal'

const DeletePaintingModal = ({ confirmDeletePaintingModalOpen, setConfirmDeletePaintingModalOpen, paintingToBeDeleted, deletePainting }) => {
  return (
    <StandardModal open={confirmDeletePaintingModalOpen} handleClose={() => { setConfirmDeletePaintingModalOpen(false) }}>
      <Typography variant="body1">
        Delete {paintingToBeDeleted && paintingToBeDeleted.title}?
      </Typography>
      <RedButton fullWidth title="CONFIRM DELETE" onClick={() => deletePainting(paintingToBeDeleted)} />
    </StandardModal>
  )
}
export default DeletePaintingModal