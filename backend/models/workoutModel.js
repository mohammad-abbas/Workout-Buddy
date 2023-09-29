const mongoose = require("mongoose");

// Define the schema using mongoose.Schema
const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
 
  },
  { timestamps: true }
);

// Create and export the model
module.exports = mongoose.model("Workout", workoutSchema);
