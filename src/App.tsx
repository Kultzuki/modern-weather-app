import { useState, useEffect } from 'react';
import { SearchBar, WeatherCard } from './components';
import type { WeatherData } from './types/weather';
import { saveLastSearchedCity, getLastSearchedCity } from './utils/localStorage';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');

  // Load last searched city on app start
  useEffect(() => {
    const savedCity = getLastSearchedCity();
    if (savedCity) {
      setLastSearchedCity(savedCity);
      // Optionally auto-search the last city
      // handleSearch(savedCity);
    }
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
      
      if (!apiKey) {
        throw new Error('Weather API key not found. Please check your environment configuration.');
      }

      const response = await fetch(
        `${baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Failed to fetch weather data. Please try again later.');
      }

      const data = await response.json();
      setWeatherData(data);
      
      // Save the successful search to localStorage
      saveLastSearchedCity(city);
      setLastSearchedCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Weather App
          </h1>
          <p className="text-blue-100 text-lg">
            Get real-time weather information for any city
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <SearchBar 
              onSearch={handleSearch} 
              loading={loading} 
              defaultValue={lastSearchedCity}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {weatherData && (
            <WeatherCard 
              weatherData={weatherData} 
              onClose={() => setWeatherData(null)}
            />
          )}

          {!weatherData && !loading && !error && (
            <div className="text-center text-blue-100">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Search for a city to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
