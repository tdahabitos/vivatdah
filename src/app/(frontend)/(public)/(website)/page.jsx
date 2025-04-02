'use client'

import { Divider } from '@mantine/core'
import Plans from './_components/Plans'
import Stats from './_components/Stats'
import Hero from './_components/Hero'
import Blog from './_components/Blog'
import CookieConsent from './_components/CookieConsent'
import Testimonial from './_components/Testimonial'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Testimonial />
      <Blog />
      <Plans />
      <CookieConsent />
      <Divider />
    </>
  )
}
