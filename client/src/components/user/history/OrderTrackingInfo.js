import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Icon, TextField, makeStyles } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  squareElement: {
    borderRadius: 0
  },
  orderSearchInput: {
    width: 300,
  },
  button: {
    height: 56,
  },
}))

const OrderTrackingInfo = ({ order, isAdmin }) => {
  const classes = useStyles()
  const [editingTracking, setEditingTracking] = useState(false)
  const [newTrackingLink, setNewTrackingLink] = useState("")

  useEffect(() => {
    if (!(order && order.tracking)) return
    if (order.tracking.link) setNewTrackingLink(order.tracking.link)
  }, [setNewTrackingLink, order])

  const adminNewTracking = () =>
    <li>
      <TextField variant="outlined" value={newTrackingLink} onChange={e => setNewTrackingLink(e.target.value)} placeholder="Enter tracking link" />
      <Button variant="outlined" className={classes.button}>
        <Icon>
          <SaveIcon />
        </Icon>
      </Button>
    </li>

  const adminEditTracking = () =>
    <li>
      <TextField disabled={!editingTracking} value={newTrackingLink} onChange={e => setNewTrackingLink(e.target.value)} placeholder="Enter tracking link" />
      {
        editingTracking ?
          <Button>
            <Icon>
              <SaveIcon />
            </Icon>
          </Button>
          :
          <Button onClick={() => setEditingTracking(true)}>
            <Icon>
              <EditIcon />
            </Icon>
          </Button>}
    </li>

  const userViewTracking = () =>
    <li>
      <Typography variant="body1">
        <Link to={order.tracking.link}>
          {order.tracking.link}
        </Link>
      </Typography>
    </li>

  const userNoTrackingYet = () =>
    <li>
      <Typography variant="body1">
        No tracking data available yet
    </Typography>
    </li>


  let elementToReturn

  if (isAdmin && (!order.tracking || !order.tracking.link)) elementToReturn = adminNewTracking()
  else if (isAdmin) elementToReturn = adminNewTracking()
  else if (order.tracking.link) elementToReturn = userViewTracking()
  else elementToReturn = userNoTrackingYet()
  return elementToReturn
}
export default OrderTrackingInfo