import { apiClient } from '../client';
import { Flight } from '../types';

export const searchFlights = async (params: {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  cabinClass?: string;
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
        currency_code: 'USD',
        market: 'en-US',
      },
    });

    return response.data.data.flights.map((flight: any) => ({
      id: flight.id,
      airline: flight.airline_name,
      flightNumber: flight.flight_number,
      departure: {
        time: flight.departure_time,
        airport: flight.departure_airport,
        city: flight.departure_city,
      },
      arrival: {
        time: flight.arrival_time,
        airport: flight.arrival_airport,
        city: flight.arrival_city,
      },
      price: flight.price,
      currency: 'NGN',
      duration: flight.duration,
      stops: flight.stops || 0,
    }));
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