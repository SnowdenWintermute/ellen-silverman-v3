import { Typography } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'

const PayPalWidget = ({ cart }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "MCGUFFSILVERMAN ARTWORK",
                amount: {
                  currency_code: 'USD',
                  value: cart.cartTotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [cart.cartTotal]);



  return (
    <div>
      {error && <Typography variant="body1">Error: {error.message}</Typography>}
      {paidFor && <p className={"result-message"}>Payment successful. <Link className="standard-link underlined" to="user/history">See it in your purchase history</Link></p>}
      <div style={{ margin: "0 auto", textAlign: "center" }} ref={paypalRef} />
    </div>
  );
}

export default PayPalWidget
