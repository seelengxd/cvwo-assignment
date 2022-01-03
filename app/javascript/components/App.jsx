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
import ViewTask from "./ViewTask";

function App() {
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

  const [tasks, setTasks] = useState(null);
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
    task.due_date = task.dueDate;
    axios.post("/api/v1/tasks", task).then((resp) => console.log(resp));
    getTasksFromServer();
  };

  const deleteTask = (id) => {
    console.log({ id });
    axios
      .delete("/api/v1/tasks/" + id)
      .then(() => getTasksFromServer())
      // for some reason (prob to do with async) getTasks is getting results before rails deletes
      // manual filtering it out
      .then(() =>
        setTasks(
          tasks.filter((task) => {
            console.log(task);
            return task.id !== id;
          })
        )
      )
      .then(() => console.log(tasks))
      .catch((e) => console.error(e));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={tasks && <Home tasks={tasks} deleteTask={deleteTask} />}
          />

          <Route
            path="/addtask"
            element={<TaskForm formTitle="Add Task" handleData={addTask} />}
          />
          <Route path="/viewtask/:id" element={<ViewTask />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
