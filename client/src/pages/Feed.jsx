import React, { useEffect, useState } from "react";
import { useGetFeedQuery } from "../app/services/userApi";
import { AllUsersProjectsLoader, Nodata } from "../components/Loaders";
import ProjectCard from "../components/ProjectCard";
import {
  AllProjectCardWrapper,
  AllProjectsWrapper,
} from "../styles/pages/allProjectsStyles";

const Feed = () => {
  const { data, isLoading, isFetching, error } = useGetFeedQuery();
  const [blankLoader, setBlankLoader] = useState(false);
  const projectData = data?.data?.data;

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    }
    if (!isLoading && (data?.success || error?.data?.success === false)) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, isFetching, data, error]);

  return (
    <AllProjectsWrapper feed>
      {isLoading || blankLoader ? (
        <AllUsersProjectsLoader type="feed" />
      ) : (
        <>
          {data?.data?.total > 0 ? (
            <AllProjectCardWrapper>
              {projectData.map((item, index) => (
                <ProjectCard project={item} key={index} />
              ))}
            </AllProjectCardWrapper>
          ) : (
            <Nodata />
          )}
        </>
      )}
    </AllProjectsWrapper>
  );
};

export default Feed;
