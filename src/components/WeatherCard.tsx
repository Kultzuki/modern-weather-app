import { useState, useEffect, type MouseEvent } from 'react';
import type { WeatherData } from '../types/weather';
import { getWindDirection, formatTime, formatVisibility } from '../utils/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  onClose?: () => void;
}

const WeatherCard = ({ weatherData, onClose }: WeatherCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDetails = (e: MouseEvent) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  // Get weather-based background gradient
  const getWeatherBackground = () => {
    const condition = weatherData.weather[0].main.toLowerCase();
    const icon = weatherData.weather[0].icon;
    
    if (condition.includes('clear')) {
      return icon.includes('d') 
        ? 'bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400' // Sunny day
        : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'; // Clear night
    } else if (condition.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-300 via-blue-200 to-gray-400';
    } else if (condition.includes('rain')) {
      return 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700';
    } else if (condition.includes('snow')) {
      return 'bg-gradient-to-br from-blue-100 via-white to-blue-200';
    } else if (condition.includes('thunderstorm')) {
      return 'bg-gradient-to-br from-gray-800 via-purple-900 to-black';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      return 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400';
    }
    
    return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'; // Default
  };

  // Get weather particles/effects
  const getWeatherParticles = () => {
    const condition = weatherData.weather[0].main.toLowerCase();
    
    if (condition.includes('rain')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-8 bg-blue-200/60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('snow')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/80 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`relative overflow-hidden transition-all duration-700 ease-out transform ${
      isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
    }`}>
      {/* Weather particles/effects */}
      {getWeatherParticles()}
      
      {/* Main card with weather-based background */}
      <div className={`${getWeatherBackground()} rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-[1.02]`}>
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-6">
            <div className="transform transition-all duration-300 group-hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
                {weatherData.name}
              </h2>
              {weatherData.sys?.country && (
                <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {weatherData.sys.country}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 hover:rotate-90 p-2 hover:bg-red-50 rounded-full"
                aria-label="Close weather card"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Main weather display with enhanced animations */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative group">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                  className="w-28 h-28 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 w-28 h-28 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div className="text-left">
                <div className="text-6xl font-bold text-gray-800 mb-2 relative">
                  {Math.round(weatherData.main.temp)}°
                  <span className="absolute -top-2 -right-6 text-2xl text-gray-500 font-normal">C</span>
                </div>
                <div className="text-gray-700 text-xl capitalize leading-tight font-semibold mb-2">
                  {weatherData.weather[0].description}
                </div>
                <div className="text-gray-600 text-base flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Feels like {Math.round(weatherData.main.feels_like)}°
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced quick stats with better hover effects */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
              <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-blue-700">
                💧 Humidity
              </div>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
                {weatherData.main.humidity}%
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${weatherData.main.humidity}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
              <div className="text-green-600 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-green-700">
                💨 Wind
              </div>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-green-800 transition-colors">
                {weatherData.wind.speed} m/s
              </div>
              <div className="text-xs text-green-600 mt-1 font-medium">
                {weatherData.wind.deg !== undefined && getWindDirection(weatherData.wind.deg)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
              <div className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-purple-700">
                📊 Pressure
              </div>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-purple-800 transition-colors">
                {weatherData.main.pressure || 'N/A'}
              </div>
              <div className="text-xs text-purple-600 mt-1 font-medium">hPa</div>
            </div>
          </div>

          {/* Enhanced temperature range with animated gradient */}
          {weatherData.main.temp_min && weatherData.main.temp_max && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-6 hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                  <span className="text-lg">🌡️</span>
                  Today's Range
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold text-lg bg-blue-100 px-3 py-1 rounded-lg">
                    {Math.round(weatherData.main.temp_min)}°
                  </span>
                  <div className="relative w-12 h-2 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-red-400 rounded-full group-hover:animate-pulse"></div>
                  </div>
                  <span className="text-red-600 font-bold text-lg bg-red-100 px-3 py-1 rounded-lg">
                    {Math.round(weatherData.main.temp_max)}°
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced show/hide details button */}
          <button
            onClick={toggleDetails}
            className="w-full py-3 text-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-600 hover:shadow-lg group"
          >
            <span>{showDetails ? 'Hide Details' : 'Show More Details'}</span>
            <svg 
              className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${showDetails ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Enhanced additional details with staggered animations */}
          {showDetails && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-in slide-in-from-top duration-500">
              {weatherData.visibility && (
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 group animate-in slide-in-from-left duration-300 delay-100">
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <span className="text-lg">👁️</span>
                    Visibility
                  </span>
                  <span className="font-bold text-gray-800 group-hover:text-blue-800">
                    {formatVisibility(weatherData.visibility)}
                  </span>
                </div>
              )}
              
              {weatherData.wind.deg !== undefined && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200 group animate-in slide-in-from-left duration-300 delay-200">
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <span className="text-lg">🧭</span>
                    Wind Direction
                  </span>
                  <span className="font-bold text-gray-800 group-hover:text-green-800">
                    {getWindDirection(weatherData.wind.deg)} ({weatherData.wind.deg}°)
                  </span>
                </div>
              )}

              {weatherData.sys?.sunrise && weatherData.sys?.sunset && (
                <>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-200 group animate-in slide-in-from-left duration-300 delay-300">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <span className="text-lg">🌅</span>
                      Sunrise
                    </span>
                    <span className="font-bold text-gray-800 group-hover:text-yellow-800">
                      {formatTime(weatherData.sys.sunrise)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200 group animate-in slide-in-from-left duration-300 delay-400">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <span className="text-lg">🌇</span>
                      Sunset
                    </span>
                    <span className="font-bold text-gray-800 group-hover:text-orange-800">
                      {formatTime(weatherData.sys.sunset)}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 