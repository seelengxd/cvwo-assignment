import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <div className="left">
        <h2>
          <Link to="/">DO IT</Link>
        </h2>
      </div>
      <div className="right">
        <h2>testuser</h2>
      </div>
    </header>
  );
};

export default Navbar;
