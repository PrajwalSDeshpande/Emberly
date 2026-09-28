"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

// 1. Initiate Razorpay Order
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    
    // Fetch the recipient's Razorpay credentials
    let user = await User.findOne({ username: to_username })
    if (!user || !user.razorpaysecret) {
        throw new Error("Creator has not configured Razorpay keys yet.")
    }
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount), // amount in paise (1 INR = 100 paise)
        currency: "INR",
    }

    let order = await instance.orders.create(options)

    // Save pending payment record in DB
    await Payment.create({
        oid: order.id,
        amount: amount / 100,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    })

    return order
}

// 2. Fetch User Profile
export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) return null
    return u.toObject({ flattenObjectIds: true })
}

// 3. Fetch Top 10 Payments for Leaderboard
export const fetchpayments = async (username) => {
    await connectDb()

    let p = await Payment.find({
        to_user: username,
        done: true
    })
        .sort({ amount: -1 })
        .limit(10)
        .lean()

    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt?.toISOString(),
        updatedAt: payment.updatedAt?.toISOString(),
    }))
}

// 4. Update Profile & Handle Username Changes
export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If username is changing, ensure new username is not already taken
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Also update old payments linked to this creator
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    } else {
        await User.updateOne({ email: ndata.email }, ndata)
    }
    return { success: true }
}