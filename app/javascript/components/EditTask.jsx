import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskForm";

const EditTask = ({ editTask }) => {
  const params = useParams();
  const id = params.id;
  const token = document.querySelector("[name=csrf-token]").content;
  const [isLoading, setIsLoading] = useState(true);
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
  const [task, setTask] = useState({});
  useEffect(
    () =>
      axios.get("/api/v1/tasks/" + id).then((resp) => {
        setTask(resp.data);
        setIsLoading(false);
      }),
    []
  );
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <TaskForm formTitle="Edit Task" task={task} handleData={editTask(id)} />
  );
};

export default EditTask;
