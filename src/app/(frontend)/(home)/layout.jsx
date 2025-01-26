"use client";

import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />

      <div className="p-4 sm:p-6 lg:p-8">{children}</div>

      <Footer />
    </>
  );
}
