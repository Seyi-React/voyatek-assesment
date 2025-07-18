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

export const searchHotels = async (params: HotelSearchParams): Promise<any[]> => {
  try {
    const response = await apiClient.get('/hotels/searchHotels', {
      params: {
        dest_id: params.dest_id,
        search_type: params.search_type || 'CITY',
        arrival_date: params.arrival_date,
        departure_date: params.departure_date,
        adults: params.adults || '1',
        children_age: params.children_age || '0,17',
        room_qty: params.room_qty || '1',
        page_number: params.page_number || '1',
        units: params.units || 'metric',
        temperature_unit: params.temperature_unit || 'c',
        languagecode: params.languagecode || 'en-us',
        currency_code: params.currency_code || 'AED',
        location: params.location || 'US',
      },
    });
    return response.data.data.hotels || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};
