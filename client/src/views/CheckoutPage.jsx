import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext } from "react";
import ShoeContext from "../context/ShoeContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MTv1QLALNa8Zs0RROiUyXjVDu2C55KFKvLBU0RZ1fIjeNBOsuChxDCZCArrdR5NHmIkFyPUOyjzi6cPHMgYlnfC00gLKXayt2");

const CheckoutPage = (props) => {
  const [clientSecret, setClientSecret] = useState('');
  const products = useContext(ShoeContext);

  useEffect(() => {
    axios.post('http://localhost:8000/create-payment-intent', {
      products
    })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        // console.log(res.data.clientSecret);
      })
      .catch(err => console.error(err));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance
  }

  return(
    <>
      <NavBar/>
      {clientSecret && 
        <Elements options={options} stripe={stripePromise}>
          <Checkout/>
        </Elements>
      }
    </>
  );
}

export default CheckoutPage;