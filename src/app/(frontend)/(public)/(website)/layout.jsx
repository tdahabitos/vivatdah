import Header from './_components/Header'
import Footer from './_components/Footer'
import Banner from './_components/Banner'

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Banner />

      <Header />

      <div className="p-4 sm:p-6 lg:p-8">{children}</div>

      <Footer />
    </>
  )
}
