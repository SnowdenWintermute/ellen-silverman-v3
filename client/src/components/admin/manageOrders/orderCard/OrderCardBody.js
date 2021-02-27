import React from 'react'
import { Typography, Grid, makeStyles, } from "@material-ui/core"
import PrimaryButton from '../../../common/button/PrimaryButton'
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'
import OrderPaintingCard from './OrderPaintingCard'
import OrderShippingAddressCard from './OrderShippingAddressCard'
import OrderStatusElement from './OrderStatusElement'

const useStyles = makeStyles((theme) => ({
  orderCardBody: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column-reverse"
    }
  },
  statusElement: {
    textAlign: "right",
    [theme.breakpoints.down('xs')]: {
      textAlign: "left"
    }
  },
  smallScreenFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))

const OrderCardBody = ({
  isAdmin,
  loadingOrders,
  orderState,
  orderStatus,
  onOrderStatusChange,
  setRequestReturnModalOpen,
  setCancelOrderModalOpen,
}) => {
  const classes = useStyles()

  return (
    <div className="order-card-body">
      <Grid container className={classes.orderCardBody} spacing={2}>
        <Grid item sm={7} xs={12} className={classes.paintingCardHolder}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Works Purchased:</strong></Typography>
          </Grid>
          <Grid item xs={12}>
            {orderState.paintings && orderState.paintings.length > 0 && orderState.paintings.map((painting) =>
              painting.painting && painting.painting.thumbnail ?
                <OrderPaintingCard key={painting.painting.title} paintingOrderObject={painting} /> :
                loadingOrders ?
                  <ProgressIndicator /> :
                  "Painting not in Database"
            )}
          </Grid>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Grid item xs={12} className={classes.statusElement}>
            <OrderStatusElement
              isAdmin={isAdmin}
              onOrderStatusChange={onOrderStatusChange}
              orderStatus={orderStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <OrderShippingAddressCard
              order={orderState}
              address={orderState.shippingAddress}
              isAdmin={isAdmin}
            />
            <br />
            {(!isAdmin &&
              (orderState.status === "completed" ||
                orderState.status === "return requested" ||
                orderState.paintings.map(painting => painting.returnRequested).length !== orderState.paintings.length)) &&
              <PrimaryButton
                title="Request Return"
                customClasses={classes.smallScreenFullWidth}
                onClick={() => setRequestReturnModalOpen(true)}
                outlined
              />}
            {(!isAdmin && orderState.status === "processing") &&
              <PrimaryButton
                title="Cancel Order"
                customClasses={classes.smallScreenFullWidth}
                onClick={() => setCancelOrderModalOpen(true)}
                outlined
              />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default OrderCardBody