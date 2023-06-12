import React, { useContext, useEffect, useState } from 'react';
import './Logbook.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const Logbook = () => {
    const { changeView, setFinishedWorkoutId } = useContext(AppContext);
    const [finishedWorkouts, setFinishedWorkouts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/finishedWorkouts')
            .then((response) => response.json())
            .then((data) => {
                setFinishedWorkouts(data);
            })
            .catch((error) => {
                console.log('Error fetching finished workouts:', error);
            });
    }, []);

    const handleClick = (workoutId) => {
        changeView('activeWorkout');
        setFinishedWorkoutId(workoutId)
    }

    return (
        <div className="logbook">
            <h1>Logbook</h1>
            <div className="logged-workouts">
                {finishedWorkouts.map((workout) => (
                    <div className="workout-container" key={workout._id} onClick={() => handleClick(workout._id)}>
                        <div className="workout-date">
                            <p>{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <p>{new Date(workout.date).getDate()}</p>
                        </div>
                        <div className="workout-info">
                            <h3>{workout.name}</h3>
                            {workout.exercises.map((exercise, exerciseIndex) => (
                                <p key={exerciseIndex}>
                                    {exercise.sets} x {exercise.exercise}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Logbook;
