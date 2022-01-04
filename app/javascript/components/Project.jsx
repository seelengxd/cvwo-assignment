import React from "react";

const Project = ({ project, changeProject, selected }) => {
  return (
    <div
      className={"project " + (selected ? "selected-project" : "")}
      onClick={changeProject}
    >
      {project.name}
    </div>
  );
};

export default Project;
