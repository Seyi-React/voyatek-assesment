import { apiClient } from '../client';
import { Activity } from '../types';



export const searchActivities = async (params: {
  id: string; 
  sortBy?: string;
  page?: number;
  currency_code?: string;
  languagecode?: string;
}): Promise<Activity[]> => {
  try {
    const response = await apiClient.get('/attraction/searchAttractions', {
      params: {
        id:"eyJ1ZmkiOi0yMDkyMTc0fQ==",
        sortBy: params.sortBy || 'trending',
        page: params.page || 1,
        currency_code:  'EUR',
        languagecode: 'en-us',
      },
    });

    
    const products = response?.data?.data?.products || [];

    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.shortDescription,
      price: product.representativePrice?.chargeAmount,
      currency: product.representativePrice?.currency,
      duration: undefined,
      rating: product.reviewsStats?.combinedNumericStats?.average,
      image: product.primaryPhoto?.small,
      location: product.ufiDetails?.bCityName,
  
    }));
  } catch (error) {
    console.error('Error searching activities:', error);
    throw error;
  }
};
