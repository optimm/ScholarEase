import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { useGetAllProjectsQuery } from "../app/services/projectApi";
import { AllUsersProjectsLoader, Nodata } from "../components/Loaders";
import ProjectCard from "../components/ProjectCard";
import {
  AllProjectCardWrapper,
  AllProjectsWrapper,
} from "../styles/pages/allProjectsStyles";
import { SearchBarWrapper } from "../styles/pages/allUsersStyles";

const AllProjects = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const { data, isLoading, error, isFetching } = useGetAllProjectsQuery({
    q: searchParams.get("q") || "",
  });
  const projectData = data?.data?.data;

  const handleSearch = () => {
    if (value?.length > 0) {
      setSearchParams({ q: value });
      setBlankLoader(true);
    }
  };
  const [blankLoader, setBlankLoader] = useState(false);
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
    <AllProjectsWrapper>
      <SearchBarWrapper>
        <Paper
          elevation={1}
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          className="search-bar-paper"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by scholarships title"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <AiOutlineSearch />
          </IconButton>
        </Paper>
      </SearchBarWrapper>
      {isLoading || blankLoader ? (
        <AllUsersProjectsLoader />
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

export default AllProjects;
