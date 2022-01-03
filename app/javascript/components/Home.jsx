import Content from "./Content";
import Sidebar from "./Sidebar";
import React from "react";
import axios from "axios";

const Home = ({ tasks, deleteTask }) => {
  return (
    <div id="main">
      <Sidebar />
      <Content tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;
