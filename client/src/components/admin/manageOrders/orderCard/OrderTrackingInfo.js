import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button, Icon, TextField, makeStyles } from '@material-ui/core'
import { toast } from 'react-toastify'
import { updateOrderTracking } from '../../../../apiCalls/admin'
import MaterialLink from '@material-ui/core/Link'
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
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
  const user = useSelector(state => state.user)
  const [editingTracking, setEditingTracking] = useState(false)
  const [newTrackingLink, setNewTrackingLink] = useState("")

  useEffect(() => {
    if (!(order && order.tracking)) return
    if (order.tracking) setNewTrackingLink(order.tracking)
  }, [setNewTrackingLink, order])

  const handleUpdateTracking = async (e) => {
    e.preventDefault()
    try {
      const newOrder = await updateOrderTracking(order._id, newTrackingLink, user.token)
      order.tracking = newOrder.tracking
      toast.success("Order tracking link updated")
      setEditingTracking(false)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  const adminNewTracking = () =>
    <li>
      <form onSubmit={handleUpdateTracking}>
        <TextField variant="outlined" disabled={!editingTracking} value={newTrackingLink} onChange={e => setNewTrackingLink(e.target.value)} placeholder="Enter tracking link" />
        {editingTracking ?
          <Button variant="outlined" className={classes.button} onClick={handleUpdateTracking}>
            <Icon>
              <SaveIcon />
            </Icon>
          </Button> :
          <Button variant="outlined" className={classes.button} onClick={() => setEditingTracking(true)}>
            <Icon>
              <EditIcon />
            </Icon>
          </Button>}
      </form>
    </li>

  const userViewTracking = () =>
    <li>
      <span>
        <Typography variant="body1">
          Tracking:{" "}
        </Typography>
      </span>
      <span>
        <MaterialLink variant="body1" target="blank" href={order.tracking} rel="noopener">
          {order.tracking}
        </MaterialLink>
      </span>
    </li>

  const userNoTrackingYet = () =>
    <li>
      <Typography variant="body1">
        No tracking data available yet
    </Typography>
    </li>

  if (isAdmin) {
    if (typeof order.tracking === 'undefined') return adminNewTracking()
    else return adminNewTracking()
  }
  else if (order.tracking) return userViewTracking()
  return userNoTrackingYet()
}
export default OrderTrackingInfo