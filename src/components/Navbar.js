// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Parking Spot Finder</h1>
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-white hover:text-gray-300 font-medium text-lg transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/area/west"  // This will direct to the west parking area
              className="text-white hover:text-gray-300 font-medium text-lg transition duration-300"
            >
              Parking Area
            </Link>
          </li>
          <li>
            <Link 
              to="/reserve/1"  // This is an example, you can dynamically add the spotId
              className="text-white hover:text-gray-300 font-medium text-lg transition duration-300"
            >
              Reservation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
