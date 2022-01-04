import React from "react";

const Project = ({ project, changeProject }) => {
  return <div onClick={changeProject}>{project.name}</div>;
};

export default Project;
