import React from 'react';
import './MakeOrStartWorkout.css'

const MakeOrStartWorkout = () => {
  return (
    <div>
      <div className='my-workout-container'>
        <button className='start-workout'>Start This Workout</button>
        <form>
          <input className='name-workout' placeholder='Name Workout' />
          <input placeholder='Exercise' />
          <input className='sets' placeholder='3' />
          <button className='add-exercise'>Add Exercise</button>
        </form>
        <button className='delete-exercise'>Delete Workout</button>
      </div>
    </div>
  )
}

export default MakeOrStartWorkout;