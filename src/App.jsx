import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        setError(null);
      } catch (err) {
        const errorMessage = err.message || "Unknown error";
        console.error(`Error fetching data: ${errorMessage}`);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Filter countries by search term (case-insensitive)
  const filteredCountries = search.trim() === ""
    ? countries
    : countries.filter((country) =>
        country.common && country.common.toLowerCase().includes(search.trim().toLowerCase())
      );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search by country name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "24px auto 16px", display: "block", padding: "8px", width: "min(90vw, 350px)", fontSize: "1rem" }}
      />
      {loading && <p className="loading">Loading countries...</p>}
      {error && <p className="error">Failed to load countries. Please try again later.</p>}
      {!loading && !error && (
        <div className="countries-grid">
          {filteredCountries.length > 0 &&
            filteredCountries.map((country, idx) => (
              <div key={country.common + idx} className="countryCard">
                <img
                  src={country.png}
                  alt={`Flag of ${country.common}`}
                  className="flag"
                  style={{ width: "80px", height: "50px", objectFit: "cover", border: "1px solid #eee", borderRadius: "4px" }}
                />
                <p className="country-name" style={{ marginTop: "8px", fontWeight: 500 }}>{country.common}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App
