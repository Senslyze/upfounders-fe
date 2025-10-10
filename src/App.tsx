import Header from './design-system/Organisms/Header'
import Footer from './design-system/Organisms/Footer'
import HomePage from './design-system/templates/home-page/HomePage'
import './App.css'

function App() {
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
        <HomePage 
          onSearch={handleSearch}
          onFiltersClick={handleFiltersClick}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
