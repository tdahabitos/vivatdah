'use client'

import { Button } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [cookiesAllowed, setCookiesAllowed] = useState(true)

  function getCookieData() {
    setCookiesAllowed(localStorage.getItem('cookieConsent') === 'true')
  }

  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true')
    setCookiesAllowed(true)
  }

  useEffect(() => {
    getCookieData()
  }, [])

  if (cookiesAllowed) {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64">
      <div className="bg-[var(--mantine-color-body)] rounded-lg border shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="/cookie.svg" alt="Cookie" className="h-6 w-6 mr-2" />
            <span className=" font-bold text-sm">Cookies</span>
          </div>
        </div>
        <p className="text-sm mb-2">
          Utilizamos cookies para melhorar a sua experiência. Ao continuar navegando neste site,
          você concorda com o uso de cookies.
        </p>
        <Button className="w-full" onClick={acceptCookies}>
          Accept
        </Button>
      </div>
    </div>
  )
}
