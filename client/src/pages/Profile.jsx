import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//styles
import {
  ButtonWrapper,
  ExtraButton,
  MoreDataWrapper,
  ProfileIndv,
  ProfileWrapper,
  TopWrapper,
} from "../styles/pages/profileStyles";
//apis
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
} from "../app/services/userApi";
import { useLogoutMutation } from "../app/services/authApi";
//components and utils
import FModal from "../components/FModal";
import EditProfileModal from "../components/EditProfileModal";
import DeleteAccountProject from "../components/DeleteAccountProject";
import ChangePassword from "../components/ChangePassword";
import { linkProcessor } from "../util/utilFunctions";
import { createNotification } from "../components/Notification";
import ProfileIcon from "../components/ProfileIcon";
import PostsOfDev from "../components/PostsOfDev";
//icons
import { BsGridFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  RiUserFollowLine,
  RiMailOpenLine,
  RiUserUnfollowLine,
  RiLogoutBoxRLine,
  RiUserFill,
  RiBookmarkFill,
} from "react-icons/ri";
import SavedProjects from "../components/SavedProjects";
import { ButtonLoader, ErrorPage, ProfileLoader } from "../components/Loaders";
import { Avatar } from "@mui/material";
import { authenticateMe } from "../features/meSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isAuthenticated } = useSelector((state) => state.me);
  const [blankLoader, setBlankLoader] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  //modals
  const [fmodal, setFmodal] = useState(false);
  const [fmodalcat, setFmodalCat] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [changep, setChangep] = useState(false);
  const [del, setDel] = useState(false);
  const [active, setActive] = useState(1);
  //
  const [complete, setComplete] = useState(false);
  //queries
  const [logoutFn] = useLogoutMutation();
  const { data, isLoading, isFetching, error } = useGetSingleUserQuery(
    {
      id,
    },
    { skip: del }
  );

  const [followFunction, { isLoading: isFollowLoading }] =
    useFollowUserMutation();

  useEffect(() => {
    if (!isFetching && data?.success) {
      setErrorPage(false);
      let tdata = data?.data;
      if (
        !tdata?.about ||
        tdata.about === "" ||
        !tdata?.bio ||
        tdata?.bio === "" ||
        !tdata?.profiles ||
        tdata?.profiles.length === 0
      ) {
        setComplete(false);
      } else {
        setComplete(true);
      }
      if (data?.isMe) {
        dispatch(
          authenticateMe({
            isAuthenticated: true,
            data: {
              _id: tdata?._id,
              avatar: tdata?.avatar,
              name: tdata?.name,
              username: tdata?.username,
              email: tdata?.email,
            },
          })
        );
      }
    }
  }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    } else if (
      !isLoading &&
      (data?.success || error?.data?.success === false)
    ) {
      if (error) {
        setErrorPage(true);
      }
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, data, error]);

  const handleLogout = async () => {
    const { data: logoutData, error: logoutError } = await logoutFn();
    if (logoutData?.success) {
      createNotification(logoutData?.msg || "Logged out", "info", 2000);
      navigate("/");
    } else {
      createNotification(
        logoutError?.data?.msg || "Something went wrong",
        "error",
        2000
      );
    }
  };

  const handleFollow = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      try {
        const followData = await followFunction({ id }).unwrap();
        createNotification(followData?.msg, "success", 2000);
      } catch (error) {
        createNotification(`Something went wrong`, "error", 2000);
      }
    }
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
        <ErrorPage text={"User Not Found"} />
      ) : (
        <>
          <ProfileWrapper>
            <TopWrapper>
              <Avatar
                sx={{ width: 170, height: 170 }}
                src={!loading && data?.data?.avatar?.url}
              ></Avatar>
              <img
                src={data?.data?.avatar?.url}
                onLoad={handleImageLoad}
                style={{ display: "none" }}
                alt={"skeleton"}
              />
              <div className="text-section">
                <div className="username-section">
                  <div className="username">{data?.data?.username}</div>
                  {data?.isMe ? (
                    <ExtraButton onClick={() => setEditProfile(true)}>
                      Edit Profile
                    </ExtraButton>
                  ) : (
                    <ExtraButton
                      disabled={isFollowLoading}
                      onClick={handleFollow}
                      primary={data?.isFollowing === false}
                    >
                      {isFollowLoading || isFetching ? (
                        <ButtonLoader />
                      ) : data?.isFollowing ? (
                        <>
                          Unfollow <RiUserUnfollowLine />
                        </>
                      ) : (
                        <>
                          Follow <RiUserFollowLine />
                        </>
                      )}
                    </ExtraButton>
                  )}
                </div>
                <div className="followers-section">
                  <div>
                    <span>{data?.data?.total_projects}</span> Posts
                  </div>
                  <div
                    onClick={() => {
                      setFmodalCat("followers");
                      setFmodal(true);
                    }}
                    className="follower-section-sub"
                  >
                    <span>{data?.data?.total_followers}</span> Followers
                  </div>
                  <div
                    onClick={() => {
                      setFmodalCat("following");
                      setFmodal(true);
                    }}
                    className="follower-section-sub"
                  >
                    <span>{data?.data?.total_following}</span> Following
                  </div>
                </div>
                <div className="name-section">
                  <div className="name">{data?.data?.name}</div>
                  <div className="bio">{data?.data?.bio}</div>
                </div>
                <div className="complete-profile">
                  {!complete &&
                    data?.isMe &&
                    "Complete your profile so that other's can know you better"}
                  {complete &&
                    data?.data?.profiles?.length < 6 &&
                    data?.isMe &&
                    "Add more profile links to be more reachable"}
                  {complete &&
                    data?.data?.profiles?.length === 6 &&
                    data?.isMe && (
                      <>
                        Complete Profile <AiOutlineCheckCircle />
                      </>
                    )}
                </div>
              </div>
            </TopWrapper>
            <ButtonWrapper>
              <button
                className={`wrapper-button ${active === 1 && "active"}`}
                onClick={() => setActive(1)}
              >
                About
                <RiUserFill />
              </button>
              <button
                className={`wrapper-button ${active === 2 && "active"}`}
                onClick={() => setActive(2)}
              >
                Projects
                <BsGridFill />
              </button>
              {data?.isMe && (
                <button
                  className={`wrapper-button ${active === 3 && "active"}`}
                  onClick={() => setActive(3)}
                >
                  Saved
                  <RiBookmarkFill />
                </button>
              )}
            </ButtonWrapper>

            {active === 1 ? (
              <MoreDataWrapper>
                {data?.data?.about?.length > 0 && (
                  <>
                    <div className="about-head">About</div>
                    <div className="about">{data?.data?.about}</div>
                  </>
                )}

                {data?.data?.profiles?.length > 0 && (
                  <>
                    <div className="about-head">Links</div>
                    <div className="profiles-section">
                      {data?.data?.profiles?.map((item, index) => (
                        <ProfileIndv
                          className="profile"
                          key={index}
                          onClick={() => window.open(linkProcessor(item?.link))}
                          title={item?.platform}
                        >
                          <ProfileIcon platform={item?.platform} />
                        </ProfileIndv>
                      ))}
                    </div>
                  </>
                )}
                {data?.isMe ? (
                  <div className="extra-options">
                    <ExtraButton onClick={handleLogout} primary>
                      <RiLogoutBoxRLine /> Logout
                    </ExtraButton>
                    <ExtraButton onClick={() => setChangep(true)}>
                      Change Password
                    </ExtraButton>
                    <ExtraButton className="red" onClick={() => setDel(true)}>
                      Delete Account
                    </ExtraButton>
                  </div>
                ) : (
                  <div className="extra-options">
                    <a href={`mailto: ${data?.data?.email}`}>
                      <ExtraButton primary>
                        Contact <RiMailOpenLine />
                      </ExtraButton>
                    </a>
                  </div>
                )}
              </MoreDataWrapper>
            ) : active === 2 ? (
              <PostsOfDev isMe={data?.isMe} />
            ) : active === 3 && data?.isMe ? (
              <SavedProjects />
            ) : (
              <></>
            )}
          </ProfileWrapper>

          <FModal show={fmodal} setShow={setFmodal} category={fmodalcat} />
          {editProfile && (
            <EditProfileModal
              show={editProfile}
              setShow={setEditProfile}
              blankLoader={blankLoader}
              setBlankLoader={setBlankLoader}
            />
          )}
          {changep && <ChangePassword show={changep} setShow={setChangep} />}
          {del && <DeleteAccountProject show={del} setShow={setDel} />}
        </>
      )}
    </>
  );
};

export default Profile;
