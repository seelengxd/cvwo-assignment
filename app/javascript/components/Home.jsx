import Content from "./Content";
import Sidebar from "./Sidebar";
import React from "react";

const Home = ({ tasks, deleteTask }) => {
  return (
    <div id="main">
      <Sidebar />
      <Content tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;
