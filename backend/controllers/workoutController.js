const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const createWorkout = async (req, res) => {
  const { title, reps, load ,sets } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are empty: ${emptyFields.join(", ")}`,
    });
  }

  try {
    const newWorkout = await Workout.create({ title, reps, load, sets });
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWorkouts = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No workout with id: ${id}`);

  const singleWorkout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ message: `No workout with id: ${id}` });
  }
  return res.status(200).json(singleWorkout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No workout with id: ${id}`);
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ message: `No workout with id: ${id}` });
  }
  return res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No workout with id: ${id}`);
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ message: `No workout with id: ${id}` });
  }
  return res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
