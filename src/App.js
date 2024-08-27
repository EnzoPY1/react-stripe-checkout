import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import "bootswatch/dist/pulse/bootstrap.css";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51Ps5BRD6OMRzlAb5cMiuQ118cGO5CTHL0tbtUryXmdtexdNrTMyqTQUkk4sp7dSxPU49vC8CrxLtBWfkSHJGGyD100MMSl33oL"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000,
            return_url: "http://localhost:3000/success",
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-keyboard/pro-keyboard-gallery/uk-pro-gaming-keyboard-gallery-topdown.png?v=1"
        alt="Logitech G Pro Keyboard"
        className="img-fluid"
      />
      <div className="form-group py-3">
        <CardElement className="form-control" />
      </div>

      <button className="btn btn-success" disabled={!stripe} type="submit">
        {loading ? (
          <button className="btn btn" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
