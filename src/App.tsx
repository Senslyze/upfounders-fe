import Header from './design-system/Organisms/Header'
import Footer from './design-system/Organisms/Footer'
import HomePage from './design-system/templates/home-page/HomePage'
import ComparePage from './design-system/templates/compare-page/ComparePage'
import ResourcesPage from './design-system/templates/resources-page/ResourcesPage'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const location = useLocation();
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleFiltersClick = () => {
    console.log('Filters clicked');
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
                onFiltersClick={handleFiltersClick}
              />
            }
          />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </main>
      {location.pathname !== '/compare' && location.pathname !== '/resources' && <Footer />}
    </div>
  )
}

export default App
