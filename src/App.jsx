import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://xcountries-backend.labs.crio.do/all')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCountries(data)
        setError(null)
      } catch (err) {
        const errorMessage = err.message || 'Unknown error'
        console.error(`Error fetching data: ${errorMessage}`)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return (
    <div className="app">
      {loading && <p className="loading">Loading countries...</p>}
      
      {error && <p className="error">Failed to load countries. Please try again later.</p>}
      
      {!loading && !error && (
        <div className="countries-grid">
          {countries.map((country) => (
            <div key={country.countryCode} className="country-card">
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="flag"
              />
              <p className="country-name">{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
