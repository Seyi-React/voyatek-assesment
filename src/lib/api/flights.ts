// import { apiClient } from './client';
import { apiClient } from '../client';
import { Hotel, SearchParams } from '../types';

export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  try {
    const response = await apiClient.get('/hotels/searchHotels', {
      params: {
        dest_id: params.destination,
        search_type: 'CITY',
        arrival_date: params.checkIn,
        departure_date: params.checkOut,
        adults: params.adults,
        children_age: params.children || 0,
        room_qty: params.rooms || 1,
        page_number: 1,
        languagecode: 'en-us',
        currency_code: 'USD',
      },
    });

    return response.data.data.hotels.map((hotel: any) => ({
      id: hotel.hotel_id,
      name: hotel.hotel_name,
      price: hotel.min_total_price,
      currency: 'NGN',
      rating: hotel.review_score,
      image: hotel.main_photo_url,
      location: hotel.address,
      amenities: hotel.hotel_facilities || [],
    }));
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};
