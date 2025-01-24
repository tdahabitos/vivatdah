"use client";

import { Divider } from "@mantine/core";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Plans from "./_components/Plans";
import Stats from "./_components/Stats";
import Hero from "./_components/Hero";
import Testimonial from "./_components/Testimonial";

export default function HomePage() {
  return (
    <>
      <Header />

      <Hero />

      <div className="w-full max-w-[80%] mx-auto mt-8">
        <div className="rounded overflow-hidden">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/EUfzHKBvkeY?si=h5Ne3A09ftQEUCTn"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <Stats />

      <Testimonial />

      <Plans />

      <Divider />

      <Footer />
    </>
  );
}
