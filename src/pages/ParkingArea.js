import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import db from '../Firebase';  // Ensure this is the correct path to your Firebase config

function ParkingArea() {
  const { area } = useParams();  // Use useParams to get the 'area' from the URL
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const snapshot = await db.collection('parkingSpots')
          .where('area', '==', area)
          .get();  // Filter by area
          
        const spots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setParkingSpots(spots);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
      }
    };

    fetchSpots();
  }, [area]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6">Parking Spots in {area}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingSpots.length > 0 ? (
            parkingSpots.map((spot) => (
              <div key={spot.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">Spot {spot.id}</h3>
                <p className={spot.reserved ? 'text-red-500' : 'text-green-500'}>
                  {spot.reserved ? 'Reserved' : 'Available'}
                </p>
                <Link to={`/reserve/${spot.id}`} className={`py-2 px-4 border border-black rounded-lg ${spot.reserved ? 'bg-gray-200' : 'bg-black text-white'}`}
                  disabled={spot.reserved}>
                  {spot.reserved ? 'Reserved' : 'Reserve'}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-black">No spots available in {area}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParkingArea;
