import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const Content = ({ tasks, deleteTask, changeDone }) => {
  const [query, setQuery] = useState("");
  const [displayed, setDisplayed] = useState(null);
  const sort = (tasks) => {
    console.log("hello?");
    console.log(tasks.sort((t1, t2) => (t1.title < t2.title ? -1 : 1)));
    return tasks.sort((t1, t2) => t1.title < t2.title);
  };
  const filter = () => {
    setDisplayed(tasks.filter((task) => task.title.includes(query)));
  };
  const showAll = () => {
    setDisplayed([...tasks]);
  };
  useEffect(showAll, [tasks]);
  return (
    <div id="content">
      <div className="row">
        <h3>Tasks</h3>
        <Link to="/addtask">
          <button>
            <i className="fas fa-plus"></i> Add Task
          </button>
        </Link>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={filter}>
          <i className="fas fa-search"></i> Search
        </button>
        <button onClick={showAll}>Show All</button>
      </div>

      <div id="tasklist">
        {displayed &&
          sort(displayed).map((task) => (
            <Task
              task={task}
              key={task.id}
              deleteTask={() => deleteTask(task.id)}
              changeDone={changeDone(task.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Content;
