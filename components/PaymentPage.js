"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SmartImage from '@/components/SmartImage'

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

   useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
        toast('Payment received. Thank you for the support!', {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
            transition: Bounce,
        })

        getData()

        router.push(`/${username}`)
    }
}, [searchParams])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u || {})
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments || [])
    }

    const pay = async (amountInPaise) => {
        if (!currentUser.razorpayid) {
            alert("Creator has not configured their Razorpay ID yet.")
            return
        }

        let order = await initiate(amountInPaise, username, paymentform)
        let orderId = order.id

        var options = {
            "key": currentUser.razorpayid,
            "amount": amountInPaise,
            "currency": "INR",
            "name": "Emberly",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentform.name || "Supporter",
                "email": "supporter@example.com",
                "contact": "9000090000"
            },
            "theme": {
                "color": "#6d48ff"
            }
        }

        var rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Cover banner */}
            <div className='relative h-56 w-full overflow-hidden md:h-72'>
                <SmartImage
                    className='h-full w-full object-cover'
                    src={currentUser.coverpic}
                    fallback="/cover-placeholder.svg"
                    alt="Cover"
                />
                <div className='absolute inset-0 bg-linear-to-t from-night via-night/30 to-transparent'></div>
            </div>

            <div className='relative mx-auto max-w-6xl px-4 pb-20 sm:px-6'>
                {/* Creator header */}
                <div className='glass -mt-20 flex flex-col items-center gap-6 rounded-3xl bg-night/60 p-6 text-center md:-mt-24 md:flex-row md:items-end md:p-8 md:text-left'>
                    <SmartImage
                        className='-mt-16 size-32 shrink-0 rounded-full border-4 border-night object-cover shadow-xl shadow-black/40 md:-mt-20 md:size-40'
                        src={currentUser.profilepic}
                        fallback="/avatar-placeholder.svg"
                        alt="Profile"
                    />
                    <div className='flex-1'>
                        <h1 className='font-display text-3xl font-extrabold tracking-tight md:text-4xl'>@{username}</h1>
                        <p className='mt-1 text-paper/70'>
                            Help {username} keep the fire going.
                        </p>
                    </div>
                    <div className='flex gap-3'>
                        <div className='rounded-2xl bg-white/5 px-5 py-3'>
                            <div className='font-display text-2xl font-bold'>{payments.length}</div>
                            <div className='text-xs text-paper/60'>Payments</div>
                        </div>
                        <div className='rounded-2xl bg-white/5 px-5 py-3'>
                            <div className='font-display text-2xl font-bold text-amber'>₹{payments.reduce((a, b) => a + b.amount, 0)}</div>
                            <div className='text-xs text-paper/60'>Raised</div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard + payment form */}
                <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                    {/* Supporters */}
                    <div className="glass rounded-3xl p-6 md:p-8">
                        <h2 className='font-display text-2xl font-bold'>Top 10 Supporters</h2>

                        {payments.length === 0 && (
                            <div className='flex flex-col items-center py-10 text-center'>
                                <img src="/empty-supporters.svg" alt="" className='w-44' />
                                <p className='mt-4 font-semibold'>No supporters yet</p>
                                <p className='mt-1 text-sm text-paper/60'>Be the first to back {username}. Your name will show up here.</p>
                            </div>
                        )}

                        <ul className='mt-5 space-y-3'>
                            {payments.map((p, i) => (
                                <li key={i} className='flex items-start gap-3 rounded-2xl bg-white/5 p-4'>
                                    <img className='size-10 shrink-0 rounded-full' src="/avatar-placeholder.svg" alt="avatar" />
                                    <div className='min-w-0'>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <span className='font-semibold'>{p.name}</span>
                                            <span className='rounded-full bg-amber/15 px-2.5 py-0.5 text-sm font-bold text-amber'>₹{p.amount}</span>
                                        </div>
                                        <p className='mt-1 wrap-break-word text-sm text-paper/70'>&quot;{p.message}&quot;</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment form (first on mobile) */}
                    <div className="makePayment glass order-first h-fit rounded-3xl p-6 md:sticky md:top-24 md:-order-1 md:p-8">
                        <h2 className='font-display text-2xl font-bold'>Make a Payment</h2>
                        <div className='mt-5 flex flex-col gap-3'>
                            <input
                                onChange={handleChange}
                                value={paymentform.name}
                                name='name'
                                type="text"
                                className='field'
                                placeholder='Enter Name'
                            />
                            <input
                                onChange={handleChange}
                                value={paymentform.message}
                                name='message'
                                type="text"
                                className='field'
                                placeholder='Enter Message'
                            />
                            <input
                                onChange={handleChange}
                                value={paymentform.amount}
                                name="amount"
                                type="number"
                                className='field'
                                placeholder='Enter Amount (₹)'
                            />

                            <button
                                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                type="button"
                                className="btn-primary mt-1 w-full"
                                disabled={!paymentform.name || !paymentform.amount || Number(paymentform.amount) <= 0}
                            >
                                Pay
                            </button>
                        </div>

                        {/* Quick amount buttons */}
                        <p className='mt-6 text-sm text-paper/60'>Or pay a quick amount right away</p>
                        <div className='mt-2 grid grid-cols-3 gap-2'>
                            <button className='rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-amber/60 hover:bg-amber/10' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-amber/60 hover:bg-amber/10' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-amber/60 hover:bg-amber/10' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage