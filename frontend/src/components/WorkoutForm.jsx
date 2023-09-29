import React from "react";
import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import { message } from "antd";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps, sets };
    const response = await fetch(
      "https://workout-buddy-ubxr.onrender.com/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
      setEmptyFields(json.emptyFields);
      console.log(emptyFields);
    }

    if (response.ok) {
      setError(null);
      console.log("Workout added successfully!", json);
      setTitle("");
      setLoad("");
      setReps("");
      setSets("");
      dispatch({ type: "ADD_WORKOUT", payload: json });

      const success = () => {
        messageApi.open({
          type: "success",
          content:
            "The workout was added successfully! You can view it on the left.",
          duration: 5,
        });
      };

      success();
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />

        <label>Number of Sets:</label>
        <input
          type="number"
          onChange={(e) => {
            setSets(e.target.value);
          }}
          value={sets}
        />
      

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
      {contextHolder}
    </>
  );
};

export default WorkoutForm;
