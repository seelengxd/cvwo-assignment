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
import EditTask from "./EditTask";

function App() {
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

  const [tasks, setTasks] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [loadingProjects, setLoadingProjects] = useState(true);
  async function getProjectsFromServer() {
    console.log("run projects");
    const resp = await axios.get("/api/v1/projects");
    setProjects(resp.data);
    setLoadingProjects(false);
  }
  async function getTasksFromServer() {
    if (!loadingProjects) {
      const resp = await axios.get("/api/v1/projects/" + currentProject.id);
      console.log({ tasks: resp.data });
      setTasks(resp.data.tasks);
    }
  }

  useEffect(getProjectsFromServer, []);
  useEffect(() => setCurrentProject(projects[0]), [projects]);
  useEffect(getTasksFromServer, [currentProject]);
  // useEffect(initialize, []);

  const addTask = (task) => {
    task.done = false;
    task.due_date = task.dueDate;
    axios.post("/api/v1/tasks", task).then((resp) => console.log(resp));
    getTasksFromServer();
  };

  const deleteTask = (id) => {
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
      .catch((e) => console.error(e));
  };

  const editTask = (id) => (task) => {
    task.due_date = task.dueDate;
    console.log({ task });
    axios
      .put("/api/v1/tasks/" + id, task)
      .then((resp) => console.log(resp))
      .then(() => getTasksFromServer())

      .catch((e) => console.error(e));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              tasks ? (
                <Home
                  tasks={tasks}
                  projects={projects}
                  deleteTask={deleteTask}
                  changeProject={setCurrentProject}
                />
              ) : (
                <h1>Loading...</h1>
              )
            }
          />

          <Route
            path="/addtask"
            element={<TaskForm formTitle="Add Task" handleData={addTask} />}
          />
          <Route
            path="/edittask/:id"
            element={<EditTask editTask={editTask} />}
          />
          <Route path="/viewtask/:id" element={<ViewTask />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
