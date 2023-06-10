const Workout = require('./models');

exports.getAllWorkouts = async (ctx) => {
  try {
    const workouts = await Workout.find();
    ctx.body = workouts;
  }
  catch (e) {
    ctx.body = { error: 'Failed getting all workouts' };
  }
}

exports.getWorkoutNames = async (ctx) => {
  try {
    const workouts = await Workout.find();
    ctx.body = workouts;
  }
  catch (e) {
    ctx.body = { error: 'Failed getting all workouts' };
  }
}

exports.createWorkout = async (ctx) => {
  try {
    const { name, exercises } = ctx.request.body;

    const workout = new Workout({
      name, 
      exercises
    })
  
    await workout.save();

    ctx.status = 201;
    ctx.body = { message: 'Workout created' };
  }
  catch (e) {
    ctx.body = { error: 'Error while creating the workout' };
  }
}
exports.updateWorkout = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { name, exercises } = ctx.request.body;

    if (!name ) {
      ctx.status = 400;
      ctx.body = { error: 'Name is required' };
      return;
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    workout.name = name;
    workout.exercises = exercises;

    const updatedWorkout = await workout.save();

    ctx.status = 200;
    ctx.body = updatedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};


exports.deleteWorkout = async (ctx) => {
  try {
    const id = ctx.params.id;

    const workout = await Workout.findByIdAndRemove(id); 

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Workout deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
