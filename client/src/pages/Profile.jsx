import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//styles
import {
  ButtonWrapper,
  ExtraButton,
  MoreDataWrapper,
  ProfileWrapper,
  TopWrapper,
} from "../styles/pages/profileStyles";
//apis
import { useGetSingleUserQuery } from "../app/services/userApi";
import { useLogoutMutation } from "../app/services/authApi";
//components and utils
import EditProfileModal from "../components/EditProfileModal";
import DeleteAccountProject from "../components/DeleteAccountProject";
import ChangePassword from "../components/ChangePassword";
import { createNotification } from "../components/Notification";
import ScholarshipMe from "../components/ScholarshipMe";
//icons
import { BsGridFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  RiMailOpenLine,
  RiLogoutBoxRLine,
  RiUserFill,
  RiBookmarkFill,
} from "react-icons/ri";
import SavedProjects from "../components/SavedProjects";
import { ErrorPage, ProfileLoader } from "../components/Loaders";
import { Avatar } from "@mui/material";
import { authenticateMe } from "../features/meSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [blankLoader, setBlankLoader] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  //modals

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

  useEffect(() => {
    if (!isFetching && data?.success) {
      setErrorPage(false);
      let tdata = data?.data;
      if (
        !tdata?.about ||
        tdata.about === "" ||
        !tdata?.bio ||
        tdata?.bio === ""
      ) {
        setComplete(false);
      } else {
        setComplete(true);
      }
      if (data?.isMe) {
        dispatch(
          authenticateMe({
            isAuthenticated: true,
            isAdmin: tdata?.isadmin,
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
                    <></>
                  )}
                </div>
                <div className="followers-section">
                  <div>
                    <span>{data?.data?.total_scholarships}</span> Scholarships
                    Posted
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

                  {complete && data?.isMe && (
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
                Scholarships
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
              <ScholarshipMe isMe={data?.isMe} />
            ) : active === 3 && data?.isMe ? (
              <SavedProjects />
            ) : (
              <></>
            )}
          </ProfileWrapper>
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
