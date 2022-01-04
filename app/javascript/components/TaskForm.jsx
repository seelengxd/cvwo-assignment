import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ handleData, formTitle, task }) => {
  console.log(task);
  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.due_date || "");
  const [importance, setImportance] = useState(task?.importance || "Low");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleData({ title, description: desc, dueDate, importance });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{formTitle}</h1>
      <div className="field">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="field">
        <label>Due date:</label>
        <input
          type="date"
          name="due"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Importance:</label>
        <select
          name="importance"
          id=""
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">{formTitle}</button>
    </form>
  );
};

export default TaskForm;
