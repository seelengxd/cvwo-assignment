import React from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const Content = ({ tasks }) => {
  return (
    <div id="content">
      <div className="row">
        <h3>Tasks</h3>
        <Link to="/addtask">
          <button>+ Add Task</button>
        </Link>
      </div>

      <div id="tasklist">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default Content;
