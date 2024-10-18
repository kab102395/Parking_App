import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ParkingArea from './pages/ParkingArea';
import Reservation from './pages/Reservation';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/area/:area" element={<ParkingArea />} />
        <Route path="/reserve/:spotId" element={<Reservation />} />
      </Routes>
    </Router>
  );
}

export default App;
