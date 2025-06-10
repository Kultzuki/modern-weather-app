import { useState, useRef, useEffect, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react';
import { popularCities, type PopularCity } from '../data/popularCities';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, loading = false, defaultValue = '' }: SearchBarProps) => {
  const [city, setCity] = useState(defaultValue);
  const [filteredCities, setFilteredCities] = useState<PopularCity[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Update city state when defaultValue changes
  useEffect(() => {
    setCity(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.trim().length > 0) {
      const filtered = popularCities.filter(popularCity =>
        popularCity.name.toLowerCase().includes(value.toLowerCase()) ||
        popularCity.displayName.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      
      setFilteredCities(filtered);
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setShowDropdown(false);
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (selectedCity: PopularCity) => {
    setCity(selectedCity.name);
    setShowDropdown(false);
    onSearch(selectedCity.name);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredCities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleCitySelect(filteredCities[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (city.trim().length > 0 && filteredCities.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // Delay hiding dropdown to allow click on items
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          {/* Input with enhanced glassmorphism and micro-interactions */}
          <div className={`relative transition-all duration-300 ease-out ${isInputFocused ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.01] hover:shadow-lg'}`}>
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="🌍 Enter city name or select from popular cities..."
              disabled={loading}
              className={`w-full px-5 py-4 text-gray-800 placeholder-gray-500 bg-white/80 backdrop-blur-md border-2 rounded-2xl shadow-lg transition-all duration-300 ease-out
                ${isInputFocused 
                  ? 'border-blue-500 bg-white/90 shadow-blue-200/50' 
                  : 'border-white/30 hover:border-blue-300 hover:bg-white/90'
                }
                focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                disabled:bg-gray-100/80 disabled:cursor-not-allowed disabled:border-gray-200
                text-lg font-medium tracking-wide`}
              autoComplete="off"
            />
            
            {/* Enhanced loading animation */}
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="relative">
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-blue-500/30 border-t-blue-500"></div>
                  <div className="absolute inset-0 animate-pulse rounded-full h-6 w-6 bg-blue-500/10"></div>
                </div>
              </div>
            )}

            {/* Search icon when not loading */}
            {!loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-200">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Enhanced Autocomplete Dropdown with glassmorphism */}
          {showDropdown && filteredCities.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl max-h-72 overflow-y-auto z-50 animate-in fade-in-0 slide-in-from-top-3 duration-300 ease-out"
            >
              {filteredCities.map((popularCity, index) => (
                <li
                  key={`${popularCity.name}-${popularCity.country}`}
                  className={`px-5 py-4 cursor-pointer transition-all duration-200 ease-out ${
                    index === selectedIndex
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 backdrop-blur-md transform scale-[1.02]'
                      : 'hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/80 hover:transform hover:scale-[1.01]'
                  } ${index === 0 ? 'rounded-t-2xl' : ''} ${
                    index === filteredCities.length - 1 ? 'rounded-b-2xl' : ''
                  }`}
                  onClick={() => handleCitySelect(popularCity)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* City icon */}
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">
                          {popularCity.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 tracking-wide">
                          {popularCity.name}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {popularCity.displayName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium bg-gray-100/80 px-2 py-1 rounded-lg">
                        {popularCity.country}
                      </span>
                      {index === selectedIndex && (
                        <div className="text-blue-500 animate-bounce">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Enhanced Search Button with advanced micro-interactions */}
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 ease-out transform
            ${loading || !city.trim() 
              ? 'opacity-60 cursor-not-allowed scale-95' 
              : 'hover:scale-105 hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 active:scale-95'
            }
            focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2
            disabled:transform-none disabled:hover:scale-100`}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                <div className="absolute inset-0 animate-pulse rounded-full h-5 w-5 bg-white/10"></div>
              </div>
              <span className="tracking-wide">Searching...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 group">
              <svg
                className="w-5 h-5 group-hover:animate-pulse transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="tracking-wide">Search</span>
              <div className="w-2 h-2 bg-white/80 rounded-full group-hover:animate-bounce"></div>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 