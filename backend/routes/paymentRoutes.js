import express from "express";
import Payment from "../models/paymentModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { cardNumber, nameOnCard, expiry, cvv, totalAmount, selectedItems } = req.body;

    const newPayment = new Payment({
      cardNumber,
      nameOnCard,
      expiry,
      cvv,
      totalAmount,
      selectedItems,
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment recorded successfully." });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Failed to record payment." });
  }
});

export default router;
