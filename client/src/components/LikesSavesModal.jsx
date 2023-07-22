import React from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FAllWrapper, FIndvWrapper } from "../styles/components/FmodalStyles";
import "../styles/modal.css";

const LikesSavesModal = ({ show, setShow, array, heading }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClose = () => setShow(false);

  const handleNavigate = () => {
    handleClose();
    navigate(`/users/${id}`);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FAllWrapper>
          {array?.map((item, index) => (
            <FIndvWrapper url="/images/login.jpg" key={index}>
              <Link to={`/users/${item._id}`}>
                <div className="profile-image" onClick={handleNavigate}></div>
              </Link>
              <div className="user-data">
                <div className="username">{item?.username}</div>
                <div className="name">{item?.name}</div>
              </div>
            </FIndvWrapper>
          ))}
        </FAllWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default LikesSavesModal;
