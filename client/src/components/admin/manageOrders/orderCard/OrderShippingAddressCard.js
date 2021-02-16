import React from 'react'
import { Typography } from '@material-ui/core'
import OrderTrackingInfo from './OrderTrackingInfo'

const OrderShippingAddressCard = ({ order, address, isAdmin }) => {
  if (!address) return <div></div>
  return (
    <ul className="order-shipping-address-card">
      <li>
        <Typography variant="body1">
          <strong>
            Shipping Information
        </strong>
        </Typography>
      </li>
      {address.fullName && <li>
        <Typography variant="body1">
          {address.fullName}
        </Typography>
      </li>}
      {address.firstLine && <li>
        <Typography variant="body1">
          {address.firstLine}
        </Typography>
      </li>}
      {address.secondLine && <li>
        <Typography variant="body1">
          {address.secondLine}
        </Typography>
      </li>}
      {address.deliveryLastLine && <li>
        <Typography variant="body1">
          {address.deliveryLastLine}
        </Typography>
      </li>}
      <OrderTrackingInfo order={order} isAdmin={isAdmin} />
    </ul>
  )
}
export default OrderShippingAddressCard