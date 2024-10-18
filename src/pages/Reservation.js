// src/pages/Reservation.js
import React from 'react';
import { useParams } from 'react-router-dom';

function Reservation() {
  const { spotId } = useParams();  // Retrieve the spot ID from the URL

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6">Reservation for Spot {spotId}</h1>
        {/* Add your reservation form and logic here */}
      </div>
    </div>
  );
}

export default Reservation;
