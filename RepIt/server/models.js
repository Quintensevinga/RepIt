const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
});

const ExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 0,
  },
  setDetails: [setSchema]
});

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});


const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
