import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="row">
        <h3>Projects</h3>
        <Link to="#">
          <button>+ Add Project</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
