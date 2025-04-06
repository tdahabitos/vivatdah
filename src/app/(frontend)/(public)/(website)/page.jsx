'use client'

import { Divider } from '@mantine/core'
import Plans from './_components/Plans'
import Stats from './_components/Stats'
import Hero from './_components/Hero'
import Blog from './_components/Blog'
import Cta from './_components/Cta'
import CookieConsent from './_components/CookieConsent'
import Testimonial from './_components/Testimonial'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Cta />
      <Testimonial />
      <Blog />
      <Plans />
      <Divider />
      {/*  */}
      <CookieConsent />
    </>
  )
}
