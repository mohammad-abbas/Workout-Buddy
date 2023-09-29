import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "ADD_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
      case "DELETE_WORKOUT":
        return {
            workouts: state.workouts.filter((w) => w._id !== action.payload),
        };
        case "EDIT_WORKOUT":
          return {
              workouts: state.workouts.map((w) => {
                  if (w._id === action.payload._id) {
                      return action.payload;
                  } else {
                      return w;
                  }
              }),
          };
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
