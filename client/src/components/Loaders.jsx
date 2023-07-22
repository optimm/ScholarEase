import React from "react";
import {
  AllUsersProjectsLoaders,
  ErrorPageWrapper,
  FullScreenLoaders,
  LoadingCommentWrapper,
  NoDataWrapper,
  PostDevLoadingWrapper,
  ProfileLoadingWrapper,
} from "../styles/components/loadingStyles";
import {
  Discuss,
  MagnifyingGlass,
  ThreeDots,
  Triangle,
} from "react-loader-spinner";

export const FullScreenLoader = () => {
  return (
    <FullScreenLoaders>
      <img className="image" src="/images/cat.gif" alt="animation"></img>
      <div className="text">
        <span>Dev</span>hub
      </div>
    </FullScreenLoaders>
  );
};

export const AllUsersProjectsLoader = () => {
  return (
    <AllUsersProjectsLoaders>
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="var(--primary-color)"
      />
    </AllUsersProjectsLoaders>
  );
};

export const ProfileLoader = () => {
  return (
    <ProfileLoadingWrapper>
      <Triangle
        height="120"
        width="120"
        color="var(--primary-color)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </ProfileLoadingWrapper>
  );
};

export const PostOfDevLoader = () => {
  return (
    <PostDevLoadingWrapper>
      <ThreeDots
        height="60"
        width="60"
        radius="7"
        color="var(--primary-color)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </PostDevLoadingWrapper>
  );
};

export const CommentLoader = () => {
  return (
    <LoadingCommentWrapper>
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="var(--primary-color)"
      />
    </LoadingCommentWrapper>
  );
};

export const ButtonLoader = () => {
  return (
    <ThreeDots
      height="20"
      width="30"
      radius="5"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export const Nodata = () => {
  return (
    <NoDataWrapper>
      <img src="/images/noData.gif" alt="No Data"></img>
    </NoDataWrapper>
  );
};

export const ErrorPage = ({ text }) => {
  return (
    <ErrorPageWrapper>
      <img alt="error" src="/images/errorPage.gif"></img>
      <div className="text">{text}</div>
    </ErrorPageWrapper>
  );
};
