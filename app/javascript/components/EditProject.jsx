import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";

const EditProject = ({ editProject }) => {
  const params = useParams();
  const id = params.id;
  const token = document.querySelector("[name=csrf-token]").content;
  const [isLoading, setIsLoading] = useState(true);
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
  const [project, setProject] = useState({});
  useEffect(
    () =>
      axios.get("/api/v1/projects/" + id).then((resp) => {
        setProject(resp.data);
        setIsLoading(false);
      }),
    []
  );
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <ProjectForm
      formTitle="Edit Task"
      project={project}
      handleData={editProject(id)}
    />
  );
};

export default EditProject;
