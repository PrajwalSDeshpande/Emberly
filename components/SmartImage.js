"use client"
import React, { useState } from 'react'

// Shows `src`, and swaps to `fallback` if it is empty or fails to load.
// Use it for profile pictures and covers: <SmartImage src={user.profilepic} fallback="/avatar-placeholder.svg" />
const SmartImage = ({ src, fallback, alt = "", ...props }) => {
  const [failedSrc, setFailedSrc] = useState(null)
  const useFallback = !src || failedSrc === src

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  )
}

export default SmartImage