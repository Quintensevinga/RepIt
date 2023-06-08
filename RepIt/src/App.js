import './App.css';
import React, { useState } from 'react';
import Logbook from './components/Logbook/Logbook';
import Navbar from './components/Navbar/Navbar';
import Workouts from './components/Workout-list/Workouts-list';
// import MakeOrStartWorkout from './components/MakeOrStartWorkout/MakeOrStartWorkout';


function App() {

  const [isWorkoutPage, setIsWorkoutPage] = useState(false);


  return (
    <div>
      {/* <MakeOrStartWorkout/> */}
      {!isWorkoutPage ? (
        <Logbook/>
      ) : (
        <Workouts /> 
      )}
      <Navbar setIsWorkoutPage={setIsWorkoutPage} isWorkoutPage={isWorkoutPage} />
    </div>
  );
}

export default App;
