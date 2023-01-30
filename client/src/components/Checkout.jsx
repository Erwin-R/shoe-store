/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useEffect, useState } from "react";
import { 
  PaymentElement, 
  LinkAuthenticationElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import '../App.css';

const products = [
  {
    id: 1,
    name: 'High Wall Tote',
    href: '#',
    price: '$210.00',
    color: 'White and black',
    size: '15L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
  },
  // More products...
]

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = { layout: 'tabs'};

  useEffect(() => {
    if(!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if(!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        switch (paymentIntent.status){
          case "succeeded" :
            setMessage("Payment succeeded!");
            break;
          case "processing" :
            setMessage("Payment processing!");
            break;
          case "requires_payment_method" :
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
              setMessage("Something went wrong.");
              break;
        }
      });
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements){
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: "http://localhost:3000/summary",
        receipt_email: email
      }
    });
    console.log(email)
    
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="fixed top-0 right-0 hidden h-full w-1/2 bg-dark-blue lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-dark-blue py-12 text-white md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <dl>
              <dt className="text-sm font-medium">Amount due</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-white">$232.00</dd>
            </dl>

            <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
              {products.map((product) => (
                <li key={product.id} className="flex items-start space-x-4 py-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{product.name}</h3>
                    <p>{product.color}</p>
                    <p>{product.size}</p>
                  </div>
                  <p className="flex-none text-base font-medium text-white">{product.price}</p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>$570.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd>$25.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Taxes</dt>
                <dd>$47.60</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$642.60</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <form onSubmit={onSubmitHandler}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
              <div>
                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                  Contact information
                </h3>
                <LinkAuthenticationElement
                  id="link-authentication-element"
                  onChange={(e) => setEmail(e.value.email)}
                  className="mt-6"
                />
                <div className="mt-6">
                  <PaymentElement id="payment-element" options={paymentElementOptions}/>
                  {/* <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label> */}
                  {/* <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div> */}
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Payment details</h3>

                <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div> */}

<div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-md text-md text-gray-700 font-normal">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-md text-md text-gray-700 font-normal">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-md text-md text-gray-700 font-normal">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="region"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-md text-md text-gray-700 font-normal">
                      ZIP
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Billing information</h3>

                <div className="mt-6 flex items-center">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-dark-blue focus:ring-green"
                  />
                  <div className="ml-2">
                    <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                      Same as shipping information
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  id="submit"
                  type="submit"
                  className="rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-gray-50"
                  disabled={isLoading || !stripe || !elements}
                >
                  <span id="button-text">
                    {isLoading ? <div className=" spinner" id=" spinner"></div> : "Pay now"}
                  </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Checkout;
