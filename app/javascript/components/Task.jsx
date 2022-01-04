import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../formatDate";
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
        </div>
      </div>
      <div className="row">
        {task.due_date && (
          <p>
            <i className="far fa-clock"></i> {formatDate(task.due_date)}
          </p>
        )}
      </div>
      <div className="row">
        <Link to={"/viewtask/" + task.id}>
          <button>
            <i className="far fa-eye"></i> View
          </button>
        </Link>
        <Link to={"/edittask/" + task.id}>
          <button>
            <i className="far fa-edit"></i> Edit
          </button>
        </Link>

        <button className="delete" onClick={deleteTask}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
