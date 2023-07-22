import React, { useState } from "react";
import { useGetAllUserQuery } from "../app/services/userApi";
import UserCard from "../components/UserCard";
import {
  AllUsersCardWrapper,
  AllUsersWrapper,
  SearchBarWrapper,
} from "../styles/pages/allUsersStyles";
import { IconButton, InputBase, Paper } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { AllUsersProjectsLoader, Nodata } from "../components/Loaders";

const AllUsers = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error, isFetching } = useGetAllUserQuery({
    q: searchParams.get("q") || "",
  });
  const userData = data?.data?.data;
  const [value, setValue] = useState("");
  const [blankLoader, setBlankLoader] = useState(false);

  const handleSearch = () => {
    if (value?.length > 0) {
      setSearchParams({ q: value });
      setBlankLoader(true);
    }
  };

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
    <AllUsersWrapper>
      <SearchBarWrapper>
        <Paper
          elevation={1}
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          className="search-bar-paper"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name or username"
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
            <AllUsersCardWrapper>
              {userData?.map((item, index) => (
                <UserCard user={item} key={item._id} />
              ))}
            </AllUsersCardWrapper>
          ) : (
            <Nodata />
          )}
        </>
      )}
    </AllUsersWrapper>
  );
};

export default AllUsers;
