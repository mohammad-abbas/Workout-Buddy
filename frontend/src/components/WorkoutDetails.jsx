import useWorkoutContext from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal } from "antd";
import { useState } from "react";
const WorkoutDetails = ({ Workout }) => {
  const [modalOpen, setModalOpen] = useState(false);
const [title, setTitle] = useState(Workout.title);
const [load, setLoad] = useState(Workout.load);
const [reps, setReps] = useState(Workout.reps);
const [sets, setSets] = useState(Workout.sets);
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch(
      `https://workout-buddy-ubxr.onrender.com/api/workouts/${Workout._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
    console.log(json);
  };

 const handleEdit = async () => {
   const response = await fetch(
     `https://workout-buddy-ubxr.onrender.com/api/workouts/${Workout._id}`,
     {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ title, load, reps, sets }),
     }
   );

   const json = await response.json();

   if (response.ok) {
     dispatch({ type: "EDIT_WORKOUT", payload: json });
     setModalOpen(false);
   }
 };

  return (
    <div className="workout-details">
      <div>
        <h4>{Workout.title}</h4>
        <p>
          <strong>Load (kg):</strong> {Workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {Workout.reps}
        </p>
        <p>
          <strong>Sets:</strong> {Workout.sets}
        </p>
        <p>
          {formatDistanceToNow(new Date(Workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="icons">
        <MdDelete onClick={handleDelete} className="delete" />
        <MdEdit className="edit" onClick={() => setModalOpen(true)} />
        <Modal
          title="Edit Workout"
          centered
          open={modalOpen}
          onOk={handleEdit}
          onCancel={() => setModalOpen(false)}
          okButtonProps={{
            style: { backgroundColor: "var(--primary)" },
            children: "Save",
          }}
          cancelButtonProps={{
            style: { backgroundColor: "var(--error)", color: "white" },
            children: "Cancel",
          }}
        >
          <form className="create">
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
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default WorkoutDetails;
