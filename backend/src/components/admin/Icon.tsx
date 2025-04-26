import React from 'react'
import Image from 'next/image'

export default function Icon() {
  return (
    <div style={{ maxWidth: '120px' }}>
      <Image src="/logo-dark.svg" alt="Logo" />
    </div>
  )
}
