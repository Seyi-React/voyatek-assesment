"use client";

import React from "react";
import Image from "next/image";
import {
  Search,
  User,
  Bell,
  Calendar,
  MapPin,
  Clock,
  Plane,
  Menu,
  LayoutDashboard,
  Wallet,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import HotelsAndActivities from "../components/HotelsAndActivities";
import { useEffect, useState } from "react";
import { searchFlights } from "../lib/api/flights";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [flightSearchParams, setFlightSearchParams] = useState({
    fromId: "BOM.AIRPORT",
    toId: "DEL.AIRPORT",
    departDate: new Date().toISOString().split("T")[0],
    adults: 1,
  });
  const [hasSearchedFlights, setHasSearchedFlights] = useState(false);

  const isFlightSearchReady =
    flightSearchParams.fromId.trim() &&
    flightSearchParams.toId.trim() &&
    flightSearchParams.departDate.trim() &&
    flightSearchParams.adults > 0;

  const handleFlightSearch = async () => {
    if (!isFlightSearchReady) return;
    setLoadingFlights(true);
    setHasSearchedFlights(true);
    try {
      const results = await searchFlights({
        ...flightSearchParams,
      });
      setFlights(results);
    } catch (error) {
      setFlights([]);
    }
    setLoadingFlights(false);
  };

  useEffect(() => {
    handleFlightSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b py-2 md:py-4">
        <div className="flex items-center justify-between px-2 md:px-6 py-3 w-full">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden mr-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Left: Logo & Search */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <Image src="/logo.svg" alt="TravelPro" width={32} height={32} className="w-8 h-8 rounded" />
            <div className="relative w-28 md:w-36">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Center: Main Nav (horizontal, icons above text) */}
          <nav className="hidden md:flex items-end space-x-2 mx-2">
            <div className="flex flex-col items-center text-xs text-gray-500">
              <Menu className="w-5 h-5 mb-1" />
              Home
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <LayoutDashboard className="w-5 h-5 mb-1" />
              Dashboard
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <Wallet className="w-5 h-5 mb-1" />
              Wallet
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <Calendar className="w-5 h-5 mb-1" />
              Plan a Trip
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <User className="w-5 h-5 mb-1" />
              Commission for Life
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mx-2 hidden md:block">
              Subscribe
            </button>
          </nav>

          {/* Divider */}
          <div className="hidden md:block h-8 border-l border-gray-300 mx-1" />

          {/* Right: Secondary Nav */}
          <nav className="hidden md:flex items-end space-x-6 mx-0">
            <div className="flex flex-col items-center text-xs text-gray-500">
              <Bell className="w-5 h-5 mb-1" />
              Notification
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <ShoppingCart className="w-5 h-5 mb-1" />
              Carts
            </div>
            <div className="flex flex-col items-center text-xs text-gray-500">
              <PlusCircle className="w-5 h-5 mb-1" />
              Create
            </div>
          </nav>

          {/* Avatar with Dropdown */}
          <div className="relative ml-1">
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none">
              <Image
                src="/woman.svg"
                alt="Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`
            bg-white shadow-sm h-screen md:h-auto md:static
            w-64 fixed md:relative z-20 top-0 left-0
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { name: "Activities", icon: LayoutDashboard, active: true },
                { name: "Hotels", icon: Wallet },
                { name: "Flights", icon: Plane },
                { name: "Study", icon: Calendar },
                { name: "Visa", icon: Bell },
                { name: "Immigration", icon: MapPin },
                { name: "Medical", icon: User },
                { name: "Vacation Package", icon: ShoppingCart },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-400 border-l-4 border-blue-500"
                        : "text-gray-600 hover:bg-gray-50 text-xs"
                    }`}
                  >
                    <span className="text-lg">
                      <item.icon className={item.active ? "text-blue-400" : "text-gray-400"} />
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Trip Header */}
          <div className="mb-8">
           
            <div
              className="relative rounded-2xl p-4 md:p-6 flex items-center"
              style={{ background: "#CFE9FF", minHeight: "100px" }}
            >
              {/* Left: Clouds and Tree */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Clouds */}
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
                  <div className="w-4 h-4 bg-white rounded-full opacity-70 -ml-2"></div>
                  <div className="w-5 h-5 bg-white rounded-full opacity-60 -ml-2"></div>
                </div>
                {/* Tree Image, rotated a bit */}
                <Image
                  src="/tree.svg"
                  alt="Tree"
                  width={80}
                  height={80}
                  className="w-12 h-12 md:w-20 md:h-20"
                  style={{ transform: "rotate(-12deg)" }}
                />
              </div>
              {/* Sun Image: absolutely positioned top right */}
              <Image
                src="/sun.svg"
                alt="Sun"
                width={64}
                height={64}
                className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16"
                style={{ zIndex: 1 }}
              />
            </div>
            {/* Trip info text and button below the colored div */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
              <div>
                <h2 className="text-2xl md:text-2xl font-bold text-black mb-2">
                  Bahamas Family Trip
                </h2>
                {/* <p className="text-black mb-1">25 February 2024 • 8 day trip</p> */}
                <p className="text-black text-gray-600">
                  New York, United States of America → Bahamas
                </p>
              </div>
              <button className="flex items-center bg-light-blue-600 text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
                <User className="w-5 h-5 mr-2" />+
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 text-white p-4 md:p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Activities</h3>
              <p className="text-gray-300 text-sm mb-4">
                Explore and add activities to your itinerary
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">
                Add Activities
              </button>
            </div>

            <div className="bg-gray-100 p-4 md:p-6 rounded-xl">
              <h3 className="font-semibold mb-2 text-gray-800">Hotels</h3>
              <p className="text-gray-600 text-sm mb-4">
                Find and book hotels along your journey
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">
                Add Hotels
              </button>
            </div>

            <div className="bg-blue-500 text-white p-4 md:p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Flights</h3>
              <p className="text-blue-100 text-sm mb-4">
                Search and compare flight options
              </p>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full">
                Add Flights
              </button>
            </div>
          </div>

          {/* Trip Itinerary */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 md:p-6 border-b">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Trip Itineraries
                </h3>
                <p className="text-gray-600">Manage your trip itineraries</p>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <span className="font-medium text-gray-900">Flights</span>
                <button
                  className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
                  onClick={() => setShowFlightSearch((prev) => !prev)}
                >
                  {showFlightSearch ? "Close Search" : "Add/Search Flights"}
                </button>
              </div>


              {/* Flight Search Form */}
              {showFlightSearch && (
                <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From (Airport ID)</label>
                      <input
                        type="text"
                        value={flightSearchParams.fromId}
                        onChange={e => setFlightSearchParams(prev => ({ ...prev, fromId: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. BOM.AIRPORT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To (Airport ID)</label>
                      <input
                        type="text"
                        value={flightSearchParams.toId}
                        onChange={e => setFlightSearchParams(prev => ({ ...prev, toId: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. DEL.AIRPORT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                      <input
                        type="date"
                        value={flightSearchParams.departDate}
                        onChange={e => setFlightSearchParams(prev => ({ ...prev, departDate: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                      <select
                        value={flightSearchParams.adults}
                        onChange={e => setFlightSearchParams(prev => ({ ...prev, adults: Number(e.target.value) }))}
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleFlightSearch}
                    disabled={loadingFlights || !isFlightSearchReady}
                  >
                    {loadingFlights ? (
                      <>
                        <span className="loader2 w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Search Flights
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Flight Cards (API integrated) */}
              <div
                className="space-y-4 overflow-x-auto pb-2"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  maxHeight: '350px',
                  overflowY: 'auto',
                  marginBottom: '1rem',
                }}
              >
                {!hasSearchedFlights ? (
                  <div className="text-center py-8 text-gray-500">Fill all fields and search to see flights.</div>
                ) : loadingFlights ? (
                  <div className="text-center py-8 text-gray-500">Loading flights...</div>
                ) : flights.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No flights found.</div>
                ) : (
                  flights.map((flight, idx) => (
                    <div key={flight.id || idx} className="border rounded-lg p-4 min-w-[340px] md:min-w-0">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white border">
                            <Image
                              src={flight.airlineLogo || "/america.svg"}
                              alt={flight.airline || "Airline"}
                              width={28}
                              height={28}
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {flight.airline || "Airline"}
                            </p>
                            <p className="text-sm text-gray-900">{flight.flightNumber || "-"}</p>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                          <div className="text-center">
                            <p className="font-semibold text-gray-900">{flight.departure?.time?.slice(11, 16) || "--:--"}</p>
                            <p className="text-sm text-gray-900">{flight.departure?.airport || "-"}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-16 h-0.5 bg-gray-900"></div>
                            <Clock className="w-4 h-4 text-gray-900" />
                            <div className="w-16 h-0.5 bg-gray-900"></div>
                            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                          </div>

                          <div className="text-center">
                            <p className="font-semibold text-gray-900">{flight.arrival?.time?.slice(11, 16) || "--:--"}</p>
                            <p className="text-sm text-gray-900">{flight.arrival?.airport || "-"}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            {flight.currency === "NGN" || flight.currency === "₦" ? "₦" : (flight.currency || "")} {flight.price?.toLocaleString()}
                          </p>
                          <button className="text-red-500 hover:text-red-600 text-sm">
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
                        <span>• Duration: {Math.floor(Number(flight.duration) / 60)}h {Number(flight.duration) % 60}m</span>
                        <span>• Stops: {flight.stops}</span>
                      </div>

                      <div className="mt-3 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <button className="text-blue-500 hover:text-blue-600 text-sm">
                          Flight details
                        </button>
                        <button className="text-blue-500 hover:text-blue-600 text-sm">
                          Price details
                        </button>
                        <button className="text-blue-500 hover:text-blue-600 text-sm md:ml-auto">
                          Edit details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <HotelsAndActivities />
        </main>
      </div>
    </div>
  );
};

export default Home;
