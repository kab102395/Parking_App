import React from 'react';
import { Link } from 'react-router-dom';

function CampusAreaSelection() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-black mb-8">Select Campus Area</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* West Campus */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">West Campus</h2>
            <p className="text-black">Buildings: 1, 2, 4, 6, 7, 8, 10, 21</p>
            <Link to="/area/west" className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg">View Parking</Link>
          </div>

          {/* North Campus */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">North Campus</h2>
            <p className="text-black">Buildings: 10A, 37, 38, 38A, 39A, 41</p>
            <Link to="/area/north" className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg">View Parking</Link>
          </div>

          {/* East Campus */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">East Campus</h2>
            <p className="text-black">Buildings: 11, 15, 29, 30</p>
            <Link to="/area/east" className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg">View Parking</Link>
          </div>

          {/* South Campus */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">South Campus</h2>
            <p className="text-black">Buildings: 35, 14, 27</p>
            <Link to="/area/south" className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg">View Parking</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampusAreaSelection;
