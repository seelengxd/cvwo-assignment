import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDate from "../formatDate";

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
      <p>Description: {task.description}</p>
      <p>Importance: {task.importance}</p>
      <p>Due date: {task.due_date && formatDate(task.due_date)}</p>
      <p>
        Done:{" "}
        {task.done ? (
          <i className="fas fa-check-square"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </p>
    </div>
  );
};

export default ViewTask;
