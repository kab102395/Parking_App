import React, { useState, useEffect } from 'react';
import db from '../Firebase';
import styles from './Home.module.css';  // Import the CSS module

function Home() {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('parkingSpots').get();
      const spots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParkingSpots(spots);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">  {/* Light background */}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6 text-center">Available Parking Spots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  {/* Responsive grid */}
          {parkingSpots.length > 0 ? (
            parkingSpots.map((spot) => (
              <div key={spot.id} className="bg-white p-6 rounded-lg shadow-lg">  {/* White card with shadow */}
                <h3 className="text-2xl font-semibold text-black mb-4">Spot {spot.id}</h3>
                <p className={`mb-4 ${spot.reserved ? 'text-red-500' : 'text-green-500'}`}>
                  {spot.reserved ? 'Reserved' : 'Available'}
                </p>
                <button
                  className={`py-2 px-4 border border-black rounded-lg ${spot.reserved ? 'bg-gray-200' : 'bg-black text-white'}`}
                  disabled={spot.reserved}
                >
                  {spot.reserved ? 'Reserved' : 'Reserve'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-black">No spots available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
