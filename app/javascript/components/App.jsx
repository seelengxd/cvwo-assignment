import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import TaskForm from "./TaskForm";
import axios from "axios";

function App() {
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

  const [tasks, setTasks] = useState([]);
  const getTasksFromServer = () => {
    axios
      .get("/api/v1/tasks")
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((e) => console.error(e));
  };

  useEffect(getTasksFromServer, []);

  const addTask = (task) => {
    task.done = false;
    axios.post("/api/v1/tasks", task).then((resp) => console.log(resp));
    getTasksFromServer();
  };

  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route
            path="/addtask"
            element={<TaskForm formTitle="Add Task" handleData={addTask} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
