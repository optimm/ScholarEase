import React, { useState } from "react";
import { ProjectCardWrapper } from "../styles/components/projectCardStyles";
import { BiComment } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }
  return (
    <ProjectCardWrapper
      image={project?.image?.url || "/images/login.jpg"}
      loading={loading}
    >
      <div
        className="image-section"
        onClick={() => navigate(`/projects/${project?._id}`)}
      >
        <img
          src={project?.image?.url}
          onLoad={handleImageLoad}
          style={{ display: "none" }}
          alt={"skeleton"}
        />
        {!loading && (
          <div className="image-overlay">
            <div className="title">{project?.title}</div>
          </div>
        )}
      </div>
      <div className="data-section">
        <div className="likes-comments">
          <div className="likes-left">
            <Link to={`/users/${project?.owner?._id}`}>
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={project?.owner?.avatar?.url}
              ></Avatar>
            </Link>
            <div className="username">{project?.owner?.username}</div>
          </div>
          <div className="likes-right">
            <div className="like-indv">
              {project?.total_likes} <AiFillLike />
            </div>

            <div className="like-indv">
              {project?.total_comments} <BiComment />
            </div>
          </div>
        </div>
      </div>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
