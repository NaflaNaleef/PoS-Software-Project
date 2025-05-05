import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [swipeData, setSwipeData] = useState("");
  const [cardInputMode, setCardInputMode] = useState("manual"); // 'manual' | 'swipe'

  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === "Enter") {
        // Try to parse swipe data
        if (swipeData.startsWith("%B") || swipeData.startsWith(";")) {
          handleCardSwipe(swipeData);
        }
        setSwipeData("");
      } else {
        setSwipeData((prev) => prev + e.key);
      }
    };

    if (cardInputMode === "swipe") {
      window.addEventListener("keypress", handleKeypress);
    }

    return () => {
      window.removeEventListener("keypress", handleKeypress);
    };
  }, [swipeData, cardInputMode]);

  const handleCardSwipe = async (data) => {
    const regex = /%B(\d{16})\^.*\^(\d{2})(\d{2}).*\?/;
    const match = data.match(regex);
    if (!match) {
      setError("Invalid card swipe");
      return;
    }

    const [_, number, expYear, expMonth] = match;
    const exp_year = "20" + expYear;
    const exp_month = expMonth;

    try {
      setLoading(true);
      const { token, error: stripeError } = await stripe.createToken({
        card: {
          number,
          exp_month,
          exp_year,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      const res = await axios.post("/api/payments/charge", {
        amount,
        token: token.id,
      });

      if (res.data.success) {
        setSuccess(true);
        onSuccess();
      } else {
        setError("Payment failed");
      }
    } catch (err) {
      setError("Swipe payment error");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe not loaded");
      setLoading(false);
      return;
    }

    try {
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      const res = await axios.post("/api/payments/charge", {
        amount,
        paymentMethodId: paymentMethod.id,
      });

      if (res.data.success) {
        setSuccess(true);
        onSuccess();
      } else {
        setError("Payment failed");
      }
    } catch (err) {
      setError("");
    }

    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setCardInputMode("manual")} disabled={cardInputMode === "manual"}>
          Manual Entry
        </button>
        <button onClick={() => setCardInputMode("swipe")} disabled={cardInputMode === "swipe"}>
          Swipe Card
        </button>
      </div>

      {cardInputMode === "manual" && (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : `Pay Rs. ${amount}`}
          </button>
        </form>
      )}

      {cardInputMode === "swipe" && <p>Swipe your card now...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Payment successful!</p>}
    </div>
  );
};

export default PaymentForm;
