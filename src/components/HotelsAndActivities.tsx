import React, { useState } from "react";
import { Star, MapPin, Users, Clock, X, Heart, Share2, Bed, Calendar, Search, Loader2 } from "lucide-react";
import { searchActivities } from "../lib/api/activities";
import { searchHotels, HotelSearchParams } from "../lib/api/hotels";

// Your existing interfaces remain the same
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

// Your existing card components remain the same
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

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                {location}
              </p>
              
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

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                {location}
              </p>
              
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
  // Hotels state
  const [hotelResults, setHotelResults] = useState<any[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [selectedHotels, setSelectedHotels] = useState<HotelCardProps[]>([]);
  const [showHotelSearch, setShowHotelSearch] = useState(false);
  const [hotelSearchParams, setHotelSearchParams] = useState({
    dest_id: '',
    arrival_date: '',
    departure_date: '',
    adults: '2',
    room_qty: '1'
  });

  // Activities state
  const [activityResults, setActivityResults] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<ActivityCardProps[]>([]);
  const [showActivitySearch, setShowActivitySearch] = useState(false);
  const [activitySearchParams, setActivitySearchParams] = useState({
    id: '',
    sortBy: 'trending',
    currency_code: 'NGN'
  });

  // Real API Hotel Search
  const handleHotelSearch = async () => {
    if (!hotelSearchParams.dest_id || !hotelSearchParams.arrival_date || !hotelSearchParams.departure_date) {
      alert('Please fill in all required fields (Destination ID, Check-in, Check-out dates)');
      return;
    }

    setLoadingHotels(true);
    try {
      const searchParams: HotelSearchParams = {
        dest_id: hotelSearchParams.dest_id,
        arrival_date: hotelSearchParams.arrival_date,
        departure_date: hotelSearchParams.departure_date,
        adults: hotelSearchParams.adults,
        room_qty: hotelSearchParams.room_qty,
        currency_code: 'NGN',
        languagecode: 'en-us',
        location: 'NG'
      };

      const results = await searchHotels(searchParams);
      
      // Transform API results to your card format
      const mappedResults = results.map((hotel: any) => ({
        id: hotel.hotel_id || hotel.id,
        name: hotel.property?.name || hotel.name || 'Hotel Name',
        location: hotel.accessibilityLabel || hotel.location || 'Location not specified',
        price: hotel.property?.priceBreakdown?.grossPrice ? 
          `₦${hotel.property.priceBreakdown.grossPrice.value?.toLocaleString() || '0'}` : 'Price unavailable',
        originalPrice: hotel.property?.priceBreakdown?.excludedPrice ? 
          `NGN ${hotel.property.priceBreakdown.excludedPrice.value?.toLocaleString() || '0'}` : undefined,
        image: hotel.property?.photoUrls?.[0] || hotel.main_photo_url || '',
        rating: hotel.property?.reviewScore || hotel.review_score || 0,
        reviews: hotel.property?.reviewCount || hotel.review_nr || 0,
        roomType: "Standard Room",
        facilities: hotel.property?.facilities?.slice(0, 3) || ["WiFi", "AC"],
        checkIn: hotelSearchParams.arrival_date,
        checkOut: hotelSearchParams.departure_date,
        showInMap: true,
        nights: Math.ceil((new Date(hotelSearchParams.departure_date).getTime() - new Date(hotelSearchParams.arrival_date).getTime()) / (1000 * 60 * 60 * 24))
      }));

      setHotelResults(mappedResults);
    } catch (error) {
      console.error('Hotel search error:', error);
      alert('Error searching hotels. Please check your parameters and try again.');
    }
    setLoadingHotels(false);
  };

  // Real API Activity Search
  const handleActivitySearch = async () => {
    if (!activitySearchParams.id) {
      alert('Please enter an Activity ID (e.g., eyJ1ZmkiOi0yMDkyMTc0fQ==)');
      return;
    }

    setLoadingActivities(true);
    try {
      const results = await searchActivities({
        id: activitySearchParams.id,
        sortBy: activitySearchParams.sortBy,
        currency_code: activitySearchParams.currency_code,
        languagecode: 'en-us'
      });

      // Transform API results to your card format
      const mappedResults = results.map((activity: any) => ({
        id: activity.id,
        name: activity.name || 'Activity Name',
        location: activity.location || 'Location not specified',
        price: activity.price && activity.currency ? 
          `${activity.currency === 'NGN' ? '₦' : activity.currency} ${activity.price?.toLocaleString() || '0'}` : 'Price unavailable',
        image: activity.image || '',
        rating: activity.rating || 0,
        reviews: Math.floor(Math.random() * 1000) + 100, // Since reviews aren't in your API response
        duration: activity.duration || '2-3 hours',
        date: new Date().toISOString().split('T')[0], // Today's date as default
        time: "10:30 AM"
      }));

      setActivityResults(mappedResults);
    } catch (error) {
      console.error('Activity search error:', error);
      alert('Error searching activities. Please check your Activity ID and try again.');
    }
    setLoadingActivities(false);
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
              <p className="text-gray-600 mb-4">No hotels selected yet</p>
            </div>
          ) : (
            <div className="p-4">
              {showHotelSearch && (
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination ID *</label>
                      <input
                        type="text"
                        value={hotelSearchParams.dest_id}
                        onChange={(e) => setHotelSearchParams(prev => ({...prev, dest_id: e.target.value}))}
                        placeholder="e.g., -2140479 (Lagos)"
                        // className="w-full px-3 py-2 rounded border border-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
                      <input
                        type="date"
                        value={hotelSearchParams.arrival_date}
                        onChange={(e) => setHotelSearchParams(prev => ({...prev, arrival_date: e.target.value}))}
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
                      <input
                        type="date"
                        value={hotelSearchParams.departure_date}
                        onChange={(e) => setHotelSearchParams(prev => ({...prev, departure_date: e.target.value}))}
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                      <select
                        value={hotelSearchParams.adults}
                        onChange={(e) => setHotelSearchParams(prev => ({...prev, adults: e.target.value}))}
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                      <select
                        value={hotelSearchParams.room_qty}
                        onChange={(e) => setHotelSearchParams(prev => ({...prev, room_qty: e.target.value}))}
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      >
                        <option value="1">1 Room</option>
                        <option value="2">2 Rooms</option>
                        <option value="3">3 Rooms</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleHotelSearch}
                    disabled={loadingHotels}
                  >
                    {loadingHotels ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Search Hotels
                      </>
                    )}
                  </button>
                  
                  {hotelResults.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-2">
                      <h4 className="font-medium text-gray-900">Search Results ({hotelResults.length})</h4>
                      {hotelResults.map((hotel, index) => (
                        <div key={hotel.id || index} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-medium">{hotel.name}</div>
                            <div className="text-sm text-gray-600">{hotel.location}</div>
                            <div className="text-sm font-medium text-green-600">{hotel.price}</div>
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
                            onClick={() => {
                              setSelectedHotels(prev => [...prev, hotel]);
                              setHotelResults(prev => prev.filter((_, i) => i !== index));
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
              
              {selectedHotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id || index}
                  {...hotel}
                  onClose={() => setSelectedHotels(prev => prev.filter((_, i) => i !== index))}
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
              <p className="text-gray-600 mb-4">No activities selected yet</p>
            </div>
          ) : (
            <div className="p-4">
              {showActivitySearch && (
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Activity ID *</label>
                      <input
                        type="text"
                        value={activitySearchParams.id}
                        onChange={(e) => setActivitySearchParams(prev => ({...prev, id: e.target.value}))}
                        placeholder="e.g., eyJ1ZmkiOi0yMDkyMTc0fQ=="
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        value={activitySearchParams.sortBy}
                        onChange={(e) => setActivitySearchParams(prev => ({...prev, sortBy: e.target.value}))}
                        // className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                      >
                        <option value="trending">Trending</option>
                        <option value="price_low_to_high">Price: Low to High</option>
                        <option value="price_high_to_low">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleActivitySearch}
                    disabled={loadingActivities}
                  >
                    {loadingActivities ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Search Activities
                      </>
                    )}
                  </button>
                  
                  {activityResults.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-2">
                      <h4 className="font-medium text-gray-900">Search Results ({activityResults.length})</h4>
                      {activityResults.map((activity, index) => (
                        <div key={activity.id || index} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-sm text-gray-600">{activity.location}</div>
                            <div className="text-sm font-medium text-green-600">{activity.price}</div>
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            onClick={() => {
                              setSelectedActivities(prev => [...prev, activity]);
                              setActivityResults(prev => prev.filter((_, i) => i !== index));
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
              
              {selectedActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id || index}
                  {...activity}
                  onClose={() => setSelectedActivities(prev => prev.filter((_, i) => i !== index))}
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