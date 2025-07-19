import React, { useState } from "react";
import { Star, MapPin, Users, Clock, X, Heart, Share2, Bed } from "lucide-react";
// import { HotelCardProps, ActivityCardProps, Flight } from "../lib/types";
import { searchFlights } from "../lib/api/flights";

import { searchActivities } from "../lib/api/activities";
import { searchHotels } from "../lib/api/hotels";



// Types
interface HotelCardProps {
  id?: string | number;
  name: string;
  location: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  roomType?: string;
  facilities?: string[];
  checkIn: string;
  checkOut: string;
  onClose?: () => void;
  totalPrice?: string;
  nights?: number;
  showInMap?: boolean;
}

interface ActivityCardProps {
  id?: string | number;
  name: string;
  location: string;
  price: string;
  image: string;
  rating?: number;
  reviews?: number;
  duration?: string;
  date: string;
  time?: string;
  onClose?: () => void;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { time: string; airport: string };
  arrival: { time: string; airport: string };
  price: number;
  currency: string;
}

// Hotel Card Component - Fixed to match Figma
const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  location,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  roomType,
  facilities = [],
  checkIn,
  checkOut,
  onClose,
  totalPrice,
  nights = 18,
  showInMap = false,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
      <div className="flex">
        {/* Image Section */}
        <div className="relative w-48 h-36 flex-shrink-0">
          <img 
            src={image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
            }}
          />
          <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                {location}
              </p>
              
              {/* Rating and Room Info */}
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                {showInMap && (
                  <button className="text-blue-600 text-sm hover:underline">
                    Show in map
                  </button>
                )}
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({reviews})</span>
                </div>
                {roomType && (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{roomType}</span>
                  </div>
                )}
              </div>

              {/* Facilities */}
              {facilities.length > 0 && (
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-sm text-gray-600">Facilities:</span>
                  {facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} className="text-sm text-gray-600">
                      {facility}{index < Math.min(facilities.length, 3) - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Check-in/Check-out */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 gap-4 flex-wrap">
              <div className="flex items-center">
                <span className="text-gray-500">Check In:</span>
                <span className="ml-1 font-medium">{checkIn}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Check Out:</span>
                <span className="ml-1 font-medium">{checkOut}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="w-52 bg-gray-50 p-4 flex flex-col justify-between border-l border-gray-200">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {price}
            </div>
            {originalPrice && (
              <div className="text-sm text-gray-500 line-through mb-1">
                Total Price {originalPrice}
              </div>
            )}
            <div className="text-xs text-gray-600">
              1 room x {nights} nights incl. taxes
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
              Hotel details
            </button>
            <button className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
              Price details
            </button>
            <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors bg-transparent border-none p-0">
              Edit details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Card Component - Similar to Hotel Card
const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  name,
  location,
  price,
  image,
  rating,
  reviews,
  duration,
  date,
  time,
  onClose,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
      <div className="flex">
        {/* Image Section */}
        <div className="relative w-48 h-36 flex-shrink-0">
          <img 
            src={image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop";
            }}
          />
          <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                {location}
              </p>
              
              {/* Rating and Duration */}
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                {rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{rating}</span>
                    {reviews && (
                      <span className="text-sm text-gray-500 ml-1">({reviews})</span>
                    )}
                  </div>
                )}
                {duration && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{duration}</span>
                  </div>
                )}
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Date and Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 gap-4 flex-wrap">
              <div className="flex items-center">
                <span className="text-gray-500">Date:</span>
                <span className="ml-1 font-medium">{date}</span>
              </div>
              {time && (
                <div className="flex items-center">
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-1 font-medium">{time}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="w-52 bg-gray-50 p-4 flex flex-col justify-between border-l border-gray-200">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {price}
            </div>
            <div className="text-xs text-gray-600">
              10:30 AM on Mar 19
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
              Activity details
            </button>
            <button className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
              Price details
            </button>
            <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors bg-transparent border-none p-0">
              Edit details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelsAndActivities: React.FC = () => {
  // --- Hotels ---
  const [hotelQuery, setHotelQuery] = useState("");
  const [hotelResults, setHotelResults] = useState<any[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [selectedHotels, setSelectedHotels] = useState<HotelCardProps[]>([]);
  const [showHotelSearch, setShowHotelSearch] = useState(false);

  // --- Flights ---
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightResults, setFlightResults] = useState<Flight[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);
  const [showFlightSearch, setShowFlightSearch] = useState(false);

  // --- Activities ---
  const [activityQuery, setActivityQuery] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityResults, setActivityResults] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<ActivityCardProps[]>([]);
  const [showActivitySearch, setShowActivitySearch] = useState(false);

  // Mock search functions for demo
  const handleHotelSearch = async () => {
    setLoadingHotels(true);
    try {
      // Simulated API response
      const mockResults = [
        {
          hotel_id: 74717,
          property: {
            name: "Riviera Resort, Lekki",
            photoUrls: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"],
            reviewScore: 8.5,
            reviewCount: 430,
            priceBreakdown: {
              grossPrice: { value: 123450, currency: "NGN" },
              excludedPrice: { value: 560000, currency: "NGN" }
            },
            checkinDate: "2025-08-14",
            checkoutDate: "2025-08-28"
          },
          accessibilityLabel: "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase I"
        }
      ];

      const mapped = mockResults.map((hotel: any) => ({
        id: hotel.hotel_id,
        name: hotel.property.name,
        location: hotel.accessibilityLabel,
        price: `₦ ${hotel.property.priceBreakdown.grossPrice.value.toLocaleString()}.00`,
        originalPrice: `NGN ${hotel.property.priceBreakdown.excludedPrice.value.toLocaleString()}`,
        image: hotel.property.photoUrls?.[0] || '',
        rating: hotel.property.reviewScore,
        reviews: hotel.property.reviewCount,
        roomType: "King size room",
        facilities: ["Pool", "Bar"],
        checkIn: "20-04-2024",
        checkOut: "29-04-2024",
        showInMap: true,
        nights: 10
      }));
      
      setHotelResults(mapped);
    } catch (e) {
      alert("Error searching hotels");
    }
    setLoadingHotels(false);
  };

  const handleActivitySearch = async () => {
    setLoadingActivities(true);
    try {
      // Simulated activity results
      const mockResults = [
        {
          id: 1,
          name: "The Museum of Modern Art",
          location: "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & a shop",
          price: "₦ 123,450.00",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 1250,
          duration: "2-3 hours",
          date: activityDate,
          time: "10:30 AM"
        }
      ];
      
      setActivityResults(mockResults);
    } catch (e) {
      alert("Error searching activities");
    }
    setLoadingActivities(false);
  };

  // Flight search remains the same...
  const handleFlightSearch = async () => {
    setLoadingFlights(true);
    // Mock implementation
    setTimeout(() => {
      setFlightResults([]);
      setLoadingFlights(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-gray-50">
      {/* Hotels Section */}
      <div className="mb-8 rounded-lg overflow-hidden" style={{ background: "#344054" }}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-white flex items-center">
            🏨 Hotels
          </h2>
          <button 
            className="bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100"
            onClick={() => setShowHotelSearch(!showHotelSearch)}
          >
            Add Hotels
          </button>
        </div>
        
        <div className="bg-white m-4 rounded-lg shadow">
          {!showHotelSearch && selectedHotels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-600 mb-4">No request yet</p>
            </div>
          ) : (
            <div className="p-4">
              {showHotelSearch && (
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={hotelQuery}
                      onChange={(e) => setHotelQuery(e.target.value)}
                      placeholder="Search hotels..."
                      className="px-3 py-2 rounded border flex-1"
                    />
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={handleHotelSearch}
                      disabled={loadingHotels}
                    >
                      {loadingHotels ? "Searching..." : "Search"}
                    </button>
                  </div>
                  
                  {hotelResults.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {hotelResults.map((hotel) => (
                        <div key={hotel.id} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div>
                            <div className="font-medium">{hotel.name}</div>
                            <div className="text-sm text-gray-600">{hotel.price}</div>
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            onClick={() => {
                              setSelectedHotels(prev => [...prev, hotel]);
                              setHotelResults(prev => prev.filter(h => h.id !== hotel.id));
                            }}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {selectedHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  {...hotel}
                  onClose={() => setSelectedHotels(prev => prev.filter(h => h.id !== hotel.id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activities Section */}
      <div className="rounded-lg overflow-hidden" style={{ background: "#0054E4" }}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-white flex items-center">
            🎯 Activities
          </h2>
          <button 
            className="bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100"
            onClick={() => setShowActivitySearch(!showActivitySearch)}
          >
            Add Activities
          </button>
        </div>
        
        <div className="bg-white m-4 rounded-lg shadow">
          {!showActivitySearch && selectedActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-600 mb-4">No request yet</p>
            </div>
          ) : (
            <div className="p-4">
              {showActivitySearch && (
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={activityQuery}
                      onChange={(e) => setActivityQuery(e.target.value)}
                      placeholder="Search activities..."
                      className="px-3 py-2 rounded border flex-1"
                    />
                    <input
                      type="date"
                      value={activityDate}
                      onChange={(e) => setActivityDate(e.target.value)}
                      className="px-3 py-2 rounded border"
                    />
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={handleActivitySearch}
                      disabled={loadingActivities}
                    >
                      {loadingActivities ? "Searching..." : "Search"}
                    </button>
                  </div>
                  
                  {activityResults.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {activityResults.map((activity) => (
                        <div key={activity.id} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-sm text-gray-600">{activity.price}</div>
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            onClick={() => {
                              setSelectedActivities(prev => [...prev, activity]);
                              setActivityResults(prev => prev.filter(a => a.id !== activity.id));
                            }}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {selectedActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onClose={() => setSelectedActivities(prev => prev.filter(a => a.id !== activity.id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsAndActivities;