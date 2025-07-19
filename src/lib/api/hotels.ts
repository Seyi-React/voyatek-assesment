import { apiClient } from '../client';

export interface HotelSearchParams {
  dest_id: string;
  search_type?: string;
  arrival_date: string;
  departure_date: string;
  adults?: string;
  children_age?: string;
  room_qty?: string;
  page_number?: string;
  units?: string;
  temperature_unit?: string;
  languagecode?: string;
  currency_code?: string;
  location?: string;
}

export interface HotelApiResponse {
  hotel_id?: string | number;
  id?: string | number;
  property?: {
    name?: string;
    priceBreakdown?: {
      grossPrice?: { value?: number };
      excludedPrice?: { value?: number };
    };
    photoUrls?: string[];
    reviewScore?: number;
    reviewCount?: number;
    facilities?: string[];
  };
  name?: string;
  accessibilityLabel?: string;
  location?: string;
  main_photo_url?: string;
  review_score?: number;
  review_nr?: number;
}

export const searchHotels = async (params: HotelSearchParams): Promise<HotelApiResponse[]> => {
  try {
    const response = await apiClient.get('/hotels/searchHotels', {
      params: {
        dest_id: -2092174,
        search_type: 'CITY',
        arrival_date: params.arrival_date || '2025-08-20',
        departure_date: params.departure_date || '2025-08-27',
        adults: params.adults || '1',
        children_age: params.children_age || '0',
        room_qty: params.room_qty || '1',
        page_number: '1',
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
        currency_code: 'USD',
        location:  'US',
      },
    });
    return response.data.data.hotels || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};
