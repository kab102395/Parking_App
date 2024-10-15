import React, { useState } from 'react';
import firebase from '../Firebase'; // Import Firebase config

function ParkingSpot({ spot }) {
  const [reserved, setReserved] = useState(spot.reserved);

  const reserveSpot = async () => {
    if (!reserved) {
      await firebase.firestore().collection('parkingSpots').doc(spot.id).update({ reserved: true });
      setReserved(true);
    }
  };

  return (
    <div className="parking-spot">
      <h3>Spot {spot.id}</h3>
      <p>Status: {reserved ? "Reserved" : "Available"}</p>
      <button onClick={reserveSpot} disabled={reserved}>
        {reserved ? "Reserved" : "Reserve"}
      </button>
    </div>
  );
}

export default ParkingSpot;
