const LAST_SEARCHED_CITY_KEY = 'weather-app-last-city';

export const saveLastSearchedCity = (city: string): void => {
  try {
    localStorage.setItem(LAST_SEARCHED_CITY_KEY, city);
  } catch (error) {
    console.warn('Failed to save last searched city to localStorage:', error);
  }
};

export const getLastSearchedCity = (): string | null => {
  try {
    return localStorage.getItem(LAST_SEARCHED_CITY_KEY);
  } catch (error) {
    console.warn('Failed to retrieve last searched city from localStorage:', error);
    return null;
  }
};

export const clearLastSearchedCity = (): void => {
  try {
    localStorage.removeItem(LAST_SEARCHED_CITY_KEY);
  } catch (error) {
    console.warn('Failed to clear last searched city from localStorage:', error);
  }
}; 