const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

router.get('/logbook', controllers.getAllWorkouts);

router.get('/workoutlist', controllers.getWorkoutNames);

router.post('/workout', controllers.createWorkout);

router.put('/workouts/:id', controllers.updateWorkout);

router.delete('/workouts/:id', controllers.deleteWorkout);


module.exports = router;
