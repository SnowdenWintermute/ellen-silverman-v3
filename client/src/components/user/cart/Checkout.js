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
import { useSelector } from "react-redux";
import { getCart, clearCart } from "../../../apiCalls/user";
import BasicPaper from "../../common/paper/BasicPaper";
import AddressForm from "../../forms/AddressForm";
import { toast } from "react-toastify";

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
});

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState({});
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
        console.log(cartFromDatabase);
        setCart(cartFromDatabase.data.userCart);
      } catch (error) {
        toast.error(error);
      }
    };
    asyncFunc();
  }, []);

  const handleCancelOrder = async () => {
    try {
      const ok = await clearCart(user.token);
      console.log(ok);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddressFieldChange = (e) => {};

  return (
    <div className="page-frame">
      <BasicPaper>
        {cart ? (
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
                        onClick={handleCancelOrder}
                        variant="contained"
                        className={classes.cancelButton}
                      >
                        CANCEL ORDER
                      </Button>
                      <Button
                        onClick={() => {}}
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
        ) : (
          "Cart is empty"
        )}
      </BasicPaper>
    </div>
  );
};
export default Checkout;
