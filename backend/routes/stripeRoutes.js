// backend/routes/stripeRoutes.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "lkr",
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
      unit_amount: item.discountPrice * 100, // LKR to cents
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
