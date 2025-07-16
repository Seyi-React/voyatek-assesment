// import { apiClient } from './client';
import { apiClient } from '../client';
import { Activity } from '../types';

export const searchActivities = async (params: {
  destination: string;
  date: string;
}): Promise<Activity[]> => {
  try {
    const response = await apiClient.get('/attractions/searchAttractions', {
      params: {
        dest_id: params.destination,
        search_type: 'CITY',
        arrival_date: params.date,
        departure_date: params.date,
        languagecode: 'en-us',
        currency_code: 'USD',
      },
    });

    return response.data.data.attractions.map((activity: any) => ({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      price: activity.price,
      currency: 'NGN',
      duration: activity.duration,
      rating: activity.rating,
      image: activity.image_url,
      location: activity.location,
    }));
  } catch (error) {
    console.error('Error searching activities:', error);
    throw error;
  }
};
