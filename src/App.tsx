import Header from './design-system/Organisms/Header'
import Footer from './design-system/Organisms/Footer'
import HomePage from './design-system/templates/home-page/HomePage'
import ComparePage from './design-system/templates/compare-page/ComparePage'
import ResourcesPage from './design-system/templates/resources-page/ResourcesPage'
import NewsletterPage from './design-system/templates/newsletter/NewsletterPage'
import PartnerDetailPage from './design-system/templates/partner-detail/PartnerDetailPage'
import ContactUsPage from './design-system/templates/contact-us/ContactUsPage'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const location = useLocation();
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage 
                onSearch={handleSearch}
              />
            }
          />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/partner/:companyId" element={<PartnerDetailPage />} />
        </Routes>
      </main>
      {location.pathname !== '/' && location.pathname !== '/compare' && location.pathname !== '/resources' && location.pathname !== '/newsletter' && location.pathname !== '/contact' && !location.pathname.startsWith('/partner/') && <Footer />}
    </div>
  )
}

export default App
