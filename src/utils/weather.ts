/**
 * Converts temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Formats wind direction from degrees to compass direction
 */
export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  return directions[Math.round(degrees / 22.5) % 16];
};

/**
 * Converts timestamp to readable time
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Converts visibility from meters to kilometers
 */
export const formatVisibility = (visibilityInMeters: number): string => {
  return `${(visibilityInMeters / 1000).toFixed(1)} km`;
};

/**
 * Gets weather advice based on conditions
 */
export const getWeatherAdvice = (temp: number, condition: string, windSpeed: number): string[] => {
  const advice: string[] = [];
  
  if (temp < 0) {
    advice.push('Bundle up! It\'s freezing outside.');
  } else if (temp < 10) {
    advice.push('Wear a warm jacket.');
  } else if (temp > 30) {
    advice.push('Stay hydrated and seek shade.');
  }
  
  if (condition.toLowerCase().includes('rain')) {
    advice.push('Don\'t forget your umbrella!');
  } else if (condition.toLowerCase().includes('snow')) {
    advice.push('Drive carefully and wear non-slip shoes.');
  }
  
  if (windSpeed > 10) {
    advice.push('It\'s quite windy - secure loose items.');
  }
  
  return advice.length > 0 ? advice : ['Perfect weather to go outside!'];
}; 