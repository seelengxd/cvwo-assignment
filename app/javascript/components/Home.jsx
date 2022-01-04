import Content from "./Content";
import Sidebar from "./Sidebar";
import React from "react";

const Home = ({
  tasks,
  deleteTask,
  projects,
  changeProject,
  currentProject,
  deleteProject,
}) => {
  return (
    <div id="main">
      <Sidebar
        projects={projects}
        changeProject={changeProject}
        currentProject={currentProject}
        deleteProject={deleteProject}
      />
      <Content tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;
