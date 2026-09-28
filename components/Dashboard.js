"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        if (!session) {
            router.push('/login')
        } else {
            getData()
        }
    }, [session])

    const getData = async () => {
        if (session?.user?.name) {
            let u = await fetchuser(session.user.name)
            if (u) setform(u)
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let res = await updateProfile(e, session.user.name)
        if (res?.error) {
            toast.error(res.error, { position: "top-right", theme: "dark", transition: Bounce })
        } else {
            toast('Profile Updated Successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='container mx-auto py-5 px-6'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" action={handleSubmit}>
                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                        <input value={form.name || ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input value={form.email || ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                        <input value={form.username || ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-white">Profile Picture URL</label>
                        <input value={form.profilepic || ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-white">Cover Picture URL</label>
                        <input value={form.coverpic || ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">Razorpay Key ID</label>
                        <input value={form.razorpayid || ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white">Razorpay Key Secret</label>
                        <input value={form.razorpaysecret || ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white text-xs" />
                    </div>

                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium text-sm">Save Profile</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard