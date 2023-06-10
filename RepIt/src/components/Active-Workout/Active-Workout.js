import React, { useContext } from 'react';
import './Active-Workout.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const ActiveWorkout = () => {
  const { changeView } = useContext(AppContext);

  const handleClick = (newView) => {
    changeView(newView);
  };

  return (
    <div>
      <h1>mock page</h1>
      <div className='header'>
        <button className='done-btn' onClick={() => handleClick('logbook')}>
          DONE
        </button>
        <h2 className='date'>June 12</h2>
      </div>

      <div className='name-workout-box'>
        <h2 className='name-workout' >Name Workout</h2>
      </div>
      
      <div className='exercise-box'>
        <h3 className="name-exercise">Exercise name</h3>
        <div className='set-row'>
          <p>01</p>
          <p>Weight:</p>
          <input></input>
          <p>Reps:</p>
          <input></input>
        </div>
        <div className='set-row'>
          <p>02</p>
          <p>Weight:</p>
          <input></input>
          <p>Reps:</p>
          <input></input>
        </div>
      </div>
      <div className='exercise-box'>
        <h3 className="name-exercise">Exercise name</h3>
        <div className='set-row'>
          <p>01</p>
          <p>Weight:</p>
          <input></input>
          <p>Reps:</p>
          <input></input>
        </div>
        <div className='set-row'>
          <p>02</p>
          <p>Weight:</p>
          <input></input>
          <p>Reps:</p>
          <input></input>
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkout;
