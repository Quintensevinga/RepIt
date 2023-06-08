import React from 'react';
import './Navbar.css';

const Navbar = ({ isWorkoutPage, setIsWorkoutPage }) => {
  const handlePageChange = () => {
    setIsWorkoutPage(!isWorkoutPage);
  }


  return (
    <nav className="navbar">
      <button className="navbar-button" onClick={handlePageChange}>Logbook</button>
      <button className="navbar-button" onClick={handlePageChange}>Workouts</button>
    </nav>
    );
};

export default Navbar;

