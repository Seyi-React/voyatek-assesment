import React from 'react';
import { Star, MapPin, Users, Clock, X, Heart, Share2 } from 'lucide-react';
import  {HotelCardProps, ActivityCardProps} from '../lib/types';

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
  onClose
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 h-40 flex-shrink-0">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-xs sm:text-sm font-medium">{rating}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">({reviews})</span>
            </div>
            <span className="sm:ml-4 text-xs sm:text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {roomType}
            </span>
          </div>

          <div className="flex flex-wrap items-center mb-3 gap-2">
            {facilities.map((facility, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{price}</div>
            <div className="text-xs sm:text-sm text-gray-500 line-through">{originalPrice}</div>
            <div className="text-xs text-gray-600 mt-1">Includes 18 nights incl. taxes</div>
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
  onClose
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 h-40 flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-xs sm:text-sm font-medium">{rating}</span>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">({reviews})</span>
            </div>
            <span className="sm:ml-4 text-xs sm:text-sm text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {duration}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-xs sm:text-sm text-gray-700 mb-2">What's included:</p>
            <div className="text-xs sm:text-sm text-gray-600">
              {includes.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < includes.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="w-full sm:w-48 p-4 bg-gray-50 flex flex-col justify-between">
          <div className="text-right sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{price}</div>
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
  const hotels = [
    {
      id: '1',
      name: 'Riviera Resort, Lekki',
      location: '8a Yewande Agunbiade Street, Off Adeola Rotimi Adebayo Way, Lekki Phase I',
      price: '₦ 123,450.00',
      originalPrice: 'Total Price: 142,500.00',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      reviews: 340,
      roomType: 'King size room',
      facilities: ['Pool', 'Bar'],
      checkIn: '25-04-2024',
      checkOut: '25-04-2024'
    },
    {
      id: '2',
      name: 'Riviera Resort, Lekki',
      location: '8a Yewande Agunbiade Street, Off Adeola Rotimi Adebayo Way, Lekki Phase I',
      price: '₦ 123,450.00',
      originalPrice: 'Total Price: 142,500.00',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      reviews: 340,
      roomType: 'King size room',
      facilities: ['Pool', 'Bar'],
      checkIn: '25-04-2024',
      checkOut: '25-04-2024'
    }
  ];

  const activities = [
    {
      id: '1',
      title: 'The Museum of Modern Art',
      description: 'Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant.',
      price: '₦ 123,450.00',
      duration: '1 Hour',
      image: '/api/placeholder/400/300',
      rating: 4.5,
      reviews: 340,
      includes: ['Admission to the Empire State Building', 'See more']
    },
    {
      id: '2',
      title: 'The Museum of Modern Art',
      description: 'Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant.',
      price: '₦ 123,450.00',
      duration: '1 Hour',
      image: '/api/placeholder/400/300',
      rating: 4.5,
      reviews: 340,
      includes: ['Admission to the Empire State Building', 'See more']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-gray-50">
      {/* Hotels Section */}
      <div className="mb-8 rounded-lg p-2 sm:p-4" style={{ background: '#344054' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
            🏨 Hotels
          </h2>
          <button className="bg-white text-blue-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded hover:bg-gray-100">
            Add Hotels
          </button>
        </div>
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              {...hotel}
              onClose={() => console.log('Close hotel', hotel.id)}
            />
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className="rounded-lg p-2 sm:p-4" style={{ background: '#0054E4' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
            🎯 Activities
          </h2>
          <button className="bg-white text-blue-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded hover:bg-gray-100">
            Add Activities
          </button>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onClose={() => console.log('Close activity', activity.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsAndActivities;