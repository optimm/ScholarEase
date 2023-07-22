import React, { useEffect, useState } from "react";
import { useGetSavedProjectsQuery } from "../app/services/userApi";
import { PostWrapper } from "../styles/components/postsOfDevStyles";
import { AllProjectCardWrapper } from "../styles/pages/allProjectsStyles";
import { PostOfDevLoader } from "./Loaders";
import ProjectCard from "./ProjectCard";

const SavedProjects = () => {
  const { data, isLoading, error } = useGetSavedProjectsQuery();
  const projectData = data?.data?.data;
  const [blankLoader, setBlankLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    } else if (
      !isLoading &&
      (data?.success || error?.data?.success === false)
    ) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, data, error]);
  return (
    <PostWrapper>
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

export default SavedProjects;
