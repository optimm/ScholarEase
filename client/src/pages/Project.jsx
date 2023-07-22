import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  LikesIndv,
  ProjectImageWrapper,
  ProjectMainWrapper,
} from "../styles/pages/projectStyles";
import { Avatar } from "@mui/material";
import { BiComment, BiShareAlt } from "react-icons/bi";
import { AiFillLike, AiOutlineDelete } from "react-icons/ai";
import { RiBookmarkFill, RiEditFill } from "react-icons/ri";

import { ExtraButton, ProfileIndv } from "../styles/pages/profileStyles";
import ProfileIcon from "../components/ProfileIcon";
import {
  useGetSingleProjectQuery,
  useLikeUnlikeProjectMutation,
  useSaveUnsaveProjectMutation,
} from "../app/services/projectApi";
import { linkProcessor, timeProcessor } from "../util/utilFunctions";
import { useSelector } from "react-redux";
import { createNotification } from "../components/Notification";
import AllTagsModal from "../components/AllTagsModal";
import LikesSavesModal from "../components/LikesSavesModal";
import CommentsModal from "../components/CommentsModal";
import DeleteAccountProject from "../components/DeleteAccountProject";
import ReadmeFile from "../components/ReadmeFile";
import { ErrorPage, ProfileLoader } from "../components/Loaders";
import { RotatingLines } from "react-loader-spinner";

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, isFetching, error } = useGetSingleProjectQuery({
    id,
  });
  const projectData = data?.data;

  const [likeUnlike, { isLoading: isLikeLoading }] =
    useLikeUnlikeProjectMutation();
  const [saveUnsave, { isLoading: isSaveLoading }] =
    useSaveUnsaveProjectMutation();

  const [tagsString, setTagsString] = useState("");
  const [viewAllTags, setViewAllTags] = useState(false);
  const [likesShow, setLikesShow] = useState(false);
  const [savesShow, setSavesShow] = useState(false);
  const [comment, setComment] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const [readmeShow, setReadmeShow] = useState(false);

  const [blankLoader, setBlankLoader] = useState(true);
  const [errorPage, setErrorPage] = useState(false);

  useEffect(() => {
    if (!isFetching && data?.success) {
      setErrorPage(false);

      let temp = "";
      if (data?.data?.tags?.length > 0) {
        let arr = data?.data?.tags;
        for (let i = 0; i < arr.length; i++) {
          let t = temp;
          if (i > 0) {
            t += ", ";
          }
          t += arr[i];
          if (t.length > 40) {
            temp += "...";
            break;
          } else {
            temp = t;
          }
        }
        setTagsString(temp);
      }
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    } else if (
      (!isLoading && data?.success) ||
      error?.data?.success === false
    ) {
      if (error) {
        setErrorPage(true);
      }
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, data, error]);

  const handleLikeUnlike = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      const { data: likeData, error: likeError } = await likeUnlike({ id });
      if (likeData?.success) {
        createNotification(likeData?.msg, "success", 2000);
      } else if (!likeError?.data?.success) {
        createNotification(likeError?.data?.LikesIndvmsg, "error", 2000);
      }
    }
  };
  const handleSaveUnsave = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      const { data: saveData, error: saveError } = await saveUnsave({ id });
      if (saveData?.success) {
        createNotification(saveData?.msg, "success", 2000);
      } else if (!saveError?.success) {
        createNotification(saveError?.msg, "error", 2000);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    createNotification("Url copied to clipboard", "success", 2000);
  };
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <>
      {isLoading || blankLoader ? (
        <ProfileLoader />
      ) : errorPage ? (
        <ErrorPage text={"Project Not Found"} />
      ) : (
        <>
          <ProjectMainWrapper>
            <div className="main-left">
              <div className="data-wrapper">
                <div className="profile-section">
                  <Link to={`/users/${projectData?.owner?._id}`}>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      src={projectData?.owner?.avatar?.url}
                    ></Avatar>
                  </Link>

                  <div>
                    <div className="username">
                      {projectData?.owner?.username}
                    </div>
                    <div className="created-at">
                      Created - {timeProcessor(projectData?.created_at)}
                    </div>
                  </div>
                </div>
                <div className="title">{projectData?.title}</div>
                <div className="desc">{projectData?.desc}</div>
                <div className="tags-section">
                  <div className="tags-head">Tags</div>
                  <div className="tags">
                    {tagsString}
                    <div
                      className="view-more"
                      onClick={() => setViewAllTags(true)}
                    >
                      View Tags
                    </div>
                  </div>
                </div>
                <div className="links-section">
                  {projectData?.github_link && (
                    <ProfileIndv
                      onClick={() =>
                        window.open(linkProcessor(projectData?.github_link))
                      }
                    >
                      <ProfileIcon platform={"github"} />
                    </ProfileIndv>
                  )}
                  {projectData?.live_link && (
                    <ProfileIndv
                      onClick={() =>
                        window.open(linkProcessor(projectData?.live_link))
                      }
                    >
                      <ProfileIcon platform={"website"} />
                    </ProfileIndv>
                  )}
                </div>
                {data?.readme?.readmeData && (
                  <div
                    className="links-section"
                    onClick={() => setReadmeShow(true)}
                  >
                    <ExtraButton>View Readme</ExtraButton>
                  </div>
                )}
              </div>
            </div>
            <div className="main-right">
              <ProjectImageWrapper
                url={projectData?.image?.url || "/images/login.jpg"}
                loading={loading}
              >
                <div className="project-back"></div>
                <div className="project-image"></div>
                <img
                  src={projectData?.image?.url || "/images/login.jpg"}
                  onLoad={handleImageLoad}
                  style={{ display: "none" }}
                  alt={"skeleton"}
                />
              </ProjectImageWrapper>

              <div className="flex-justify">
                <div className="likes-section">
                  {isLikeLoading ? (
                    <LikesIndv>
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="3"
                        animationDuration="2"
                        width="24"
                        visible={true}
                      />
                    </LikesIndv>
                  ) : (
                    <LikesIndv
                      onClick={handleLikeUnlike}
                      checked={data?.isLiked}
                    >
                      <AiFillLike />
                    </LikesIndv>
                  )}
                  <LikesIndv onClick={() => setComment(true)}>
                    <BiComment />
                  </LikesIndv>
                  <LikesIndv onClick={handleShare}>
                    <BiShareAlt />
                  </LikesIndv>
                  {isSaveLoading ? (
                    <LikesIndv>
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="3"
                        animationDuration="2"
                        width="24"
                        visible={true}
                      />
                    </LikesIndv>
                  ) : (
                    <LikesIndv
                      onClick={handleSaveUnsave}
                      checked={data?.isSaved}
                    >
                      <RiBookmarkFill />
                    </LikesIndv>
                  )}
                </div>
                {isAuthenticated && data?.isMine && (
                  <div className="likes-section">
                    <button
                      className="edit-button"
                      onClick={() => navigate("edit")}
                    >
                      Edit <RiEditFill />
                    </button>
                    <button
                      className="edit-button red"
                      onClick={() => setDeleteProject(true)}
                    >
                      Delete <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </div>

              <div className="likes-section">
                <div className="likes-data" onClick={() => setLikesShow(true)}>
                  Liked by {projectData?.total_likes}{" "}
                  {projectData?.total_likes === 1 ? "User" : "Users"}
                </div>
                {isAuthenticated && data?.isMine && (
                  <div
                    className="likes-data"
                    onClick={() => setSavesShow(true)}
                  >
                    Saved by {projectData?.total_saves}{" "}
                    {projectData?.total_saves === 1 ? "User" : "Users"}
                  </div>
                )}
              </div>
            </div>
          </ProjectMainWrapper>
          {viewAllTags && (
            <AllTagsModal
              show={viewAllTags}
              setShow={setViewAllTags}
              tags={data?.data?.tags}
            />
          )}
          {likesShow && (
            <LikesSavesModal
              show={likesShow}
              setShow={setLikesShow}
              array={projectData?.likes}
              heading="Likes"
            />
          )}
          {savesShow && (
            <LikesSavesModal
              show={savesShow}
              setShow={setSavesShow}
              array={projectData?.saved}
              heading="Saved By"
            />
          )}
          {comment && (
            <CommentsModal
              show={comment}
              setShow={setComment}
              isMine={data?.isMine}
            />
          )}
          {deleteProject && (
            <DeleteAccountProject
              show={deleteProject}
              setShow={setDeleteProject}
              project={true}
            />
          )}
          {readmeShow && (
            <ReadmeFile
              show={readmeShow}
              setShow={setReadmeShow}
              readmeData={data?.readme}
            />
          )}
        </>
      )}
    </>
  );
};

export default Project;
