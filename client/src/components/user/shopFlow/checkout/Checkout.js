import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItems } from "../../../../store/actions/cart-actions"
import { Grid, Typography, } from "@material-ui/core";
import { toast } from "react-toastify";
import { getCart } from "../../../../apiCalls/user";
import BasicPaper from "../../../common/paper/BasicPaper";
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'
import FinalOrderSummary from "./FinalOrderSummary";
import AddressManager from './addressManager/AddressManager'
// import DiscountCode from "./DiscountCode";

const Checkout = ({ history }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState({});
  const [savingShippingAddressToCart, setSavingShippingAddressToCart] = useState(false)

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const cartFromDatabase = await getCart(user.token);
        if (!cartFromDatabase.data.userCart) {
          dispatch(updateCartItems([]))
          history.push('/cart')
        }
        setCart(cartFromDatabase.data.userCart);
      } catch (error) {
        console.log(error)
        toast.error(error);
      };
    }
    asyncFunc();
  }, [dispatch, user, history]);

  return (
    <div className="page-frame">
      <BasicPaper>
        {savingShippingAddressToCart ? <ProgressIndicator /> : cart && (
          <Grid container>
            <Grid container item xs={12} sm={8}>
              <Grid item xs={12}>
                <Typography variant="h5">Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <AddressManager />
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={4}>
              <FinalOrderSummary
                cart={cart}
                user={user}
                setSavingShippingAddressToCart={setSavingShippingAddressToCart}
                history={history}
              />
            </Grid>
            <Grid container item xs={12} sm={8}>
              {/* <DiscountCode /> */}
            </Grid>
          </Grid>
        )}
      </BasicPaper>

    </div>
  );
};
export default Checkout;
