import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const ViewTask = () => {
  const params = useParams();
  const id = params.id;
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
  const [task, setTask] = useState({});
  useEffect(
    () => axios.get("/api/v1/tasks/" + id).then((resp) => setTask(resp.data)),
    []
  );
  return (
    <div className="task view">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Importance: {task.importance}</p>
    </div>
  );
};

export default ViewTask;
