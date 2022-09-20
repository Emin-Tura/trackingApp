import React from "react";
import { useValue } from "../../../context/ContextProvider";

const TasksList = () => {
  const {
    state: { tasks },
  } = useValue();

  console.log(tasks);

  return <div>TasksList</div>;
};

export default TasksList;
