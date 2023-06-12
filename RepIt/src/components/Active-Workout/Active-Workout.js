import React, { useContext, useEffect, useState } from 'react';
import './Active-Workout.css';
import { AppContext } from '../ContextProvider/ContextProvider';
import { v4 as uuidv4 } from 'uuid';


const ActiveWorkout = () => {
  const { changeView, workoutData, finishedWorkoutId, setFinishedWorkoutId, setWorkoutData } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState('');
  const [weightData, setWeightData] = useState([]);
  const [repsData, setRepsData] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(currentDate);
  }, []);

  useEffect(() => {
    if (finishedWorkoutId) {
      fetch(`http://localhost:3001/finishedWorkouts/${finishedWorkoutId}`)
        .then((response) => response.json())
        .then((data) => {
          setWorkoutData(data);
          const setDetails = [];
          data.exercises.forEach((exercise) => {
            for (let i = 0; i < exercise.sets; i++) {
              const setIndex = setDetails.length;
              const set = {
                weight: '',
                reps: '',
                ...exercise.setDetails[i]
              };
              setDetails[setIndex] = set;
            }
          });

          const weights = setDetails.map((set) => set.weight);
          const reps = setDetails.map((set) => set.reps);

          setWeightData(weights);
          setRepsData(reps);
        })
        .catch((error) => {
          console.log('Error fetching finished workout details:', error);
        });
    }
  }, [finishedWorkoutId]);

  const handleWeightChange = (index, value) => {
    const newWeightData = [...weightData];
    newWeightData[index] = value;
    setWeightData(newWeightData);
  };

  const handleRepsChange = (index, value) => {
    const newRepsData = [...repsData];
    newRepsData[index] = value;
    setRepsData(newRepsData);
  };

  const handleSubmit = () => {
    const finishedWorkoutData = { ...workoutData, date: currentDate };

    if (finishedWorkoutId) delete finishedWorkoutData._id;

    finishedWorkoutData.exercises.forEach((exercise, exerciseIndex) => {
      exercise.setDetails = [...Array(exercise.sets)].map((_, setIndex) => ({
        weight: weightData[exerciseIndex * exercise.sets + setIndex] || '',
        reps: repsData[exerciseIndex * exercise.sets + setIndex] || ''
      }));
    });

    fetch('http://localhost:3001/finishedWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finishedWorkoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Finished workout submitted:', data);
      })
      .catch((error) => {
        console.log('Error submitting finished workout:', error);
      });
    console.log(finishedWorkoutData);
    setFinishedWorkoutId(null);
  };
  

  const handleClick = (newView) => {
    if (newView === 'logbook') {
      handleSubmit();
    }
    changeView(newView);
  };

  if (!workoutData) {
    return null; 
  }

  const handleDelete = () => {
      fetch(`http://localhost:3001/finishedWorkouts/${finishedWorkoutId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          changeView('logbook');
          console.log('Finished workout deleted:', data);
        })
        .catch((error) => {
          console.log('Error deleting finished workout:', error);
        });
  };

  return (
    <div>
      <div className='header'>
        <button className='done-btn' onClick={() => handleClick('logbook')}>
          DONE
        </button>
        <h2 className='date'>{currentDate}</h2>
      </div>

      <div className='name-workout-box'>
        <h2 className='name-workout'>{workoutData.name}</h2>
      </div>

      {workoutData.exercises.map((exercise, exerciseIndex) => (
        <div className='exercise-box' key={exerciseIndex}>
          <h3 className='name-exercise'>{exercise.exercise}</h3>
          {[...Array(exercise.sets)].map((_, setIndex) => (
            <div className='set-row' key={setIndex}>
              <p>{setIndex + 1}</p>
              <p>Weight:</p>
              <input type='number'
                value={weightData[exerciseIndex * exercise.sets + setIndex] || ''}
                onChange={(e) => handleWeightChange(exerciseIndex * exercise.sets + setIndex, e.target.value)} />
              <p>Reps:</p>
              <input type='number'
                value={repsData[exerciseIndex * exercise.sets + setIndex] || ''}
                onChange={(e) => handleRepsChange(exerciseIndex * exercise.sets + setIndex, e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default ActiveWorkout;
