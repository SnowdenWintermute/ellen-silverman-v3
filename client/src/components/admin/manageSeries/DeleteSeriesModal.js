import React from 'react'
import { Button, Typography } from '@material-ui/core'
import StandardModal from '../../common/modal/StandardModal'
import classnames from 'classnames'

const DeleteSeriesModal = ({ confirmDeleteModalOpen, setConfirmDeleteModalOpen, seriesToBeDeleted, classes, deleteSeries }) => {
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
      <Button variant="contained" className={classnames(classes.deleteButton, classes.fullWidth)} onClick={() => deleteSeries(seriesToBeDeleted.name)}>CONFIRM DELETE</Button>
    </StandardModal>
  )
}
export default DeleteSeriesModal