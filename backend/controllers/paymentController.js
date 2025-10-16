import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Process stripe payment and create a payment intent
 * @route   POST /api/payment/process
 * @access  Private
 */
const processPayment = asyncHandler(async (req, res) => {
    // The 'amount' is expected to be sent from the frontend in the smallest currency unit (e.g., cents)
    const { amount } = req.body;

    // Validate that a positive amount is provided
    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error('A valid amount is required to process payment.');
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd', // This can be made dynamic if you support multiple currencies
        metadata: { integration_check: 'accept_a_payment' },
    });

    // Send the client_secret back to the frontend to confirm the payment
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

export { processPayment };
