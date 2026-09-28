import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='border-t border-white/10 bg-night text-paper/70'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row'>
        <div className='flex items-center gap-2.5'>
          <img src="/logo.svg" width={24} height={24} alt="" />
          <span className='font-display text-base font-bold text-paper'>Emberly</span>
          <span className='hidden sm:inline'>Fuel the people who make things.</span>
        </div>
        <div className='flex gap-5'>
          <Link href="/" className='hover:text-paper'>Home</Link>
          <Link href="/about" className='hover:text-paper'>About</Link>
          <Link href="/login" className='hover:text-paper'>Login</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Emberly. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer