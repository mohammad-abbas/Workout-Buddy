require("dotenv").config();

const express = require("express");

const app = express();

const workoutsRouter = require("./routes/workout");

const mongoose = require("mongoose");
const { bodyParser } = require("json-server");

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutsRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
