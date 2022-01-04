import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectForm = ({ handleData, formTitle, project }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(project?.name || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleData({ name });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{formTitle}</h1>
      <div className="field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">{formTitle}</button>
    </form>
  );
};

export default ProjectForm;
