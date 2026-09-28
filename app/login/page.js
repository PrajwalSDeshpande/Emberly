"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const otherProviders = ["Google", "LinkedIn", "Twitter", "Facebook", "Apple"]

const Login = () => {
    const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login | Emberly"
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className='relative overflow-hidden px-6 py-16 text-paper'>
      <img
        src="/bg-orbits.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-225 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <div className="glass relative mx-auto max-w-md rounded-3xl bg-night/60 p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
        <img src="/logo.svg" alt="Emberly" className="mx-auto size-16" />
        <h1 className='font-display mt-5 text-3xl font-extrabold tracking-tight'>Login to get started</h1>
        <p className='mt-2 text-sm text-paper/70'>
          Sign in to set up your page, connect Razorpay and share your link.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={() => { signIn("github") }}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-paper px-6 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-white">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-paper/50">
          <span className="h-px flex-1 bg-white/10"></span>
          <span>More sign-in options coming soon</span>
          <span className="h-px flex-1 bg-white/10"></span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {otherProviders.map((name) => (
            <button
              key={name}
              disabled
              title="Coming soon"
              className="cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-paper/40"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Login