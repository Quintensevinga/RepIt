import React, {useContext, useEffect} from 'react';
import './Logbook.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const Logbook = () => {
    const { workouts, setWorkouts } = useContext(AppContext);

    useEffect(() => {
        fetch('http://localhost:3001/logbook')
            .then((response) => response.json())
            .then((data) => {
                setWorkouts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    return (
        <div className="logbook">
            <h1>Logbook</h1>
            <div className="logged-workouts">
                {workouts.map((workout) => (
                    <div className='workout-container' key={workout._id}>
                    <div className='workout-date'>
                        <p>Mon</p>
                        <p>5</p>
                    </div>
                    <div className='workout-info'>
                        <h3>{workout.name}</h3>
                            {workout.exercises.map((exercise) => (
                                <p key={exercise._id}>{exercise.sets} x {exercise.exercise}</p>
                        ))}
                    </div>
                </div> 
                ))}
                {/* mock html */}
                <p className='month-year'>June 2023</p>
                <div className='workout-container'>
                    <div className='workout-date'>
                        <p>Mon</p>
                        <p>5</p>
                    </div>
                    <div className='workout-info'>
                        <h3>Chest</h3>
                        <p>3 x Bench Press</p>
                        <p>3 x Dumbell Press</p>
                        <p>3 x Dips</p>
                    </div>
                </div>
                <p className='month-year'>May 2023</p>
                <div className='workout-container'>
                    <div className='workout-date'>
                        <p>Wed</p>
                        <p>31</p>
                    </div>
                    <div className='workout-info'>
                        <h3>Chest</h3>
                        <p>3 x Bench Press</p>
                        <p>3 x Dumbell Press</p>
                        <p>3 x Dips</p>
                    </div>
                </div>
                <div className='workout-container'>
                    <div className='workout-date'>
                        <p>Mon</p>
                        <p>29</p>
                    </div>
                    <div className='workout-info'>
                        <h3>Chest</h3>
                        <p>3 x Bench Press</p>
                        <p>3 x Dumbell Press</p>
                        <p>3 x Dips</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logbook;