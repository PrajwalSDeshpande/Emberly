import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if order exists in DB
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order ID not found" })
    }

    // Fetch secret of recipient creator
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    // Verify cryptographic signature
    let isValid = validatePaymentVerification(
        { "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },
        body.razorpay_signature,
        secret
    )

    if (isValid) {
        // Mark payment as done
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        )
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" })
    }
}