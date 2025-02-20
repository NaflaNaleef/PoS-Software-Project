const express = require("express");
const router = express.Router();
const stripe = require("stripe")("your_stripe_secret_key");

router.post("/charge", async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
