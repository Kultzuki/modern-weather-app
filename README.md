# 🌤️ Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS that provides real-time weather information with an elegant user interface.

## ✨ Features

### 🔍 **Smart Search**
- **Autocomplete Dropdown**: Choose from 40+ popular cities worldwide
- **Keyboard Navigation**: Full arrow key support, Enter to select, Escape to close
- **Real-time Filtering**: Instant city suggestions as you type

### 🌍 **Weather Display**
- **Current Weather**: Temperature, conditions, and high-resolution weather icons
- **Detailed Metrics**: Humidity, wind speed/direction, pressure, visibility
- **Extended Info**: Temperature range, feels-like temperature, sunrise/sunset times
- **Weather-Based Theming**: Dynamic backgrounds that change based on weather conditions

### 🎨 **Modern UI/UX**
- **Glass-morphism Design**: Beautiful translucent interface with backdrop blur effects
- **Smooth Animations**: Hover effects, loading states, and micro-interactions
- **Weather Particles**: Immersive rain and snow particle effects
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices

### 💾 **Smart Features**
- **localStorage Persistence**: Remembers your last searched city
- **Progressive Disclosure**: Expandable details section for additional information
- **Error Handling**: Graceful handling of API errors with user-friendly messages
- **Loading States**: Visual feedback during API calls

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with hooks and functional components
- **Type Safety**: TypeScript for enhanced developer experience
- **Styling**: Tailwind CSS v4 with utility-first approach
- **Build Tool**: Vite for fast development and optimized builds
- **Weather API**: OpenWeatherMap API for reliable weather data
- **Icons**: High-resolution weather icons (@4x quality)

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ installed
- npm package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Add your OpenWeatherMap API key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
weather-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SearchBar.tsx    # Smart search with autocomplete
│   │   ├── WeatherCard.tsx  # Weather display component
│   │   └── index.ts         # Component exports
│   ├── data/                # Static data
│   │   └── popularCities.ts # Curated city database
│   ├── types/               # TypeScript type definitions
│   │   └── weather.ts       # Weather data interfaces
│   ├── utils/               # Utility functions
│   │   ├── weather.ts       # Weather data formatting
│   │   └── localStorage.ts  # Persistence utilities
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── vite.config.ts          # Build configuration
```

## 🎯 Key Implementation Highlights

### Component Architecture
- **Modular Design**: Clean separation of concerns with reusable components
- **Props-Driven**: Flexible components that receive data via well-typed props
- **State Management**: Local component state using React hooks

### Advanced Features
- **TypeScript Integration**: Full type safety throughout the application
- **Custom Hooks**: Reusable logic for data fetching and state management
- **Utility Functions**: Wind direction conversion, time formatting, data processing
- **Error Boundaries**: Graceful handling of runtime errors

### Performance Optimizations
- **Efficient Rendering**: Optimized component re-renders
- **Limited Suggestions**: Autocomplete limited to 8 results for optimal UX
- **Lazy Loading**: Efficient loading of weather icons and data

## 🌟 Notable Features

### Weather-Based Visual Effects
- Dynamic background gradients based on weather conditions
- Animated weather particles (rain drops, snow flakes)
- Contextual color schemes and visual feedback

### Enhanced User Experience
- Keyboard-first navigation support
- Accessibility features with proper ARIA labels
- Mobile-optimized touch interactions
- Smooth transitions and micro-animations

### Data Persistence
- Smart localStorage integration
- Remembers user preferences between sessions
- Graceful handling of browser storage limitations

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Integration

This app integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to provide:
- Current weather conditions
- Temperature and humidity data
- Wind information
- Sunrise/sunset times
- Weather forecasts

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

While this is a portfolio project, suggestions and feedback are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 🔗 Links

- **Portfolio**: [Soon]
- **LinkedIn**: [Prashant Krishan Bharti](https://www.linkedin.com/in/prashant-krishan-bharti)
- **GitHub**: [Kultzuki](https://github.com/Kultzuki)

---

**Built with ❤️ by [Kultzuki]** - *Showcasing modern React development with TypeScript and Tailwind CSS*
