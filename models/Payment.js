import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true }, // username of creator receiving payment
    oid: { type: String, required: true },     // Razorpay Order ID
    message: { type: String },
    amount: { type: Number, required: true },  // Amount in INR
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },   // marked true once payment is verified
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);