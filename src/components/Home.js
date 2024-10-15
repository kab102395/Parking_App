import React, { useState, useEffect } from 'react';
import ParkingSpot from './ParkingSpot';
import firebase from '../Firebase'; // Import Firebase config

function Home() {
  const [parkingSpots, setParkingSpots] = useState([]);

  // Fetch parking spots from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.firestore().collection('parkingSpots').get();
      const spots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParkingSpots(spots);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>Available Parking Spots</h1>
      <div>
        {parkingSpots.length > 0 ? (
          parkingSpots.map(spot => <ParkingSpot key={spot.id} spot={spot} />)
        ) : (
          <p>No spots available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
