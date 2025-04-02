import { Button } from '@mantine/core'
import React from 'react'

export default function CookieConsent() {
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64">
      <div className="bg-[var(--mantine-color-body)] rounded-lg border shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/401340/cookie.svg"
              alt="Cookie"
              className="h-6 w-6 mr-2"
            />
            <span className=" font-bold text-sm">Cookie Policy</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-sm mb-2">
          We use cookies to enhance your experience. By continuing to visit this site, you agree to
          our use of cookies.
        </p>
        <Button>Accept</Button>
      </div>
    </div>
  )
}
