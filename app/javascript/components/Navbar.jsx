import { Link } from "react-router-dom";
import React from "react";

const Navbar = ({ user, logOut }) => {
  return (
    <header>
      <div className="left">
        <h2>
          <Link to="/">DO IT</Link>
        </h2>
      </div>
      <div className="right">
        {user?.username ? (
          <div className="row">
            <Link to="/" onClick={logOut}>
              Log out
            </Link>
            <h2>{user?.username}</h2>
          </div>
        ) : (
          <div className="row">
            <Link to="/">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
