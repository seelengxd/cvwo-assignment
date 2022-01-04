import React from "react";
import { Link } from "react-router-dom";
import Project from "./Project";
const Sidebar = ({ projects, changeProject }) => {
  return (
    <div id="sidebar">
      <div className="row">
        <h3>Projects</h3>
        <Link to="#">
          <button>
            <i className="fas fa-plus"></i> Add Project
          </button>
        </Link>
      </div>
      <div>
        {projects ? (
          projects.map((project) => (
            <Project
              project={project}
              key={project.id}
              changeProject={() => changeProject(project)}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
