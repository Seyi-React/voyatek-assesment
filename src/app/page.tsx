'use client';


import React, { useState } from 'react';
import { Search, User, Bell, Calendar, MapPin, Clock, Plane, Menu, LayoutDashboard, Wallet, PlusCircle, ShoppingCart } from 'lucide-react';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b py-2 md:py-4">
        <div className="flex items-center justify-between px-2 md:px-6 py-3 w-full">
          {/* Left: Logo & Search */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <img src="/logo.png" alt="TravelPro" className="w-8 h-8 rounded" />
            <div className="relative w-28 md:w-36">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Center: Main Nav (horizontal, icons above text) */}
          <nav className="hidden md:flex items-end space-x-6 mx-4">
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
          <div className="hidden md:block h-8 border-l border-gray-300 mx-2" />

          {/* Right: Secondary Nav */}
          <nav className="hidden md:flex items-end space-x-6 mx-2">
            <div className="flex flex-col items-center text-xs text-black">
              <Bell className="w-5 h-5 mb-1" />
              Notification
            </div>
            <div className="flex flex-col items-center text-xs text-black">
              <ShoppingCart className="w-5 h-5 mb-1" />
              Carts
            </div>
            <div className="flex flex-col items-center text-xs text-black">
              <PlusCircle className="w-5 h-5 mb-1" />
              Create
            </div>
          </nav>

          {/* Avatar with Dropdown */}
          <div className="relative ml-2">
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none">
              <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
            </button>
            {/* Dropdown logic can be added here */}
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
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { name: 'Activities', icon: '📊', active: true },
                { name: 'Hotels', icon: '🏨' },
                { name: 'Flights', icon: '✈️' },
                { name: 'Study', icon: '🎯' },
                { name: 'Visa', icon: '💬' },
                { name: 'Immigration', icon: '🚗' },
                { name: 'Medical', icon: '🏥' },
                { name: 'Vacation Package', icon: '🏖️' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
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
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-4 md:p-6 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  ☀️
                </div>
              </div>
              <div className="absolute bottom-4 right-8 md:right-16">
                <div className="text-4xl md:text-6xl">🌴</div>
              </div>
              <div>
                <p className="text-blue-100 mb-2 text-sm md:text-base">25 February 2024 • 8 day trip</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Bahamas Family Trip</h2>
                <p className="text-blue-100 text-sm md:text-base">New York, United States of America → Bahamas</p>
              </div>
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <h3 className="text-lg md:text-xl font-semibold">Trip Itinerary</h3>
                <button className="text-blue-500 hover:text-blue-600">
                  View in planner
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <Plane className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Flights</span>
                <button className="text-blue-500 text-sm hover:text-blue-600">
                  Manage
                </button>
              </div>
              
              {/* Flight Cards */}
              <div className="space-y-4">
                {[1, 2].map((flight) => (
                  <div key={flight} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">AA</span>
                        </div>
                        <div>
                          <p className="font-medium">American Airlines</p>
                          <p className="text-sm text-gray-600">AA 8034</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                        <div className="text-center">
                          <p className="font-semibold">06:35</p>
                          <p className="text-sm text-gray-600">JFK</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="w-16 h-0.5 bg-gray-300"></div>
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div className="w-16 h-0.5 bg-gray-300"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        
                        <div className="text-center">
                          <p className="font-semibold">09:55</p>
                          <p className="text-sm text-gray-600">NAS</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg">₦123,450.00</p>
                        <button className="text-red-500 hover:text-red-600 text-sm">
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
                      <span>• Facilities: 🧳 Baggage 20kg</span>
                      <span>• Cabin Baggage: 10kg</span>
                      <span>• In-flight entertainment: ✓</span>
                      <span>• In-flight meal: ✓</span>
                      <span>• USB Port</span>
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
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
