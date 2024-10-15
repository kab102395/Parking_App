import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black p-4 shadow-lg">  {/* Black background with shadow */}
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
              to="/about" 
              className="text-white hover:text-gray-300 font-medium text-lg transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-300 font-medium text-lg transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
