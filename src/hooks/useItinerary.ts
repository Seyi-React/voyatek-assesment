import { apiClient } from '../lib/client';
import { Activity } from '../lib/types';



export const searchActivities = async (params: {
  id: string; // e.g. "eyJ1ZmkiOi0yMDkyMTc0fQ=="
  sortBy?: string; // e.g. "trending"
  page?: number;
  currency_code?: string;
  languagecode?: string;
}): Promise<Activity[]> => {
  try {
    const response = await apiClient.get('/attraction/searchAttractions', {
      params: {
        id: params.id,
        sortBy: params.sortBy || 'trending',
        page: params.page || 1,
        currency_code: params.currency_code || 'INR',
        languagecode: params.languagecode || 'en-us',
      },
    });

    // Defensive: check structure
    const products = response?.data?.data?.products || [];

    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.shortDescription,
      price: product.representativePrice?.chargeAmount,
      currency: product.representativePrice?.currency,
      duration: undefined, // Not available in this API
      rating: product.reviewsStats?.combinedNumericStats?.average,
      image: product.primaryPhoto?.small,
      location: product.ufiDetails?.bCityName,
      // You can add more fields as needed from the API
    }));
  } catch (error) {
    console.error('Error searching activities:', error);
    throw error;
  }
};
