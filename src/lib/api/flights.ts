import { apiClient } from '../client';
import { Flight } from '../types';

export interface FlightOffer {
  token: string;
  segments: Array<{
    carriersData?: Array<{ name?: string; logo?: string }>;
    flightInfo?: { flightNumber?: string };
    departureTime?: string;
    departureAirport?: { name?: string; cityName?: string };
    arrivalTime?: string;
    arrivalAirport?: { name?: string; cityName?: string };
    totalTime?: number;
  }>;
  priceBreakdown?: { total?: { units?: number; currencyCode?: string } };
}

export const searchFlights = async (params: {
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
        fromId: "BOM.AIRPORT",
          toId: 'DEL.AIRPORT',
        departDate: params.departDate,
        returnDate: params.returnDate,
        adults: 1,
        children: 0,
        cabinClass: 'ECONOMY',
        currency_code: 'AED',
        stops: 'none',
        pageNo: params.pageNo || 1,
        sort:'CHEAPEST',
      },
    });


    const offers: FlightOffer[] = response.data?.data?.flightOffers || [];
    return offers.map((offer) => {
      const firstSegment = offer.segments?.[0];
      const lastSegment = offer.segments[offer.segments.length - 1];
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
        price: typeof priceObj.units === 'number' ? priceObj.units : 0,
        currency: priceObj.currencyCode || 'AED',
        duration: offer.segments?.reduce((acc: number, seg) => acc + (seg.totalTime || 0), 0).toString() || '0',
        stops: offer.segments?.length ? offer.segments.length - 1 : 0,
      };
    });
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

export interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  iata: string;
}

export const searchAirports = async (query: string): Promise<Airport[]> => {
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