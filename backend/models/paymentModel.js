import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    cardNumber: { type: String },
    nameOnCard: { type: String },
    expiry: { type: String },
    cvv: { type: String },
    totalAmount: { type: Number, required: true },
    selectedItems: [
      {
        _id: false,
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
