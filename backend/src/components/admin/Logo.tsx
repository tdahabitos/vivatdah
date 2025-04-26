import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <div style={{ maxWidth: '200px' }}>
      <Image src="/logo-dark.svg" alt="Logo" />
    </div>
  )
}
