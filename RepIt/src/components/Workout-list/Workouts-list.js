import React from 'react';
import './Workouts-list.css';

const Workouts = () => {
  return (
    <div>
      <button className='add-workout'>+</button>
      <h1>Workouts</h1>
      <div className='made-workouts'>
        <button className='workout-bar'>
            <p>Chest</p>
          <p>.</p>
        </button>
        <button className='workout-bar'>
          <p>Back</p>
          <p>.</p>
        </button>
        <button className='workout-bar'>
          <p>Legs</p>
          <p>.</p>
        </button>
      </div>

    </div>
  );
};

export default Workouts;