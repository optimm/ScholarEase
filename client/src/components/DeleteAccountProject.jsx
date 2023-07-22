import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "styled-components/macro";
import { useDeleteProjectMutation } from "../app/services/projectApi";
import { useDeleteProfileMutation } from "../app/services/userApi";
import { createNotification } from "./Notification";
import { flexcv } from "../styles/globalStyle";
import { ButtonLoader } from "./Loaders";

const DeleteAccountProject = ({ show, setShow, project }) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const [deleteAcc, { isLoading: isAccDelLoading }] =
    useDeleteProfileMutation();
  const [deleteProject, { isLoading: isProDelLoading }] =
    useDeleteProjectMutation();
  const { id } = useParams();

  const handleDelete = async () => {
    let finalData;
    let finalError;
    if (project) {
      const { data, error } = await deleteProject({ id });
      finalData = data;
      finalError = error;
    } else {
      const { data, error } = await deleteAcc();
      finalData = data;
      finalError = error;
    }
    if (finalData?.success) {
      createNotification(finalData?.msg || "Done", "info", 2000);
      setShow(false);
      navigate(project ? "/projects" : "/");
    } else {
      createNotification(
        finalError?.data?.msg || "Something went wrong",
        "error",
        2000
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {project ? "Delete Project" : "Delete Account"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          css={`
            ${flexcv}
            width:90%;
            margin: 20px auto;
            gap: 20px;
          `}
        >
          <div
            css={`
              font-size: 1.1rem;
              text-align: center;
              font-weight: 500;
              color: var(--text-3);
            `}
          >
            Are you sure you want to delete
            {project ? " this project" : " your account"}? It cannot be
            recovered afterwards.
          </div>
          <Button variant="danger" onClick={handleDelete}>
            {isAccDelLoading || isProDelLoading ? (
              <ButtonLoader />
            ) : project ? (
              "Delete Project"
            ) : (
              "Delete Account"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAccountProject;
