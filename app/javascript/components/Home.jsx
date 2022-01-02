import Content from "./Content";
import Sidebar from "./Sidebar";
import React from "react";

const Home = ({ tasks }) => {
  return (
    <div id="main">
      <Sidebar />
      <Content tasks={tasks} />
    </div>
  );
};

export default Home;
