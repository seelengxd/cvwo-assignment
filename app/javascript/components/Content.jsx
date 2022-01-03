import React from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const Content = ({ tasks, deleteTask }) => {
  return (
    <div id="content">
      <div className="row">
        <h3>Tasks</h3>
        <Link to="/addtask">
          <button>
            <i className="fas fa-plus"></i> Add Task
          </button>
        </Link>
      </div>

      <div id="tasklist">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            deleteTask={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
