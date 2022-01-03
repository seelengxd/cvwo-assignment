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

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("/api/v1/tasks")
      .then((resp) => resp.json())
      .then((json) => setTasks(json))
      .catch((e) => console.error(e));
  }, []);
  let newID = 3;

  const addTask = (task) => {
    task.id = newID;
    task.done = false;
    newID += 1;
    setTasks([...tasks, task]);
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
