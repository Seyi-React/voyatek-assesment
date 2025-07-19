import { apiClient } from '../client';
import { Flight } from '../types';

export const 
searchFlights = async (params: {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  cabinClass?: string;
  stops?: string; // e.g. 'none', 'any'
  pageNo?: number;
  sort?: string; // e.g. 'FASTEST', 'CHEAPEST', 'BEST'
}): Promise<Flight[]> => {
  try {
    const response = await apiClient.get('/flights/searchFlights', {
      params: {
        fromId: params.fromId,
        toId: params.toId,
        departDate: params.departDate,
        returnDate: params.returnDate,
        adults: params.adults,
        children: params.children || 0,
        cabinClass: params.cabinClass || 'ECONOMY',
        currency_code: 'AED',
        stops: params.stops || 'none',
        pageNo: params.pageNo || 1,
        sort: params.sort || 'FASTEST',
      },
    });


    const offers = response.data?.data?.flightOffers || [];
    return offers.map((offer: any) => {
      const firstSegment = offer.segments?.[0];
      const lastSegment = offer.segments?.[offer.segments.length - 1];
      const airlineData = firstSegment?.carriersData?.[0] || {};
      const priceObj = offer.priceBreakdown?.total || {};
      return {
        id: offer.token,
        airline: airlineData.name || '',
        airlineLogo: airlineData.logo || '',
        flightNumber: firstSegment?.flightInfo?.flightNumber || '',
        departure: {
          time: firstSegment?.departureTime || '',
          airport: firstSegment?.departureAirport?.name || '',
          city: firstSegment?.departureAirport?.cityName || '',
        },
        arrival: {
          time: lastSegment?.arrivalTime || '',
          airport: lastSegment?.arrivalAirport?.name || '',
          city: lastSegment?.arrivalAirport?.cityName || '',
        },
        price: priceObj.units !== undefined ? `${priceObj.units}${priceObj.currencyCode ? ' ' + priceObj.currencyCode : ''}` : '',
        currency: priceObj.currencyCode || 'AED',
        duration: offer.segments?.reduce((acc: number, seg: any) => acc + (seg.totalTime || 0), 0) || 0,
        stops: offer.segments?.length ? offer.segments.length - 1 : 0,
      };
    });
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

export const searchAirports = async (query: string): Promise<any[]> => {
  try {
    const response = await apiClient.get('/flights/searchAirport', {
      params: {
        query,
        locale: 'en-US',
      },
    });

    return response.data.data.airports || [];
  } catch (error) {
    console.error('Error searching airports:', error);
    throw error;
  }
};