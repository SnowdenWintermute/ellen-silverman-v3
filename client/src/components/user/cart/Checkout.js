import {
  TextField,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart, lookupNewAddress, getUserAddresses, confirmNewAddress, selectShippingAddress, removeAddress } from "../../../apiCalls/user";
import BasicPaper from "../../common/paper/BasicPaper";
import AddressForm from "../../forms/AddressForm";
import { toast } from "react-toastify";
import { updateCart } from "../../../store/actions/cart-actions"
import ClearCartModal from './ClearCartModal'
import ConfirmAddressModal from "./ConfirmAddressModal";
import ConfirmedAddressCardList from './ConfirmedAddressCardList'

const useStyles = makeStyles({
  cancelButton: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      filter: "brightness(85%)",
    },
  },
  outlinedRedButton: {
    border: "1px solid red",
    color: "red",
    "&:hover": {
      filter: "brightness(85%)",
    },
    marginBottom: 10
  },
  input: {
    width: "100%",
    maxWidth: 300,
    marginBottom: "10px",
    marginTop: "10px",
  },
  modalHeader: {
    textAlign: "center",
    marginBottom: 10
  }
});

const Checkout = ({ history }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState({});
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState();
  const [addressValues, setAddressValues] = useState({
    fullName: "",
    firstLine: "",
    secondLine: "",
    country: "United States",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [loadingSavedAddresses, setLoadingSavedAddresses] = useState(true)
  const [addingNewAddress, setAddingNewAddress] = useState(false)
  const [addressFromServerToBeConfirmed, setAddressFromServerToBeConfirmed] = useState({})
  const [confirmedAddresses, setConfirmedAddresses] = useState([])
  const [confirmAddressModalOpen, setConfirmAddressModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [savingShippingAddressToCart, setSavingShippingAddressToCart] = useState(false)
  const classes = useStyles();

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const cartFromDatabase = await getCart(user.token);
        if (!cartFromDatabase.data.userCart) {
          dispatch(updateCart([]))
          history.push('/cart')
        }
        setCart(cartFromDatabase.data.userCart);
      } catch (error) {
        toast.error(error);
      };
    }
    asyncFunc();
  }, [dispatch, user, history]);

  const loadUserAddresses = useCallback(
    () => getUserAddresses(user.token).then(addresses => {
      setConfirmedAddresses(addresses.data)
      console.log(addresses.data)
      if (addresses.data[0] !== null && addresses.data.length) {
        console.log(addresses.data[0]._id)
        setSelectedAddress(addresses.data[0]._id)
      }
      setLoadingSavedAddresses(false)
    }),
    [user],
  )

  useEffect(() => {
    loadUserAddresses()
  }, [loadUserAddresses])

  const handleCancelOrder = async () => {
    try {
      const ok = await clearCart(user.token);
      localStorage.removeItem('cart')
      dispatch(updateCart([]))
      history.push("/artworks")
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const handleAddressFieldChange = (fieldName) => e => {
    const newAddressValues = { ...addressValues }
    newAddressValues[fieldName] = e.target.value
    setAddressValues(newAddressValues)
  };

  const handleSubmitNewAddress = async e => {
    e.preventDefault()
    try {
      const newAddress = await lookupNewAddress(addressValues, user.token)
      setAddressFromServerToBeConfirmed(newAddress.data)
      if (newAddress.data && newAddress.data.city) setConfirmAddressModalOpen(true)
      if (!newAddress.data) toast.error("Error validating address. Please double check all fields.")
      else if (!newAddress.data.city) toast.error("Error validating address. Please double check all fields.")
    } catch (error) {
      console.log(error)
      if (!error.data.city) toast.error("Error validating address. Please double check all fields.")
    }
  }

  const handleConfirmAddress = async e => {
    const newAddresses = await confirmNewAddress(addressFromServerToBeConfirmed._id, user.token)
    setConfirmedAddresses(newAddresses.data)
    setSelectedAddress(newAddresses.data[newAddresses.data.length - 1]._id)
    setConfirmAddressModalOpen(false)
    setAddingNewAddress(false)
  }

  const handleRejectAddress = async e => {
    setConfirmAddressModalOpen(false)
  }

  const handleRemoveAddress = async addressId => {
    const newAddressList = await removeAddress(addressId, user.token)
    setConfirmedAddresses(newAddressList.data)
    if (newAddressList.data[0]) setSelectedAddress(newAddressList.data[0]._id)
    else setSelectedAddress(null)
  }

  const handleClickDeleteAddress = addressId => {
    const newAddressList = confirmedAddresses.map(address => {
      if (address._id === addressId) address.flaggedForRemoval = true
      return address
    })
    setConfirmedAddresses(newAddressList)
  }
  const handleCancelDeleteAddress = addressId => {
    const newAddressList = confirmedAddresses.map(address => {
      if (address._id === addressId) address.flaggedForRemoval = false
      return address
    })
    setConfirmedAddresses(newAddressList)
  }

  const handleSelectAddressChange = (e) => setSelectedAddress(e.target.value)

  const handleSubmitOrder = async () => {
    setSavingShippingAddressToCart(true)
    try {
      await selectShippingAddress(selectedAddress, user.token)
      history.push('/payment')
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
    setSavingShippingAddressToCart(false)
  }

  return (
    <div className="page-frame">
      <BasicPaper>
        {savingShippingAddressToCart ? <CircularProgress /> : cart && (
          <Grid container>
            <Grid container item xs={12} sm={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Address</Typography>
              </Grid>
              <Grid item xs={12}>
                {loadingSavedAddresses ? <CircularProgress /> : (confirmedAddresses.length > 0 && confirmedAddresses[0] !== null && !addingNewAddress) ?
                  <ConfirmedAddressCardList classes={classes} confirmedAddresses={confirmedAddresses} selectedAddress={selectedAddress} handleRemoveAddress={handleRemoveAddress} handleCancelDeleteAddress={handleCancelDeleteAddress} handleSelectAddressChange={handleSelectAddressChange} handleClickDeleteAddress={handleClickDeleteAddress} setAddingNewAddress={setAddingNewAddress} />
                  : <AddressForm
                    values={addressValues}
                    handleChange={handleAddressFieldChange}
                    handleSubmit={handleSubmitNewAddress}
                    confirmedAddresses={confirmedAddresses}
                    setAddingNewAddress={setAddingNewAddress}
                    formFieldErrors={{}}
                  />}
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={4}>
              <Grid item xs={12}>
                <Typography variant="h5">Order Summary</Typography>
                <Table style={{ marginBottom: 10 }} size="small">
                  <TableBody>
                    {cart.paintings &&
                      cart.paintings.map((item) => (
                        <TableRow key={item.painting.title}>
                          <TableCell>{item.painting.title}</TableCell>
                          <TableCell>${item.painting.price}</TableCell>
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell>
                        <strong>Total:</strong>
                      </TableCell>
                      <TableCell>
                        <strong>${cart.cartTotal}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Grid item container justify="space-between">
                  {user ? (
                    <>
                      <Button
                        onClick={() => setCancelModalOpen(true)}
                        variant="contained"
                        className={classes.cancelButton}
                      >
                        CANCEL ORDER
                      </Button>
                      <Button
                        onClick={handleSubmitOrder}
                        disabled={!selectedAddress}
                        variant="contained"
                        color="primary"
                      >
                        SUBMIT ORDER
                      </Button>
                    </>
                  ) : (
                      <Button variant="outlined" color="primary">
                        Log in to check out
                      </Button>
                    )}
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Apply Discount Code</Typography>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    label="Code"
                    variant="filled"
                    width="75px"
                    onChange={(e) => setDiscountCode(e.target.value)}
                    value={discountCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary">
                    APPLY
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </BasicPaper>
      <ClearCartModal classes={classes} open={cancelModalOpen} handleClose={() => setCancelModalOpen(false)} handleCancelOrder={handleCancelOrder} history={history} />
      <ConfirmAddressModal classes={classes} addressToConfirm={addressFromServerToBeConfirmed} open={confirmAddressModalOpen} handleClose={() => setConfirmAddressModalOpen(false)} handleConfirmAddress={handleConfirmAddress} handleRejectAddress={handleRejectAddress} />
    </div>
  );
};
export default Checkout;
