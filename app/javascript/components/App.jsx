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
import ProjectForm from "./ProjectForm";
import EditProject from "./EditProject";
import SignUp from "./SignUp";

function App() {
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

  const [tasks, setTasks] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [user, username] = useState({});
  async function getProjectsFromServer() {
    console.log("run projects");
    const resp = await axios.get("/api/v1/projects");
    setProjects(resp.data);
    setLoadingProjects(false);
    if (resp.data.length === 0) {
      addProject({ name: "Default Project" });
    }
  }
  async function getTasksFromServer() {
    if (!loadingProjects) {
      if (currentProject !== null) {
        const resp = await axios.get("/api/v1/projects/" + currentProject.id);
        setTasks(resp.data.tasks);
      } else {
        setTasks([]);
      }
    }
  }

  useEffect(getProjectsFromServer, []);
  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProject(projects[0]);
    }
  }, [projects]);
  useEffect(getTasksFromServer, [currentProject]);
  // useEffect(initialize, []);

  const addTask = (task) => {
    task.done = false;
    task.due_date = task.dueDate;
    axios
      .post("/api/v1/tasks", { task, project_id: currentProject.id })
      .then((resp) => console.log(resp))
      .then(() => getTasksFromServer());
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
    axios
      .put("/api/v1/tasks/" + id, task)
      .then(() => getTasksFromServer())

      .catch((e) => console.error(e));
  };

  const changeDone = (id) => (done) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      console.log(task);
      axios
        .put("/api/v1/tasks/" + id, { done })
        .then((resp) => console.log(resp))
        .then(() => getTasksFromServer())

        .catch((e) => console.error(e));
    }
    console.log({ id, task });
  };

  const addProject = (project) => {
    axios
      .post("/api/v1/projects", { project })
      .then(getProjectsFromServer)
      .catch((e) => console.error(e));
  };

  const editProject = (id) => (project) => {
    axios
      .put("/api/v1/projects/" + id, { project })
      .then(getProjectsFromServer)
      .catch((e) => console.error(e));
  };

  const deleteProject = (id) => {
    axios
      .delete("/api/v1/projects/" + id)
      .then(() => getProjectsFromServer())
      .then(() => {
        if (projects.length == 0) setTasks([]);
      })
      .catch((e) => console.error(e));
  };

  const signUp = (data) => {
    axios
      .post("/api/v1/users", { user: data })
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              tasks !== null ? (
                <Home
                  tasks={tasks}
                  projects={projects}
                  deleteTask={deleteTask}
                  changeProject={setCurrentProject}
                  currentProject={currentProject}
                  deleteProject={deleteProject}
                  changeDone={changeDone}
                />
              ) : (
                <h1>Loading...</h1>
              )
            }
          />
          <Route path="/signup" element={<SignUp signUp={signUp} />} />

          <Route
            path="/addtask"
            element={<TaskForm formTitle="Add Task" handleData={addTask} />}
          />
          <Route
            path="/edittask/:id"
            element={<EditTask editTask={editTask} />}
          />
          <Route path="/viewtask/:id" element={<ViewTask />}></Route>
          <Route
            path="/addproject"
            element={
              <ProjectForm formTitle="Add Project" handleData={addProject} />
            }
          />
          <Route
            path="/editproject/:id"
            element={
              <EditProject formTitle="Edit Project" editProject={editProject} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
