export interface WeatherData {
  name: string;
  country?: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure?: number;
    temp_min?: number;
    temp_max?: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
  };
  visibility?: number;
  sys?: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord?: {
    lat: number;
    lon: number;
  };
  dt?: number; // Date time
  timezone?: number;
} 