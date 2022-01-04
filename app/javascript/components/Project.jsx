import React from "react";
import { Link } from "react-router-dom";

const Project = ({ project, changeProject, selected, deleteProject }) => {
  return (
    <div
      className={"project " + (selected ? "selected-project" : "")}
      onClick={changeProject}
    >
      <p>{project.name}</p>
      <div className="right">
        <Link to={"/editproject/" + project.id}>
          <button>
            <i className="far fa-edit"></i>
          </button>
        </Link>

        <button
          className="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteProject();
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Project;
