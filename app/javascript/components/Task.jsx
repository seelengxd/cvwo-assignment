import React from "react";
const Task = ({ task }) => {
  return (
    <div className="task">
      <div className="row">
        <div className="label">{task.importance}</div>
      </div>
      <div className="row">
        <div className="row">
          <input type="checkbox"></input>
          <p>{task.title}</p>
        </div>
      </div>
      <div className="row">
        <button>View</button>
      </div>
    </div>
  );
};

export default Task;
