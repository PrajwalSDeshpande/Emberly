"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <header className='sticky top-0 z-50 px-3 pt-3'>
      <nav className='glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl bg-night/70 px-3 pl-4 text-paper shadow-lg shadow-black/20'>
        <Link className="flex items-center gap-2.5" href={"/"}>
          <img src="/logo.svg" width={32} height={32} alt="Emberly logo" />
          <span className='font-display text-xl font-extrabold tracking-tight'>Emberly</span>
        </Link>

        <div className='hidden items-center gap-1 text-sm font-medium text-paper/70 sm:flex'>
          <Link href="/" className='rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-paper'>Home</Link>
          <Link href="/about" className='rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-paper'>About</Link>
        </div>

        <div className='relative flex items-center gap-2'>
          {session ? (
            <>
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                onBlur={() => setTimeout(() => setShowdropdown(false), 200)}
                className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-paper transition hover:bg-white/15"
                type="button"
              >
                Account
                <svg className={`ms-2 h-2.5 w-2.5 transition-transform ${showdropdown ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div className={`${showdropdown ? "" : "hidden"} glass absolute right-0 top-12 z-10 w-48 overflow-hidden rounded-2xl bg-night-2/95 shadow-2xl shadow-black/40`}>
                <ul className="p-1.5 text-sm text-paper">
                  <li>
                    <Link href="/dashboard" className="block rounded-xl px-3 py-2.5 hover:bg-white/10">Dashboard</Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block rounded-xl px-3 py-2.5 hover:bg-white/10">Your Page</Link>
                  </li>
                  <li>
                    <button onClick={() => signOut()} className="block w-full rounded-xl px-3 py-2.5 text-left text-ember hover:bg-white/10">Sign out</button>
                  </li>
                </ul>
              </div>

              <button className='hidden rounded-xl px-3 py-2 text-sm font-medium text-paper/70 transition hover:text-paper sm:block' onClick={() => signOut()}>Logout</button>
            </>
          ) : (
            <Link href={"/login"}>
              <button className='btn-primary rounded-xl px-5 py-2'>Login</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar