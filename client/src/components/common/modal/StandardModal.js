import React from 'react'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  modalDiv: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `${10}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${0}%)`,
    [theme.breakpoints.down('sm')]: {
      width: "95%"
    },
  },
  scrolly: {
    overflowY: "scroll"
  }
}));

const StandardModal = ({ children, open, handleClose }) => {
  const classes = useStyles()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.scrolly}
    >
      <div className={classes.modalDiv}>
        {children}
      </div>
    </Modal>
  )
}

export default StandardModal