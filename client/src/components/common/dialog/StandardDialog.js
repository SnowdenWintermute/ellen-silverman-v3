import React from 'react'
import { Dialog } from '@material-ui/core'

const StandardDialog = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </Dialog>
  )
}
export default StandardDialog