import React, { useState } from "react";
import { Star, MapPin, Users, Clock, X, Heart, Share2 } from "lucide-react";
import { HotelCardProps, ActivityCardProps, Flight } from "../lib/types";
import { searchFlights } from "../lib/api/flights";

import { searchActivities } from "../lib/api/activities";
import { searchHotels } from "../lib/api/hotels";


const HotelCard: React.FC<HotelCardProps> = ({
  name,
  location,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  roomType,
  facilities,
  checkIn,
  checkOut,
  onClose,
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 h-40 flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-xs sm:text-sm font-medium">
                {rating}
              </span>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">
                ({reviews})
              </span>
            </div>
            <span className="sm:ml-4 text-xs sm:text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {roomType}
            </span>
          </div>

          <div className="flex flex-wrap items-center mb-3 gap-2">
            {facilities.map((facility, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {facility}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <span className="mr-4">Check In: {checkIn}</span>
              <span>Check Out: {checkOut}</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="w-full sm:w-48 p-4 bg-gray-50 flex flex-col justify-between">
          <div className="text-right sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">
              {price}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 line-through">
              {originalPrice}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Includes 18 nights incl. taxes
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
              Hotel details
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Price details
            </button>
            <button className="w-full text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 transition-colors">
              Edit details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  price,
  duration,
  image,
  rating,
  reviews,
  includes,
  onClose,
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 h-40 flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-xs sm:text-sm font-medium">
                {rating}
              </span>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">
                ({reviews})
              </span>
            </div>
            <span className="sm:ml-4 text-xs sm:text-sm text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {duration}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-xs sm:text-sm text-gray-700 mb-2">
              What's included:
            </p>
            <div className="text-xs sm:text-sm text-gray-600">
              {includes.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < includes.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="w-full sm:w-48 p-4 bg-gray-50 flex flex-col justify-between">
          <div className="text-right sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">
              {price}
            </div>
            <div className="text-xs text-gray-600 mt-1">10:30 AM on Mar 18</div>
          </div>

          <div className="mt-4 space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
              Activity details
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Price details
            </button>
            <button className="w-full text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 transition-colors">
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
  const [selectedHotels, setSelectedHotels] = useState<any[]>([]);
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
  const [selectedActivities, setSelectedActivities] = useState<any[]>([]);
  const [showActivitySearch, setShowActivitySearch] = useState(false);

  // --- Hotel Search Handler (implement searchHotels if you have it) ---
  const handleHotelSearch = async () => {
    setLoadingHotels(true);
    try {
      // TODO: Map hotelQuery to dest_id dynamically. For now, use static dest_id for demo.
      const results = await searchHotels({
        dest_id: "-2092174", // Should be dynamic based on hotelQuery
        arrival_date: "2025-08-14", // Should be dynamic
        departure_date: "2025-08-28", // Should be dynamic
        search_type: "CITY",
        adults: "1",
        children_age: "0,17",
        room_qty: "1",
        page_number: "1",
        units: "metric",
        temperature_unit: "c",
        languagecode: "en-us",
        currency_code: "AED",
        location: "US",
      });
      // Map API hotel data to HotelCardProps
      const mapped = results.map((hotel: any) => ({
        id: hotel.hotel_id || hotel.property?.id,
        name: hotel.name,
        location: hotel.accessibilityLabel,
        price: hotel.property?.priceBreakdown?.grossPrice?.value
          ? `${hotel.property.priceBreakdown.grossPrice.value} ${hotel.property.priceBreakdown.grossPrice.currency}`
          : '',
        originalPrice: hotel.property?.priceBreakdown?.excludedPrice?.value
          ? `${hotel.property.priceBreakdown.excludedPrice.value} ${hotel.property.priceBreakdown.excludedPrice.currency}`
          : '',
        image: hotel.photoUrls?.[0] || '',
        rating: hotel.reviewScore,
        reviews: hotel.reviewCount,
        roomType: hotel.accessibilityLabel?.split('Hotel room :')[1]?.split('.')[0]?.trim() || '',
        facilities: [], // Not available in API response
        checkIn: hotel.property?.checkin?.fromTime || '',
        checkOut: hotel.property?.checkout?.untilTime || '',
      }));
      setHotelResults(mapped);
    } catch (e) {
      alert("Error searching hotels");
    }
    setLoadingHotels(false);
  };

  // --- Flight Search Handler ---
  const handleFlightSearch = async () => {
    setLoadingFlights(true);
    try {
      const results = await searchFlights({
        fromId: flightFrom,
        toId: flightTo,
        departDate: flightDate,
        adults: 1,
      });
      setFlightResults(results);
    } catch (e) {
      alert("Error searching flights");
    }
    setLoadingFlights(false);
  };

  // --- Activity Search Handler ---
  const handleActivitySearch = async () => {
    setLoadingActivities(true);
    try {
      const results = await searchActivities({
        destination: activityQuery,
        date: activityDate,
      });
      setActivityResults(results);
    } catch (e) {
      alert("Error searching activities");
    }
    setLoadingActivities(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-gray-50">
      {/* Search Section - Hotels */}
      <div
        className="mb-8 rounded-lg p-2 sm:p-4"
        style={{ background: "#344054" }}
      >
        <h2 className="text-lg sm:text-xl font-semi text-white flex items-center mb-2">
          Hotels
        </h2>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 m-2 sm:m-4">
          {!showHotelSearch ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-700 mb-4">No request yet</p>
              <button
                className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowHotelSearch(true)}
              >
                Add Hotel
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={hotelQuery}
                    onChange={(e) => setHotelQuery(e.target.value)}
                    placeholder="Search hotels..."
                    className="px-2 py-1 rounded border"
                  />
                  <button
                    className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleHotelSearch}
                    disabled={loadingHotels}
                  >
                    {loadingHotels ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
              {/* Search Results */}
              {hotelResults.length > 0 && (
                <div className="space-y-2 mb-4">
                  {hotelResults.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-gray-50 p-2 rounded flex justify-between items-center"
                    >
                      <span>{hotel.name}</span>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() =>
                          setSelectedHotels((prev) => [...prev, hotel])
                        }
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Itinerary Hotels */}
              <div className="space-y-4">
                {selectedHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    {...hotel}
                    onClose={() =>
                      setSelectedHotels((prev) =>
                        prev.filter((h) => h.id !== hotel.id)
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Section - Flights */}
      <div
        className="mb-8 rounded-lg p-2 sm:p-4"
        style={{ background: "#344054" }}
      >
        <h2 className="text-lg sm:text-xl font-semi text-white flex items-center mb-2">
          Flights
        </h2>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 m-2 sm:m-4">
          {!showFlightSearch ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-700 mb-4">No request yet</p>
              <button
                className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowFlightSearch(true)}
              >
                Add Flight
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    placeholder="From (Airport ID)"
                    className="px-2 py-1 rounded border"
                  />
                  <input
                    type="text"
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    placeholder="To (Airport ID)"
                    className="px-2 py-1 rounded border"
                  />
                  <input
                    type="date"
                    value={flightDate}
                    onChange={(e) => setFlightDate(e.target.value)}
                    className="px-2 py-1 rounded border"
                  />
                  <button
                    className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleFlightSearch}
                    disabled={loadingFlights}
                  >
                    {loadingFlights ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
              {/* Search Results */}
              {flightResults.length > 0 && (
                <div className="space-y-2 mb-4">
                  {flightResults.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-gray-50 p-2 rounded flex justify-between items-center"
                    >
                      <span>
                        {flight.airline} {flight.flightNumber}
                      </span>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() =>
                          setSelectedFlights((prev) => [...prev, flight])
                        }
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Itinerary Flights */}
              <div className="space-y-4">
                {selectedFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white p-4"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white border">
                          {/* Replace with airline logo if available */}
                          <img
                            src="/america.svg"
                            alt={flight.airline}
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-black">
                            {flight.airline}
                          </p>
                          <p className="text-sm text-black">
                            {flight.flightNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                        <div className="text-center">
                          <p className="font-semibold text-black">
                            {flight.departure.time}
                          </p>
                          <p className="text-sm text-black">
                            {flight.departure.airport}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="w-16 h-0.5 bg-gray-300"></div>
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div className="w-16 h-0.5 bg-gray-300"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-black">
                            {flight.arrival.time}
                          </p>
                          <p className="text-sm text-black">
                            {flight.arrival.airport}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-black">
                          {flight.price} {flight.currency}
                        </p>
                        <button
                          className="text-red-500 hover:text-red-600 text-sm"
                          onClick={() =>
                            setSelectedFlights((prev) =>
                              prev.filter((f) => f.id !== flight.id)
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Section - Activities */}
      <div className="rounded-lg p-2 sm:p-4" style={{ background: "#0054E4" }}>
        <h2 className="text-lg sm:text-xl font-semi text-white flex items-center mb-2">
          Activities
        </h2>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 m-2 sm:m-4">
          {!showActivitySearch ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-700 mb-4">No request yet</p>
              <button
                className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowActivitySearch(true)}
              >
                Add Activity
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={activityQuery}
                    onChange={(e) => setActivityQuery(e.target.value)}
                    placeholder="Destination..."
                    className="px-2 py-1 rounded border"
                  />
                  <input
                    type="date"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className="px-2 py-1 rounded border"
                  />
                  <button
                    className="bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleActivitySearch}
                    disabled={loadingActivities}
                  >
                    {loadingActivities ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
              {/* Search Results */}
              {activityResults.length > 0 && (
                <div className="space-y-2 mb-4">
                  {activityResults.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-50 p-2 rounded flex justify-between items-center"
                    >
                      <span>{activity.name}</span>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() =>
                          setSelectedActivities((prev) => [...prev, activity])
                        }
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Itinerary Activities */}
              <div className="space-y-4">
                {selectedActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    {...activity}
                    onClose={() =>
                      setSelectedActivities((prev) =>
                        prev.filter((a) => a.id !== activity.id)
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsAndActivities;
