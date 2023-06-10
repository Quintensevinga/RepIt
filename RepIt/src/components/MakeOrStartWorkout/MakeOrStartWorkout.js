import React, { useContext, useState, useEffect } from 'react';
import './MakeOrStartWorkout.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const MakeOrStartWorkout = () => {
  const { addWorkout, changeView, workouts, setWorkouts, selectedWorkoutId } = useContext(AppContext);
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([{ exercise: '', sets: '' }]);

  useEffect(() => {
    if (selectedWorkoutId) {
      const selectedWorkout = workouts.find((workout) => workout._id === selectedWorkoutId);
      setName(selectedWorkout.name);
      setExercises(selectedWorkout.exercises);
    } 
  }, [selectedWorkoutId, workouts]);

  const handleExerciseChange = (index, exOrSet, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][exOrSet] = value;
    setExercises(updatedExercises);
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    setExercises([...exercises, { exercise: '', sets: '' }]);
  };

  const handleClick = (newView) => {
    changeView(newView);
  };

  const handleSubmit = (e) => {
    if (!name) {
      console.log('Workout name is required');
      return;
    }
    e.preventDefault();
    const workoutData = {
      name,
      exercises: exercises.map((exercise) => ({
        exercise: exercise.exercise,
        sets: parseInt(exercise.sets)
      }))
    };
    
    if (selectedWorkoutId) {
      fetch(`http://localhost:3001/workouts/${selectedWorkoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutData)
      })
        .then((response) => {
          if (response.ok) {
            const updatedWorkouts = workouts.map((workout) => {
              if (workout._id === selectedWorkoutId) {
                return {
                  ...workout,
                  name: workoutData.name,
                  exercises: workoutData.exercises,
                };
              }
              return workout;
            });
            setWorkouts(updatedWorkouts);
            console.log(workoutData);
            console.log('Workout updated');
          } else {
            throw new Error('Failed to update workout');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      fetch('http://localhost:3001/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutData)
      })
        .then((response) => {
          if (response.ok) {
            console.log('Workout created');
            console.log(workoutData);
            addWorkout(workoutData);
          } else {
            throw new Error('Failed to create workout');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } 
  };

  const handleDelete = () => {
    if (!selectedWorkoutId) {
      handleClick('workouts');
      return;
    }
    console.log(selectedWorkoutId);
    fetch(`http://localhost:3001/workouts/${selectedWorkoutId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          console.log('Workout deleted');
          const updatedWorkouts = workouts.filter((workout) => workout._id !== selectedWorkoutId);
          setWorkouts(updatedWorkouts);
          handleClick('workouts');
        } else {
          throw new Error('Failed to delete workout');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <div className='my-workout-container'>
        <form>
          <button
            className='back-btn'
            onClick={(e) => {
              handleClick('workouts');
              handleSubmit(e);
            }}
          >
            back
          </button>
          <button
            className='start-workout'
            onClick={(e) => {
              handleClick('activeWorkout');
              handleSubmit(e);
            }}
          >
            Start This Workout
          </button>
          <input
            className='name-workout'
            placeholder='Name Workout'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {exercises.map((exercise, index) => (
            <div className='ex-and-sets' key={index}>
              <input
                placeholder='Exercise'
                value={exercise.exercise}
                onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
              />
              <input
                className='sets'
                placeholder='0 sets'
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
              />
            </div>
          ))}
          <button className='add-exercise' onClick={handleAddExercise}>
            Add Exercise
          </button>
        </form>
        <button className='delete-workout' onClick={handleDelete}>
          Delete Workout
        </button>
      </div>
    </div>
  );
};

export default MakeOrStartWorkout;
