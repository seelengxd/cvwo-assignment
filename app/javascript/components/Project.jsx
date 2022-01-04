import React from "react";
import { Link } from "react-router-dom";

const Project = ({ project, changeProject, selected }) => {
  return (
    <div
      className={"project " + (selected ? "selected-project" : "")}
      onClick={changeProject}
    >
      <p>{project.name}</p>
      <Link to={"/editproject/" + project.id}>
        <button>
          <i className="far fa-edit"></i>
        </button>
      </Link>
    </div>
  );
};

export default Project;
