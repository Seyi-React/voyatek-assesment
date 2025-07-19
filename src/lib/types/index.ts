export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  rooms?: number;
}

export interface Hotel {
  id: string;
  name: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  location: string;
  amenities: string[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
  };
  price: number;
  currency: string;
  duration: string;
  stops: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  image: string;
  location: string;
}

export interface ItineraryItem {
  id: string;
  type: 'hotel' | 'flight' | 'activity';
  data: Hotel | Flight | Activity;
  date: string;
}

 export interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  reviews: number;
  roomType: string;
  facilities: string[];
  checkIn: string;
  checkOut: string;
  onClose: () => void;
  totalPrice: string;
  showInMap: boolean;
  nights: number;
}

export interface ActivityCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  includes: string[];
  onClose: () => void;
}
