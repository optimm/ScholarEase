import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectOfUserQuery } from "../app/services/userApi";
import { PostWrapper } from "../styles/components/postsOfDevStyles";
import { AllProjectCardWrapper } from "../styles/pages/allProjectsStyles";
import { ExtraButton } from "../styles/pages/profileStyles";
import { PostOfDevLoader } from "./Loaders";
import ProjectCard from "./ProjectCard";

const PostsOfDev = ({ isMe }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProjectOfUserQuery({ id });
  const projectData = data?.data?.data;
  const [blankLoader, setBlankLoader] = useState(false);

  useEffect(() => {
    const success = data?.success;
    const noSuccess = error?.data?.success;
    if (isLoading) {
      setBlankLoader(true);
    } else if (!isLoading && (success || noSuccess === false)) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, data, error]);

  return (
    <PostWrapper>
      {isMe && (
        <ExtraButton primary onClick={() => navigate("/projects/add")}>
          Add Project
        </ExtraButton>
      )}
      {isLoading || blankLoader ? (
        <PostOfDevLoader />
      ) : (
        <AllProjectCardWrapper noPad>
          {data?.data?.total > 0 ? (
            projectData.map((item, index) => (
              <ProjectCard project={item} key={index} />
            ))
          ) : (
            <>No Data</>
          )}
        </AllProjectCardWrapper>
      )}
    </PostWrapper>
  );
};

export default PostsOfDev;
