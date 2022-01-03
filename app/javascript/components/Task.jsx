import React from "react";
import { Link } from "react-router-dom";
const Task = ({ task, deleteTask }) => {
  return (
    <div className="task">
      <div className="row">
        <div className={"label " + task.importance}>{task.importance}</div>
      </div>
      <div className="row">
        <div className="row">
          <input type="checkbox"></input>
          <p>{task.title}</p>
          {task.due_date && (
            <p>
              <i className="far fa-clock"></i> {task.due_date}
            </p>
          )}
        </div>
      </div>
      <div className="row">
        <Link to={"/viewtask/" + task.id}>
          <button>
            <i className="far fa-eye"></i> View
          </button>
        </Link>
        <button>
          <i className="far fa-edit"></i> Edit
        </button>
        <button className="delete" onClick={deleteTask}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
