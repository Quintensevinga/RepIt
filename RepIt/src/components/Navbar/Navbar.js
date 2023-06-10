import React, { useContext } from 'react';
import './Navbar.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const Navbar = () => {
  const {changeView} = useContext(AppContext)
  
  const handleClick = (newView) => {
    changeView(newView)
  }


  return (
    <nav className="navbar">
      <button className="navbar-button" onClick={() => handleClick('logbook')}>Logbook</button>
      <button className="navbar-button" onClick={() => handleClick('workouts')}>Workouts</button>
    </nav>
  );
};

export default Navbar;