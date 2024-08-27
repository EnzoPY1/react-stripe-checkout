require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

const stripeCliet = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  const { id, amount, return_url } = req.body;
  try {
    const paymentIntent = await stripeCliet.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true,
      return_url: return_url,
    });

    console.log(paymentIntent);
    res.send({ message: "Pago exitoso" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
