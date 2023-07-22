import React from "react";
import { UserCardWrapper } from "../styles/components/userCardStyles";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <UserCardWrapper
      image={user?.avatar?.url || "/images/noImage.png"}
      loading={loading}
    >
      <Link to={`/users/${user?._id}`}>
        <div className="image-section">
          <img
            src={user?.avatar?.url || "/images/noImage.png"}
            onLoad={handleImageLoad}
            style={{ display: "none" }}
            alt={"skeleton"}
          />
        </div>

        <div className="data-section">
          <div className="user-name">{user?.username}</div>
          <div className="name">{user?.name}</div>
        </div>
      </Link>
    </UserCardWrapper>
  );
};

export default UserCard;
