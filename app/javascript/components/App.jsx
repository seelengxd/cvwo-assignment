import React from "react";
// import Routes from "../routes/Index";

// export default props => <>{Routes}</>;

import Navbar from "./Navbar";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      importance: "Low",
    },
  ]);
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
