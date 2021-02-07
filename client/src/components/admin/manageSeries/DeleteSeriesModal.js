import React from 'react'
import { Typography } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'
import RedButton from '../../common/button/RedButton'

const DeleteSeriesModal = ({ confirmDeleteModalOpen, setConfirmDeleteModalOpen, seriesToBeDeleted, deleteSeries }) => {
  return (
    <StandardModal open={confirmDeleteModalOpen} handleClose={() => { setConfirmDeleteModalOpen(false) }}>
      <Typography variant="h4">
        DANGER!
      </Typography>
      <Typography variant="body1">
        Deleting a series <strong>will also delete all paintings in that series</strong>. This action can not be undone.
      </Typography>
      <Typography variant="body1">
        Really delete {seriesToBeDeleted && seriesToBeDeleted.name}?
      </Typography>
      <RedButton fullWidth title="CONFIRM DELETE" onClick={() => deleteSeries(seriesToBeDeleted.name)} />
    </StandardModal>
  )
}
export default DeleteSeriesModal