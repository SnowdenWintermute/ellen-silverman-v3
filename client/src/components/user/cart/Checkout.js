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
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  CircularProgress
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart, lookupNewAddress, getUserAddresses, confirmNewAddress } from "../../../apiCalls/user";
import BasicPaper from "../../common/paper/BasicPaper";
import AddressForm from "../../forms/AddressForm";
import { toast } from "react-toastify";
import { updateCart } from "../../../store/actions/cart-actions"
import ClearCartModal from './ClearCartModal'
import ConfirmAddressModal from "./ConfirmAddressModal";

const useStyles = makeStyles({
  cancelButton: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      filter: "brightness(85%)",
    },
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
      if (addresses.data.length) {
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
      toast.error(error);
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
    console.log("new addresses: ", newAddresses)
    setConfirmedAddresses(newAddresses.data)
    console.log(newAddresses.data[0]._id)
    setSelectedAddress(newAddresses.data[0]._id)
    setConfirmAddressModalOpen(false)
    setAddingNewAddress(false)
  }

  const handleRejectAddress = async e => {
    setConfirmAddressModalOpen(false)
  }

  const handleSelectAddressChange = (e) => {
    console.log(e)
    setSelectedAddress(e.target.value)
  }

  return (
    <div className="page-frame">
      <BasicPaper>
        {cart && (
          <Grid container>
            <Grid container item xs={12} sm={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Address</Typography>
              </Grid>
              <Grid item xs={12}>
                {loadingSavedAddresses ? <CircularProgress /> : (confirmedAddresses.length > 0 && !addingNewAddress) ?
                  <>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Select from saved addresses</FormLabel>
                      <br />
                      <RadioGroup row aria-label="selected address" name="selected address" value={selectedAddress} onChange={handleSelectAddressChange}>
                        <Grid container spacing={1} style={{ marginBottom: 10, paddingRight: 10 }}>
                          {confirmedAddresses.map(address =>
                            <Grid item key={address._id}>
                              <Card style={{ padding: 10, border: "1px solid", width: "210px" }}>
                                <ul style={{ listStyle: "none" }}>
                                  <li><strong>{address.fullName}</strong></li>
                                  <li>{address.firstLine}</li>
                                  {address.secondLine && <li>{address.secondLine}</li>}
                                  <li>{address.deliveryLastLine}</li>
                                  <li>℡ {address.phone}</li>
                                </ul>
                                <FormControlLabel value={address._id} control={<Radio color="primary" />} label="Selected" />
                              </Card>
                            </Grid>
                          )}
                        </Grid>
                      </RadioGroup>
                      <Button onClick={() => setAddingNewAddress(true)} variant="outlined" color="primary">ADD NEW ADDRESS</Button>
                    </FormControl>
                  </>
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
                        onClick={() => { }}
                        disabled={true}
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
