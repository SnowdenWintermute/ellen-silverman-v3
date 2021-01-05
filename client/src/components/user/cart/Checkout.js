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
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../../apiCalls/user";
import BasicPaper from "../../common/paper/BasicPaper";
import AddressForm from "../../forms/AddressForm";
import { toast } from "react-toastify";
import { updateCart } from "../../../store/actions/cart-actions"
import StandardModal from '../../common/modal/StandardModal'

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
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const classes = useStyles();

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const cartFromDatabase = await getCart(user.token);
        console.log("ey")
        console.log(cartFromDatabase)
        if (!cartFromDatabase.data.userCart) {
          console.log("pushed history away from checkout page")
          dispatch(updateCart([]))
          history.push('/cart')
        }
        setCart(cartFromDatabase.data.userCart);
      } catch (error) {
        toast.error(error);
      }
    };
    asyncFunc();
  }, [dispatch, user, history]);

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

  const handleAddressFieldChange = (e) => { };

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
                <AddressForm
                  values={addressValues}
                  handleChange={handleAddressFieldChange}
                  formFieldErrors={{}}
                />
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
      <StandardModal open={cancelModalOpen} handleClose={() => setCancelModalOpen(false)}>
        <Grid container align="center">
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.modalHeader}>
              Confirm empty cart and cancel order?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleCancelOrder}
              variant="contained"
              className={classes.cancelButton}>CONFIRM CANCEL</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={() => history.push("/cart")} variant="outlined" color="primary">EDIT CART</Button>
          </Grid>
        </Grid>
      </StandardModal>
    </div>
  );
};
export default Checkout;
