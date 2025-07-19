# TravelPro - Travel Booking Platform

A comprehensive travel booking platform built with Next.js and React, featuring flight search, hotel bookings, and activity planning capabilities.

## 🌟 Features

- **Flight Search & Booking**
  - Real-time flight search with multiple filters
  - Airport autocomplete with IATA codes
  - Cabin class selection (Economy, Premium, Business, First)
  - Multi-passenger booking support
  - Price comparison and sorting options

- **Trip Management**
  - Interactive trip planning interface
  - Itinerary management
  - Visual trip timeline
  - Activity and hotel integration

- **Modern UI/UX**
  - Responsive design for all devices
  - Clean, intuitive interface
  - Real-time loading states
  - Error handling and validation

- **Additional Services**
  - Hotels and accommodations
  - Activities and experiences
  - Study abroad programs
  - Visa and immigration services
  - Medical travel assistance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Next.js 13+

### Installation

1. Clone the repository
```bash
git clone https://github.com/seyi-react/voyatek-assessment.git
cd travel-itinerary
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your API keys and configuration:
```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
FLIGHT_API_KEY=your_flight_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
travelpro/
├── components/
│   ├── HotelsAndActivities.js    # Hotel and activity components
│   └── ui/                       # Reusable UI components
├── pages/
│   └── index.js                  # Main home page
├── api/
│   ├── client.js                 # API client configuration
│   ├── flights.js                # Flight search API functions
│   └── types.js                  # TypeScript type definitions
├── public/
│   ├── logo.svg                  # Application logo
│   ├── america.svg               # Airline logos
│   ├── tree.svg                  # UI decorations
│   ├── sun.svg
│   └── woman.svg                 # Avatar images
├── styles/
│   └── globals.css               # Global styles
└── README.md
```

## 🛠️ API Integration

### Flight Search API

The application integrates with a flight search API to provide real-time flight data:

```javascript
// Search flights
const flights = await searchFlights({
  fromId: 'airport_id',
  toId: 'destination_id',
  departDate: '2024-02-25',
  returnDate: '2024-03-05', // Optional
  adults: 2,
  children: 1,
  cabinClass: 'ECONOMY'
});

// Search airports
const airports = await searchAirports('New York');
```

### API Endpoints

- `GET /flights/searchFlights` - Search available flights
- `GET /flights/searchAirport` - Search airports by query

## 🎨 UI Components

### Main Features

- **Responsive Header** - Navigation with search, notifications, and user menu
- **Sidebar Navigation** - Service categories (Activities, Hotels, Flights, etc.)
- **Flight Search Form** - Comprehensive search with autocomplete
- **Trip Planning** - Visual trip management interface
- **Flight Cards** - Detailed flight information display

### Key Components

```jsx
// Flight search form with validation
<FlightSearchForm onSearch={handleFlightSearch} />

// Dynamic flight results
<FlightResults flights={flights} loading={loading} />

// Trip planning interface
<TripPlanner trip={currentTrip} />
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Collapsible sidebar for mobile devices
- Touch-friendly interface elements
- Optimized layouts for tablets and desktops

## 🔧 Configuration

### Tailwind CSS Setup

The project uses Tailwind CSS for styling with custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': {
          600: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}
```

### API Client Configuration

```javascript
// api/client.js
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
```

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🔍 Features in Detail

### Flight Search
- **Real-time Search**: Live flight data from multiple airlines
- **Smart Filters**: Filter by price, duration, stops, airline
- **Airport Search**: Intelligent airport lookup with IATA codes
- **Multi-city Support**: Complex routing options
- **Price Alerts**: Track price changes for specific routes

### Trip Planning
- **Visual Timeline**: Drag-and-drop itinerary builder
- **Collaborative Planning**: Share trips with family and friends
- **Budget Tracking**: Monitor expenses across all trip components
- **Document Storage**: Store tickets, confirmations, and travel documents

### User Experience
- **Persistent Search**: Remember search preferences
- **Quick Actions**: One-click booking for saved preferences
- **Mobile Optimized**: Full functionality on mobile devices
- **Offline Support**: Basic functionality without internet

## 📊 Performance

- **Core Web Vitals**: Optimized for Google's performance metrics
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Intelligent API response caching

## 🛡️ Security

- **Input Validation**: All user inputs validated and sanitized
- **API Security**: Secure API key management
- **XSS Protection**: Built-in Next.js security features
- **HTTPS Only**: Enforced secure connections

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Future Enhancements

- [ ] Real-time price tracking
- [ ] Advanced filtering options
- [ ] Social trip sharing
- [ ] Loyalty program integration
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)
- [ ] Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@travelpro.com


## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- Flight API provider for real-time data

---

Built with ❤️ using Next.js and React