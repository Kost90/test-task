import { createContext, useContext, useReducer } from "react";
import { SingleAnnReducer } from "./SingleAnnounceReducer";

const initialTasks = [];

export const SingleAnnouncContext = createContext(null);
const SingleAnnounceDispatchContext = createContext(null);

export const SingleAnnounceProvider = ({ children }) => {
  const [singlAnnounc, dispatch] = useReducer(SingleAnnReducer, initialTasks);

  return (
    <SingleAnnouncContext.Provider value={singlAnnounc}>
      <SingleAnnounceDispatchContext.Provider value={dispatch}>
        {children}
      </SingleAnnounceDispatchContext.Provider>
    </SingleAnnouncContext.Provider>
  );
};

export const useSingleAnnouncement = () => {
  const value = useContext(SingleAnnouncContext);

  if (value === null) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return value;
};

export const useSingleDispatch = () => {
  const value = useContext(SingleAnnounceDispatchContext);

  if (value === null) {
    throw new Error("useDispatch must be used within a TasksProvider");
  }

  return value;
};
